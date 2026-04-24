import { useState } from "react";
import SectionHead from "@/components/shared/SectionHead";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from "@/data/achievements";

export default function AchievementsSection({ earned = ["first_day","week","first_book","first_chapter","reader1","like1","comment1"] }: { earned?: string[] }) {
  const [cat, setCat] = useState("Все");

  const filtered = cat === "Все"
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === cat);

  return (
    <section className="mb-12">
      <SectionHead icon="🏅" title="Достижения" sub="Бейджи и значки за активность на платформе" />

      <div className="flex gap-1.5 flex-wrap mb-5">
        {["Все", ...ACHIEVEMENT_CATEGORIES].map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="px-3 py-1.5 rounded-full font-body text-xs transition-all flex-shrink-0"
            style={cat===c
              ? { background:"var(--olive)", color:"var(--cream)" }
              : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
            {c}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <span className="font-body text-sm" style={{ color:"var(--ink-muted)" }}>
          Получено: <span style={{ color:"var(--leaf)", fontWeight:600 }}>{earned.length}</span> из {ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filtered.map(a => {
          const isEarned = earned.includes(a.id);
          return (
            <div key={a.id}
              className="rounded-xl p-3 text-center transition-all cursor-default relative overflow-hidden"
              style={{
                border: isEarned ? "1px solid var(--leaf)" : "1px solid var(--moss)",
                background: isEarned ? "linear-gradient(135deg, var(--cream), rgba(88,120,70,0.07))" : "var(--sage)",
                opacity: isEarned ? 1 : 0.55,
              }}>
              {isEarned && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background:"var(--leaf)" }} />
              )}
              <div className="text-3xl mb-1.5">
                {a.secret && !isEarned ? "🔮" : a.icon}
              </div>
              <div className="font-display text-sm font-semibold leading-tight mb-0.5" style={{ color:"var(--ink)" }}>
                {a.secret && !isEarned ? "???" : a.title}
              </div>
              <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                {a.secret && !isEarned ? "Секретное достижение" : a.desc}
              </div>
              {isEarned && (
                <div className="mt-1.5 font-body text-xs font-semibold" style={{ color:"var(--leaf)" }}>✓ Получено</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
