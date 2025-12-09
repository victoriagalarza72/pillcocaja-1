import React from "react";

type Item = { id: string; title: string };
type Props = {
  items: Item[];
  activeId: string;
  onClick?: (id: string) => void;
  railWidth?: number; // 🟢 nuevo
  showLabels?: boolean;
  visible?: boolean;
};

const SectionRail: React.FC<Props> = ({ items, activeId, onClick, railWidth = 136, showLabels = true, visible = true }) => {
  // Default backgrounds:
  // - Home "sec-special" uses a darker translucent tone
  // - Green Coffee "g-microlots" uses deep forest rgb(11,41,27)
  // - Fallback to olive tone
  const railBg =
    activeId === 'r-where' || activeId === 'r-contact'
      ? 'transparent'
      : activeId === "sec-quote"
      ? "rgb(107, 113, 69)"
      : activeId === "sec-special"
      ? '#00000091'
      : activeId === 'g-nanolots'
      ? '#00000091'
      : activeId === 'g-microlots'
      ? 'rgb(11, 41, 27)'
      : activeId === 's-community'
      ? 'rgba(145, 93, 55, 0.92)'
      : activeId === 's-impact'
      ? 'transparent'
      : activeId === 's-goals'
      ? '#0b291b'
      : activeId === 'c-form'
      ? '#0b291b'
      : activeId === 'g-terroir' || activeId === 'r-terroir' || activeId === 'g-harvest'
      ? 'rgb(0 0 0 / 39%)'
      : activeId === 'r-benefits' || activeId === 'r-profiles' || activeId === 'g-roasting'
      ? 'rgb(16 36 26)'
      : '#6b7145';
  const railShadow = (activeId === 'r-benefits' || activeId === 'r-where' || activeId === 'r-contact' || activeId === 's-impact') ? '' : 'shadow-[inset_-1px_0_0_rgba(255,255,255,.08)]';
  return (
    <aside
      className={`hidden md:flex fixed left-0 top-0 h-screen z-20 transform-gpu transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-3 pointer-events-none'}`}
      style={{ width: visible ? railWidth : 0 }}
    >
      {/* franja verde */}
      <div
        className={`w-full transition-colors duration-500 ease-out ${railShadow}`}
        style={{
          backgroundColor: railBg,
          backgroundImage:
            activeId === 's-community'
              ? `linear-gradient(rgba(145,93,55,0.92), rgba(145,93,55,0.92)), url("src/assets/illustrations/cafeflor.svg")`
              : undefined,
          backgroundSize: activeId === 's-community' ? 'contain' : undefined,
          backgroundRepeat: activeId === 's-community' ? 'no-repeat' : undefined,
          backgroundPosition: activeId === 's-community' ? 'center 85%' : undefined,
        }}
      />
      {/* títulos encima (opcional) */}
      {showLabels && (
        <div className="absolute inset-0 pl-5 pr-3 py-9 flex flex-col gap-4">
          {items.map((it) => {
            const active = it.id === activeId;
            return (
              <button
                key={it.id}
                onClick={() => onClick?.(it.id)}
                className="text-left group"
              >
                <div className="flex items-center gap-3">
                  <span
                  className={`h-px transition-all ${active ? "bg-cream-200 w-12" : "bg-white/30 w-7"}`}
                  />
                  <span
                    className={`uppercase tracking-wide text-[12px] ${
                    active ? "text-cream-200" : "text-white/70"
                    }`}
                  >
                    {it.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default SectionRail;
