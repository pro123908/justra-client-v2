import {
  Connection,
  PublicKey,
  SendTransactionError,
  SystemProgram,
  Transaction,
  VersionedTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import BN from "bn.js";
import IDL from "./idls/git_escrow.json";

export { BN };

export const PROGRAM_ID = new PublicKey("GUndCD7drNPXK8ZTTvAey79Fcnv19PVfTt4ydAM9uKry");
export const PLATFORM_WALLET = new PublicKey("AKnL4NNf3DGWZJS6cPknBuEGnVsV4A4m5tgebLHaRSZ9");

const NETWORK = (import.meta.env.VITE_SOLANA_NETWORK as string) ?? "devnet";
const RPC_URL =
  (import.meta.env.VITE_SOLANA_RPC_URL as string) ??
  clusterApiUrl(NETWORK as Parameters<typeof clusterApiUrl>[0]);

export function getConnection(): Connection {
  return new Connection(RPC_URL, "confirmed");
}

// ─── Phantom wallet plumbing ────────────────────────────────────────────────

type PhantomWallet = {
  isPhantom?: boolean;
  publicKey: { toString: () => string; toBytes: () => Uint8Array } | null;
  connect: (opts?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: NonNullable<PhantomWallet["publicKey"]> }>;
  disconnect: () => Promise<void>;
  signTransaction: <T extends Transaction | VersionedTransaction>(tx: T) => Promise<T>;
  signAllTransactions: <T extends Transaction | VersionedTransaction>(txs: T[]) => Promise<T[]>;
  signMessage: (message: Uint8Array, encoding: "utf8") => Promise<{ signature: Uint8Array }>;
};

function getPhantom(): PhantomWallet {
  const w = window as unknown as {
    solana?: PhantomWallet;
    phantom?: { solana?: PhantomWallet };
  };
  const provider = w.phantom?.solana ?? w.solana;
  if (!provider?.isPhantom) throw new Error("Phantom wallet not detected");
  return provider;
}

function makeAnchorWallet(phantom: PhantomWallet) {
  if (!phantom.publicKey) throw new Error("Wallet not connected");
  return {
    publicKey: new PublicKey(phantom.publicKey.toString()),
    signTransaction: <T extends Transaction | VersionedTransaction>(tx: T) =>
      phantom.signTransaction(tx),
    signAllTransactions: <T extends Transaction | VersionedTransaction>(txs: T[]) =>
      phantom.signAllTransactions(txs),
  };
}

export function getProvider(): AnchorProvider {
  const phantom = getPhantom();
  const connection = getConnection();
  const wallet = makeAnchorWallet(phantom);
  return new AnchorProvider(connection, wallet, { commitment: "confirmed" });
}

export function getProgram<T extends Idl>(idl: T): Program<T> {
  const provider = getProvider();
  return new Program<T>(idl, provider);
}

export function getWalletPublicKey(): PublicKey {
  const phantom = getPhantom();
  if (!phantom.publicKey) throw new Error("Wallet not connected");
  return new PublicKey(phantom.publicKey.toString());
}

// ─── Generic helpers ─────────────────────────────────────────────────────────

export function findPda(seeds: Uint8Array[], programId = PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(seeds, programId);
}

export function lamportsToSol(lamports: number | BN): number {
  const val = typeof lamports === "number" ? lamports : lamports.toNumber();
  return val / 1e9;
}

export function solToLamports(sol: number): BN {
  return new BN(Math.round(sol * 1e9));
}

/** SHA-256 hash a UTF-8 string into a 32-byte Uint8Array. */
export async function sha256(text: string): Promise<number[]> {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash));
}

// ─── git_escrow program ──────────────────────────────────────────────────────

function getEscrowProgram() {
  return getProgram(IDL as Idl);
}

/**
 * Normalizes a milestoneId to fit within Solana's 32-byte seed limit.
 * Strips dashes from UUID-format IDs (36 → 32 chars), otherwise truncates.
 */
export function normalizeMilestoneId(milestoneId: string): string {
  const stripped = milestoneId.replace(/-/g, "");
  const bytes = new TextEncoder().encode(stripped);
  if (bytes.length <= 32) return stripped;
  return new TextDecoder().decode(bytes.slice(0, 32));
}

/**
 * Derives the milestone PDA for a given consumer / provider / milestoneId triple.
 * Seeds: ["milestone", consumer, provider, normalizeMilestoneId(milestoneId)]
 */
