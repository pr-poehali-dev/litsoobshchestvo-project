import Icon from "@/components/ui/icon";
import { MOCK_NOTIFS } from "@/data/mock";

export default function NotifPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4" onClick={onClose}>
      <div className="w-80 rounded-xl shadow-xl herb-border anim-up max-h-[80vh] overflow-hidden flex flex-col"
        style={{ background:"var(--cream)" }} onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0" style={{ borderColor:"var(--moss)" }}>
          <h3 className="font-display text-lg font-semibold" style={{ color:"var(--ink)" }}>Оповещения</h3>
          <button onClick={onClose}><Icon name="X" size={17} style={{ color:"var(--ink-muted)" }} /></button>
        </div>
        <div className="overflow-y-auto">
          {MOCK_NOTIFS.map((n, i) => (
            <div key={i} className="flex gap-3 p-4 border-b last:border-b-0 cursor-pointer"
              style={{ borderColor:"var(--moss)", background:n.unread?"rgba(88,120,70,0.05)":"transparent" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:"var(--sage-mid)" }}>
                <Icon name={n.icon} size={13} style={{ color:"var(--leaf)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm" style={{ color:"var(--ink-soft)" }}>{n.text}</p>
                <p className="font-body text-xs mt-0.5" style={{ color:"var(--ink-muted)" }}>{n.time}</p>
              </div>
              {n.unread && <div className="pulse-dot mt-1.5 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
