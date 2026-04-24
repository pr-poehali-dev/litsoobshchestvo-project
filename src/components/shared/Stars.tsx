export default function Stars({ n }: { n: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? "var(--gold-herb)" : "var(--moss)", fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}
