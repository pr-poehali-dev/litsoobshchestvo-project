export default function SectionHead({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="section-head">
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 style={{ color: "var(--ink)" }}>{title}</h2>
      </div>
      {sub && (
        <p style={{ color: "var(--ink-muted)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem" }}>{sub}</p>
      )}
      <div className="leaf-divider">
        <span className="font-display text-xs italic" style={{ color: "var(--moss)" }}>❧</span>
      </div>
    </div>
  );
}
