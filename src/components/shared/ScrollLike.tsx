import { useState } from "react";

export default function ScrollLike({ count, className = "" }: { count: number; className?: string }) {
  const [liked, setLiked] = useState(false);
  const [n, setN] = useState(count);
  return (
    <button
      className={`scroll-like ${liked ? "liked" : ""} ${className}`}
      onClick={e => { e.stopPropagation(); setLiked(!liked); setN(liked ? n - 1 : n + 1); }}
    >
      <span>📜</span>
      <span>{n}</span>
    </button>
  );
}
