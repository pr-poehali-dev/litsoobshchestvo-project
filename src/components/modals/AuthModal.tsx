import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SOCIAL_PROVIDERS } from "@/data/mock";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string) => void;
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [tab, setTab] = useState<"login"|"register">("login");
  const [method, setMethod] = useState<"social"|"email"|"phone">("social");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  const submit = () => {
    const display = name || email.split("@")[0] || phone || "Пользователь";
    setDone(true);
    setTimeout(() => { onLogin(display); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl herb-border overflow-hidden anim-up"
        style={{ background: "var(--cream)" }} onClick={e => e.stopPropagation()}>

        {done ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: "var(--forest)" }}>Добро пожаловать!</h3>
            <p className="font-body text-sm" style={{ color: "var(--ink-muted)" }}>Заполним анкету для продолжения...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: "var(--moss)", background: "linear-gradient(to right, var(--sage), var(--sage-mid))" }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌿</span>
                <span className="font-display text-lg font-semibold" style={{ color: "var(--forest)" }}>Писатель.Плюс</span>
              </div>
              <button onClick={onClose}><Icon name="X" size={18} style={{ color: "var(--ink-muted)" }} /></button>
            </div>

            {/* Табы */}
            <div className="flex border-b" style={{ borderColor: "var(--moss)" }}>
              {(["login","register"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="flex-1 py-3 font-body text-sm font-medium transition-all"
                  style={tab===t
                    ? { color:"var(--forest)", borderBottom:"2px solid var(--leaf)", background:"transparent" }
                    : { color:"var(--ink-muted)", borderBottom:"2px solid transparent", background:"transparent" }}>
                  {t==="login" ? "Войти" : "Зарегистрироваться"}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Способ */}
              <div className="flex gap-2 mb-5">
                {(["social","email","phone"] as const).map(m => (
                  <button key={m} onClick={() => setMethod(m)}
                    className="flex-1 py-1.5 rounded-lg font-body text-xs transition-all"
                    style={method===m
                      ? { background:"var(--olive)", color:"var(--cream)" }
                      : { color:"var(--ink-soft)", border:"1px solid var(--moss)", background:"transparent" }}>
                    {m==="social"?"Соцсети":m==="email"?"E-mail":"Телефон"}
                  </button>
                ))}
              </div>

              {method === "social" && (
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_PROVIDERS.map(p => (
                    <button key={p.id} onClick={submit}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border font-body text-sm font-medium transition-all hover:scale-[1.02] active:scale-95"
                      style={{ background:p.bg, borderColor:p.color+"40", color:"#1a1a1a" }}>
                      <span className="text-lg">{p.emoji}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {method === "email" && (
                <div className="space-y-3">
                  {tab==="register" && (
                    <div>
                      <label className="font-body text-xs font-medium mb-1 block" style={{ color:"var(--ink-muted)" }}>Имя / псевдоним</label>
                      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Как вас называть?"
                        className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                        style={{ background:"var(--sage)", color:"var(--ink)" }} />
                    </div>
                  )}
                  <div>
                    <label className="font-body text-xs font-medium mb-1 block" style={{ color:"var(--ink-muted)" }}>E-mail</label>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                      style={{ background:"var(--sage)", color:"var(--ink)" }} />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium mb-1 block" style={{ color:"var(--ink-muted)" }}>Пароль</label>
                    <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
                      className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                      style={{ background:"var(--sage)", color:"var(--ink)" }} />
                  </div>
                  {tab==="register" && (
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-0.5" />
                      <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                        Соглашаюсь с <span className="underline" style={{ color:"var(--leaf)" }}>Пользовательским соглашением</span> и <span className="underline" style={{ color:"var(--leaf)" }}>Политикой конфиденциальности</span>
                      </span>
                    </label>
                  )}
                  <button onClick={submit} disabled={!email||!pass||(tab==="register"&&!agree)}
                    className="w-full olive-btn py-2.5 rounded-lg text-sm disabled:opacity-50">
                    {tab==="login"?"Войти":"Создать аккаунт"}
                  </button>
                </div>
              )}

              {method === "phone" && (
                <div className="space-y-3">
                  {tab==="register" && (
                    <div>
                      <label className="font-body text-xs font-medium mb-1 block" style={{ color:"var(--ink-muted)" }}>Имя / псевдоним</label>
                      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Как вас называть?"
                        className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                        style={{ background:"var(--sage)", color:"var(--ink)" }} />
                    </div>
                  )}
                  <div>
                    <label className="font-body text-xs font-medium mb-1 block" style={{ color:"var(--ink-muted)" }}>Номер телефона</label>
                    <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+7 (900) 000-00-00"
                      className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
                      style={{ background:"var(--sage)", color:"var(--ink)" }} />
                  </div>
                  {tab==="register" && (
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-0.5" />
                      <span className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>
                        Соглашаюсь с <span className="underline" style={{ color:"var(--leaf)" }}>Пользовательским соглашением</span>
                      </span>
                    </label>
                  )}
                  <button onClick={submit} disabled={!phone||(tab==="register"&&!agree)}
                    className="w-full olive-btn py-2.5 rounded-lg text-sm disabled:opacity-50">
                    Получить код по SMS
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