export function milestonePda(
  consumer: PublicKey,
  provider: PublicKey,
  milestoneId: string,
  programId = PROGRAM_ID,
): [PublicKey, number] {
  const enc = new TextEncoder();
  const normalizedId = normalizeMilestoneId(milestoneId);
  return PublicKey.findProgramAddressSync(
    [enc.encode("milestone"), consumer.toBytes(), provider.toBytes(), enc.encode(normalizedId)],
    programId,
  );
}

export type InitializeMilestoneParams = {
  /** Backend milestone ID (max 32 chars). */
  milestoneId: string;
  /** Amount in lamports (use solToLamports to convert from SOL). */
  amountLamports: BN;
  /**
   * 32-byte requirements hash — typically sha256(specCid).
   * Use the exported sha256() helper to produce this from a CID string.
   */
  requirementsHash: number[];
  /** Platform fee in basis points (e.g. 250 = 2.5%). */
  feeBps: number;
  /** Provider's public key. */
  provider: PublicKey;
};

export type ReleaseMilestoneFundsParams = {
  milestoneId: string;
  provider: PublicKey;
};

export type DisputeMilestoneParams = {
  milestoneId: string;
  provider: PublicKey;
};

/**
 * Consumer deposits SOL and creates the on-chain milestone escrow.
 * The connected Phantom wallet is treated as the consumer / signer.
 *
 * @returns the confirmed transaction signature
 */
export async function initializeMilestone(params: InitializeMilestoneParams): Promise<string> {
  const { milestoneId, amountLamports, requirementsHash, feeBps, provider } = params;

  const program = getEscrowProgram();
  const consumer = getWalletPublicKey();
  const normalizedId = normalizeMilestoneId(milestoneId);
  const [pda] = milestonePda(consumer, provider, normalizedId);

  try {
    const sig = await program.methods
      .initializeMilestone(normalizedId, amountLamports, requirementsHash, feeBps)
      .accounts({
        consumer,
        provider,
        milestonePda: pda,
        systemProgram: SystemProgram.programId,
      })
      .rpc({ skipPreflight: true });

    return sig;
  } catch (e) {
    // Anchor retries timed-out transactions; if the retry hits an already-confirmed
    // tx the RPC throws "already been processed" — that means the first attempt
    // succeeded and the on-chain state is correct, so treat it as success.
    if (e instanceof Error && e.message.includes("already been processed")) {
      console.warn("initializeMilestone: tx already processed, treating as success");
      return "already-processed";
    }
    console.error("Error initializing milestone:", e);
    throw e;
  }
}

/**
 * Raises a dispute on an active milestone, freezing the escrow for arbitration.
 * Per the IDL the provider must sign — the connected wallet must be the provider.
 *
 * @returns the confirmed transaction signature
 */
export async function disputeMilestone(params: DisputeMilestoneParams): Promise<string> {
  const { milestoneId, provider } = params;

  const program = getEscrowProgram();
  const consumer = getWalletPublicKey();
  const normalizedId = normalizeMilestoneId(milestoneId);
  const [pda] = milestonePda(consumer, provider, normalizedId);

  try {
    const sig = await program.methods
      .dispute()
      .accounts({
        provider,
        consumer,
        milestonePda: pda,
      })
      .rpc({ skipPreflight: true });

    return sig;
  } catch (e) {
    if (e instanceof Error && e.message.includes("already been processed")) {
      console.warn("disputeMilestone: tx already processed, treating as success");
      return "already-processed";
    }
    console.error("Error disputing milestone:", e);
    throw e;
  }
}

/**
 * Consumer approves the completed milestone and releases escrowed funds on-chain.
 *
 * @returns the confirmed transaction signature
 */
export async function releaseMilestoneFunds(params: ReleaseMilestoneFundsParams): Promise<string> {
  const { milestoneId, provider } = params;

  const program = getEscrowProgram();
  const consumer = getWalletPublicKey();
  const normalizedId = normalizeMilestoneId(milestoneId);
  const [pda] = milestonePda(consumer, provider, normalizedId);

  try {
    const sig = await program.methods
      .releaseFunds()
      .accounts({
        consumer,
        provider,
        platformWallet: PLATFORM_WALLET,
        milestonePda: pda,
        systemProgram: SystemProgram.programId,
      })
      .rpc({ skipPreflight: true });

    return sig;
  } catch (e) {
    // Anchor retries timed-out transactions; if the retry hits an already-confirmed
    // tx the RPC throws "already been processed" — that means the first attempt
    // succeeded and the on-chain state is correct, so treat it as success.
    if (e instanceof Error && e.message.includes("already been processed")) {
      console.warn("initializeMilestone: tx already processed, treating as success");
      return "already-processed";
    }
    console.error("Error initializing milestone:", e);
    throw e;
  }
}
