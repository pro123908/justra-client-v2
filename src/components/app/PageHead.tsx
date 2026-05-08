interface PageHeadProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHead({ title, subtitle, actions }: PageHeadProps) {
  return (
    <div className="row-between" style={{ marginBottom: 24, alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
      <div>
        <h1 className="h-display h1" style={{ marginBottom: 6 }}>{title}</h1>
        {subtitle && <div className="muted" style={{ fontSize: 14 }}>{subtitle}</div>}
      </div>
      <div className="row gap-8">{actions}</div>
    </div>
  );
}
