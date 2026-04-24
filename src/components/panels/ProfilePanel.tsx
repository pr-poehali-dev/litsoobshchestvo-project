import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfilePanelProps {
  onClose: () => void;
  userName: string;
  userRole: string;
  onLogout: () => void;
  onDashboard: () => void;
  onAchievements: () => void;
}

export default function ProfilePanel({ onClose, userName, userRole, onLogout, onDashboard, onAchievements }: ProfilePanelProps) {
  const initials = userName.slice(0,2).toUpperCase();
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-72 rounded-xl shadow-xl herb-border anim-up overflow-hidden"
        style={{ background:"var(--cream)" }} onClick={e=>e.stopPropagation()}>
        <div className="p-5" style={{ background:"linear-gradient(135deg, var(--sage), var(--sage-mid))" }}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="font-display text-lg font-semibold"
                style={{ background:"var(--olive)", color:"var(--cream)" }}>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{userName}</div>
              <span className="genre-badge">{userRole || "Автор"}</span>
            </div>
          </div>

          {/* Рейтинг */}
          <div className="p-2.5 rounded-xl mb-2 text-center" style={{ background:"rgba(255,255,255,0.5)" }}>
            <div className="font-display text-2xl font-bold" style={{ color:"var(--leaf)" }}>0</div>
            <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>Рейтинг автора</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[["0","книг"],["0","читателей"],["0","подписчиков"]].map(([v,l]) => (
              <div key={l} className="p-2 rounded-lg" style={{ background:"rgba(255,255,255,0.5)" }}>
                <div className="font-display text-lg font-semibold" style={{ color:"var(--leaf)" }}>{v}</div>
                <div className="font-body text-xs" style={{ color:"var(--ink-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          {/* Коммерческий статус */}
          <div className="mb-4 p-3 rounded-xl"
            style={{ background:"rgba(88,120,70,0.07)", border:"1px dashed var(--olive-light)" }}>
            <div className="font-body text-xs font-semibold mb-0.5" style={{ color:"var(--leaf)" }}>
              Коммерческий статус
            </div>
            <div className="font-body text-xs mb-2" style={{ color:"var(--ink-soft)" }}>
              200 000 знаков · 150 читателей · 50 подписчиков
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background:"var(--sage-mid)" }}>
              <div className="h-full rounded-full" style={{ width:"0%", background:"var(--leaf)" }} />
            </div>
            <div className="font-body text-xs mt-1" style={{ color:"var(--ink-muted)" }}>Начните писать!</div>
          </div>

          <button onClick={onDashboard}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
            style={{ color:"var(--ink-soft)", background:"transparent" }}>
            <Icon name="LayoutDashboard" size={15} style={{ color:"var(--leaf)" }} />
            Личный кабинет
          </button>
          <button onClick={onAchievements}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
            style={{ color:"var(--ink-soft)", background:"transparent" }}>
            <Icon name="Trophy" size={15} style={{ color:"var(--gold-herb)" }} />
            Достижения
          </button>
          {[["Мои рукописи","BookOpen"],["Моя библиотека","Library"],["Мой блог","PenLine"],["Настройки","Settings"]].map(([l,ic]) => (
            <button key={l}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
              style={{ color:"var(--ink-soft)", background:"transparent" }}>
              <Icon name={ic as "BookOpen"} size={15} style={{ color:"var(--leaf)" }} />
              {l}
            </button>
          ))}
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
            style={{ color:"var(--ink-soft)", background:"transparent" }}>
            <Icon name="HelpCircle" size={15} style={{ color:"var(--ink-muted)" }} />
            Техподдержка
          </button>
          <div className="my-2 border-t" style={{ borderColor:"var(--moss)" }} />
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all text-left"
            style={{ color:"#9e3030", background:"transparent" }}>
            <Icon name="LogOut" size={15} style={{ color:"#9e3030" }} />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
