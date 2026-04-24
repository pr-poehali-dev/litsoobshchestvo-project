import { useState } from "react";
import SectionHead from "@/components/shared/SectionHead";
import ContentTags from "@/components/shared/ContentTags";
import ScrollLike from "@/components/shared/ScrollLike";
import Icon from "@/components/ui/icon";
import { GENRES_CATALOG } from "@/data/genres";
import { MOCK_BOOKS } from "@/data/mock";

type LibTab = "catalog" | "mylibrary";

export default function LibrarySection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [tab, setTab] = useState<LibTab>("catalog");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [myLibTab, setMyLibTab] = useState<"reading"|"later"|"done">("reading");

  const genreBooks = selectedGenre
    ? MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes(selectedGenre.toLowerCase()) || b.sub.toLowerCase().includes(selectedGenre.toLowerCase()))
    : [];

  return (
    <section className="mb-12">
      <SectionHead icon="📚" title="Библиотека" sub="Каталог жанров, поджанров и личная полка" />

      <div className="flex gap-2 mb-5">
        {[
          { id:"catalog" as LibTab, label:"Каталог жанров" },
          { id:"mylibrary" as LibTab, label:"Моя библиотека" },
        ].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedGenre(""); setSelectedSection(""); }}
            className="px-4 py-2 rounded-full font-body text-sm transition-all"
            style={tab===t.id
              ? { background:"var(--olive)", color:"var(--cream)" }
              : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Каталог */}
      {tab==="catalog" && (
        <>
          {!selectedSection && !selectedGenre && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(GENRES_CATALOG).map(sec => (
                <button key={sec} onClick={() => setSelectedSection(sec)}
                  className="card-herb p-4 text-left transition-all">
                  <div className="font-display text-base font-semibold mb-1" style={{ color:"var(--ink)" }}>{sec}</div>
                  <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                    {Object.keys(GENRES_CATALOG[sec]).length} жанров
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedSection && !selectedGenre && (
            <>
              <button onClick={() => setSelectedSection("")}
                className="flex items-center gap-1 font-body text-sm mb-4"
                style={{ color:"var(--olive)", background:"transparent" }}>
                <Icon name="ArrowLeft" size={14} /> {selectedSection}
              </button>
              <div className="space-y-3">
                {Object.entries(GENRES_CATALOG[selectedSection]).map(([genre, subs]) => (
                  <div key={genre} className="card-herb p-4">
                    <button onClick={() => setSelectedGenre(genre)}
                      className="font-display text-base font-semibold mb-2 hover:underline text-left w-full"
                      style={{ color:"var(--ink)", background:"transparent" }}>
                      {genre}
                    </button>
                    {subs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {subs.map(s => (
                          <button key={s} onClick={() => setSelectedGenre(s)}
                            className="genre-badge cursor-pointer hover:bg-olive hover:text-cream transition-all"
                            style={{ background:"transparent" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedGenre && (
            <>
              <button onClick={() => setSelectedGenre("")}
                className="flex items-center gap-1 font-body text-sm mb-4"
                style={{ color:"var(--olive)", background:"transparent" }}>
                <Icon name="ArrowLeft" size={14} /> {selectedGenre}
              </button>
              <div className="space-y-3">
                {genreBooks.length > 0 ? genreBooks.map(b => (
                  <div key={b.id} className="card-herb p-4 flex gap-3">
                    <div className="text-3xl flex-shrink-0">{b.cover}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{b.title}</div>
                      <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="genre-badge">{b.genre}</span>
                        <ContentTags tags={b.tags} />
                        <ScrollLike count={b.likes} />
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-3">📚</div>
                    <p className="font-display text-lg" style={{ color:"var(--ink-muted)" }}>
                      Книг в жанре «{selectedGenre}» пока нет
                    </p>
                    <p className="font-body text-sm mt-1" style={{ color:"var(--ink-muted)" }}>Будьте первым автором!</p>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Моя библиотека */}
      {tab==="mylibrary" && (
        <>
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📚</div>
              <p className="font-display text-xl mb-2" style={{ color:"var(--ink)" }}>Войдите, чтобы увидеть свою библиотеку</p>
              <p className="font-body text-sm" style={{ color:"var(--ink-muted)" }}>Сохраняйте книги в удобные папки</p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-5">
                {[
                  { id:"reading" as const, label:"📖 Читаю", count:2 },
                  { id:"later" as const, label:"🔖 На потом", count:5 },
                  { id:"done" as const, label:"✅ Прочитал", count:8 },
                ].map(t => (
                  <button key={t.id} onClick={() => setMyLibTab(t.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-sm transition-all"
                    style={myLibTab===t.id
                      ? { background:"var(--olive)", color:"var(--cream)" }
                      : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                    {t.label}
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background:myLibTab===t.id?"rgba(255,255,255,0.2)":"var(--sage-mid)" }}>
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>

              {myLibTab==="reading" && (
                <div className="space-y-3">
                  {MOCK_BOOKS.slice(0,2).map(b => (
                    <div key={b.id} className="card-herb p-4 flex gap-3 items-center">
                      <div className="text-3xl">{b.cover}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{b.title}</div>
                        <div className="font-body text-xs mb-1" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"var(--sage-mid)" }}>
                          <div className="h-full rounded-full" style={{ width:"42%", background:"var(--leaf)" }} />
                        </div>
                        <div className="font-body text-xs mt-0.5" style={{ color:"var(--ink-muted)" }}>Глава 7 из {b.chapters}</div>
                      </div>
                      <button className="olive-btn px-3 py-1.5 rounded-lg text-xs flex-shrink-0">Читать</button>
                    </div>
                  ))}
                </div>
              )}

              {myLibTab==="later" && (
                <div className="space-y-3">
                  {MOCK_BOOKS.slice(2,5).map(b => (
                    <div key={b.id} className="card-herb p-4 flex gap-3 items-center">
                      <div className="text-3xl">{b.cover}</div>
                      <div className="flex-1">
                        <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{b.title}</div>
                        <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
                        <span className="genre-badge mt-1">{b.genre}</span>
                      </div>
                      <button className="olive-btn px-3 py-1.5 rounded-lg text-xs flex-shrink-0">Начать</button>
                    </div>
                  ))}
                </div>
              )}

              {myLibTab==="done" && (
                <div className="space-y-3">
                  {MOCK_BOOKS.slice(0,3).map(b => (
                    <div key={b.id} className="card-herb p-4 flex gap-3 items-center">
                      <div className="text-3xl">{b.cover}</div>
                      <div className="flex-1">
                        <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{b.title}</div>
                        <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
                      </div>
                      <div className="text-lg">✅</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
