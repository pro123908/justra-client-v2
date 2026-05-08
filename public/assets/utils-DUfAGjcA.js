function n(t) {
  const i = parseFloat(String(t ?? "0"));
  return isNaN(i)
    ? "0"
    : i.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 9 });
}
export { n as f };
