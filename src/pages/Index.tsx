import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/* ════════════════════════════════════════
   ДАННЫЕ-ЗАГЛУШКИ
════════════════════════════════════════ */

const BOOKS = [
  { id: 1, title: "Сердце вереска", author: "Ольга Светлова", genre: "Романтика", sub: "Исторический", chapters: 18, readers: 2340, saves: 870, views: 14200, likes: 512, cover: "🌿", tags: ["18+"], isNew: true },
  { id: 2, title: "Последний архивист", author: "Виктор Грин", genre: "Фантастика", sub: "Киберпанк", chapters: 9, readers: 980, saves: 320, views: 6800, likes: 210, cover: "📡", tags: [], isNew: false },
  { id: 3, title: "Туман над Ладогой", author: "Алина Корень", genre: "Историческая проза", sub: "Роман", chapters: 31, readers: 4100, saves: 1640, views: 28000, likes: 1020, cover: "🌊", tags: [], isNew: false },
  { id: 4, title: "Тени под ивой", author: "Марк Лесной", genre: "Мистика", sub: "Психологическая", chapters: 6, readers: 560, saves: 190, views: 3200, likes: 98, cover: "🍃", tags: ["насилие"], isNew: true },
  { id: 5, title: "Алхимик трав", author: "Соня Вешняя", genre: "Фэнтези", sub: "Славянское", chapters: 24, readers: 3200, saves: 1100, views: 19000, likes: 780, cover: "🌱", tags: [], isNew: false },
  { id: 6, title: "Ночной сонет", author: "Дарья Ручей", genre: "Поэзия", sub: "Сонет", chapters: 0, readers: 740, saves: 280, views: 4400, likes: 330, cover: "🌙", tags: [], isNew: true },
];

const NEWCOMERS = [
  { name: "Анна Первая", title: "«Запах сосны»", genre: "Проза", icon: "🌲" },
  { name: "Иван Росток", title: "«Пятна солнца»", genre: "Поэзия", icon: "☀️" },
  { name: "Катя Туман", title: "«Зеркало леса»", genre: "Мистика", icon: "🌫️" },
  { name: "Лёша Нива", title: "«Степной ветер»", genre: "Фэнтези", icon: "🌾" },
  { name: "Рита Сад", title: "«Цветок в снегу»", genre: "Романтика", icon: "❄️" },
];

const DUELS = [
  { id: 1, title: "«Дорога домой»", a1: { name: "Алина Корень", votes: 312 }, a2: { name: "Виктор Грин", votes: 278 }, timeLeft: "08:14:22", active: true },
  { id: 2, title: "«Первый снег»", a1: { name: "Соня Вешняя", votes: 641 }, a2: { name: "Марк Лесной", votes: 589 }, timeLeft: "завершена", active: false },
];

const REVIEWS = [
  { id: 1, book: "Сердце вереска", author: "ЧитательNix", rating: 5, text: "Невероятно атмосферно! Каждая глава — как глоток свежего воздуха. Автор чувствует историческую эпоху.", spoiler: "В финале выясняется, что Анна — не служанка, а тайная наследница рода Светловых." },
  { id: 2, book: "Алхимик трав", author: "Книголюб_99", rating: 4, text: "Интересный мир, много деталей о травничестве. Немного затянутые описания, но герои живые.", spoiler: "Учитель алхимика оказывается антагонистом — он крадёт силу растений из чужих снов." },
  { id: 3, book: "Туман над Ладогой", author: "ИсторикМих", rating: 5, text: "Документальная точность в историческом романе — редкость. Рекомендую всем любителям русской прозы.", spoiler: "Главный герой выживает, но теряет память и начинает новую жизнь под чужим именем." },
];

const TOP_AUTHORS = [
  { rank: 1, name: "Алина Корень", books: 9, readers: 38000, badge: "🥇" },
  { rank: 2, name: "Ольга Светлова", books: 6, readers: 29500, badge: "🥈" },
  { rank: 3, name: "Соня Вешняя", books: 11, readers: 24000, badge: "🥉" },
  { rank: 4, name: "Виктор Грин", books: 4, readers: 16200, badge: "" },
  { rank: 5, name: "Марк Лесной", books: 7, readers: 12800, badge: "" },
  { rank: 6, name: "Дарья Ручей", books: 3, readers: 9400, badge: "" },
];

const EVENTS = [
  { id: 1, title: "Майский марафон", tag: "Марафон", date: "1–31 мая 2026", desc: "Напишите не менее 30 000 знаков за месяц. Все финишировавшие получат значок «Марафонец».", icon: "🌿" },
  { id: 2, title: "Флэшмоб «Зелёное слово»", tag: "Флэшмоб", date: "5 мая 2026", desc: "Напишите рассказ или стихотворение с ключевой фразой «зелёное слово». До 2 000 знаков.", icon: "✍️" },
  { id: 3, title: "Конкурс «Листопад»", tag: "Конкурс", date: "15–25 мая 2026", desc: "Лучший рассказ об осени. Приз: коммерческий статус на 3 месяца без ограничений.", icon: "🍂" },
  { id: 4, title: "Дуэль недели", tag: "Дуэли", date: "Каждый пн", desc: "Публичные баттлы рассказов от подписчиков. Голосуют все зарегистрированные читатели.", icon: "⚔️" },
];

const BLOG_TOPICS = ["Личное","Самопиар","Дуэли","Флэшмобы и праздники","Оффтопик","Заметки на полях","Отзывы и критика","Статьи","Конкурсы","Марафоны и игры","Промокоды и розыгрыши"];

