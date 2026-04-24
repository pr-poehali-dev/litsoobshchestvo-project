import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* ─── данные-заглушки ─────────────────────────────────── */
const BOOKS = [
  { id: 1, title: "Осколки зеркала", author: "Марина Вересова", genre: "Тёмное фэнтези", chapters: 14, readers: 1240, likes: 342, cover: "🌑", isNew: true },
  { id: 2, title: "Письма из тумана", author: "Артём Ланской", genre: "Мистика", chapters: 7, readers: 876, likes: 198, cover: "✉️", isNew: false },
  { id: 3, title: "Соль на ранах", author: "Елена Крот", genre: "Романтика", chapters: 22, readers: 3100, likes: 890, cover: "🌹", isNew: false },
  { id: 4, title: "Голос из пепла", author: "Дмитрий Нечаев", genre: "Хоррор", chapters: 5, readers: 440, likes: 105, cover: "🔥", isNew: true },
];

const DUELS = [
  { id: 1, title: "«Последний рассвет»", author1: "Л. Вершинина", author2: "П. Орлов", votes1: 234, votes2: 198, timeLeft: "06:42:17", active: true },
  { id: 2, title: "«Холодное сердце»", author1: "М. Светлая", author2: "А. Тёмный", votes1: 511, votes2: 487, timeLeft: "завершена", active: false },
];

const REVIEWS = [
  { id: 1, book: "Осколки зеркала", author: "Читатель_22", rating: 5, text: "Невероятная атмосфера! Автор держит читателя в напряжении с первой страницы до последней.", spoiler: "В финале выясняется, что зеркало — это душа главного героя, разбитая на семь частей." },
  { id: 2, book: "Соль на ранах", author: "Bookworm_Nastya", rating: 4, text: "Трогательная история любви, немного предсказуемо, но написано с душой.", spoiler: "Герои воссоединяются только спустя 10 лет в другом городе." },
];

const TOP_AUTHORS = [
  { rank: 1, name: "Елена Крот", books: 8, readers: 24000 },
  { rank: 2, name: "Марина Вересова", books: 5, readers: 18700 },
  { rank: 3, name: "Артём Ланской", books: 12, readers: 14200 },
  { rank: 4, name: "Дмитрий Нечаев", books: 3, readers: 9800 },
  { rank: 5, name: "Ольга Звезда", books: 7, readers: 7400 },
];

const EVENTS = [
  { id: 1, title: "Зимний марафон", tag: "Конкурс", date: "1–28 мая 2026", desc: "Напишите рассказ до 10 000 знаков на тему «Таяние». Призовой фонд — 3 000 ₽.", icon: "⛄" },
  { id: 2, title: "Флэшмоб «Первая строка»", tag: "Флэшмоб", date: "30 апреля 2026", desc: "Одно предложение — начало шедевра. Лучший дебют войдёт в антологию.", icon: "✍️" },
  { id: 3, title: "Дуэль отчаяния", tag: "Дуэли", date: "Ежедневно", desc: "Ежедневные баттлы рассказов. Победитель получает значок «Дуэлянт».", icon: "⚔️" },
];

const CHAT_MESSAGES = [
  { id: 1, user: "Марина В.", avatar: "МВ", text: "Всем доброе утро! Кто ещё сидит и пишет при свечах? 🕯️", likes: 7, time: "09:14" },
  { id: 2, user: "Артём Л.", avatar: "АЛ", text: "Закончил восьмую главу. Герой наконец решился на признание!", likes: 12, time: "09:31" },
  { id: 3, user: "Читатель_22", avatar: "Ч2", text: "Жду продолжения «Осколков»! Уже вся в предвкушении 😭", likes: 5, time: "10:02" },
  { id: 4, user: "Елена К.", avatar: "ЕК", text: "Новая глава «Соль на ранах» уже загружена, заходите ❤️", likes: 23, time: "10:18" },
];

const NOTIFICATIONS_AUTHOR = [
  { icon: "Heart" as const, text: "Ольга Звезда добавила «Осколки» в библиотеку", time: "2 мин назад", unread: true },
  { icon: "MessageCircle" as const, text: "Новый комментарий на главу 14: «Великолепно!»", time: "15 мин назад", unread: true },
  { icon: "BookMarked" as const, text: "Ваша заявка на коммерческий статус рассматривается", time: "1 час назад", unread: false },
  { icon: "Star" as const, text: "Рецензия на «Осколки зеркала» получила 18 лайков", time: "3 часа назад", unread: false },
];

