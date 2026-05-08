"use client";

export type GuitarType = "stratocaster" | "telecaster" | "lespaul" | "sg" | "offset";

interface GuitarSelectorProps {
  selected: GuitarType;
  onSelect: (type: GuitarType) => void;
}

const GUITAR_MODELS: { type: GuitarType; label: string; color: string }[] = [
  { type: "stratocaster", label: "STRATOCASTER", color: "#111111" },
  { type: "telecaster", label: "TELECASTER", color: "#8FBFAA" },
  { type: "lespaul", label: "LES PAUL", color: "#C8922A" },
  { type: "sg", label: "SG", color: "#8B1A1A" },
  { type: "offset", label: "OFFSET", color: "#F2C4C4" },
];

/* SVG silhouettes with translucent glass effect */
function GuitarSilhouette({ type, color }: { type: GuitarType; color: string }) {
  const uid = `grad-${type}`;

  /* Shared glass gradient + highlight defs */
  const glassDefs = (
    <defs>
      <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.85" />
        <stop offset="40%" stopColor={color} stopOpacity="0.5" />
        <stop offset="100%" stopColor={color} stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id={`${uid}-shine`} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  );

  const bodyFill = `url(#${uid}-body)`;
  const shineFill = `url(#${uid}-shine)`;
  const edgeStroke = `url(#${uid}-edge)`;

  switch (type) {
    case "stratocaster":
      return (
        <svg viewBox="0 0 60 160" className="w-full h-full">
          {glassDefs}
          {/* Headstock - Large CBS 70s */}
          <path d="M25 10 Q24 2 28 0 L32 0 Q38 1 38 6 Q38 10 32 10 Q30 10 28 10 Z" fill="#e6c280" stroke="#b89a5a" strokeWidth="0.3" />
          <path d="M25 10 C20 8 20 2 28 0 L34 0 C40 1 42 6 36 10 C34 11 32 10 30 10 Z" fill="#e6c280" stroke="#b89a5a" strokeWidth="0.3" />
          {/* Fretboard/Neck */}
          <rect x="26" y="10" width="8" height="63" rx="1" fill="#e6c280" />
          <rect x="26.5" y="10" width="7" height="63" rx="1" fill="#5c3a1e" opacity="0.6" />
          {/* Tuners */}
          {[1, 3, 5, 7, 9, 11].map((y) => (
            <rect key={y} x="36" y={y} width="5" height="1.5" rx="0.5" fill="#ccc" />
          ))}
          {/* Fret dots (black) */}
          {[20, 28, 36, 44, 60, 68].map(cy => <circle key={cy} cx="30" cy={cy} r="1" fill="#111" />)}
          <circle cx="28" cy="52" r="1" fill="#111" />
          <circle cx="32" cy="52" r="1" fill="#111" />
          
          {/* Body - translucent realistic shape */}
          <path d="M30 156 C15 156 5 140 10 115 C12 105 10 85 5 75 C3 70 8 70 12 73 C16 75 22 73 26 73 L34 73 C38 73 44 75 48 73 C52 70 57 70 55 75 C50 85 48 105 50 115 C55 140 45 156 30 156 Z" fill={bodyFill} stroke={edgeStroke} strokeWidth="0.6" />
          
          {/* Glass highlight */}
          <path d="M12 75 C8 85 10 105 14 112 C18 100 16 80 20 76 Z" fill={shineFill} />
          
          {/* Pickguard - Accurate Black shape with white border */}
          <path d="M14 78 C10 85 12 105 14 110 C16 115 20 120 28 120 L36 120 C42 120 44 115 44 105 C44 95 38 85 36 85 L36 78 Z" fill="#111" stroke="#ddd" strokeWidth="0.5" opacity="0.9" />
          
          {/* Pickups - Black */}
          <rect x="18" y="86" width="22" height="4" rx="1.5" fill="#222" stroke="#444" strokeWidth="0.4" />
          <rect x="18" y="96" width="22" height="4" rx="1.5" fill="#222" stroke="#444" strokeWidth="0.4" />
          <rect x="18" y="106" width="22" height="4" rx="1.5" fill="#222" stroke="#444" strokeWidth="0.4" />
          {/* Pickup pole pieces (silver dots) */}
          {[20, 24, 28, 32, 36].map(x => (
            <g key={x}>
              <circle cx={x} cy="88" r="0.8" fill="#ddd" />
              <circle cx={x} cy="98" r="0.8" fill="#ddd" />
              <circle cx={x} cy="108" r="0.8" fill="#ddd" />
            </g>
          ))}
          
          {/* Bridge */}
          <rect x="20" y="118" width="20" height="8" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          <line x1="40" y1="122" x2="50" y2="135" stroke="#ccc" strokeWidth="1" />
          
          {/* Knobs (Black skirted) */}
          <circle cx="40" cy="125" r="2.5" fill="#111" stroke="#333" strokeWidth="0.3" />
          <circle cx="42" cy="133" r="2.5" fill="#111" stroke="#333" strokeWidth="0.3" />
          <circle cx="44" cy="141" r="2.5" fill="#111" stroke="#333" strokeWidth="0.3" />
          
          {/* Switch */}
          <line x1="34" y1="125" x2="38" y2="120" stroke="#222" strokeWidth="1.5" />
          <circle cx="34" cy="125" r="1.5" fill="#111" />
          
          {/* Jack Plate (Oval) */}
          <ellipse cx="48" cy="148" rx="2" ry="4" transform="rotate(-30 48 148)" fill="#ccc" stroke="#999" strokeWidth="0.5" />
          <circle cx="48" cy="148" r="1" fill="#111" />
        </svg>
      );

    case "telecaster":
      return (
        <svg viewBox="0 0 60 160" className="w-full h-full">
          {glassDefs}
          {/* Headstock */}
          <path d="M24 10 Q22 4 25 0 L35 0 Q38 4 36 10 Z" fill="#e6c280" stroke="#b89a5a" strokeWidth="0.3" />
          <rect x="36" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="36" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="36" y="7" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="19" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="19" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="19" y="7" width="5" height="2" rx="1" fill="#ccc" />
          {/* Neck */}
          <rect x="26" y="10" width="8" height="62" rx="1" fill="#e6c280" />
          <rect x="26.5" y="10" width="7" height="62" rx="1" fill="#5c3a1e" opacity="0.6" />
          <circle cx="30" cy="24" r="1" fill="#ddd" />
          <circle cx="30" cy="37" r="1" fill="#ddd" />
          <circle cx="30" cy="50" r="1" fill="#ddd" />
          {/* Body - translucent */}
          <path d="M12 72 Q4 78 6 95 Q5 112 10 125 Q14 135 20 142 Q26 148 30 152 Q34 148 40 142 Q46 135 50 125 Q55 112 54 95 Q56 78 48 72 Q44 70 40 72 L34 72 L26 72 Q20 70 16 72 Z" fill={bodyFill} stroke={edgeStroke} strokeWidth="0.6" />
          {/* Glass highlight */}
          <path d="M16 76 Q10 84 12 100 Q16 115 22 120 L28 118 L30 78 Q24 74 18 76 Z" fill={shineFill} />
          {/* Pickguard */}
          <path d="M14 76 Q9 80 10 95 Q9 105 14 112 L22 116 L40 116 L40 76 Z" fill="#ffffff" opacity="0.75" stroke="#ddd" strokeWidth="0.3" />
          {/* Pickups */}
          <rect x="18" y="88" width="22" height="4" rx="1.5" fill="#f5f5f5" stroke="#aaa" strokeWidth="0.4" />
          <rect x="18" y="118" width="22" height="5" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.4" />
          {/* Bridge plate */}
          <rect x="16" y="116" width="26" height="16" rx="1.5" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          {/* Knobs */}
          <circle cx="42" cy="132" r="2.5" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          <circle cx="44" cy="142" r="2.5" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          {/* Switch */}
          <circle cx="16" cy="96" r="1.5" fill="#ccc" />
          <line x1="16" y1="94" x2="14" y2="92" stroke="#ccc" strokeWidth="0.8" />
        </svg>
      );

    case "lespaul":
      return (
        <svg viewBox="0 0 60 160" className="w-full h-full">
          {glassDefs}
          <defs>
            <radialGradient id={`${uid}-sunburst`}>
              <stop offset="20%" stopColor="#F5D76E" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#C8922A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3a1a00" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          {/* Headstock */}
          <path d="M22 12 Q20 6 22 0 L38 0 Q40 6 38 12 Z" fill="#3a2510" stroke="#2a1800" strokeWidth="0.3" />
          <rect x="17" y="1" width="5" height="2" rx="1" fill="#d4af37" />
          <rect x="17" y="4" width="5" height="2" rx="1" fill="#d4af37" />
          <rect x="17" y="7" width="5" height="2" rx="1" fill="#d4af37" />
          <rect x="38" y="1" width="5" height="2" rx="1" fill="#d4af37" />
          <rect x="38" y="4" width="5" height="2" rx="1" fill="#d4af37" />
          <rect x="38" y="7" width="5" height="2" rx="1" fill="#d4af37" />
          {/* Neck */}
          <rect x="26" y="12" width="8" height="58" rx="1" fill="#e6c280" />
          <rect x="26.5" y="12" width="7" height="58" rx="1" fill="#5c3a1e" opacity="0.7" />
          <circle cx="30" cy="25" r="1" fill="#d4af37" />
          <circle cx="30" cy="37" r="1" fill="#d4af37" />
          <circle cx="30" cy="49" r="1" fill="#d4af37" />
          {/* Body - translucent */}
          <ellipse cx="30" cy="108" rx="24" ry="35" fill={bodyFill} stroke={edgeStroke} strokeWidth="0.6" />
          {/* Neck binding */}
          <path d="M22 70 Q16 75 12 85 Q8 95 8 108" fill="none" stroke={color} strokeWidth="6" opacity="0.5" />
          <path d="M38 70 Q44 75 48 85 Q52 95 52 108" fill="none" stroke={color} strokeWidth="6" opacity="0.5" />
          {/* Sunburst overlay */}
          <ellipse cx="30" cy="108" rx="24" ry="35" fill={`url(#${uid}-sunburst)`} />
          {/* Glass highlight */}
          <ellipse cx="24" cy="98" rx="10" ry="16" fill={shineFill} />
          {/* Pickguard */}
          <path d="M14 88 Q10 95 10 105 Q10 115 14 120 L24 124 L24 88 Z" fill="#2a1a0a" opacity="0.6" />
          {/* Humbuckers */}
          <rect x="22" y="92" width="16" height="7" rx="2" fill="#d4af37" stroke="#aa8822" strokeWidth="0.4" />
          <rect x="22" y="110" width="16" height="7" rx="2" fill="#d4af37" stroke="#aa8822" strokeWidth="0.4" />
          {/* Bridge + Tailpiece */}
          <rect x="22" y="120" width="16" height="5" rx="1" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          <rect x="24" y="128" width="12" height="3" rx="1" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          {/* Knobs */}
          <circle cx="18" cy="118" r="2.5" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          <circle cx="42" cy="118" r="2.5" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          <circle cx="18" cy="130" r="2.5" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          <circle cx="42" cy="130" r="2.5" fill="#d4af37" stroke="#aa8822" strokeWidth="0.3" />
          <circle cx="14" cy="88" r="1.5" fill="#d4af37" />
        </svg>
      );

    case "sg":
      return (
        <svg viewBox="0 0 60 160" className="w-full h-full">
          {glassDefs}
          {/* Headstock */}
          <path d="M22 12 Q20 6 22 0 L38 0 Q40 6 38 12 Z" fill="#3a1010" stroke="#2a0808" strokeWidth="0.3" />
          <rect x="17" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="17" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="17" y="7" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="38" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="38" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="38" y="7" width="5" height="2" rx="1" fill="#ccc" />
          {/* Neck */}
          <rect x="26" y="12" width="8" height="55" rx="1" fill="#e6c280" />
          <rect x="26.5" y="12" width="7" height="55" rx="1" fill="#5c3a1e" opacity="0.7" />
          <circle cx="30" cy="24" r="1" fill="#ddd" />
          <circle cx="30" cy="36" r="1" fill="#ddd" />
          <circle cx="30" cy="48" r="1" fill="#ddd" />
          {/* Body - translucent */}
          <path d="M14 67 Q8 60 6 56 L10 54 Q14 58 18 64 L26 67 L34 67 Q38 64 42 58 L50 54 L54 56 Q52 60 46 67 Q52 75 52 90 Q52 110 48 125 Q44 138 38 145 Q34 148 30 150 Q26 148 22 145 Q16 138 12 125 Q8 110 8 90 Q8 75 14 67 Z" fill={bodyFill} stroke={edgeStroke} strokeWidth="0.6" />
          {/* Glass highlight */}
          <path d="M16 72 Q12 80 12 95 Q14 110 20 118 L26 116 L24 72 Z" fill={shineFill} />
          {/* Pickguard */}
          <path d="M16 72 Q12 78 12 88 L22 88 L24 72 Z" fill="#222" opacity="0.5" />
          {/* Humbuckers */}
          <rect x="21" y="80" width="18" height="7" rx="2" fill="#ddd" stroke="#999" strokeWidth="0.4" />
          <rect x="21" y="100" width="18" height="7" rx="2" fill="#ddd" stroke="#999" strokeWidth="0.4" />
          {/* Bridge / Tailpiece */}
          <rect x="22" y="112" width="16" height="5" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          <rect x="24" y="120" width="12" height="4" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          {/* Knobs */}
          <circle cx="18" cy="110" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
          <circle cx="42" cy="110" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
          <circle cx="18" cy="122" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
          <circle cx="42" cy="122" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
          <circle cx="14" cy="76" r="1.5" fill="#ccc" />
          <line x1="14" y1="74" x2="12" y2="72" stroke="#ccc" strokeWidth="0.8" />
        </svg>
      );

    case "offset":
      return (
        <svg viewBox="0 0 60 160" className="w-full h-full">
          {glassDefs}
          {/* Headstock */}
          <path d="M23 10 Q21 4 24 0 L36 0 Q39 4 37 10 Z" fill="#e6c280" stroke="#b89a5a" strokeWidth="0.3" />
          <rect x="18" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="18" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="18" y="7" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="37" y="1" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="37" y="4" width="5" height="2" rx="1" fill="#ccc" />
          <rect x="37" y="7" width="5" height="2" rx="1" fill="#ccc" />
          {/* Neck */}
          <rect x="26" y="10" width="8" height="60" rx="1" fill="#e6c280" />
          <rect x="26.5" y="10" width="7" height="60" rx="1" fill="#5c3a1e" opacity="0.6" />
          <circle cx="30" cy="22" r="1" fill="#ddd" />
          <circle cx="30" cy="34" r="1" fill="#ddd" />
          <circle cx="30" cy="46" r="1" fill="#ddd" />
          <circle cx="30" cy="58" r="1" fill="#ddd" />
          {/* Body - translucent */}
          <path d="M12 70 Q4 76 5 90 Q4 100 8 108 L10 110 Q6 115 6 125 Q6 138 12 146 Q18 152 24 155 Q28 156 30 156 Q32 156 36 155 Q42 152 48 146 Q54 138 54 125 Q54 115 50 110 L52 108 Q56 100 55 90 Q56 76 48 70 Q44 68 40 70 L34 70 L26 70 Q20 68 16 70 Z" fill={bodyFill} stroke={edgeStroke} strokeWidth="0.6" />
          {/* Glass highlight */}
          <path d="M16 74 Q10 82 10 96 Q12 108 18 114 L26 112 L28 76 Q22 72 16 74 Z" fill={shineFill} />
          {/* Pickguard */}
          <path d="M14 74 Q9 78 10 90 Q9 100 12 108 L14 110 Q10 115 10 122 L18 126 L22 126 L36 126 L40 114 L40 74 Z" fill="#ffffff" opacity="0.75" stroke="#ddd" strokeWidth="0.3" />
          {/* Pickups */}
          <rect x="18" y="86" width="22" height="5" rx="2" fill="#f5f5f5" stroke="#aaa" strokeWidth="0.4" />
          <rect x="18" y="104" width="22" height="5" rx="2" fill="#f5f5f5" stroke="#aaa" strokeWidth="0.4" />
          {/* Rhythm circuit */}
          <circle cx="14" cy="80" r="1.5" fill="#ccc" />
          <rect x="12" y="82" width="4" height="1" rx="0.5" fill="#ccc" />
          {/* Bridge */}
          <rect x="20" y="116" width="18" height="6" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          {/* Tremolo */}
          <rect x="24" y="126" width="12" height="8" rx="1" fill="#ccc" stroke="#999" strokeWidth="0.3" />
          <line x1="36" y1="130" x2="48" y2="145" stroke="#ccc" strokeWidth="1" />
          {/* Knobs */}
          <circle cx="42" cy="130" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
          <circle cx="44" cy="140" r="2.5" fill="#222" stroke="#555" strokeWidth="0.3" />
        </svg>
      );
  }
}

export function GuitarSelector({ selected, onSelect }: GuitarSelectorProps) {
  return (
    <div className="w-full px-3 py-4 sm:px-6 sm:py-5" style={{ background: "var(--lab-surface)" }}>
      <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {GUITAR_MODELS.map((model) => {
          const isSelected = selected === model.type;
          return (
            <button
              key={model.type}
              onClick={() => onSelect(model.type)}
              className={`
                guitar-card-hover flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl cursor-pointer
                ${isSelected ? "guitar-card-selected pulse-glow" : "hover:opacity-90"}
              `}
              style={{
                background: isSelected ? "var(--lab-accent-dim)" : "transparent",
                borderRadius: "12px",
              }}
            >
              <div className="w-10 h-24 sm:w-14 sm:h-32 md:w-16 md:h-36">
                <GuitarSilhouette type={model.type} color={model.color} />
              </div>
              <span
                className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] whitespace-nowrap"
                style={{
                  color: isSelected ? "var(--lab-accent)" : "var(--lab-text-muted)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {model.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