const CHAT = [
  { id: 1, user: "Алина К.", av: "АК", text: "Доброе утро всем! Кто пишет сегодня? 🌿", likes: 6, time: "09:04" },
  { id: 2, user: "Виктор Г.", av: "ВГ", text: "Закончил 9-ю главу. Наконец-то поворот, которого все ждали!", likes: 14, time: "09:22" },
  { id: 3, user: "ЧитательNix", av: "ЧН", text: "Жду продолжения «Сердца вереска» с нетерпением 😭", likes: 8, time: "09:48" },
  { id: 4, user: "Соня В.", av: "СВ", text: "Новые главы «Алхимика трав» уже загружены, читайте! 🌱", likes: 21, time: "10:11" },
  { id: 5, user: "Дарья Р.", av: "ДР", text: "Объявлен конкурс стихов на тему природы. Зову всех поэтов!", likes: 9, time: "10:35" },
];

const NOTIFICATIONS_AUTHOR = [
  { icon: "MessageSquare" as const, text: "Книголюб_99 оставил рецензию на «Алхимика трав»", time: "3 мин назад", unread: true },
  { icon: "Heart" as const, text: "18 новых лайков на главу 24 «Алхимика трав»", time: "12 мин назад", unread: true },
  { icon: "BookMarked" as const, text: "Ваша книга добавлена в 12 библиотек за сегодня", time: "1 час назад", unread: false },
  { icon: "FileCheck" as const, text: "Заявка на коммерческий статус: рассматривается", time: "2 часа назад", unread: false },
  { icon: "Megaphone" as const, text: "Анонс: Майский марафон стартует 1 мая!", time: "3 часа назад", unread: false },
];

const MESSAGES_DATA = [
  { id: 1, user: "Ольга Светлова", av: "ОС", last: "Спасибо за рецензию, очень приятно!", time: "10:40", unread: 2 },
  { id: 2, user: "Виктор Грин", av: "ВГ", last: "Готов к дуэли в пятницу?", time: "вчера", unread: 0 },
  { id: 3, user: "Редакция", av: "РД", last: "Ваш материал одобрен для публикации.", time: "вчера", unread: 0 },
];

const COAUTHOR_PROJECTS = [
  { id: 1, title: "«Лесная академия»", authors: ["Соня В.", "Алина К."], genre: "Фэнтези", chapters: 8, status: "Активен", lastEdit: "сегодня" },
  { id: 2, title: "«Код молчания»", authors: ["Виктор Г.", "Марк Л."], genre: "Триллер", chapters: 3, status: "Активен", lastEdit: "вчера" },
];

const PROSE_GENRES: Record<string, string[]> = {
  "Роман": ["исторический","любовный","приключенческий","философский","психологический","антиутопия","эпистолярный","роман-эпопея"],
  "Повесть": [], "Рассказ": [], "Современная проза": [], "Русреал": [],
  "Историческая проза": [], "Исторические приключения": [], "Приключения": [],
  "Документальная проза": [], "Детская литература": [], "Подростковая проза": [],
  "Бизнес-литература": [], "Публицистика": [], "Разное": [],
};
const ALL_GENRES = ["Фантастика","Фэнтези","ЛитРПГ","РеалРПГ","Детектив","Любовный роман","Триллер","Ужасы","Мистика","Боевик","Эротика","Поэзия","Сказка","Юмор","Фанфик","Дорама","Попаданцы"];

/* ════════════════════════════════════════
   ПЕРЕИСПОЛЬЗУЕМЫЕ КОМПОНЕНТЫ
════════════════════════════════════════ */

function ScrollLike({ count }: { count: number }) {
  const [liked, setLiked] = useState(false);
  const [n, setN] = useState(count);
  return (
    <button className={`scroll-like ${liked ? "liked" : ""}`}
      onClick={e => { e.stopPropagation(); setLiked(!liked); setN(liked ? n - 1 : n + 1); }}>
      <span>📜</span><span>{n}</span>
    </button>
  );
}

function SHead({ icon, title, sub }: { icon: string; title: string; sub?: string }) {
  return (
    <div className="section-head">
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 style={{ color: "var(--ink)" }}>{title}</h2>
      </div>
      {sub && <p style={{ color: "var(--ink-muted)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem" }}>{sub}</p>}
      <div className="leaf-divider">
        <span className="font-display text-xs italic" style={{ color: "var(--moss)" }}>❧</span>
      </div>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= n ? "var(--gold-herb)" : "var(--moss)", fontSize: 13 }}>★</span>)}
    </span>
  );
}

function ContentTags({ tags }: { tags: string[] }) {
  const map: Record<string, string> = { "18+": "tag-18", "эротика": "tag-ero", "насилие": "tag-violence", "наркотики": "tag-drug", "нецензурная": "tag-lang" };
  if (!tags.length) return null;
  return (
    <span className="flex gap-1 flex-wrap">
      {tags.map(t => <span key={t} className={`content-tag ${map[t] || "tag-18"}`}>{t}</span>)}
    </span>
  );
}

