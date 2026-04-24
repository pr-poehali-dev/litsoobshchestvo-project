import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ScrollLike from "@/components/shared/ScrollLike";
import SectionHead from "@/components/shared/SectionHead";
import ContentTags from "@/components/shared/ContentTags";
import Stars from "@/components/shared/Stars";
import Toggle from "@/components/shared/Toggle";
import HomeSection from "@/components/sections/HomeSection";
import LibrarySection from "@/components/sections/LibrarySection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import AuthModal from "@/components/modals/AuthModal";
import OnboardingModal from "@/components/modals/OnboardingModal";
import CreateModal from "@/components/modals/CreateModal";
import NotifPanel from "@/components/panels/NotifPanel";
import MessengerPanel from "@/components/panels/MessengerPanel";
import ProfilePanel from "@/components/panels/ProfilePanel";
import InfoPageModal from "@/components/panels/InfoPageModal";
import { MOCK_BOOKS, MOCK_TOP_AUTHORS, MOCK_DUELS, MOCK_EVENTS, MOCK_REVIEWS, MOCK_CHAT, COAUTHOR_PROJECTS } from "@/data/mock";
import { BLOG_TOPICS } from "@/data/genres";

/* ════════════════════════════════════════
   РАЗДЕЛЫ
════════════════════════════════════════ */

