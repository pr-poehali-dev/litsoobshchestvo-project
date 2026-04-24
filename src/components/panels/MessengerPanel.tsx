import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_MESSAGES } from "@/data/mock";

export default function MessengerPanel({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(MOCK_MESSAGES[0]);
  const [chatMsg, setChatMsg] = useState("");
  const [hist, setHist] = useState([
    { me:false, text:"Спасибо за рецензию, очень приятно!" },
    { me:true, text:"Ваша работа заслуживает ещё большего внимания." },
  ]);

  const send = () => {
    if (!chatMsg.trim()) return;
    setHist([...hist, { me:true, text:chatMsg }]);
    setChatMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15" onClick={onClose}>
      <div className="w-full max-w-2xl h-[500px] rounded-xl shadow-2xl herb-border flex overflow-hidden anim-up"
        style={{ background:"var(--cream)" }} onClick={e=>e.stopPropagation()}>

        {/* Список */}
        <div className="w-56 border-r flex flex-col flex-shrink-0"
          style={{ borderColor:"var(--moss)", background:"var(--sage)" }}>
          <div className="p-3 border-b flex-shrink-0" style={{ borderColor:"var(--moss)" }}>
            <span className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>Сообщения</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_MESSAGES.map(m => (
              <div key={m.id} onClick={() => setActive(m)} className="flex gap-2 p-3 cursor-pointer"
                style={{
                  background:active.id===m.id?"rgba(88,120,70,0.1)":"transparent",
                  borderLeft:active.id===m.id?"3px solid var(--leaf)":"3px solid transparent",
                }}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="font-body text-xs"
                    style={{ background:"var(--sage-deep)", color:"var(--forest)" }}>{m.av}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-body text-xs font-semibold truncate" style={{ color:"var(--ink)" }}>{m.user}</span>
                    <span className="font-body text-xs flex-shrink-0" style={{ color:"var(--ink-muted)" }}>{m.time}</span>
                  </div>
                  <p className="font-body text-xs truncate" style={{ color:"var(--ink-muted)" }}>{m.last}</p>
                </div>
                {m.unread>0 && (
                  <span className="w-4 h-4 rounded-full text-xs font-body flex items-center justify-center flex-shrink-0"
                    style={{ background:"var(--leaf)", color:"var(--cream)" }}>{m.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Чат */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor:"var(--moss)" }}>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-semibold" style={{ color:"var(--ink)" }}>{active.user}</span>
              {active.user==="Техподдержка" && (
                <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background:"var(--leaf)", color:"var(--cream)" }}>
                  Поддержка
                </span>
              )}
            </div>
            <button onClick={onClose}><Icon name="X" size={17} style={{ color:"var(--ink-muted)" }} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {active.user==="Техподдержка" && (
              <div className="text-center py-3">
                <div className="font-body text-xs px-3 py-2 rounded-xl inline-block"
                  style={{ background:"rgba(88,120,70,0.1)", color:"var(--leaf)" }}>
                  🛠️ Служба поддержки Писатель.Плюс · Мы отвечаем в течение 24 часов
                </div>
              </div>
            )}
            {hist.map((c, i) => (
              <div key={i} className={`flex ${c.me?"justify-end":"justify-start"}`}>
                <div className="max-w-xs px-3 py-2 font-body text-sm"
                  style={{
                    background:c.me?"var(--olive)":"var(--sage-mid)",
                    color:c.me?"var(--cream)":"var(--ink-soft)",
                    borderRadius:c.me?"12px 12px 2px 12px":"12px 12px 12px 2px",
                  }}>
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-shrink-0 p-3 border-t" style={{ borderColor:"var(--moss)" }}>
            <div className="flex gap-2 items-center">
              <button className="p-1.5 rounded-lg" style={{ color:"var(--ink-muted)", background:"transparent" }}>
                <Icon name="Smile" size={16} />
              </button>
              <button className="p-1.5 rounded-lg" style={{ color:"var(--ink-muted)", background:"transparent" }}>
                <Icon name="Image" size={16} />
              </button>
              <button className="p-1.5 rounded-lg" style={{ color:"var(--ink-muted)", background:"transparent" }}>
                <Icon name="Mic" size={16} />
              </button>
              <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&send()}
                placeholder="Написать... (ссылки запрещены)"
                className="flex-1 px-3 py-2 rounded-lg font-body text-sm outline-none herb-border"
                style={{ background:"var(--sage)", color:"var(--ink)" }} />
              <button onClick={send} className="olive-btn px-3 py-2 rounded-lg">
                <Icon name="Send" size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