/* ════════════════════════════════════════
   РАЗДЕЛЫ
════════════════════════════════════════ */

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section className="relative overflow-hidden rounded-2xl herb-border mb-10 py-14 px-8"
      style={{ background: "linear-gradient(135deg, var(--cream) 0%, var(--sage-mid) 60%, var(--sage-deep) 100%)" }}>
      <div className="absolute top-4 right-8 text-8xl opacity-[0.07] pointer-events-none select-none rotate-12">🌿</div>
      <div className="absolute bottom-4 right-32 text-6xl opacity-[0.06] pointer-events-none select-none -rotate-6">🍃</div>
      <div className="absolute top-20 right-24 text-5xl opacity-[0.05] pointer-events-none select-none">🌱</div>

      <div className="relative z-10 max-w-xl">
        <span className="genre-badge mb-4 inline-block">Литературное сообщество</span>
        <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight mb-3 anim-up d1" style={{ color: "var(--ink)" }}>
          Писатель<span style={{ color: "var(--leaf)" }}>.Плюс</span>
        </h1>
        <p className="font-body text-lg mb-2 anim-up d2" style={{ color: "var(--ink-soft)" }}>
          Живое место для авторов, читателей и тех, кто между.
        </p>
        <p className="font-display italic text-base mb-8 anim-up d3" style={{ color: "var(--ink-muted)" }}>
          «Здесь прорастают слова.»
        </p>
        <div className="flex flex-wrap gap-3 mb-8 anim-up d4">
          <button className="olive-btn px-6 py-2.5 rounded-lg text-sm" onClick={() => onNav("manuscripts")}>
            Начать писать
          </button>
          <button className="font-body text-sm px-6 py-2.5 rounded-lg herb-border transition-all"
            style={{ color: "var(--ink-soft)", background: "transparent" }}
            onClick={() => onNav("library")}>
            В библиотеку
          </button>
        </div>
        <div className="flex gap-7 anim-up d5">
          {[["18 400","читателей"],["4 800","авторов"],["62 000","глав"]].map(([v,l]) => (
            <div key={l}>
              <div className="font-display text-2xl font-semibold" style={{ color: "var(--leaf)" }}>{v}</div>
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
    <section className="mb-10 rounded-xl herb-border p-5"
      style={{ background: "linear-gradient(to right, var(--cream), var(--sage))" }}>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-xl">🌱</span>
        <h3 className="font-display text-xl font-semibold" style={{ color: "var(--forest)" }}>Приветствуем новичков!</h3>
        <span className="font-body text-xs px-3 py-0.5 rounded-full" style={{ background: "var(--olive)", color: "var(--cream)" }}>Читайте их работы!</span>
      </div>
      <p className="font-body text-sm mb-4" style={{ color: "var(--ink-muted)" }}>
        Первый шаг — самый важный. Поддержите начинающих авторов свитком-лайком!
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {NEWCOMERS.map(a => (
          <div key={a.name} className="card-herb flex-shrink-0 w-40 p-3.5 cursor-pointer">
            <div className="text-3xl mb-2">{a.icon}</div>
            <div className="font-display text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>{a.title}</div>
            <div className="font-body text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{a.name}</div>
            <span className="genre-badge mt-2">{a.genre}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ManuscriptsSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mb-12">
      <SHead icon="📜" title="Манускрипты" sub="Публикации по главам — следите за историей в реальном времени" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BOOKS.map(b => (
          <div key={b.id} className="card-herb p-4 cursor-pointer" onClick={() => setOpen(open === b.id ? null : b.id)}>
            <div className="flex gap-3">
              <div className="text-4xl flex-shrink-0 mt-0.5">{b.cover}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold leading-tight" style={{ color: "var(--ink)" }}>{b.title}</h4>
                  {b.isNew && <span className="flex-shrink-0 text-xs font-body px-2 py-0.5 rounded-full" style={{ background: "var(--leaf)", color: "var(--cream)" }}>Новинка</span>}
                </div>
                <div className="font-body text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>{b.author}</div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="genre-badge">{b.genre}</span>
                  {b.sub && <span className="genre-badge">{b.sub}</span>}
                  <ContentTags tags={b.tags} />
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs font-body" style={{ color: "var(--ink-muted)" }}>
                    <Icon name="BookOpen" size={11} /> {b.chapters > 0 ? `${b.chapters} гл.` : "сборник"}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-body" style={{ color: "var(--ink-muted)" }}>
                    <Icon name="Eye" size={11} /> {b.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-body" style={{ color: "var(--ink-muted)" }}>
                    <Icon name="Users" size={11} /> {b.readers.toLocaleString()}
                  </span>
                  <ScrollLike count={b.likes} />
                </div>
              </div>
            </div>
            {open === b.id && (
              <div className="mt-4 pt-4 border-t anim-in" style={{ borderColor: "var(--moss)" }}>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { l: "Читателей", v: b.readers.toLocaleString(), i: "Users" as const },
                    { l: "В библ.", v: b.saves.toLocaleString(), i: "BookMarked" as const },
                    { l: "Просмотров", v: b.views >= 1000 ? `${(b.views/1000).toFixed(1)}K` : String(b.views), i: "Eye" as const },
                  ].map(s => (
                    <div key={s.l} className="text-center p-2 rounded-lg" style={{ background: "var(--sage)" }}>
                      <Icon name={s.i} size={13} className="mx-auto mb-1" style={{ color: "var(--leaf)" }} />
                      <div className="font-display text-base font-semibold" style={{ color: "var(--leaf)" }}>{s.v}</div>
                      <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="olive-btn flex-1 py-2 rounded-lg text-sm">Читать</button>
                  <button className="flex-1 py-2 rounded-lg text-sm font-body herb-border"
                    style={{ color: "var(--ink-soft)", background: "transparent" }}>В библиотеку</button>
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
  const [fontSize, setFontSize] = useState(17);
  return (
    <section className="mb-12">
      <SHead icon="📖" title="Читалка" sub={`${b.title} — Глава 1: «Запах вереска»`} />
      <div className="rounded-xl overflow-hidden herb-border" style={{ background: "var(--cream)" }}>
        <div className="flex items-center justify-between px-5 py-3 border-b flex-wrap gap-2"
          style={{ borderColor: "var(--moss)", background: "var(--sage)" }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display italic text-sm" style={{ color: "var(--ink-muted)" }}>{b.title}</span>
            <span className="genre-badge">Глава 1</span>
            <ContentTags tags={b.tags} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setFontSize(s => Math.max(13, s-1))}
              className="font-body text-xs px-2 py-1 rounded herb-border"
              style={{ color: "var(--ink-soft)", background: "transparent" }}>A−</button>
            <button onClick={() => setFontSize(s => Math.min(26, s+1))}
              className="font-body text-sm px-2 py-1 rounded herb-border"
              style={{ color: "var(--ink-soft)", background: "transparent" }}>A+</button>
            <button onClick={() => setPlaying(!playing)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body transition-all"
              style={playing
                ? { background: "var(--olive)", color: "var(--cream)" }
                : { color: "var(--ink-soft)", border: "1px solid var(--moss)", background: "transparent" }}>
              <Icon name={playing ? "Pause" : "Play"} size={13} />
              {playing ? "Стоп" : "Озвучить ИИ"}
            </button>
          </div>
        </div>
        <div className="p-8 max-w-2xl mx-auto" style={{ fontSize }}>
          {playing && (
            <div className="mb-5 px-4 py-2.5 rounded-lg anim-in flex items-center gap-3"
              style={{ background: "rgba(88,120,70,0.1)", color: "var(--leaf)" }}>
              <Icon name="Volume2" size={16} />
              <span className="font-body text-sm">ИИ-голос читает вслух...</span>
              <div className="flex gap-1 ml-auto">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-0.5 rounded-full"
                    style={{ height: 14, background: "var(--leaf)", animation: `pdot 0.9s ease ${i*0.12}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <p className="font-display leading-relaxed mb-4" style={{ color: "var(--ink)" }}>
            Май пришёл в поместье вместе с запахом вереска — острым, почти горьким, как память о прошлом лете. Марьяна остановилась у ворот, не решаясь войти. Пальцы её сжимали письмо, которое она столько раз перечитывала, что слова на бумаге начали терять смысл.
          </p>
          <p className="font-display leading-relaxed mb-4" style={{ color: "var(--ink)" }}>
            «Приезжай», — было написано там. Всего одно слово. Но почерк — его почерк — дрожал, будто рука, писавшая это, не была уверена ни в письме, ни в себе.
          </p>
          <p className="font-display leading-relaxed" style={{ color: "var(--ink)" }}>
            Ворота скрипнули, приглашая. Где-то в глубине сада пела птица, которую Марьяна никогда прежде не слышала. Или слышала, но давно забыла — как забывают всё, от чего болит сердце.
          </p>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t flex-wrap gap-2"
          style={{ borderColor: "var(--moss)", background: "var(--sage)" }}>
          <button className="flex items-center gap-1 font-body text-sm"
            style={{ color: "var(--ink-muted)", background: "transparent" }}>
            <Icon name="ChevronLeft" size={15} /> Предыдущая
          </button>
          <ScrollLike count={512} />
          <button className="olive-btn flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm">
            Следующая <Icon name="ChevronRight" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DuelsSection() {
  const [voted, setVoted] = useState<Record<number, 1|2>>({});
  return (
    <section className="mb-12">
      <SHead icon="⚔️" title="Дуэли" sub="Баттлы рассказов за 24 часа — голосуй за лучшего!" />
      <div className="space-y-5">
        {DUELS.map(d => {
          const total = d.a1.votes + d.a2.votes;
          const p1 = Math.round(d.a1.votes / total * 100);
          const p2 = 100 - p1;
          const myVote = voted[d.id];
          return (
            <div key={d.id} className="card-herb p-5">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="font-display text-xl font-semibold" style={{ color: "var(--ink)" }}>{d.title}</h4>
                {d.active
                  ? <div className="flex items-center gap-2"><div className="pulse-dot" /><span className="duel-clock">{d.timeLeft}</span></div>
                  : <span className="font-body text-xs px-2 py-1 rounded-full" style={{ background: "var(--moss)", color: "var(--cream)" }}>завершена</span>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{...d.a1,pct:p1,side:1 as const},{...d.a2,pct:p2,side:2 as const}].map(s => (
                  <div key={s.side} className="p-4 rounded-xl border transition-all"
                    style={{ borderColor: myVote===s.side ? "var(--leaf)" : "var(--moss)", background: myVote===s.side ? "rgba(88,120,70,0.07)" : "var(--sage)" }}>
                    <div className="font-display text-base font-semibold mb-2" style={{ color: "var(--ink)" }}>{s.name}</div>
                    <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "var(--sage-mid)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width:`${s.pct}%`, background: myVote===s.side ? "var(--leaf)" : "var(--moss)" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg font-semibold" style={{ color: "var(--leaf)" }}>{s.pct}%</span>
                      <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{s.votes} голосов</span>
                    </div>
                    {d.active && !myVote && (
                      <button className="mt-3 w-full olive-btn py-1.5 rounded-lg text-sm"
                        onClick={() => setVoted({...voted,[d.id]:s.side})}>
                        Голосовать
                      </button>
                    )}
                    {myVote===s.side && <div className="mt-2 text-xs font-body text-center" style={{ color: "var(--leaf)" }}>✓ Ваш голос</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="card-herb p-5 text-center cursor-pointer" style={{ border: "1px dashed var(--moss)" }}>
          <Icon name="Swords" size={24} className="mx-auto mb-2" style={{ color: "var(--leaf)" }} />
          <p className="font-display text-lg font-semibold" style={{ color: "var(--ink-soft)" }}>Бросить вызов автору</p>
          <p className="font-body text-sm mt-1 mb-3" style={{ color: "var(--ink-muted)" }}>24 часа · 1 рассказ · 1 победитель</p>
          <button className="olive-btn px-5 py-2 rounded-lg text-sm">Создать дуэль</button>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <section className="mb-12">
      <SHead icon="🖋" title="Рецензии" sub="Честные отзывы — спойлеры надёжно скрыты" />
      <div className="space-y-4">
        {REVIEWS.map(r => (
          <div key={r.id} className="card-herb p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{r.book}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Stars n={r.rating} />
                  <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>— {r.author}</span>
                </div>
              </div>
              <ScrollLike count={11} />
            </div>
            <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--ink-soft)" }}>{r.text}</p>
            <div className="rounded-lg p-3" style={{ background: "var(--sage)" }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon name="EyeOff" size={12} style={{ color: "var(--olive)" }} />
                <span className="font-body text-xs font-semibold" style={{ color: "var(--olive)" }}>Спойлер</span>
                <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>· нажмите, чтобы раскрыть</span>
              </div>
              <p className={`font-body text-sm leading-relaxed cursor-pointer select-none transition-all duration-300 ${revealed[r.id] ? "spoiler-open" : "spoiler-mask"}`}
                onClick={() => setRevealed(s => ({...s,[r.id]:!s[r.id]}))}>
                {r.spoiler}
              </p>
            </div>
          </div>
        ))}
        <button className="w-full py-3 rounded-xl font-body text-sm herb-border transition-all"
          style={{ color: "var(--olive)", background: "transparent" }}>
          + Написать рецензию
        </button>
      </div>
    </section>
  );
}

function CoauthorSection() {
  return (
    <section className="mb-12">
      <SHead icon="🤝" title="Соавтор" sub="Совместное творчество — пишите вдвоём, по главам" />
      <div className="space-y-4 mb-4">
        {COAUTHOR_PROJECTS.map(p => (
          <div key={p.id} className="card-herb p-4 flex items-center gap-4">
            <div className="text-3xl">📓</div>
            <div className="flex-1">
              <h4 className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{p.title}</h4>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="genre-badge">{p.genre}</span>
                <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>
                  {p.authors.join(" & ")} · {p.chapters} глав
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-body text-xs px-2 py-1 rounded-full mb-1"
                style={{ background: "rgba(88,120,70,0.12)", color: "var(--leaf)" }}>{p.status}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>ред. {p.lastEdit}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-herb p-6 text-center" style={{ border: "1px dashed var(--moss)" }}>
        <div className="text-4xl mb-3">✍️</div>
        <p className="font-display text-lg font-semibold mb-1" style={{ color: "var(--ink)" }}>Пригласить соавтора</p>
        <p className="font-body text-sm mb-4" style={{ color: "var(--ink-muted)" }}>
          Создайте проект, пригласите партнёра и работайте над главами вместе
        </p>
        <div className="flex gap-2 max-w-sm mx-auto">
          <input placeholder="Имя или @ник автора"
            className="flex-1 px-3 py-2 rounded-lg text-sm font-body outline-none herb-border"
            style={{ background: "var(--sage)", color: "var(--ink)" }} />
          <button className="olive-btn px-4 py-2 rounded-lg text-sm">Пригласить</button>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="mb-12">
      <SHead icon="🎉" title="Праздники и конкурсы" sub="Ивенты, флэшмобы, марафоны и розыгрыши" />
      <div className="space-y-4">
        {EVENTS.map(e => (
          <div key={e.id} className="card-herb p-5 flex gap-4">
            <div className="text-4xl flex-shrink-0">{e.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-xl font-semibold" style={{ color: "var(--ink)" }}>{e.title}</h4>
                <span className="genre-badge flex-shrink-0">{e.tag}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 mb-2">
                <Icon name="Calendar" size={12} style={{ color: "var(--ink-muted)" }} />
                <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{e.date}</span>
              </div>
              <p className="font-body text-sm" style={{ color: "var(--ink-soft)" }}>{e.desc}</p>
              <button className="mt-3 olive-btn px-4 py-1.5 rounded-lg text-sm">Участвовать</button>
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
      <SHead icon="🏆" title="Топ авторов" sub="Рейтинг по читателям и активности" />
      <div className="space-y-2">
        {TOP_AUTHORS.map(a => (
          <div key={a.rank} className="card-herb flex items-center gap-4 px-5 py-3">
            <div className="w-8 text-center font-display text-xl font-bold">
              {a.badge || <span style={{ color: "var(--ink-muted)" }}>{a.rank}</span>}
            </div>
            <Avatar className="w-9 h-9">
              <AvatarFallback className="font-body text-sm"
                style={{ background: "var(--sage-deep)", color: "var(--forest)" }}>
                {a.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{a.name}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{a.books} книг</div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-semibold" style={{ color: "var(--leaf)" }}>{a.readers.toLocaleString()}</div>
              <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>читателей</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LibrarySection() {
  const [cat, setCat] = useState("Проза");
  return (
    <section className="mb-12">
      <SHead icon="📚" title="Библиотека" sub="Полный каталог: жанры, поджанры и авторские подборки" />
      <div className="flex gap-2 mb-5 flex-wrap">
        {["Проза","Жанры","Подборки"].map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="px-4 py-2 rounded-full font-body text-sm transition-all"
            style={cat===c ? { background:"var(--olive)", color:"var(--cream)" } : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
            {c}
          </button>
        ))}
      </div>

      {cat === "Проза" && (
        <div className="space-y-3">
          {Object.entries(PROSE_GENRES).slice(0,7).map(([name,subs]) => (
            <div key={name} className="card-herb p-4">
              <div className="font-display text-base font-semibold mb-2" style={{ color: "var(--ink)" }}>{name}</div>
              {subs.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {subs.map(s => <span key={s} className="genre-badge cursor-pointer">{s}</span>)}
                </div>
              )}
            </div>
          ))}
          <p className="text-center font-body text-sm py-2" style={{ color: "var(--ink-muted)" }}>
            + Историческая проза, Приключения, Детская литература и другие
          </p>
        </div>
      )}

      {cat === "Жанры" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_GENRES.map(g => (
            <div key={g} className="card-herb p-3.5 cursor-pointer text-center">
              <div className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{g}</div>
            </div>
          ))}
        </div>
      )}

      {cat === "Подборки" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { t:"«Читать тихим вечером»", d:"Уютная проза для дождливых дней", i:"🍵", n:14 },
            { t:"«Не спать до рассвета»", d:"Хорроры и мистика", i:"🌑", n:9 },
            { t:"«Плакать навзрыд»", d:"Трогательная проза", i:"🌿", n:17 },
            { t:"«Смеяться в голос»", d:"Юмор и ирония", i:"😄", n:11 },
            { t:"«Попасть в другой мир»", d:"Лучшие попаданцы", i:"🌀", n:22 },
            { t:"«Женский детектив»", d:"Умные детективные романы", i:"🔍", n:8 },
          ].map(p => (
            <div key={p.t} className="card-herb p-4 cursor-pointer">
              <div className="text-3xl mb-2">{p.i}</div>
              <div className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{p.t}</div>
              <div className="font-body text-xs mt-0.5 mb-2" style={{ color: "var(--ink-muted)" }}>{p.d}</div>
              <div className="font-body text-xs" style={{ color: "var(--leaf)" }}>{p.n} книг</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function BlogsSection() {
  const [topic, setTopic] = useState("Все");
  const posts = [
    { id:1, title:"Как я написала первый роман за полгода", author:"Алина К.", topic:"Личное", likes:84, comments:32, date:"23 апр" },
    { id:2, title:"Мой новый проект — нужны бета-ридеры!", author:"Виктор Г.", topic:"Самопиар", likes:41, comments:18, date:"22 апр" },
    { id:3, title:"Почему дуэли — лучший способ расти как автор", author:"Марк Л.", topic:"Дуэли", likes:67, comments:25, date:"21 апр" },
    { id:4, title:"Промокод на месяц бесплатной подписки", author:"Редакция", topic:"Промокоды и розыгрыши", likes:211, comments:98, date:"20 апр" },
  ].filter(p => topic === "Все" ? true : p.topic === topic);

  return (
    <section className="mb-12">
      <SHead icon="✏️" title="Блоги" sub="Темы для обсуждений, статьи и заметки сообщества" />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {["Все", ...BLOG_TOPICS].map(t => (
          <button key={t} onClick={() => setTopic(t)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-body text-xs transition-all"
            style={topic===t ? { background:"var(--olive)", color:"var(--cream)" } : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {posts.length > 0 ? posts.map(p => (
          <div key={p.id} className="card-herb p-4 cursor-pointer">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-base font-semibold leading-snug" style={{ color: "var(--ink)" }}>{p.title}</h4>
              <ScrollLike count={p.likes} />
            </div>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{p.author}</span>
              <span className="genre-badge">{p.topic}</span>
              <span className="flex items-center gap-1 font-body text-xs" style={{ color: "var(--ink-muted)" }}>
                <Icon name="MessageSquare" size={11} /> {p.comments}
              </span>
              <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{p.date}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📝</div>
            <p className="font-display text-lg" style={{ color: "var(--ink-muted)" }}>Пока нет публикаций в этой теме</p>
            <button className="olive-btn mt-3 px-5 py-2 rounded-lg text-sm">Написать первым</button>
          </div>
        )}
      </div>
    </section>
  );
}

function FireplaceSection() {
  const [msgs, setMsgs] = useState(CHAT);
  const [msg, setMsg] = useState("");
  const send = () => {
    if (!msg.trim()) return;
    setMsgs([...msgs, { id: Date.now(), user: "Вы", av: "ВЫ", text: msg, likes: 0, time: "сейчас" }]);
    setMsg("");
  };
  return (
    <section className="mb-12">
      <SHead icon="🔥" title="Каминная" sub="Общий чат авторов и читателей" />
      <div className="rounded-xl overflow-hidden herb-border" style={{ background: "var(--cream)" }}>
        <div className="flex flex-col gap-3 p-4 h-80 overflow-y-auto">
          {msgs.map(m => (
            <div key={m.id} className="flex gap-3 items-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="font-body text-xs"
                  style={{ background: "var(--sage-deep)", color: "var(--forest)" }}>{m.av}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-sm font-semibold" style={{ color: "var(--leaf)" }}>{m.user}</span>
                  <span className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{m.time}</span>
                </div>
                <p className="font-body text-sm mt-0.5" style={{ color: "var(--ink-soft)" }}>{m.text}</p>
                <div className="mt-1"><ScrollLike count={m.likes} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3 border-t" style={{ borderColor: "var(--moss)", background: "var(--sage)" }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Написать в каминной..."
            className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
            style={{ background: "var(--cream)", color: "var(--ink)" }} />
          <button onClick={send} className="olive-btn px-4 py-2 rounded-lg text-sm">
            <Icon name="Send" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Попап-панели ─── */

function NotifPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-80 rounded-xl shadow-xl herb-border anim-up"
        style={{ background: "var(--cream)" }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--moss)" }}>
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>Оповещения</h3>
          <button onClick={onClose}><Icon name="X" size={17} style={{ color: "var(--ink-muted)" }} /></button>
        </div>
        {NOTIFICATIONS_AUTHOR.map((n, i) => (
          <div key={i} className="flex gap-3 p-4 border-b last:border-b-0 cursor-pointer"
            style={{ borderColor: "var(--moss)", background: n.unread ? "rgba(88,120,70,0.05)" : "transparent" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--sage-mid)" }}>
              <Icon name={n.icon} size={13} style={{ color: "var(--leaf)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm" style={{ color: "var(--ink-soft)" }}>{n.text}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>{n.time}</p>
            </div>
            {n.unread && <div className="pulse-dot mt-1.5 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MessengerPanel({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(MESSAGES_DATA[0]);
  const [chatMsg, setChatMsg] = useState("");
  const [hist, setHist] = useState([
    { me: false, text: "Спасибо за рецензию, очень приятно!" },
    { me: true, text: "Ваша работа заслуживает ещё большего внимания." },
  ]);
  const send = () => {
    if (!chatMsg.trim()) return;
    setHist([...hist, { me: true, text: chatMsg }]);
    setChatMsg("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15" onClick={onClose}>
      <div className="w-full max-w-2xl h-[500px] rounded-xl shadow-2xl herb-border flex overflow-hidden anim-up"
        style={{ background: "var(--cream)" }} onClick={e => e.stopPropagation()}>
        {/* Список диалогов */}
        <div className="w-56 border-r flex flex-col flex-shrink-0"
          style={{ borderColor: "var(--moss)", background: "var(--sage)" }}>
          <div className="p-3 border-b" style={{ borderColor: "var(--moss)" }}>
            <span className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>Сообщения</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MESSAGES_DATA.map(m => (
              <div key={m.id} onClick={() => setActive(m)} className="flex gap-2 p-3 cursor-pointer"
                style={{ background: active.id===m.id ? "rgba(88,120,70,0.1)" : "transparent", borderLeft: active.id===m.id ? "3px solid var(--leaf)" : "3px solid transparent" }}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="font-body text-xs"
                    style={{ background: "var(--sage-deep)", color: "var(--forest)" }}>{m.av}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-body text-xs font-semibold truncate" style={{ color: "var(--ink)" }}>{m.user}</span>
                    <span className="font-body text-xs flex-shrink-0" style={{ color: "var(--ink-muted)" }}>{m.time}</span>
                  </div>
                  <p className="font-body text-xs truncate" style={{ color: "var(--ink-muted)" }}>{m.last}</p>
                </div>
                {m.unread > 0 && (
                  <span className="w-4 h-4 rounded-full text-xs font-body flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--leaf)", color: "var(--cream)" }}>{m.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Чат */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--moss)" }}>
            <span className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>{active.user}</span>
            <button onClick={onClose}><Icon name="X" size={17} style={{ color: "var(--ink-muted)" }} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {hist.map((c, i) => (
              <div key={i} className={`flex ${c.me ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs px-3 py-2 font-body text-sm"
                  style={{ background: c.me ? "var(--olive)" : "var(--sage-mid)", color: c.me ? "var(--cream)" : "var(--ink-soft)", borderRadius: c.me ? "12px 12px 2px 12px" : "12px 12px 12px 2px" }}>
                  {c.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t" style={{ borderColor: "var(--moss)" }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Написать..."
              className="flex-1 px-3 py-2 rounded-lg text-sm font-body outline-none herb-border"
              style={{ background: "var(--sage)", color: "var(--ink)" }} />
            <button onClick={send} className="olive-btn px-3 py-2 rounded-lg">
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-72 rounded-xl shadow-xl herb-border anim-up overflow-hidden"
        style={{ background: "var(--cream)" }} onClick={e => e.stopPropagation()}>
        <div className="p-5" style={{ background: "linear-gradient(135deg, var(--sage), var(--sage-mid))" }}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="font-display text-lg font-semibold"
                style={{ background: "var(--olive)", color: "var(--cream)" }}>СВ</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-display text-base font-semibold" style={{ color: "var(--ink)" }}>Соня Вешняя</div>
              <span className="genre-badge">Автор</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["11","книг"],["24К","читателей"],["680","подписчиков"]].map(([v,l]) => (
              <div key={l} className="p-2 rounded-lg" style={{ background: "var(--cream)" }}>
                <div className="font-display text-lg font-semibold" style={{ color: "var(--leaf)" }}>{v}</div>
                <div className="font-body text-xs" style={{ color: "var(--ink-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 p-3 rounded-xl"
            style={{ background: "rgba(88,120,70,0.07)", border: "1px dashed var(--olive-light)" }}>
            <div className="font-body text-xs font-semibold mb-0.5" style={{ color: "var(--leaf)" }}>
              Коммерческий статус — в разработке
            </div>
            <div className="font-body text-xs mb-2" style={{ color: "var(--ink-soft)" }}>
              200 000 знаков · 150 читателей · 50 подписчиков
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--sage-mid)" }}>
              <div className="h-full rounded-full" style={{ width: "72%", background: "var(--leaf)" }} />
            </div>
            <div className="font-body text-xs mt-1" style={{ color: "var(--ink-muted)" }}>72% — почти у цели!</div>
          </div>
          {[["Мои рукописи","BookOpen"],["Моя библиотека","Library"],["Блог","PenLine"],["Настройки","Settings"],["Выйти","LogOut"]].map(([l,ic]) => (
            <button key={l} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
              style={{ color: "var(--ink-soft)", background: "transparent" }}>
              <Icon name={ic as "BookOpen"} size={15} style={{ color: "var(--leaf)" }} />
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   НАВИГАЦИЯ
════════════════════════════════════════ */
const NAV = [
  { id: "home", label: "Главная", icon: "Home" as const },
  { id: "manuscripts", label: "Манускрипты", icon: "ScrollText" as const },
  { id: "reader", label: "Читалка", icon: "BookOpen" as const },
  { id: "library", label: "Библиотека", icon: "Library" as const },
  { id: "duels", label: "Дуэли", icon: "Sword" as const },
  { id: "reviews", label: "Рецензии", icon: "Star" as const },
  { id: "coauthor", label: "Соавтор", icon: "Users" as const },
  { id: "events", label: "Праздники", icon: "Trophy" as const },
  { id: "top", label: "Топ", icon: "Award" as const },
  { id: "blogs", label: "Блоги", icon: "PenLine" as const },
  { id: "fireplace", label: "Каминная", icon: "Flame" as const },
];

/* ════════════════════════════════════════
   ГЛАВНЫЙ КОМПОНЕНТ
════════════════════════════════════════ */
export default function Index() {
  const [section, setSection] = useState("home");
  const [showNotif, setShowNotif] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const goTo = (id: string) => {
    setSection(id);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (section) {
      case "manuscripts": return <ManuscriptsSection />;
      case "reader": return <ReaderSection />;
      case "library": return <LibrarySection />;
      case "duels": return <DuelsSection />;
      case "reviews": return <ReviewsSection />;
      case "coauthor": return <CoauthorSection />;
      case "events": return <EventsSection />;
      case "top": return <TopAuthorsSection />;
      case "blogs": return <BlogsSection />;
      case "fireplace": return <FireplaceSection />;
      default: return (
        <>
          <HeroSection onNav={goTo} />
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
    <div className="min-h-screen" style={{ color: "var(--ink)" }}>
      {/* ─── Шапка ─── */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(234,242,228,0.93)", backdropFilter: "blur(14px)", borderColor: "var(--moss)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Лого */}
          <button onClick={() => goTo("home")} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">🌿</span>
            <span className="font-display text-xl font-semibold" style={{ color: "var(--forest)" }}>
              Писатель<span style={{ color: "var(--leaf)" }}>.Плюс</span>
            </span>
          </button>

          {/* Навигация десктоп */}
          <nav className="hidden xl:flex items-center gap-0.5 overflow-x-auto mx-4">
            {NAV.map(n => (
              <button key={n.id} onClick={() => goTo(n.id)}
                className={`nav-herb ${section===n.id ? "active" : ""}`}>
                <Icon name={n.icon} size={12} />
                {n.label}
              </button>
            ))}
          </nav>

          {/* Правые */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => { setShowMsg(true); setShowNotif(false); setShowProfile(false); }}
              className="relative p-2 rounded-lg" style={{ color: "var(--ink-soft)" }}>
              <Icon name="MessageCircle" size={20} />
              <div className="notif-badge" />
            </button>
            <button onClick={() => { setShowNotif(!showNotif); setShowMsg(false); setShowProfile(false); }}
              className="relative p-2 rounded-lg" style={{ color: "var(--ink-soft)" }}>
              <Icon name="Bell" size={20} />
              <div className="notif-badge" />
            </button>
            <button className="olive-btn text-sm px-3 py-1.5 rounded-lg hidden md:block ml-1">Написать</button>
            <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); setShowMsg(false); }} className="ml-1">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="font-body text-xs font-semibold"
                  style={{ background: "var(--olive)", color: "var(--cream)" }}>СВ</AvatarFallback>
              </Avatar>
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="xl:hidden p-2 ml-1" style={{ color: "var(--ink-soft)" }}>
              <Icon name={mobileNav ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Мобильная навигация */}
        {mobileNav && (
          <div className="xl:hidden border-t px-4 py-3 flex flex-wrap gap-1.5"
            style={{ borderColor: "var(--moss)", background: "var(--sage-mid)" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => goTo(n.id)}
                className={`nav-herb text-xs ${section===n.id ? "active" : ""}`}>
                <Icon name={n.icon} size={11} />
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─── Контент ─── */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div key={section} className="anim-up">
          {renderSection()}
        </div>
      </main>

      {/* ─── FAB ─── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="olive-btn flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-sm">
          <Icon name="PenLine" size={16} />
          Публикация
        </button>
      </div>

      {showNotif && <NotifPanel onClose={() => setShowNotif(false)} />}
      {showMsg && <MessengerPanel onClose={() => setShowMsg(false)} />}
      {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
    </div>
  );
}
