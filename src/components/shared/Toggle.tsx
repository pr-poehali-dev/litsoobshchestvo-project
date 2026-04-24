export default function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex-shrink-0 w-10 h-6 rounded-full transition-all relative"
      style={{ background: value ? "var(--leaf)" : "var(--moss)" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
        style={{ left: value ? "18px" : "2px" }}
      />
    </button>
  );
}
