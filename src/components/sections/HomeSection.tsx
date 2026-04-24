import ScrollLike from "@/components/shared/ScrollLike";
import ContentTags from "@/components/shared/ContentTags";
import SectionHead from "@/components/shared/SectionHead";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_BOOKS, MOCK_NEWCOMERS } from "@/data/mock";
import { useState } from "react";

interface HomeSectionProps {
  onNav: (s: string) => void;
  isLoggedIn: boolean;
  onShowAuth: () => void;
}

export default function HomeSection({ onNav, isLoggedIn, onShowAuth }: HomeSectionProps) {
  const [openBook, setOpenBook] = useState<number | null>(null);
  const hotBooks = MOCK_BOOKS.filter(b => b.isHot);
  const newBooks = MOCK_BOOKS.filter(b => b.isNew);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl herb-border mb-10 py-14 px-8"
        style={{ background:"linear-gradient(135deg, var(--cream) 0%, var(--sage-mid) 60%, var(--sage-deep) 100%)" }}>
        <div className="absolute top-4 right-8 text-8xl opacity-[0.07] pointer-events-none select-none rotate-12">🌿</div>
        <div className="absolute bottom-4 right-32 text-6xl opacity-[0.06] pointer-events-none select-none -rotate-6">🍃</div>
        <div className="absolute top-20 right-24 text-5xl opacity-[0.05] pointer-events-none select-none">🌱</div>
        <div className="relative z-10 max-w-xl">
          <span className="genre-badge mb-4 inline-block">Литературное сообщество</span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight mb-3 anim-up d1" style={{ color:"var(--ink)" }}>
            Писатель<span style={{ color:"var(--leaf)" }}>.Плюс</span>
          </h1>
          <p className="font-body text-lg mb-2 anim-up d2" style={{ color:"var(--ink-soft)" }}>
            Живое место для авторов, читателей и тех, кто между.
          </p>
          <p className="font-display italic text-base mb-8 anim-up d3" style={{ color:"var(--ink-muted)" }}>
            «Здесь прорастают слова.»
          </p>
          <div className="flex flex-wrap gap-3 mb-8 anim-up d4">
            <button className="olive-btn px-6 py-2.5 rounded-lg text-sm"
              onClick={() => isLoggedIn ? onNav("manuscripts") : onShowAuth()}>
              {isLoggedIn ? "Начать писать" : "Присоединиться"}
            </button>
            <button className="font-body text-sm px-6 py-2.5 rounded-lg herb-border transition-all"
              style={{ color:"var(--ink-soft)", background:"transparent" }}
              onClick={() => onNav("library")}>
              В библиотеку
            </button>
          </div>
          <div className="flex gap-7 anim-up d5">
            {[["18 400","читателей"],["4 800","авторов"],["62 000","глав"]].map(([v,l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold" style={{ color:"var(--leaf)" }}>{v}</div>
                <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Приветствие новичков */}
      <section className="mb-10 rounded-xl herb-border p-5"
        style={{ background:"linear-gradient(to right, var(--cream), var(--sage))" }}>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xl">🌱</span>
          <h3 className="font-display text-xl font-semibold" style={{ color:"var(--forest)" }}>Приветствуем новичков!</h3>
          <span className="font-body text-xs px-3 py-0.5 rounded-full" style={{ background:"var(--olive)", color:"var(--cream)" }}>
            Читайте их работы!
          </span>
        </div>
        <p className="font-body text-sm mb-4" style={{ color:"var(--ink-muted)" }}>
          Первый шаг — самый важный. Поддержите начинающих авторов свитком-лайком!
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {MOCK_NEWCOMERS.map(a => (
            <div key={a.id} className="card-herb flex-shrink-0 w-44 p-3.5 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="font-body text-xs" style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>
                    {a.name.slice(0,2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-body text-xs font-semibold" style={{ color:"var(--ink)" }}>{a.name}</div>
                  <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{a.nick}</div>
                </div>
              </div>
              <span className="genre-badge">{a.genre}</span>
              <div className="font-body text-xs mt-1.5" style={{ color:"var(--ink-muted)" }}>
                {a.joinedDays === 1 ? "вчера" : `${a.joinedDays} дн. назад`} · {a.books} кн.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Горячие новинки */}
      <section className="mb-12">
        <SectionHead icon="🔥" title="Горячие новинки" sub="Популярные книги, добавленные недавно" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotBooks.map(b => (
            <BookCard key={b.id} book={b} open={openBook===b.id} onToggle={() => setOpenBook(openBook===b.id?null:b.id)} />
          ))}
        </div>
      </section>

      {/* Манускрипты (свежие) */}
      <section className="mb-12">
        <SectionHead icon="📜" title="Манускрипты" sub="Свежие публикации по главам" />
        <div className="space-y-3">
          {newBooks.map(b => (
            <BookCard key={b.id} book={b} compact open={openBook===b.id} onToggle={() => setOpenBook(openBook===b.id?null:b.id)} />
          ))}
          <button onClick={() => onNav("manuscripts")}
            className="w-full py-3 rounded-xl font-body text-sm herb-border transition-all"
            style={{ color:"var(--olive)", background:"transparent" }}>
            Смотреть все манускрипты →
          </button>
        </div>
      </section>

      {/* Новые авторы */}
      <section className="mb-12">
        <SectionHead icon="✨" title="Новые авторы" sub="Присоединились на этой неделе" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MOCK_NEWCOMERS.map(a => (
            <div key={a.id} className="card-herb p-4 flex items-center gap-3 cursor-pointer">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="font-body text-sm" style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>
                  {a.name.slice(0,2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="font-display text-sm font-semibold truncate" style={{ color:"var(--ink)" }}>{a.name}</div>
                <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{a.nick}</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <span className="genre-badge text-xs">{a.genre}</span>
                  <span className="genre-badge text-xs">{a.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function BookCard({ book: b, compact=false, open, onToggle }: {
  book: typeof MOCK_BOOKS[0]; compact?: boolean; open: boolean; onToggle: () => void;
}) {
  return (
    <div className="card-herb p-4 cursor-pointer" onClick={onToggle}>
      <div className="flex gap-3">
        <div className="text-4xl flex-shrink-0 mt-0.5">{b.cover}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display text-lg font-semibold leading-tight" style={{ color:"var(--ink)" }}>{b.title}</h4>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {b.isNew && <span className="text-xs font-body px-2 py-0.5 rounded-full" style={{ background:"var(--leaf)", color:"var(--cream)" }}>Новинка</span>}
              {b.isHot && <span className="text-xs font-body px-2 py-0.5 rounded-full" style={{ background:"#c05a20", color:"var(--cream)" }}>🔥</span>}
            </div>
          </div>
          <div className="font-body text-sm mt-0.5" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="genre-badge">{b.genre}</span>
            {b.sub && <span className="genre-badge">{b.sub}</span>}
            <ContentTags tags={b.tags} />
          </div>
          {!compact && (
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs font-body" style={{ color:"var(--ink-muted)" }}>
                <Icon name="BookOpen" size={11} /> {b.chapters>0?`${b.chapters} гл.`:"сборник"}
              </span>
              <span className="flex items-center gap-1 text-xs font-body" style={{ color:"var(--ink-muted)" }}>
                <Icon name="Eye" size={11} /> {b.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs font-body" style={{ color:"var(--ink-muted)" }}>
                <Icon name="Users" size={11} /> {b.readers.toLocaleString()}
              </span>
              <ScrollLike count={b.likes} />
            </div>
          )}
          {compact && (
            <div className="flex gap-3 mt-1">
              <span className="text-xs font-body" style={{ color:"var(--ink-muted)" }}>
                <Icon name="Eye" size={10} className="inline mr-0.5" />{b.views.toLocaleString()}
              </span>
              <ScrollLike count={b.likes} />
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="mt-4 pt-4 border-t anim-in" style={{ borderColor:"var(--moss)" }}>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { l:"Читателей", v:b.readers.toLocaleString(), i:"Users" as const },
              { l:"В библ.", v:b.saves.toLocaleString(), i:"BookMarked" as const },
              { l:"Просмотров", v:b.views>=1000?`${(b.views/1000).toFixed(1)}K`:String(b.views), i:"Eye" as const },
            ].map(s => (
              <div key={s.l} className="text-center p-2 rounded-lg" style={{ background:"var(--sage)" }}>
                <Icon name={s.i} size={13} className="mx-auto mb-1" style={{ color:"var(--leaf)" }} />
                <div className="font-display text-base font-semibold" style={{ color:"var(--leaf)" }}>{s.v}</div>
                <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="olive-btn flex-1 py-2 rounded-lg text-sm">Читать</button>
            <button className="flex-1 py-2 rounded-lg text-sm font-body herb-border"
              style={{ color:"var(--ink-soft)", background:"transparent" }}>В библиотеку</button>
          </div>
        </div>
      )}
    </div>
  );
}
