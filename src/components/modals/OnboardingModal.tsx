import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ROLES } from "@/data/mock";

interface OnboardingModalProps {
  initialName: string;
  onComplete: (profile: { nick: string; fullName: string; bday: string; about: string; contacts: string; role: string }) => void;
}

export default function OnboardingModal({ initialName, onComplete }: OnboardingModalProps) {
  const [nick, setNick] = useState(initialName);
  const [fullName, setFullName] = useState("");
  const [bday, setBday] = useState("");
  const [about, setAbout] = useState("");
  const [contacts, setContacts] = useState("");
  const [role, setRole] = useState("");

  const canSubmit = nick.trim().length > 0 && role.length > 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl shadow-2xl herb-border overflow-hidden my-4"
        style={{ background: "var(--cream)" }}>
        <div className="p-5 border-b"
          style={{ borderColor:"var(--moss)", background:"linear-gradient(to right, var(--sage), var(--sage-mid))" }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🌿</span>
            <h2 className="font-display text-xl font-semibold" style={{ color:"var(--forest)" }}>Расскажите о себе</h2>
          </div>
          <p className="font-body text-sm" style={{ color:"var(--ink-muted)" }}>
            Это поможет сообществу вас найти. Займёт меньше минуты.
          </p>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Псевдоним — обязательно */}
          <div>
            <label className="font-body text-xs font-semibold mb-1.5 flex gap-1" style={{ color:"var(--ink-soft)" }}>
              Псевдоним <span style={{ color:"#c04040" }}>*</span>
            </label>
            <input value={nick} onChange={e=>setNick(e.target.value)} placeholder="Ваш ник на платформе"
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
              style={{ background:"var(--sage)", color:"var(--ink)" }} />
            <p className="font-body text-xs mt-1" style={{ color:"var(--ink-muted)" }}>Отображается на странице профиля</p>
          </div>

          {/* ФИО — по желанию */}
          <div>
            <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
              <span>ФИО автора</span>
              <span className="font-normal" style={{ color:"var(--ink-muted)" }}>по желанию</span>
            </label>
            <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Фамилия Имя Отчество"
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
              style={{ background:"var(--sage)", color:"var(--ink)" }} />
          </div>

          {/* Дата рождения — по желанию */}
          <div>
            <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
              <span>Дата рождения</span>
              <span className="font-normal" style={{ color:"var(--ink-muted)" }}>по желанию</span>
            </label>
            <input type="date" value={bday} onChange={e=>setBday(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
              style={{ background:"var(--sage)", color:"var(--ink)" }} />
          </div>

          {/* О себе */}
          <div>
            <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
              <span>О себе</span>
              <span className="font-normal" style={{ color:"var(--ink-muted)" }}>по желанию</span>
            </label>
            <textarea value={about} onChange={e=>setAbout(e.target.value)}
              placeholder="Немного о себе, своём творчестве, интересах..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border resize-none"
              style={{ background:"var(--sage)", color:"var(--ink)" }} />
          </div>

          {/* Контакты */}
          <div>
            <label className="font-body text-xs font-semibold mb-1.5 flex justify-between" style={{ color:"var(--ink-soft)" }}>
              <span>Контакты</span>
              <span className="font-normal" style={{ color:"var(--ink-muted)" }}>по желанию</span>
            </label>
            <input value={contacts} onChange={e=>setContacts(e.target.value)}
              placeholder="VK, Telegram, e-mail..."
              className="w-full px-3 py-2.5 rounded-lg font-body text-sm outline-none herb-border"
              style={{ background:"var(--sage)", color:"var(--ink)" }} />
          </div>

          {/* Роль — обязательно */}
          <div>
            <label className="font-body text-xs font-semibold mb-2 flex gap-1" style={{ color:"var(--ink-soft)" }}>
              Кто вы? <span style={{ color:"#c04040" }}>*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map(r => {
                const icons: Record<string,string> = { "Автор":"✍️","Читатель":"📖","Художник":"🎨","Режиссёр":"🎬","Чтец":"🎙️" };
                return (
                  <button key={r} onClick={() => setRole(r)}
                    className="flex items-center gap-2 p-3 rounded-xl border font-body text-sm font-medium transition-all"
                    style={role===r
                      ? { background:"var(--olive)", color:"var(--cream)", borderColor:"var(--olive)" }
                      : { background:"var(--sage)", color:"var(--ink-soft)", borderColor:"var(--moss)" }}>
                    <span>{icons[r]}</span>{r}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => onComplete({ nick, fullName, bday, about, contacts, role })}
            disabled={!canSubmit}
            className="w-full olive-btn py-3 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Icon name="CheckCircle" size={16} />
            Готово, начинаем!
          </button>
        </div>
      </div>
    </div>
  );
}