const GENRES = [
  { name: "Фэнтези", sub: ["Тёмное", "Эпическое", "Городское", "ЛитРПГ"], count: 1240 },
  { name: "Романтика", sub: ["Современная", "Историческая", "Паранормальная"], count: 2100 },
  { name: "Хоррор", sub: ["Психологический", "Мистика", "Сверхъестественное"], count: 430 },
  { name: "Детектив", sub: ["Классический", "Нуар", "Триллер"], count: 680 },
  { name: "Поэзия", sub: ["Верлибр", "Классика", "Хайку"], count: 320 },
];

const MESSAGES_LIST = [
  { id: 1, user: "Артём Ланской", avatar: "АЛ", last: "Спасибо за рецензию! Очень ценно.", time: "10:21", unread: 2 },
  { id: 2, user: "Марина Вересова", avatar: "МВ", last: "Давай напишем дуэль вместе?", time: "вчера", unread: 0 },
  { id: 3, user: "Ред. Каминной", avatar: "РК", last: "Ваша публикация одобрена!", time: "вчера", unread: 0 },
];

/* ─── вспомогательные компоненты ─────────────────────── */
function ScrollLike({ count, active = false }: { count: number; active?: boolean }) {
  const [liked, setLiked] = useState(active);
  const [n, setN] = useState(count);
  return (
    <button
      className={`scroll-like ${liked ? "active" : ""}`}
      onClick={(e) => { e.stopPropagation(); setLiked(!liked); setN(liked ? n - 1 : n + 1); }}
    >
      <span>📜</span>
      <span>{n}</span>
    </button>
  );
}

function SectionTitle({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-serif text-3xl font-semibold" style={{ color: "var(--ink)" }}>{title}</h2>
      </div>
      {sub && <p className="mt-1 text-sm font-body" style={{ color: "var(--ink-muted)" }}>{sub}</p>}
      <div className="section-divider mt-3">
        <span className="font-serif text-xs italic" style={{ color: "var(--sepia)" }}>✦</span>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: 13, color: i <= rating ? "var(--gold)" : "var(--ink-muted)" }}>★</span>
      ))}
    </div>
  );
}

