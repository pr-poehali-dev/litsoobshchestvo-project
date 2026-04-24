import { useState } from "react";
import Icon from "@/components/ui/icon";
import Toggle from "@/components/shared/Toggle";
import { FLAT_GENRES, BOOK_FORMS, CONTENT_LABELS, ACCESS_OPTIONS, BLOG_TOPICS } from "@/data/genres";

interface CreateModalProps {
  onClose: () => void;
}

export default function CreateModal({ onClose }: CreateModalProps) {
  const [step, setStep] = useState<"choose"|"book"|"blog"|"done">("choose");
  const [bookPage, setBookPage] = useState(1);

  const [title, setTitle] = useState("");
  const [coauthor, setCoauthor] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [form, setForm] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [coverName, setCoverName] = useState("");
  const [viewAccess, setViewAccess] = useState("Все");
  const [downloadAccess, setDownloadAccess] = useState("Друзья и подписчики");
  const [commentAccess, setCommentAccess] = useState("Все");
  const [freeFragment, setFreeFragment] = useState(false);
  const [redLine, setRedLine] = useState(true);
  const [copyProtect, setCopyProtect] = useState(true);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogTopic, setBlogTopic] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogComments, setBlogComments] = useState(true);
  const [blogVisibility, setBlogVisibility] = useState("Все");
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogTagInput, setBlogTagInput] = useState("");

  const toggleGenre = (g: string) => {
    if (selectedGenres.includes(g)) setSelectedGenres(s => s.filter(x => x !== g));
    else if (selectedGenres.length < 3) setSelectedGenres(s => [...s, g]);
  };

  const addTag = (list: string[], setList: (l:string[])=>void, input: string, setInput: (s:string)=>void, max=12) => {
    const t = input.trim();
    if (t && !list.includes(t) && list.length < max) { setList([...list, t]); setInput(""); }
  };

  const removeTag = (list: string[], setList: (l:string[])=>void, t: string) => setList(list.filter(x=>x!==t));

  if (step==="done") return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl shadow-2xl herb-border p-10 text-center anim-up"
        style={{ background:"var(--cream)" }} onClick={e=>e.stopPropagation()}>
        <div className="text-5xl mb-4">📜</div>
        <h3 className="font-display text-2xl font-semibold mb-2" style={{ color:"var(--forest)" }}>Готово!</h3>
        <p className="font-body text-sm mb-5" style={{ color:"var(--ink-muted)" }}>
          {step==="done" && title ? `«${title}» сохранена в черновиках` : "Публикация сохранена"}
        </p>
        <button className="olive-btn px-6 py-2.5 rounded-lg text-sm" onClick={onClose}>Перейти к написанию</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 p-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl herb-border overflow-hidden anim-up my-4"
        style={{ background:"var(--cream)" }} onClick={e=>e.stopPropagation()}>

        {/* Шапка */}
        <div className="flex items-center justify-between p-4 border-b"
          style={{ borderColor:"var(--moss)", background:"linear-gradient(to right, var(--sage), var(--sage-mid))" }}>
          <div className="flex items-center gap-2">
            {step!=="choose" && (
              <button onClick={() => step==="book"&&bookPage>1 ? setBookPage(p=>p-1) : setStep("choose")}
                className="p-1 rounded-lg mr-1" style={{ color:"var(--ink-soft)" }}>
                <Icon name="ArrowLeft" size={16} />
              </button>
            )}
            <h3 className="font-display text-lg font-semibold" style={{ color:"var(--forest)" }}>
              {step==="choose"?"Создать":step==="book"?`Новая книга — шаг ${bookPage}/2`:"Новый пост в блоге"}
            </h3>
          </div>
          <button onClick={onClose}><Icon name="X" size={18} style={{ color:"var(--ink-muted)" }} /></button>
        </div>

        {/* Выбор */}
        {step==="choose" && (
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { id:"book", icon:"📜", title:"Написать книгу", desc:"Роман, повесть, рассказ, поэзия, сборник" },
              { id:"blog", icon:"✍️", title:"Написать блог", desc:"Личное, статьи, конкурсы, самопиар" },
            ].map(opt => (
              <button key={opt.id} onClick={()=>setStep(opt.id as "book"|"blog")}
                className="card-herb p-5 text-left" style={{ background:"var(--sage)" }}>
                <div className="text-3xl mb-2">{opt.icon}</div>
                <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{opt.title}</div>
                <div className="font-body text-xs mt-1" style={{ color:"var(--ink-muted)" }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Книга — шаг 1 */}
        {step==="book" && bookPage===1 && (
          <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex gap-1" style={{ color:"var(--ink-soft)" }}>
                Название <span style={{ color:"#c04040" }}>*</span>
              </label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Введите название произведения"
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Соавтор</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>необязательно</span>
              </label>
              <input value={coauthor} onChange={e=>setCoauthor(e.target.value)} placeholder="Поиск по @нику или имени"
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Жанры</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>до 3-х</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                {FLAT_GENRES.map(g => (
                  <button key={g} onClick={()=>toggleGenre(g)}
                    className="px-2.5 py-1 rounded-full font-body text-xs transition-all flex-shrink-0"
                    style={selectedGenres.includes(g)
                      ? { background:"var(--olive)", color:"var(--cream)" }
                      : selectedGenres.length>=3
                        ? { color:"var(--ink-muted)", border:"1px solid var(--moss)", background:"transparent", opacity:0.5 }
                        : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color:"var(--ink-soft)" }}>Форма произведения</label>
              <div className="flex flex-wrap gap-2">
                {BOOK_FORMS.map(f => (
                  <button key={f} onClick={()=>setForm(f)}
                    className="px-3 py-1.5 rounded-lg font-body text-xs transition-all"
                    style={form===f
                      ? { background:"var(--leaf)", color:"var(--cream)" }
                      : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Аннотация</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>{annotation.length}/5000</span>
              </label>
              <textarea value={annotation} onChange={e=>e.target.value.length<=5000&&setAnnotation(e.target.value)}
                placeholder="Краткое описание вашей книги..." rows={3}
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border resize-none"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Тэги</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>{tagsList.length}/12</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addTag(tagsList,setTagsList,tagInput,setTagInput,12)}
                  placeholder="Введите тэг и нажмите Enter"
                  className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
                  style={{ background:"var(--sage)", color:"var(--ink)" }} />
                <button onClick={()=>addTag(tagsList,setTagsList,tagInput,setTagInput,12)}
                  className="olive-btn px-3 py-2 rounded-lg text-sm">+</button>
              </div>
              {tagsList.length>0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tagsList.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full font-body text-xs"
                      style={{ background:"rgba(88,120,70,0.12)", color:"var(--leaf)" }}>
                      {t}
                      <button onClick={()=>removeTag(tagsList,setTagsList,t)} style={{ color:"var(--ink-muted)" }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color:"var(--ink-soft)" }}>Примечание автора</label>
              <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Дополнительная информация для читателей..." rows={2}
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border resize-none"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Дисклеймер</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>{disclaimer.length}/3000 · при наличии тяжёлого контента</span>
              </label>
              <textarea value={disclaimer} onChange={e=>e.target.value.length<=3000&&setDisclaimer(e.target.value)}
                placeholder="Если произведение содержит описания насилия, жестокости или иного тяжёлого контента — укажите здесь дисклеймер..." rows={2}
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border resize-none"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-2 block" style={{ color:"var(--ink-soft)" }}>
                Метки содержания <span className="font-normal" style={{ color:"var(--ink-muted)" }}>(отметьте при наличии)</span>
              </label>
              {CONTENT_LABELS.map(l => (
                <label key={l.id} className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg mb-1"
                  style={{ background:labels.includes(l.id)?"rgba(88,120,70,0.06)":"transparent" }}>
                  <input type="checkbox" checked={labels.includes(l.id)}
                    onChange={()=>setLabels(prev=>prev.includes(l.id)?prev.filter(x=>x!==l.id):[...prev,l.id])} />
                  <span className={`content-tag ${l.cls}`}>{l.label}</span>
                </label>
              ))}
            </div>

            <button onClick={()=>setBookPage(2)} disabled={!title.trim()}
              className="w-full olive-btn py-2.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Далее →
            </button>
          </div>
        )}

        {/* Книга — шаг 2 */}
        {step==="book" && bookPage===2 && (
          <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
            <div>
              <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color:"var(--ink-soft)" }}>Обложка</label>
              <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition-all"
                style={{ border:"2px dashed var(--moss)", background:coverName?"rgba(88,120,70,0.07)":"var(--sage)" }}>
                {coverName ? (
                  <>
                    <Icon name="Image" size={24} style={{ color:"var(--leaf)" }} />
                    <span className="font-body text-sm" style={{ color:"var(--leaf)" }}>{coverName}</span>
                    <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>Нажмите, чтобы изменить</span>
                  </>
                ) : (
                  <>
                    <Icon name="Upload" size={24} style={{ color:"var(--ink-muted)" }} />
                    <span className="font-body text-sm" style={{ color:"var(--ink-soft)" }}>Загрузить обложку</span>
                    <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>JPG, PNG · до 5 МБ</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden"
                  onChange={e=>setCoverName(e.target.files?.[0]?.name||"")} />
              </label>
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-2 block" style={{ color:"var(--ink-soft)" }}>Настройки доступа</label>
              <div className="space-y-3 p-3 rounded-xl" style={{ background:"var(--sage)" }}>
                {[
                  { label:"Кто видит произведение", value:viewAccess, set:setViewAccess },
                  { label:"Кто может скачивать", value:downloadAccess, set:setDownloadAccess },
                  { label:"Кто может комментировать", value:commentAccess, set:setCommentAccess },
                ].map(row => (
                  <div key={row.label}>
                    <div className="font-body text-xs mb-1.5" style={{ color:"var(--ink-muted)" }}>{row.label}</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {ACCESS_OPTIONS.map(opt => (
                        <button key={opt} onClick={()=>row.set(opt)}
                          className="px-2.5 py-1 rounded-full font-body text-xs transition-all"
                          style={row.value===opt
                            ? { background:"var(--olive)", color:"var(--cream)" }
                            : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"var(--cream)" }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label:"Ознакомительный фрагмент", desc:"Отметить часть глав как бесплатный фрагмент", val:freeFragment, set:setFreeFragment },
                { label:"Красная строка", desc:"Отображать все абзацы с красной строки", val:redLine, set:setRedLine },
                { label:"Защита от копирования", desc:"Запрет выделения, копирования и скачивания текста (включена по умолчанию)", val:copyProtect, set:setCopyProtect },
              ].map(sw => (
                <div key={sw.label} className="flex items-start justify-between gap-3 p-3 rounded-xl"
                  style={{ background:"var(--sage)" }}>
                  <div className="flex-1">
                    <div className="font-body text-sm font-medium" style={{ color:"var(--ink)" }}>{sw.label}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color:"var(--ink-muted)" }}>{sw.desc}</div>
                  </div>
                  <Toggle value={sw.val} onChange={sw.set} />
                </div>
              ))}
            </div>

            <button onClick={()=>setStep("done")} disabled={!title.trim()}
              className="w-full olive-btn py-2.5 rounded-lg text-sm disabled:opacity-50">
              Создать книгу
            </button>
          </div>
        )}

        {/* Блог */}
        {step==="blog" && (
          <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto">
            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex gap-1" style={{ color:"var(--ink-soft)" }}>
                Заголовок <span style={{ color:"#c04040" }}>*</span>
              </label>
              <input value={blogTitle} onChange={e=>setBlogTitle(e.target.value)} placeholder="Тема вашей записи"
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex gap-1" style={{ color:"var(--ink-soft)" }}>
                Раздел <span style={{ color:"#c04040" }}>*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {BLOG_TOPICS.map(t => (
                  <button key={t} onClick={()=>setBlogTopic(t)}
                    className="px-2.5 py-1 rounded-full font-body text-xs transition-all"
                    style={blogTopic===t
                      ? { background:"var(--olive)", color:"var(--cream)" }
                      : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color:"var(--ink-soft)" }}>Текст</label>
              <textarea value={blogText} onChange={e=>setBlogText(e.target.value)} placeholder="Начните писать..." rows={6}
                className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border resize-none"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
            </div>

            <div>
              <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
                <span>Тэги</span>
                <span className="font-normal" style={{ color:"var(--ink-muted)" }}>{blogTags.length}/10</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input value={blogTagInput} onChange={e=>setBlogTagInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addTag(blogTags,setBlogTags,blogTagInput,setBlogTagInput,10)}
                  placeholder="Тэг + Enter"
                  className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
                  style={{ background:"var(--sage)", color:"var(--ink)" }} />
                <button onClick={()=>addTag(blogTags,setBlogTags,blogTagInput,setBlogTagInput,10)}
                  className="olive-btn px-3 py-2 rounded-lg text-sm">+</button>
              </div>
              {blogTags.length>0 && (
                <div className="flex flex-wrap gap-1.5">
                  {blogTags.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full font-body text-xs"
                      style={{ background:"rgba(88,120,70,0.12)", color:"var(--leaf)" }}>
                      {t}
                      <button onClick={()=>removeTag(blogTags,setBlogTags,t)} style={{ color:"var(--ink-muted)" }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background:"var(--sage)" }}>
                <div>
                  <div className="font-body text-sm font-medium" style={{ color:"var(--ink)" }}>Комментарии</div>
                  <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>Разрешить читателям комментировать</div>
                </div>
                <Toggle value={blogComments} onChange={setBlogComments} />
              </div>
              <div className="p-3 rounded-xl" style={{ background:"var(--sage)" }}>
                <div className="font-body text-sm font-medium mb-2" style={{ color:"var(--ink)" }}>Видимость</div>
                <div className="flex gap-2">
                  {["Все","Друзья и подписчики","Только я"].map(v => (
                    <button key={v} onClick={()=>setBlogVisibility(v)}
                      className="flex-1 py-1.5 rounded-lg font-body text-xs transition-all"
                      style={blogVisibility===v
                        ? { background:"var(--olive)", color:"var(--cream)" }
                        : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={()=>setStep("done")} disabled={!blogTitle.trim()||!blogTopic}
              className="w-full olive-btn py-2.5 rounded-lg text-sm disabled:opacity-50">
              Опубликовать
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
