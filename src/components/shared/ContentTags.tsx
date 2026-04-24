const MAP: Record<string, string> = {
  "18+": "tag-18",
  "эротика": "tag-ero",
  "насилие": "tag-violence",
  "наркотики": "tag-drug",
  "нецензурная": "tag-lang",
};

export default function ContentTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <span className="flex gap-1 flex-wrap">
      {tags.map(t => (
        <span key={t} className={`content-tag ${MAP[t] || "tag-18"}`}>{t}</span>
      ))}
    </span>
  );
}