/* ─── разделы ─────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 px-6 mb-10 rounded-xl ink-border" style={{ background: "linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%)" }}>
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none select-none" style={{ fontSize: 220, lineHeight: 1 }}>📖</div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 pointer-events-none select-none" style={{ fontSize: 160, lineHeight: 1 }}>🖋</div>
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="chapter-badge">Добро пожаловать</span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-tight mb-4 animate-fade-up stagger-1" style={{ color: "var(--ink)" }}>
          Литерариум
        </h1>
        <p className="font-body text-lg mb-2 animate-fade-up stagger-2" style={{ color: "var(--ink-soft)" }}>
          Место, где рождаются истории. Публикуйте, читайте, соревнуйтесь.
        </p>
        <p className="font-serif italic text-base mb-8 animate-fade-up stagger-3" style={{ color: "var(--ink-muted)" }}>
          «Всякая книга — это путешествие. Добро пожаловать на борт.»
        </p>
        <div className="flex flex-wrap gap-3 animate-fade-up stagger-4">
          <button className="terra-btn px-6 py-2.5 rounded-md text-sm">Начать писать</button>
          <button className="font-body text-sm px-6 py-2.5 rounded-md ink-border" style={{ color: "var(--ink-soft)", background: "transparent" }}>
            Перейти в библиотеку
          </button>
        </div>
        <div className="mt-8 flex gap-6 animate-fade-up stagger-5">
          {[["12 400", "читателей"], ["3 200", "авторов"], ["48 000", "глав"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-2xl font-semibold" style={{ color: "var(--terra)" }}>{n}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewcomersBlock() {
  return (
    <section className="mb-10 p-5 rounded-xl ink-border" style={{ background: "linear-gradient(to right, #fdf5ea, #f4ede0)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🌱</span>
        <h3 className="font-serif text-xl font-semibold" style={{ color: "var(--terra)" }}>Приветствуем новичков!</h3>
        <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: "var(--terra)", color: "var(--paper)" }}>Читайте их работы</span>
      </div>
      <p className="font-body text-sm mb-4" style={{ color: "var(--ink-soft)" }}>
        Они сделали первый шаг. Поддержите начинающих авторов — каждый свиток на счету!
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {[
          { name: "Светлана Ручей", title: "«Тихий берег»", genre: "Романтика", icon: "🌊" },
          { name: "Иван Первый", title: "«Железный лист»", genre: "Фантастика", icon: "🚀" },
          { name: "Алиса Нова", title: "«Зеркальный лес»", genre: "Фэнтези", icon: "🌲" },
          { name: "Павел Туман", title: "«Без имени»", genre: "Мистика", icon: "🌫️" },
        ].map((a) => (
          <div key={a.name} className="card-paper flex-shrink-0 w-40 p-3 cursor-pointer">
            <div className="text-2xl mb-2">{a.icon}</div>
            <div className="font-serif text-sm font-semibold leading-tight" style={{ color: "var(--ink)" }}>{a.title}</div>
            <div className="font-body text-xs mt-1" style={{ color: "var(--ink-muted)" }}>{a.name}</div>
            <div className="chapter-badge mt-2 inline-block">{a.genre}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ManuscriptsSection() {
  const [activeBook, setActiveBook] = useState<number | null>(null);
  return (
    <section className="mb-12">
      <SectionTitle icon="📜" title="Манускрипты" sub="Книги по главам — следите за историей в реальном времени" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BOOKS.map((b) => (
          <div key={b.id} className="card-paper p-4 cursor-pointer" onClick={() => setActiveBook(activeBook === b.id ? null : b.id)}>
            <div className="flex gap-3">
              <div className="text-4xl flex-shrink-0">{b.cover}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif text-lg font-semibold leading-tight" style={{ color: "var(--ink)" }}>{b.title}</h4>
                  {b.isNew && <span className="flex-shrink-0 text-xs font-body px-2 py-0.5 rounded" style={{ background: "var(--terra)", color: "var(--paper)" }}>Новинка</span>}
                </div>
                <div className="font-body text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>{b.author}</div>
                <div className="chapter-badge mt-1">{b.genre}</div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs font-body" style={{ color: "var(--ink-muted)" }}>
                    <Icon name="BookOpen" size={12} /> {b.chapters} глав
                  </span>
                  <span className="flex items-center gap-1 text-xs font-body" style={{ color: "var(--ink-muted)" }}>
                    <Icon name="Users" size={12} /> {b.readers.toLocaleString()}
                  </span>
                  <ScrollLike count={b.likes} />
                </div>
              </div>
            </div>
            {activeBook === b.id && (
              <div className="mt-4 pt-4 border-t animate-fade-in" style={{ borderColor: "var(--sepia)" }}>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { label: "Читателей", value: b.readers.toLocaleString(), ic: "Users" as const },
                    { label: "В библ.", value: Math.floor(b.readers * 0.4).toLocaleString(), ic: "BookMarked" as const },
                    { label: "Глав", value: String(b.chapters), ic: "BookOpen" as const },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded" style={{ background: "var(--paper)" }}>
                      <Icon name={stat.ic} size={14} className="mx-auto mb-1" style={{ color: "var(--terra)" }} />
                      <div className="font-serif text-lg font-semibold" style={{ color: "var(--terra)" }}>{stat.value}</div>
                      <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="terra-btn flex-1 py-2 rounded text-sm">Читать</button>
                  <button className="flex-1 py-2 rounded text-sm ink-border font-body" style={{ color: "var(--ink-soft)", background: "transparent" }}>В библиотеку</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ReaderSection() {
  const b = BOOKS[0];
  const [playing, setPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  return (
    <section className="mb-12">
      <SectionTitle icon="📖" title="Читалка" sub={`${b.title} — Глава 1`} />
      <div className="rounded-xl overflow-hidden ink-border" style={{ background: "var(--paper-dark)" }}>
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--sepia)", background: "var(--paper)" }}>
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-sm" style={{ color: "var(--ink-muted)" }}>{b.title}</span>
            <span className="chapter-badge">Глава 1</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setFontSize(s => Math.max(14, s - 1))} className="font-body text-xs px-2 py-1 rounded ink-border" style={{ color: "var(--ink-soft)", background: "transparent" }}>A−</button>
            <button onClick={() => setFontSize(s => Math.min(26, s + 1))} className="font-body text-sm px-2 py-1 rounded ink-border" style={{ color: "var(--ink-soft)", background: "transparent" }}>A+</button>
            <button
              onClick={() => setPlaying(!playing)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-body transition-all"
              style={playing ? { background: "var(--terra)", color: "var(--paper)" } : { color: "var(--ink-soft)", border: "1px solid var(--sepia)", background: "transparent" }}
            >
              <Icon name={playing ? "Pause" : "Play"} size={13} />
              {playing ? "Стоп" : "Озвучить ИИ"}
            </button>
          </div>
        </div>
        <div className="p-8 max-w-2xl mx-auto" style={{ fontSize }}>
          {playing && (
            <div className="mb-4 px-4 py-2 rounded animate-fade-in flex items-center gap-2" style={{ background: "rgba(158,74,46,0.1)", color: "var(--terra)" }}>
              <Icon name="Volume2" size={16} />
              <span className="font-body text-sm">ИИ-голос читает текст...</span>
              <div className="flex gap-1 ml-2">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-0.5 rounded-full" style={{ height: 16, background: "var(--terra)", animation: `pulse-dot 0.8s ease ${i * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <p className="font-serif leading-relaxed mb-4" style={{ color: "var(--ink)" }}>
            Ночь опустилась на город беззвучно, как страница, перевёрнутая нетерпеливой рукой. Анна стояла у окна и смотрела на улицу, где фонари отражались в лужах — крохотные солнца, брошенные в темноту.
          </p>
          <p className="font-serif leading-relaxed mb-4" style={{ color: "var(--ink)" }}>
            «Всё начинается с зеркала», — сказал ей когда-то дед. Тогда она не понимала. Теперь — боялась понять.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: "var(--ink)" }}>
            Она взяла осколок с подоконника. Стекло было холодным. Слишком холодным для августовской ночи. И в нём — она готова была поклясться — мигнул чужой взгляд.
          </p>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--sepia)", background: "var(--paper)" }}>
          <button className="flex items-center gap-1 font-body text-sm" style={{ color: "var(--ink-muted)", background: "transparent" }}>
            <Icon name="ChevronLeft" size={16} /> Пред. глава
          </button>
          <ScrollLike count={342} />
          <button className="terra-btn flex items-center gap-1 px-4 py-1.5 rounded text-sm">
            След. глава <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DuelsSection() {
  const [voted, setVoted] = useState<Record<number, 1 | 2>>({});
  return (
    <section className="mb-12">
      <SectionTitle icon="⚔️" title="Дуэли" sub="Баттлы рассказов за 24 часа — голосуй за лучшего!" />
      <div className="space-y-5">
        {DUELS.map((d) => {
          const total = d.votes1 + d.votes2;
          const pct1 = Math.round((d.votes1 / total) * 100);
          const pct2 = 100 - pct1;
          const myVote = voted[d.id];
          return (
            <div key={d.id} className="card-paper p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-xl font-semibold" style={{ color: "var(--ink)" }}>{d.title}</h4>
                {d.active ? (
                  <div className="flex items-center gap-2">
                    <div className="notification-dot" />
                    <span className="duel-timer">{d.timeLeft}</span>
                  </div>
                ) : (
                  <span className="font-body text-xs px-2 py-1 rounded" style={{ background: "var(--sepia)", color: "var(--paper)" }}>завершена</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: d.author1, votes: d.votes1, pct: pct1, side: 1 as const },
                  { name: d.author2, votes: d.votes2, pct: pct2, side: 2 as const },
                ].map((s) => (
                  <div key={s.side} className="p-4 rounded-lg border transition-all"
                    style={{
                      borderColor: myVote === s.side ? "var(--terra)" : "var(--sepia)",
                      background: myVote === s.side ? "rgba(158,74,46,0.07)" : "var(--paper)"
                    }}>
                    <div className="font-serif text-base font-semibold mb-1" style={{ color: "var(--ink)" }}>{s.name}</div>
                    <div className="h-2 rounded-full mb-2 overflow-hidden" style={{ background: "var(--paper-dark)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.pct}%`, background: myVote === s.side ? "var(--terra)" : "var(--sepia)" }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-semibold" style={{ color: "var(--terra)" }}>{s.pct}%</span>
                      <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{s.votes} голосов</span>
                    </div>
                    {d.active && !myVote && (
                      <button onClick={() => setVoted({ ...voted, [d.id]: s.side })}
                        className="mt-3 w-full terra-btn py-1.5 rounded text-sm">
                        Голосовать
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="card-paper p-5 text-center cursor-pointer" style={{ border: "1px dashed var(--sepia)" }}>
          <Icon name="Plus" size={24} className="mx-auto mb-2" style={{ color: "var(--terra)" }} />
          <p className="font-serif text-lg" style={{ color: "var(--ink-soft)" }}>Бросить вызов автору</p>
          <p className="font-body text-sm mt-1" style={{ color: "var(--ink-muted)" }}>24 часа, один рассказ, одна победа</p>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [spoilerRevealed, setSpoilerRevealed] = useState<Record<number, boolean>>({});
  return (
    <section className="mb-12">
      <SectionTitle icon="🖋" title="Рецензии" sub="Честные отзывы без спойлеров — если не раскроете" />
      <div className="space-y-4">
        {REVIEWS.map((r) => (
          <div key={r.id} className="card-paper p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>{r.book}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={r.rating} />
                  <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>— {r.author}</span>
                </div>
              </div>
              <ScrollLike count={8} />
            </div>
            <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--ink-soft)" }}>{r.text}</p>
            <div className="p-3 rounded" style={{ background: "var(--paper)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="EyeOff" size={13} style={{ color: "var(--terra)" }} />
                <span className="font-body text-xs font-medium" style={{ color: "var(--terra)" }}>Спойлер</span>
                <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>(нажмите, чтобы раскрыть)</span>
              </div>
              <p
                className={`font-body text-sm leading-relaxed cursor-pointer select-none transition-all duration-300 ${spoilerRevealed[r.id] ? "spoiler-revealed" : "spoiler-hidden"}`}
                onClick={() => setSpoilerRevealed(s => ({ ...s, [r.id]: !s[r.id] }))}
              >
                {r.spoiler}
              </p>
            </div>
          </div>
        ))}
        <button className="w-full py-3 rounded-lg ink-border font-body text-sm transition-all" style={{ color: "var(--terra)", background: "transparent" }}>
          + Написать рецензию
        </button>
      </div>
    </section>
  );
}

function LibrarySection() {
  const [activeGenre, setActiveGenre] = useState(0);
  return (
    <section className="mb-12">
      <SectionTitle icon="📚" title="Библиотека" sub="Каталог с жанрами, поджанрами и авторскими подборками" />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {GENRES.map((g, i) => (
          <button key={g.name} onClick={() => setActiveGenre(i)}
            className="flex-shrink-0 px-4 py-2 rounded-full font-body text-sm transition-all"
            style={activeGenre === i
              ? { background: "var(--terra)", color: "var(--paper)" }
              : { color: "var(--ink-soft)", border: "1px solid var(--sepia)", background: "transparent" }}>
            {g.name} <span className="ml-1 opacity-60 text-xs">{g.count}</span>
          </button>
        ))}
      </div>
      <div className="p-4 rounded-xl ink-border mb-4" style={{ background: "var(--paper)" }}>
        <h4 className="font-serif text-base font-semibold mb-3" style={{ color: "var(--ink)" }}>Поджанры: {GENRES[activeGenre].name}</h4>
        <div className="flex flex-wrap gap-2">
          {GENRES[activeGenre].sub.map(s => (
            <span key={s} className="px-3 py-1 rounded-full font-body text-sm cursor-pointer ink-border transition-all" style={{ color: "var(--ink-soft)" }}>{s}</span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-serif text-base font-semibold mb-3" style={{ color: "var(--ink)" }}>Авторские подборки</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "«Читать в дождь»", desc: "Уютные истории для серых дней", icon: "🌧️", count: 12 },
            { title: "«Не спать до утра»", desc: "Хорроры и триллеры", icon: "🌙", count: 8 },
            { title: "«Для слёз»", desc: "Трогательная проза", icon: "🌿", count: 15 },
          ].map(p => (
            <div key={p.title} className="card-paper p-4 cursor-pointer">
              <div className="text-3xl mb-2">{p.icon}</div>
              <div className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>{p.title}</div>
              <div className="font-body text-xs mt-0.5 mb-2" style={{ color: "var(--ink-muted)" }}>{p.desc}</div>
              <div className="font-body text-xs" style={{ color: "var(--terra)" }}>{p.count} книг</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FireplaceSection() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState(CHAT_MESSAGES);
  const send = () => {
    if (!msg.trim()) return;
    setMsgs([...msgs, { id: Date.now(), user: "Вы", avatar: "ВЫ", text: msg, likes: 0, time: "сейчас" }]);
    setMsg("");
  };
  return (
    <section className="mb-12">
      <SectionTitle icon="🔥" title="Каминная" sub="Общий чат авторов и читателей" />
      <div className="rounded-xl ink-border overflow-hidden" style={{ background: "var(--paper-dark)" }}>
        <div className="flex flex-col gap-3 p-4 h-80 overflow-y-auto">
          {msgs.map((m) => (
            <div key={m.id} className="flex gap-3 items-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="font-body text-xs" style={{ background: "var(--sepia)", color: "var(--paper)" }}>{m.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-sm font-medium" style={{ color: "var(--terra)" }}>{m.user}</span>
                  <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{m.time}</span>
                </div>
                <p className="font-body text-sm mt-0.5" style={{ color: "var(--ink-soft)" }}>{m.text}</p>
                <div className="mt-1"><ScrollLike count={m.likes} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3 border-t" style={{ borderColor: "var(--sepia)", background: "var(--paper)" }}>
          <input
            value={msg} onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Написать в каминной..."
            className="flex-1 px-3 py-2 rounded-md font-body text-sm outline-none ink-border"
            style={{ background: "var(--paper-dark)", color: "var(--ink)" }}
          />
          <button onClick={send} className="terra-btn px-4 py-2 rounded-md text-sm">
            <Icon name="Send" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="mb-12">
      <SectionTitle icon="🎉" title="Праздники и конкурсы" sub="Ивенты, флэшмобы и марафоны" />
      <div className="space-y-4">
        {EVENTS.map(e => (
          <div key={e.id} className="card-paper p-5 flex gap-4">
            <div className="text-4xl flex-shrink-0">{e.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-serif text-xl font-semibold" style={{ color: "var(--ink)" }}>{e.title}</h4>
                <span className="chapter-badge flex-shrink-0">{e.tag}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 mb-2">
                <Icon name="Calendar" size={12} style={{ color: "var(--ink-muted)" }} />
                <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{e.date}</span>
              </div>
              <p className="font-body text-sm" style={{ color: "var(--ink-soft)" }}>{e.desc}</p>
              <button className="mt-3 terra-btn px-4 py-1.5 rounded text-sm">Участвовать</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopAuthorsSection() {
  return (
    <section className="mb-12">
      <SectionTitle icon="🏆" title="Топ авторов" sub="Рейтинг по читателям и активности" />
      <div className="space-y-2">
        {TOP_AUTHORS.map((a) => (
          <div key={a.rank} className="card-paper flex items-center gap-4 px-5 py-3">
            <div className="font-serif text-2xl font-bold w-8 text-center">
              {a.rank <= 3 ? ["🥇", "🥈", "🥉"][a.rank - 1] : <span style={{ color: "var(--ink-muted)" }}>{a.rank}</span>}
            </div>
            <Avatar className="w-9 h-9">
              <AvatarFallback className="font-body text-sm" style={{ background: "var(--sepia)", color: "var(--paper)" }}>
                {a.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>{a.name}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{a.books} книг</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-lg font-semibold" style={{ color: "var(--terra)" }}>{a.readers.toLocaleString()}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>читателей</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-80 rounded-xl shadow-2xl ink-border animate-fade-up" style={{ background: "var(--paper)" }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--sepia)" }}>
          <h3 className="font-serif text-lg font-semibold" style={{ color: "var(--ink)" }}>Оповещения</h3>
          <button onClick={onClose}><Icon name="X" size={18} style={{ color: "var(--ink-muted)" }} /></button>
        </div>
        <div>
          {NOTIFICATIONS_AUTHOR.map((n, i) => (
            <div key={i} className="flex gap-3 p-4 border-b last:border-b-0 cursor-pointer transition-colors"
              style={{ borderColor: "var(--sepia)", background: n.unread ? "rgba(158,74,46,0.05)" : "transparent" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--paper-dark)" }}>
                <Icon name={n.icon} size={14} style={{ color: "var(--terra)" }} />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm" style={{ color: "var(--ink-soft)" }}>{n.text}</p>
                <p className="font-body text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{n.time}</p>
              </div>
              {n.unread && <div className="notification-dot mt-1.5 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessengerPanel({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(MESSAGES_LIST[0]);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { me: false, text: "Спасибо за рецензию! Очень ценно." },
    { me: true, text: "Пожалуйста! Ваша работа заслуживает большего внимания." },
  ]);

  const send = () => {
    if (!chatMsg.trim()) return;
    setChatHistory([...chatHistory, { me: true, text: chatMsg }]);
    setChatMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div className="w-full max-w-2xl h-[520px] rounded-xl shadow-2xl ink-border flex overflow-hidden animate-fade-up"
        style={{ background: "var(--paper)" }} onClick={e => e.stopPropagation()}>
        <div className="w-56 border-r flex flex-col" style={{ borderColor: "var(--sepia)", background: "var(--paper-dark)" }}>
          <div className="p-3 border-b" style={{ borderColor: "var(--sepia)" }}>
            <span className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>Сообщения</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MESSAGES_LIST.map(m => (
              <div key={m.id} onClick={() => setActive(m)}
                className="flex gap-2 p-3 cursor-pointer transition-colors"
                style={{
                  background: active.id === m.id ? "rgba(158,74,46,0.08)" : "transparent",
                  borderLeft: active.id === m.id ? "3px solid var(--terra)" : "3px solid transparent"
                }}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="font-body text-xs" style={{ background: "var(--sepia)", color: "var(--paper)" }}>{m.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-body text-xs font-medium truncate" style={{ color: "var(--ink)" }}>{m.user}</span>
                    <span className="font-body text-xs flex-shrink-0" style={{ color: "var(--ink-muted)" }}>{m.time}</span>
                  </div>
                  <p className="font-body text-xs truncate" style={{ color: "var(--ink-muted)" }}>{m.last}</p>
                </div>
                {m.unread > 0 && (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-body flex-shrink-0" style={{ background: "var(--terra)", color: "var(--paper)" }}>{m.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--sepia)" }}>
            <span className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>{active.user}</span>
            <button onClick={onClose}><Icon name="X" size={18} style={{ color: "var(--ink-muted)" }} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {chatHistory.map((c, i) => (
              <div key={i} className={`flex ${c.me ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs px-3 py-2 font-body text-sm"
                  style={{
                    background: c.me ? "var(--terra)" : "var(--paper-dark)",
                    color: c.me ? "var(--paper)" : "var(--ink-soft)",
                    borderRadius: c.me ? "12px 12px 2px 12px" : "12px 12px 12px 2px"
                  }}>
                  {c.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t" style={{ borderColor: "var(--sepia)" }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Написать..." className="flex-1 px-3 py-2 rounded-md text-sm font-body outline-none ink-border"
              style={{ background: "var(--paper-dark)", color: "var(--ink)" }} />
            <button onClick={send} className="terra-btn px-3 py-2 rounded-md"><Icon name="Send" size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-72 rounded-xl shadow-2xl ink-border animate-fade-up overflow-hidden" style={{ background: "var(--paper)" }} onClick={e => e.stopPropagation()}>
        <div className="p-5" style={{ background: "linear-gradient(135deg, var(--paper-dark), var(--paper))" }}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="font-serif text-lg" style={{ background: "var(--terra)", color: "var(--paper)" }}>МВ</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-serif text-base font-semibold" style={{ color: "var(--ink)" }}>Марина Вересова</div>
              <span className="chapter-badge">Автор</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["5", "книг"], ["1.2К", "читателей"], ["48", "подписчиков"]].map(([v, l]) => (
              <div key={l} className="p-2 rounded" style={{ background: "var(--paper)" }}>
                <div className="font-serif text-lg font-semibold" style={{ color: "var(--terra)" }}>{v}</div>
                <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3 p-3 rounded-lg" style={{ background: "rgba(158,74,46,0.08)", border: "1px dashed var(--terra)" }}>
            <div className="font-body text-xs font-medium mb-1" style={{ color: "var(--terra)" }}>Коммерческий статус — в разработке</div>
            <div className="font-body text-xs mb-2" style={{ color: "var(--ink-soft)" }}>200 000 знаков · 150 читателей · 50 подписчиков</div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--paper-dark)" }}>
              <div className="h-full rounded-full" style={{ width: "40%", background: "var(--terra)" }} />
            </div>
            <div className="font-body text-xs mt-1" style={{ color: "var(--ink-muted)" }}>40% — продолжайте писать!</div>
          </div>
          {(["Мои рукописи", "BookOpen"] as [string, string][]).concat(
            [["Моя библиотека", "Library"], ["Настройки", "Settings"], ["Выйти", "LogOut"]]
          ).map(([l, ic]) => (
            <button key={l} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
              style={{ color: "var(--ink-soft)", background: "transparent" }}>
              <Icon name={ic as "BookOpen"} size={16} style={{ color: "var(--terra)" }} />
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── навигация ───────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" as const },
  { id: "manuscripts", label: "Манускрипты", icon: "ScrollText" as const },
  { id: "library", label: "Библиотека", icon: "Library" as const },
  { id: "reader", label: "Читалка", icon: "BookOpen" as const },
  { id: "duels", label: "Дуэли", icon: "Sword" as const },
  { id: "reviews", label: "Рецензии", icon: "Star" as const },
  { id: "events", label: "Праздники", icon: "Trophy" as const },
  { id: "top", label: "Топ авторов", icon: "Award" as const },
  { id: "fireplace", label: "Каминная", icon: "Flame" as const },
];

/* ─── главный компонент ───────────────────────────────── */
export default function Index() {
  const [section, setSection] = useState("home");
  const [showNotif, setShowNotif] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const goTo = (id: string) => { setSection(id); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderSection = () => {
    switch (section) {
      case "manuscripts": return <ManuscriptsSection />;
      case "library": return <LibrarySection />;
      case "duels": return <DuelsSection />;
      case "reviews": return <ReviewsSection />;
      case "events": return <EventsSection />;
      case "top": return <TopAuthorsSection />;
      case "fireplace": return <FireplaceSection />;
      case "reader": return <ReaderSection />;
      default: return (
        <>
          <HeroSection />
          <NewcomersBlock />
          <ManuscriptsSection />
          <DuelsSection />
          <EventsSection />
          <TopAuthorsSection />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen paper-texture" style={{ color: "var(--ink)" }}>
      {/* шапка */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(244,237,224,0.93)", backdropFilter: "blur(12px)", borderColor: "var(--sepia)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <button onClick={() => goTo("home")} className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-serif text-xl font-semibold" style={{ color: "var(--ink)" }}>Литерариум</span>
          </button>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => goTo(n.id)}
                className={`nav-link flex items-center gap-1.5 ${section === n.id ? "active" : ""}`}>
                <Icon name={n.icon} size={13} />
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={() => { setShowMsg(true); setShowNotif(false); setShowProfile(false); }}
              className="relative p-2 rounded-lg" style={{ color: "var(--ink-soft)" }}>
              <Icon name="MessageCircle" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--terra)" }} />
            </button>
            <button onClick={() => { setShowNotif(!showNotif); setShowMsg(false); setShowProfile(false); }}
              className="relative p-2 rounded-lg" style={{ color: "var(--ink-soft)" }}>
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--terra)" }} />
            </button>
            <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); setShowMsg(false); }} className="ml-1">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="font-body text-xs" style={{ background: "var(--terra)", color: "var(--paper)" }}>МВ</AvatarFallback>
              </Avatar>
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden p-2 ml-1" style={{ color: "var(--ink-soft)" }}>
              <Icon name={mobileNav ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="lg:hidden border-t px-4 py-3 flex flex-wrap gap-2" style={{ borderColor: "var(--sepia)", background: "var(--paper-dark)" }}>
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => goTo(n.id)}
                className={`nav-link text-xs flex items-center gap-1 ${section === n.id ? "active" : ""}`}>
                <Icon name={n.icon} size={12} />
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* контент */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div key={section} className="animate-fade-up">
          {renderSection()}
        </div>
      </main>

      {/* кнопка публикации */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="terra-btn flex items-center gap-2 px-5 py-3 rounded-full shadow-lg">
          <Icon name="PenLine" size={16} />
          <span className="font-body text-sm">Публикация</span>
        </button>
      </div>

      {showNotif && <NotificationsPanel onClose={() => setShowNotif(false)} />}
      {showMsg && <MessengerPanel onClose={() => setShowMsg(false)} />}
      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
    </div>
  );
}