function ManuscriptsSection() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section className="mb-12">
      <SectionHead icon="📜" title="Манускрипты" sub="Публикации по главам — следите за историей в реальном времени" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_BOOKS.map(b => (
          <div key={b.id} className="card-herb p-4 cursor-pointer" onClick={() => setOpen(open===b.id?null:b.id)}>
            <div className="flex gap-3">
              <div className="text-4xl flex-shrink-0 mt-0.5">{b.cover}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold leading-tight" style={{ color:"var(--ink)" }}>{b.title}</h4>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {b.isNew && <span className="text-xs font-body px-2 py-0.5 rounded-full" style={{ background:"var(--leaf)", color:"var(--cream)" }}>Новинка</span>}
                    {b.status==="finished" && <span className="text-xs font-body px-2 py-0.5 rounded-full" style={{ background:"var(--gold-herb)", color:"var(--cream)" }}>Завершено</span>}
                  </div>
                </div>
                <div className="font-body text-sm mt-0.5" style={{ color:"var(--ink-muted)" }}>{b.author}</div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="genre-badge">{b.genre}</span>
                  {b.sub && <span className="genre-badge">{b.sub}</span>}
                  <ContentTags tags={b.tags} />
                </div>
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
              </div>
            </div>
            {open===b.id && (
              <div className="mt-4 pt-4 border-t anim-in" style={{ borderColor:"var(--moss)" }}>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { l:"Читателей", v:b.readers.toLocaleString(), i:"Users" as const },
                    { l:"В библ.", v:b.saves.toLocaleString(), i:"BookMarked" as const },
                    { l:"Просмотры", v:b.views>=1000?`${(b.views/1000).toFixed(1)}K`:String(b.views), i:"Eye" as const },
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
                  <button className="px-3 py-2 rounded-lg text-sm font-body herb-border"
                    style={{ color:"var(--ink-muted)", background:"transparent" }} title="Скрыть">
                    <Icon name="EyeOff" size={14} />
                  </button>
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
  const b = MOCK_BOOKS[0];
  const [playing, setPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(17);
  const [showComments, setShowComments] = useState(false);
  return (
    <section className="mb-12">
      <SectionHead icon="📖" title="Читалка" sub={`${b.title} — Глава 1: «Запах вереска»`} />
      <div className="rounded-xl overflow-hidden herb-border" style={{ background:"var(--cream)" }}>
        <div className="flex items-center justify-between px-5 py-3 border-b flex-wrap gap-2"
          style={{ borderColor:"var(--moss)", background:"var(--sage)" }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display italic text-sm" style={{ color:"var(--ink-muted)" }}>{b.title}</span>
            <span className="genre-badge">Глава 1</span>
            <ContentTags tags={b.tags} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setFontSize(s=>Math.max(13,s-1))}
              className="font-body text-xs px-2 py-1 rounded herb-border"
              style={{ color:"var(--ink-soft)", background:"transparent" }}>A−</button>
            <button onClick={()=>setFontSize(s=>Math.min(26,s+1))}
              className="font-body text-sm px-2 py-1 rounded herb-border"
              style={{ color:"var(--ink-soft)", background:"transparent" }}>A+</button>
            <button onClick={()=>setPlaying(!playing)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body transition-all"
              style={playing ? { background:"var(--olive)", color:"var(--cream)" } : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
              <Icon name={playing?"Pause":"Play"} size={13} />
              {playing?"Стоп":"Озвучить ИИ"}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-2xl mx-auto" style={{ fontSize }}>
          {playing && (
            <div className="mb-5 px-4 py-2.5 rounded-lg anim-in flex items-center gap-3"
              style={{ background:"rgba(88,120,70,0.1)", color:"var(--leaf)" }}>
              <Icon name="Volume2" size={16} />
              <span className="font-body text-sm">ИИ-голос читает вслух...</span>
              <div className="flex gap-1 ml-auto">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-0.5 rounded-full"
                    style={{ height:14, background:"var(--leaf)", animation:`pdot 0.9s ease ${i*0.12}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <p className="font-display leading-relaxed mb-4" style={{ color:"var(--ink)" }}>
            Май пришёл в поместье вместе с запахом вереска — острым, почти горьким, как память о прошлом лете. Марьяна остановилась у ворот, не решаясь войти.
          </p>
          <p className="font-display leading-relaxed mb-4" style={{ color:"var(--ink)" }}>
            «Приезжай», — было написано там. Всего одно слово. Но почерк дрожал, будто рука писавшая это не была уверена ни в письме, ни в себе.
          </p>
          <p className="font-display leading-relaxed" style={{ color:"var(--ink)" }}>
            Ворота скрипнули, приглашая. Где-то в глубине сада пела птица, которую Марьяна никогда прежде не слышала. Или слышала, но давно забыла.
          </p>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t flex-wrap gap-2"
          style={{ borderColor:"var(--moss)", background:"var(--sage)" }}>
          <button className="flex items-center gap-1 font-body text-sm" style={{ color:"var(--ink-muted)", background:"transparent" }}>
            <Icon name="ChevronLeft" size={15} /> Предыдущая
          </button>
          <div className="flex items-center gap-2">
            <ScrollLike count={512} />
            <button onClick={()=>setShowComments(!showComments)}
              className="flex items-center gap-1 font-body text-xs"
              style={{ color:"var(--ink-muted)", background:"transparent" }}>
              <Icon name="MessageSquare" size={13} /> Комментарии
            </button>
          </div>
          <button className="olive-btn flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm">
            Следующая <Icon name="ChevronRight" size={15} />
          </button>
        </div>

        {showComments && (
          <div className="border-t p-4 anim-in" style={{ borderColor:"var(--moss)" }}>
            <h4 className="font-display text-base font-semibold mb-3" style={{ color:"var(--ink)" }}>Комментарии</h4>
            {[
              { u:"ЧитательNix", av:"ЧН", t:"Невероятно! Ждём следующей главы!", time:"09:12" },
              { u:"Книголюб_99", av:"КН", t:"Атмосфера чудесная, слог завораживает.", time:"10:34" },
            ].map((c,i) => (
              <div key={i} className="flex gap-2 mb-3">
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarFallback className="font-body text-xs" style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>{c.av}</AvatarFallback>
                </Avatar>
                <div className="flex-1 p-2.5 rounded-lg" style={{ background:"var(--sage)" }}>
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-body text-xs font-semibold" style={{ color:"var(--leaf)" }}>{c.u}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{c.time}</span>
                      <button className="font-body text-xs" style={{ color:"var(--ink-muted)", background:"transparent" }}>✏️</button>
                      <button className="font-body text-xs" style={{ color:"var(--ink-muted)", background:"transparent" }}>🚩</button>
                    </div>
                  </div>
                  <p className="font-body text-sm" style={{ color:"var(--ink-soft)" }}>{c.t}</p>
                  <div className="mt-1"><ScrollLike count={3} /></div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <input placeholder="Написать комментарий... (смайлики, фото, музыка, видео)"
                className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
                style={{ background:"var(--cream)", color:"var(--ink)" }} />
              <button className="olive-btn px-3 py-2 rounded-lg text-sm">
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DuelsSection() {
  const [voted, setVoted] = useState<Record<number,1|2>>({});
  const [showCreate, setShowCreate] = useState(false);
  return (
    <section className="mb-12">
      <SectionHead icon="⚔️" title="Дуэли" sub="Литературные баттлы за 24 часа" />
      <div className="space-y-5">
        {MOCK_DUELS.map(d => {
          const total = d.a1.votes+d.a2.votes;
          const p1 = Math.round(d.a1.votes/total*100);
          const myVote = voted[d.id];
          return (
            <div key={d.id} className="card-herb p-5">
              <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <h4 className="font-display text-xl font-semibold" style={{ color:"var(--ink)" }}>{d.title}</h4>
                {d.active
                  ? <div className="flex items-center gap-2"><div className="pulse-dot" /><span className="duel-clock">{d.timeLeft}</span></div>
                  : <span className="font-body text-xs px-2 py-1 rounded-full" style={{ background:"var(--moss)", color:"var(--cream)" }}>завершена</span>}
              </div>
              <div className="font-body text-xs mb-3" style={{ color:"var(--ink-muted)" }}>Тема: {d.theme}</div>
              <div className="grid grid-cols-2 gap-3">
                {([{...d.a1,pct:p1,side:1 as const},{...d.a2,pct:100-p1,side:2 as const}]).map(s => (
                  <div key={s.side} className="p-4 rounded-xl border transition-all"
                    style={{ borderColor:myVote===s.side?"var(--leaf)":"var(--moss)", background:myVote===s.side?"rgba(88,120,70,0.07)":"var(--sage)" }}>
                    <div className="font-display text-base font-semibold mb-2" style={{ color:"var(--ink)" }}>{s.name}</div>
                    <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background:"var(--sage-mid)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width:`${s.pct}%`, background:myVote===s.side?"var(--leaf)":"var(--moss)" }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg font-semibold" style={{ color:"var(--leaf)" }}>{s.pct}%</span>
                      <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{s.votes} голосов</span>
                    </div>
                    {d.active && !myVote && (
                      <button className="mt-3 w-full olive-btn py-1.5 rounded-lg text-sm"
                        onClick={() => setVoted({...voted,[d.id]:s.side})}>
                        Голосовать
                      </button>
                    )}
                    {myVote===s.side && <div className="mt-2 text-xs font-body text-center" style={{ color:"var(--leaf)" }}>✓ Ваш голос</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {showCreate ? (
          <div className="card-herb p-5">
            <h4 className="font-display text-lg font-semibold mb-4" style={{ color:"var(--ink)" }}>Создать дуэль</h4>
            <div className="space-y-3">
              <div>
                <label className="font-body text-xs font-semibold mb-1 block" style={{ color:"var(--ink-soft)" }}>Название</label>
                <input placeholder="Название вашей дуэли" className="w-full px-3 py-2 rounded-lg font-body text-sm outline-none herb-border" style={{ background:"var(--sage)", color:"var(--ink)" }} />
              </div>
              <div>
                <label className="font-body text-xs font-semibold mb-1 block" style={{ color:"var(--ink-soft)" }}>Тема / условие</label>
                <textarea placeholder="Опишите тему и условия дуэли..." rows={2} className="w-full px-3 py-2 rounded-lg font-body text-sm outline-none herb-border resize-none" style={{ background:"var(--sage)", color:"var(--ink)" }} />
              </div>
              <div>
                <label className="font-body text-xs font-semibold mb-1 block" style={{ color:"var(--ink-soft)" }}>Время (часов)</label>
                <div className="flex gap-2">
                  {[6,12,24,48].map(h => (
                    <button key={h} className="flex-1 py-1.5 rounded-lg font-body text-xs herb-border" style={{ color:"var(--ink-soft)", background:"transparent" }}>{h}ч</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="olive-btn flex-1 py-2 rounded-lg text-sm">Бросить вызов</button>
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2 rounded-lg text-sm font-body herb-border" style={{ color:"var(--ink-soft)", background:"transparent" }}>Отмена</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-herb p-5 text-center" style={{ border:"1px dashed var(--moss)" }}>
            <Icon name="Swords" size={24} className="mx-auto mb-2" style={{ color:"var(--leaf)" }} />
            <p className="font-display text-lg font-semibold" style={{ color:"var(--ink-soft)" }}>Бросить вызов автору</p>
            <p className="font-body text-sm mt-1 mb-3" style={{ color:"var(--ink-muted)" }}>24 часа · 1 рассказ · 1 победитель</p>
            <button className="olive-btn px-5 py-2 rounded-lg text-sm" onClick={() => setShowCreate(true)}>Создать дуэль</button>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [revealed, setRevealed] = useState<Record<number,boolean>>({});
  return (
    <section className="mb-12">
      <SectionHead icon="🖋" title="Рецензии" sub="Честные отзывы — спойлеры надёжно скрыты" />
      <div className="space-y-4">
        {MOCK_REVIEWS.map(r => (
          <div key={r.id} className="card-herb p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{r.book}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Stars n={r.rating} />
                  <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>— {r.author}</span>
                  <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{r.date}</span>
                </div>
              </div>
              <ScrollLike count={r.likes} />
            </div>
            <p className="font-body text-sm leading-relaxed mb-3" style={{ color:"var(--ink-soft)" }}>{r.text}</p>
            <div className="rounded-lg p-3" style={{ background:"var(--sage)" }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon name="EyeOff" size={12} style={{ color:"var(--olive)" }} />
                <span className="font-body text-xs font-semibold" style={{ color:"var(--olive)" }}>Спойлер</span>
                <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>· нажмите, чтобы раскрыть</span>
              </div>
              <p className={`font-body text-sm leading-relaxed cursor-pointer select-none transition-all duration-300 ${revealed[r.id]?"spoiler-open":"spoiler-mask"}`}
                onClick={() => setRevealed(s => ({...s,[r.id]:!s[r.id]}))}>
                {r.spoiler}
              </p>
            </div>
          </div>
        ))}
        <button className="w-full py-3 rounded-xl font-body text-sm herb-border transition-all"
          style={{ color:"var(--olive)", background:"transparent" }}>
          + Написать рецензию
        </button>
      </div>
    </section>
  );
}

function CoauthorSection() {
  return (
    <section className="mb-12">
      <SectionHead icon="🤝" title="Соавтор" sub="Совместное творчество — пишите вдвоём, по главам" />
      <div className="space-y-4 mb-4">
        {COAUTHOR_PROJECTS.map(p => (
          <div key={p.id} className="card-herb p-4 flex items-center gap-4">
            <div className="text-3xl">📓</div>
            <div className="flex-1">
              <h4 className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{p.title}</h4>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="genre-badge">{p.genre}</span>
                <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                  {p.authors.join(" & ")} · {p.chapters} глав
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-body text-xs px-2 py-1 rounded-full mb-1"
                style={{ background:"rgba(88,120,70,0.12)", color:"var(--leaf)" }}>{p.status}</div>
              <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>ред. {p.lastEdit}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-herb p-6 text-center" style={{ border:"1px dashed var(--moss)" }}>
        <div className="text-4xl mb-3">✍️</div>
        <p className="font-display text-lg font-semibold mb-1" style={{ color:"var(--ink)" }}>Пригласить соавтора</p>
        <p className="font-body text-sm mb-4" style={{ color:"var(--ink-muted)" }}>Создайте проект, пригласите партнёра и работайте над главами вместе</p>
        <div className="flex gap-2 max-w-sm mx-auto">
          <input placeholder="Поиск по @нику"
            className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
            style={{ background:"var(--sage)", color:"var(--ink)" }} />
          <button className="olive-btn px-4 py-2 rounded-lg text-sm">Пригласить</button>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const [selected, setSelected] = useState<number|null>(null);
  if (selected !== null) {
    const e = MOCK_EVENTS[selected];
    return (
      <section className="mb-12">
        <button onClick={() => setSelected(null)}
          className="flex items-center gap-1 font-body text-sm mb-4"
          style={{ color:"var(--olive)", background:"transparent" }}>
          <Icon name="ArrowLeft" size={14} /> Все ивенты
        </button>
        <div className="card-herb p-6">
          <div className="text-5xl mb-3">{e.icon}</div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-display text-2xl font-semibold" style={{ color:"var(--ink)" }}>{e.title}</h2>
            <span className="genre-badge">{e.tag}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Calendar" size={14} style={{ color:"var(--ink-muted)" }} />
            <span className="font-body text-sm" style={{ color:"var(--ink-muted)" }}>{e.date}</span>
            <span className="font-body text-sm ml-4" style={{ color:"var(--ink-muted)" }}>
              Участников: <span style={{ color:"var(--leaf)", fontWeight:600 }}>{e.participants}</span>
            </span>
          </div>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color:"var(--ink-soft)" }}>{e.desc}</p>
          <div className="p-4 rounded-xl mb-4" style={{ background:"var(--sage)", border:"1px solid var(--moss)" }}>
            <div className="font-display text-base font-semibold mb-2" style={{ color:"var(--ink)" }}>Условия участия</div>
            <ul className="space-y-1">
              {["Регистрация на платформе","Соблюдение правил сообщества","Публикация работы в срок"].map(c => (
                <li key={c} className="flex items-center gap-2 font-body text-sm" style={{ color:"var(--ink-soft)" }}>
                  <span style={{ color:"var(--leaf)" }}>✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <button className="olive-btn px-6 py-2.5 rounded-lg text-sm">Участвовать</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <SectionHead icon="🎉" title="Праздники и конкурсы" sub="Ивенты, флэшмобы, марафоны и розыгрыши" />
      <div className="space-y-4">
        {MOCK_EVENTS.map((e, i) => (
          <div key={e.id} className="card-herb p-5 flex gap-4 cursor-pointer" onClick={() => setSelected(i)}>
            <div className="text-4xl flex-shrink-0">{e.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-xl font-semibold" style={{ color:"var(--ink)" }}>{e.title}</h4>
                <span className="genre-badge flex-shrink-0">{e.tag}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 mb-2 flex-wrap">
                <Icon name="Calendar" size={12} style={{ color:"var(--ink-muted)" }} />
                <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{e.date}</span>
                <span className="font-body text-xs ml-3" style={{ color:"var(--leaf)" }}>{e.participants} участников</span>
              </div>
              <p className="font-body text-sm" style={{ color:"var(--ink-soft)" }}>{e.desc}</p>
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
      <SectionHead icon="🏆" title="Топ авторов" sub="Рейтинг по читателям и активности" />
      <div className="space-y-2">
        {MOCK_TOP_AUTHORS.map(a => (
          <div key={a.rank} className="card-herb flex items-center gap-4 px-5 py-3">
            <div className="w-8 text-center font-display text-xl font-bold">
              {a.badge || <span style={{ color:"var(--ink-muted)" }}>{a.rank}</span>}
            </div>
            <Avatar className="w-9 h-9">
              <AvatarFallback className="font-body text-sm"
                style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>
                {a.name.split(" ").map(n=>n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{a.name}</div>
              <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{a.nick} · {a.books} книг</div>
            </div>
            <div className="text-right">
              <div className="font-display text-base font-semibold" style={{ color:"var(--leaf)" }}>{a.readers.toLocaleString()}</div>
              <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>рейтинг: {a.rating.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogsSection() {
  const [topic, setTopic] = useState("Все");
  const posts = [
    { id:1, title:"Как я написала первый роман за полгода", author:"Алина К.", topic:"Личное", likes:84, comments:32, date:"23 апр" },
    { id:2, title:"Мой новый проект — нужны бета-ридеры!", author:"Виктор Г.", topic:"Самопиар", likes:41, comments:18, date:"22 апр" },
    { id:3, title:"Почему дуэли — лучший способ расти", author:"Марк Л.", topic:"Дуэли", likes:67, comments:25, date:"21 апр" },
    { id:4, title:"Промокод на подписку", author:"Редакция", topic:"Промокоды и розыгрыши", likes:211, comments:98, date:"20 апр" },
  ].filter(p => topic==="Все" ? true : p.topic===topic);

  return (
    <section className="mb-12">
      <SectionHead icon="✏️" title="Блоги" sub="Темы для обсуждений, статьи и заметки сообщества" />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {["Все",...BLOG_TOPICS].map(t => (
          <button key={t} onClick={() => setTopic(t)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full font-body text-xs transition-all"
            style={topic===t
              ? { background:"var(--olive)", color:"var(--cream)" }
              : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {posts.length > 0 ? posts.map(p => (
          <div key={p.id} className="card-herb p-4 cursor-pointer">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{p.title}</h4>
              <ScrollLike count={p.likes} />
            </div>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{p.author}</span>
              <span className="genre-badge">{p.topic}</span>
              <span className="flex items-center gap-1 font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                <Icon name="MessageSquare" size={11} /> {p.comments}
              </span>
              <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{p.date}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📝</div>
            <p className="font-display text-lg" style={{ color:"var(--ink-muted)" }}>Пока нет публикаций в этой теме</p>
            <button className="olive-btn mt-3 px-5 py-2 rounded-lg text-sm">Написать первым</button>
          </div>
        )}
      </div>
    </section>
  );
}

function FireplaceSection() {
  const [msgs, setMsgs] = useState(MOCK_CHAT);
  const [msg, setMsg] = useState("");
  const send = () => {
    if (!msg.trim()) return;
    setMsgs([...msgs, { id:Date.now(), user:"Вы", av:"ВЫ", text:msg, likes:0, time:"сейчас" }]);
    setMsg("");
  };
  return (
    <section className="mb-12">
      <SectionHead icon="🔥" title="Каминная" sub="Общий чат авторов и читателей" />
      <div className="rounded-xl overflow-hidden herb-border" style={{ background:"var(--cream)" }}>
        <div className="flex flex-col gap-3 p-4 h-80 overflow-y-auto">
          {msgs.map(m => (
            <div key={m.id} className="flex gap-3 items-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="font-body text-xs"
                  style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>{m.av}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-sm font-semibold" style={{ color:"var(--leaf)" }}>{m.user}</span>
                  <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{m.time}</span>
                </div>
                <p className="font-body text-sm mt-0.5" style={{ color:"var(--ink-soft)" }}>{m.text}</p>
                <div className="mt-1"><ScrollLike count={m.likes} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-3 border-t" style={{ borderColor:"var(--moss)", background:"var(--sage)" }}>
          <button className="p-1.5 rounded-lg" style={{ color:"var(--ink-muted)", background:"transparent" }}>
            <Icon name="Smile" size={16} />
          </button>
          <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Написать в каминной..."
            className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
            style={{ background:"var(--cream)", color:"var(--ink)" }} />
          <button onClick={send} className="olive-btn px-4 py-2 rounded-lg text-sm">
            <Icon name="Send" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DashboardSection({ userName, userRole, onNav, onShowCreate }: { userName:string; userRole:string; onNav:(s:string)=>void; onShowCreate:()=>void }) {
  return (
    <section className="mb-12">
      <div className="rounded-2xl herb-border overflow-hidden mb-6"
        style={{ background:"linear-gradient(135deg, var(--sage), var(--sage-mid) 60%, var(--sage-deep))" }}>
        <div className="p-8 flex items-start gap-5">
          <Avatar className="w-16 h-16 flex-shrink-0">
            <AvatarFallback className="font-display text-2xl font-semibold"
              style={{ background:"var(--olive)", color:"var(--cream)" }}>
              {userName.slice(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-display text-3xl font-semibold mb-1" style={{ color:"var(--forest)" }}>{userName}</h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="genre-badge">{userRole}</span>
              <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>Рейтинг: <span style={{ color:"var(--leaf)", fontWeight:600 }}>0</span></span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["0","книг"],["0","читателей"],["0","подписчиков"]].map(([v,l]) => (
                <div key={l} className="text-center p-3 rounded-xl" style={{ background:"rgba(255,255,255,0.5)" }}>
                  <div className="font-display text-xl font-semibold" style={{ color:"var(--leaf)" }}>{v}</div>
                  <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-8 pb-5">
          <div className="p-3 rounded-xl"
            style={{ background:"rgba(255,255,255,0.4)", border:"1px dashed var(--olive-light)" }}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-body text-xs font-semibold" style={{ color:"var(--forest)" }}>Коммерческий статус</span>
              <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>0%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background:"var(--sage-deep)" }}>
              <div className="h-full rounded-full" style={{ width:"0%", background:"var(--leaf)" }} />
            </div>
            <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>200 000 знаков · 150 читателей · 50 подписчиков</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon:"📜", label:"Новая книга", action:onShowCreate },
          { icon:"✏️", label:"Написать блог", action:onShowCreate },
          { icon:"📚", label:"Моя библиотека", action:()=>onNav("library") },
          { icon:"🏅", label:"Достижения", action:()=>onNav("achievements") },
        ].map(a => (
          <button key={a.label} onClick={a.action} className="card-herb p-4 text-center cursor-pointer">
            <div className="text-3xl mb-1.5">{a.icon}</div>
            <div className="font-body text-sm font-medium" style={{ color:"var(--ink-soft)" }}>{a.label}</div>
          </button>
        ))}
      </div>

      <div className="card-herb p-5 mb-4">
        <h3 className="font-display text-xl font-semibold mb-4" style={{ color:"var(--ink)" }}>Мои рукописи</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📝</div>
          <p className="font-display text-lg" style={{ color:"var(--ink-muted)" }}>Здесь будут ваши книги</p>
          <button className="olive-btn mt-3 px-5 py-2 rounded-lg text-sm" onClick={onShowCreate}>Создать первую книгу</button>
        </div>
      </div>

      <div className="card-herb p-5">
        <h3 className="font-display text-xl font-semibold mb-3" style={{ color:"var(--ink)" }}>Последняя активность</h3>
        <div className="text-center py-6">
          <p className="font-body text-sm" style={{ color:"var(--ink-muted)" }}>Активность появится после первых публикаций</p>
        </div>
      </div>
    </section>
  );
}

function Footer({ onInfoPage }: { onInfoPage:(id:string)=>void }) {
  return (
    <footer className="border-t mt-8" style={{ borderColor:"var(--moss)", background:"var(--sage-mid)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span>🌿</span>
              <span className="font-display text-base font-semibold" style={{ color:"var(--forest)" }}>Писатель.Плюс</span>
            </div>
            <p className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>Литературное сообщество для авторов и читателей</p>
          </div>
          <div>
            <div className="font-body text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color:"var(--ink-muted)" }}>Платформа</div>
            <div className="space-y-1.5">
              {[["about","О нас"],["rules","Правила"],["help","Справка"]].map(([id,l]) => (
                <button key={id} onClick={()=>onInfoPage(id)}
                  className="block font-body text-sm text-left" style={{ color:"var(--ink-soft)", background:"transparent" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-body text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color:"var(--ink-muted)" }}>Правовые</div>
            <div className="space-y-1.5">
              {[["privacy","Конфиденциальность"],["terms","Соглашение"]].map(([id,l]) => (
                <button key={id} onClick={()=>onInfoPage(id)}
                  className="block font-body text-sm text-left" style={{ color:"var(--ink-soft)", background:"transparent" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-body text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color:"var(--ink-muted)" }}>Связь</div>
            <div className="space-y-1.5">
              {["Поддержка","Обратная связь"].map(l => (
                <button key={l} className="block font-body text-sm text-left" style={{ color:"var(--ink-soft)", background:"transparent" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderColor:"var(--moss)" }}>
          <p className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>© 2026 Писатель.Плюс. Все права защищены.</p>
          <div className="flex gap-3">
            {[["privacy","Конфиденциальность"],["terms","Соглашение"]].map(([id,l]) => (
              <button key={id} onClick={()=>onInfoPage(id)}
                className="font-body text-xs" style={{ color:"var(--ink-muted)", background:"transparent" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   НАВИГАЦИЯ
════════════════════════════════════════ */
const NAV = [
  { id:"home", label:"Главная", icon:"Home" as const },
  { id:"manuscripts", label:"Манускрипты", icon:"ScrollText" as const },
  { id:"reader", label:"Читалка", icon:"BookOpen" as const },
  { id:"library", label:"Библиотека", icon:"Library" as const },
  { id:"duels", label:"Дуэли", icon:"Sword" as const },
  { id:"reviews", label:"Рецензии", icon:"Star" as const },
  { id:"coauthor", label:"Соавтор", icon:"Users" as const },
  { id:"events", label:"Праздники", icon:"Trophy" as const },
  { id:"top", label:"Топ", icon:"Award" as const },
  { id:"blogs", label:"Блоги", icon:"PenLine" as const },
  { id:"fireplace", label:"Каминная", icon:"Flame" as const },
];

/* ════════════════════════════════════════
   ГЛАВНЫЙ КОМПОНЕНТ
════════════════════════════════════════ */
export default function Index() {
  const [section, setSection] = useState("home");
  const [mobileNav, setMobileNav] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pendingName, setPendingName] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [infoPage, setInfoPage] = useState<string|null>(null);

  const goTo = (id: string) => {
    setSection(id); setMobileNav(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const handleLogin = (name: string) => {
    setPendingName(name);
    setShowOnboarding(true);
  };

  const handleOnboarding = (profile: { nick:string; role:string; [key:string]:string }) => {
    setUserName(profile.nick);
    setUserRole(profile.role);
    setIsLoggedIn(true);
    setShowOnboarding(false);
    setSection("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUserName(""); setUserRole("");
    setSection("home"); setShowProfile(false);
  };

  const closeAll = () => { setShowNotif(false); setShowMsg(false); setShowProfile(false); };

  const renderSection = () => {
    switch(section) {
      case "dashboard": return <DashboardSection userName={userName} userRole={userRole} onNav={goTo} onShowCreate={() => setShowCreate(true)} />;
      case "manuscripts": return <ManuscriptsSection />;
      case "reader": return <ReaderSection />;
      case "library": return <LibrarySection isLoggedIn={isLoggedIn} />;
      case "duels": return <DuelsSection />;
      case "reviews": return <ReviewsSection />;
      case "coauthor": return <CoauthorSection />;
      case "events": return <EventsSection />;
      case "top": return <TopAuthorsSection />;
      case "blogs": return <BlogsSection />;
      case "fireplace": return <FireplaceSection />;
      case "achievements": return <AchievementsSection />;
      default: return <HomeSection onNav={goTo} isLoggedIn={isLoggedIn} onShowAuth={() => setShowAuth(true)} />;
    }
  };

  const userInitials = userName ? userName.slice(0,2).toUpperCase() : "?";

  return (
    <div className="min-h-screen flex flex-col" style={{ color:"var(--ink)" }}>
      {/* ─── Шапка ─── */}
      <header className="sticky top-0 z-40 border-b"
        style={{ background:"rgba(234,242,228,0.93)", backdropFilter:"blur(14px)", borderColor:"var(--moss)" }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <button onClick={()=>goTo("home")} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">🌿</span>
            <span className="font-display text-xl font-semibold" style={{ color:"var(--forest)" }}>
              Писатель<span style={{ color:"var(--leaf)" }}>.Плюс</span>
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-0.5 overflow-x-auto mx-4">
            {NAV.map(n => (
              <button key={n.id} onClick={()=>goTo(n.id)}
                className={`nav-herb ${section===n.id?"active":""}`}>
                <Icon name={n.icon} size={12} />{n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <button onClick={()=>setShowCreate(true)}
                  className="olive-btn text-sm px-3 py-1.5 rounded-lg hidden md:flex items-center gap-1.5 mr-1">
                  <Icon name="Plus" size={14} />Создать
                </button>
                <button onClick={()=>{ closeAll(); setShowMsg(true); }}
                  className="relative p-2 rounded-lg" style={{ color:"var(--ink-soft)" }}>
                  <Icon name="MessageCircle" size={20} />
                  <div className="notif-badge" />
                </button>
                <button onClick={()=>{ closeAll(); setShowNotif(!showNotif); }}
                  className="relative p-2 rounded-lg" style={{ color:"var(--ink-soft)" }}>
                  <Icon name="Bell" size={20} />
                  <div className="notif-badge" />
                </button>
                <button onClick={()=>{ closeAll(); setShowProfile(!showProfile); }} className="ml-1">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="font-body text-xs font-semibold"
                      style={{ background:"var(--olive)", color:"var(--cream)" }}>{userInitials}</AvatarFallback>
                  </Avatar>
                </button>
              </>
            ) : (
              <button onClick={()=>setShowAuth(true)} className="olive-btn text-sm px-4 py-1.5 rounded-lg">
                Войти
              </button>
            )}
            <button onClick={()=>setMobileNav(!mobileNav)} className="xl:hidden p-2 ml-1" style={{ color:"var(--ink-soft)" }}>
              <Icon name={mobileNav?"X":"Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileNav && (
          <div className="xl:hidden border-t px-4 py-3 flex flex-wrap gap-1.5"
            style={{ borderColor:"var(--moss)", background:"var(--sage-mid)" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={()=>goTo(n.id)}
                className={`nav-herb text-xs ${section===n.id?"active":""}`}>
                <Icon name={n.icon} size={11} />{n.label}
              </button>
            ))}
            {isLoggedIn && (
              <button onClick={()=>{ setShowCreate(true); setMobileNav(false); }}
                className="nav-herb text-xs" style={{ background:"var(--olive)", color:"var(--cream)" }}>
                <Icon name="Plus" size={11} />Создать
              </button>
            )}
          </div>
        )}
      </header>

      {/* ─── Контент ─── */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div key={section} className="anim-up">
          {renderSection()}
        </div>
      </main>

      {/* ─── Подвал ─── */}
      <Footer onInfoPage={id=>setInfoPage(id)} />

      {/* ─── FAB ─── */}
      {isLoggedIn && (
        <div className="fixed bottom-6 right-6 z-40">
          <button onClick={()=>setShowCreate(true)}
            className="olive-btn flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-sm">
            <Icon name="Plus" size={16} />Создать
          </button>
        </div>
      )}

      {/* ─── Модалы и панели ─── */}
      {showAuth && <AuthModal onClose={()=>setShowAuth(false)} onLogin={handleLogin} />}
      {showOnboarding && <OnboardingModal initialName={pendingName} onComplete={handleOnboarding} />}
      {showCreate && <CreateModal onClose={()=>setShowCreate(false)} />}
      {infoPage && <InfoPageModal pageId={infoPage} onClose={()=>setInfoPage(null)} />}
      {showNotif && <NotifPanel onClose={()=>setShowNotif(false)} />}
      {showMsg && <MessengerPanel onClose={()=>setShowMsg(false)} />}
      {showProfile && (
        <ProfilePanel
          onClose={()=>setShowProfile(false)}
          userName={userName}
          userRole={userRole}
          onLogout={handleLogout}
          onDashboard={()=>{ goTo("dashboard"); setShowProfile(false); }}
          onAchievements={()=>{ goTo("achievements"); setShowProfile(false); }}
        />
      )}
    </div>
  );
}
