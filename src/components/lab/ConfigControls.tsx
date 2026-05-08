"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Maximize2, Send } from "lucide-react";
import { GuitarType } from "./GuitarSelector";

/* ===== Types ===== */

export interface ConfigState {
  bodyColor: string;
  pickguardColor: string;
  pickupsColor: string;
  neckMaterial: string;
  hardwareColor: string;
  pickupConfig: "SSS" | "HSS" | "HH";
  bridgeType: "fixed" | "tremolo";
}

interface ConfigControlsProps {
  config: ConfigState;
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
  guitarType: GuitarType;
}

/* ===== Data ===== */

const BODY_COLORS = [
  { name: "Olympic White", value: "#F5F0E8", preview: "#F5F0E8" },
  { name: "Black", value: "#111111", preview: "#111111" },
  { name: "Sunburst", value: "#C8922A", preview: "linear-gradient(135deg, #F5D76E 0%, #C8922A 50%, #3a1a00 100%)" },
  { name: "Gold Top", value: "#D4AF37", preview: "linear-gradient(135deg, #E8D174 0%, #D4AF37 50%, #AA8822 100%)" },
  { name: "Shell Pink", value: "#F2C4C4", preview: "#F2C4C4" },
  { name: "Seafoam Green", value: "#8FBFAA", preview: "#8FBFAA" },
  { name: "Fiesta Red", value: "#CC0000", preview: "#CC0000" },
  { name: "Sonic Blue", value: "#72A0C1", preview: "#72A0C1" },
  { name: "Surf Green", value: "#8CBAAA", preview: "#8CBAAA" },
  { name: "Daphne Blue", value: "#3B82B8", preview: "#3B82B8" },
  { name: "Butterscotch", value: "#E0B050", preview: "#E0B050" },
  { name: "Vintage White", value: "#FFF8E7", preview: "#FFF8E7" },
];

const PICKGUARD_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#111111" },
  { name: "Mint Green", value: "#E8F4EC" },
  { name: "Tortoise", value: "#5E211A" },
  { name: "Cream", value: "#F5EED5" },
];

const NECK_MATERIALS = [
  { name: "Maple", value: "#e6c280" },
  { name: "Rosewood", value: "#382116" },
  { name: "Ebony", value: "#1a1008" },
];

const HARDWARE_COLORS = [
  { name: "Chrome", value: "#dddddd" },
  { name: "Black", value: "#222222" },
  { name: "Gold", value: "#d4af37" },
  { name: "Nickel", value: "#C0B8A8" },
];

/* ===== Components ===== */

function SectionHeader({
  title,
  icon,
  expanded,
  onToggle,
}: {
  title: string;
  icon?: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 px-1 group cursor-pointer"
    >
      <div className="flex items-center gap-2">
        {icon && <span style={{ color: "var(--lab-text-muted)" }}>{icon}</span>}
        <h3
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "var(--lab-text)" }}
        >
          {title}
        </h3>
      </div>
      <span
        className="transition-transform duration-200"
        style={{ color: "var(--lab-text-muted)" }}
      >
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </span>
    </button>
  );
}

function ComponentOption({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`component-option ${active ? "active" : ""} flex flex-col items-center gap-1.5 p-3 rounded-lg cursor-pointer`}
    >
      <div className="text-xl">{icon}</div>
      <span
        className="text-[10px] font-semibold tracking-wider uppercase"
        style={{ color: active ? "var(--lab-accent)" : "var(--lab-text-muted)" }}
      >
        {label}
      </span>
    </button>
  );
}

function ColorSwatch({
  name,
  value,
  preview,
  active,
  onClick,
}: {
  name: string;
  value: string;
  preview?: string;
  active: boolean;
  onClick: () => void;
}) {
  const bgStyle = preview && preview.includes("gradient")
    ? { background: preview }
    : { backgroundColor: preview || value };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group cursor-pointer"
      title={name}
    >
      <div
        className={`w-9 h-9 rounded-full transition-all duration-200 ${active ? "color-swatch-selected scale-110" : "hover:scale-105"}`}
        style={{
          ...bgStyle,
          border: `2px solid ${active ? "var(--lab-accent)" : "var(--lab-border)"}`,
        }}
      />
      <span
        className="text-[8px] font-medium tracking-wide leading-tight text-center max-w-[48px]"
        style={{ color: active ? "var(--lab-accent)" : "var(--lab-text-muted)" }}
      >
        {name}
      </span>
    </button>
  );
}

/* Pickup configuration SVG icons */
function PickupIcon({ type }: { type: "SSS" | "HSS" | "HH" }) {
  const sc = (y: number) => (
    <rect x="8" y={y} width="24" height="4" rx="1.5" fill="currentColor" opacity="0.7" />
  );
  const hb = (y: number) => (
    <rect x="6" y={y} width="28" height="8" rx="2" fill="currentColor" opacity="0.7" />
  );

  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" style={{ color: "var(--lab-text)" }}>
      {type === "SSS" && (
        <>
          {sc(6)}
          {sc(16)}
          {sc(28)}
        </>
      )}
      {type === "HSS" && (
        <>
          {hb(4)}
          {sc(18)}
          {sc(28)}
        </>
      )}
      {type === "HH" && (
        <>
          {hb(6)}
          {hb(24)}
        </>
      )}
    </svg>
  );
}

function BridgeIcon({ type }: { type: "fixed" | "tremolo" }) {
  return (
    <svg viewBox="0 0 40 32" className="w-8 h-6" style={{ color: "var(--lab-text)" }}>
      {type === "fixed" ? (
        <>
          <rect x="4" y="8" width="32" height="10" rx="2" fill="currentColor" opacity="0.6" />
          {[8, 14, 20, 26, 32].map((x, i) => (
            <circle key={i} cx={x} cy="13" r="1.5" fill="currentColor" opacity="0.9" />
          ))}
        </>
      ) : (
        <>
          <rect x="4" y="8" width="24" height="10" rx="2" fill="currentColor" opacity="0.6" />
          <rect x="6" y="6" width="6" height="14" rx="1" fill="currentColor" opacity="0.5" />
          <line x1="28" y1="13" x2="38" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

/* ===== Main Component ===== */

export function ConfigControls({ config, setConfig, guitarType }: ConfigControlsProps) {
  const [componentsOpen, setComponentsOpen] = useState(true);
  const [colorsOpen, setColorsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubmitted(true);
    }
  };

  // Determine available pickup configs based on guitar type
  const availablePickups: ("SSS" | "HSS" | "HH")[] =
    guitarType === "lespaul" || guitarType === "sg"
      ? ["HH"]
      : ["SSS", "HSS", "HH"];

  return (
    <div
      className="w-full h-full flex flex-col lab-scrollbar overflow-y-auto"
      style={{ background: "var(--lab-bg)" }}
    >
      {/* Controls area */}
      <div className="flex-1 p-5 space-y-1">
        {/* ===== COMPONENTS SECTION ===== */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--lab-surface)", border: "1px solid var(--lab-border)" }}
        >
          <div className="px-4">
            <SectionHeader
              title="Components"
              icon={<Maximize2 size={14} />}
              expanded={componentsOpen}
              onToggle={() => setComponentsOpen(!componentsOpen)}
            />
          </div>

          <div className={`section-content ${componentsOpen ? "expanded" : ""}`}>
            <div>
              <div className="px-4 pb-5 space-y-5">
                {/* Pickups */}
                <div className="space-y-2.5">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "var(--lab-text-muted)" }}
                  >
                    Pickups
                  </h4>
                  <div className="flex gap-2">
                    {availablePickups.map((p) => (
                      <ComponentOption
                        key={p}
                        label={p}
                        icon={<PickupIcon type={p} />}
                        active={config.pickupConfig === p}
                        onClick={() => setConfig((prev) => ({ ...prev, pickupConfig: p }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Bridge */}
                <div className="space-y-2.5">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "var(--lab-text-muted)" }}
                  >
                    Bridge
                  </h4>
                  <div className="flex gap-2">
                    <ComponentOption
                      label="Fixed"
                      icon={<BridgeIcon type="fixed" />}
                      active={config.bridgeType === "fixed"}
                      onClick={() => setConfig((prev) => ({ ...prev, bridgeType: "fixed" }))}
                    />
                    <ComponentOption
                      label="Tremolo"
                      icon={<BridgeIcon type="tremolo" />}
                      active={config.bridgeType === "tremolo"}
                      onClick={() => setConfig((prev) => ({ ...prev, bridgeType: "tremolo" }))}
                    />
                  </div>
                </div>

                {/* Pickguard */}
                <div className="space-y-2.5">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "var(--lab-text-muted)" }}
                  >
                    Pickguard
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {PICKGUARD_COLORS.map((c) => (
                      <ColorSwatch
                        key={c.value}
                        name={c.name}
                        value={c.value}
                        active={config.pickguardColor === c.value}
                        onClick={() => setConfig((prev) => ({ ...prev, pickguardColor: c.value }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Neck Material */}
                <div className="space-y-2.5">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "var(--lab-text-muted)" }}
                  >
                    Neck / Fretboard
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {NECK_MATERIALS.map((c) => (
                      <ColorSwatch
                        key={c.value}
                        name={c.name}
                        value={c.value}
                        active={config.neckMaterial === c.value}
                        onClick={() => setConfig((prev) => ({ ...prev, neckMaterial: c.value }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Hardware */}
                <div className="space-y-2.5">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "var(--lab-text-muted)" }}
                  >
                    Hardware
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {HARDWARE_COLORS.map((c) => (
                      <ColorSwatch
                        key={c.value}
                        name={c.name}
                        value={c.value}
                        active={config.hardwareColor === c.value}
                        onClick={() => setConfig((prev) => ({ ...prev, hardwareColor: c.value }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== COLORS SECTION ===== */}
        <div className="pt-1" />
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--lab-surface)", border: "1px solid var(--lab-border)" }}
        >
          <div className="px-4">
            <SectionHeader
              title="Colors"
              icon={
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                  <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="6" cy="6" r="2.5" fill="#F2C4C4" />
                  <circle cx="10" cy="6" r="2.5" fill="#72A0C1" />
                  <circle cx="8" cy="10" r="2.5" fill="#D4AF37" />
                </svg>
              }
              expanded={colorsOpen}
              onToggle={() => setColorsOpen(!colorsOpen)}
            />
          </div>

          <div className={`section-content ${colorsOpen ? "expanded" : ""}`}>
            <div>
              <div className="px-4 pb-5">
                <h4
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3"
                  style={{ color: "var(--lab-text-muted)" }}
                >
                  Body Color
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-3 gap-y-4">
                  {BODY_COLORS.map((c) => (
                    <ColorSwatch
                      key={c.value}
                      name={c.name}
                      value={c.value}
                      preview={c.preview}
                      active={config.bodyColor === c.value}
                      onClick={() => setConfig((prev) => ({ ...prev, bodyColor: c.value }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUOTE REQUEST ===== */}
      <div
        className="p-5 border-t"
        style={{
          borderColor: "var(--lab-border)",
          background: "var(--lab-surface)",
        }}
      >
        <div className="space-y-3">
          <div>
            <h3
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: "var(--lab-text)" }}
            >
              Solicitar Cotización
            </h3>
            <p className="text-[10px] mt-1" style={{ color: "var(--lab-text-muted)" }}>
              Déjanos tus datos y te enviaremos el precio exacto.
            </p>
          </div>

          {submitted ? (
            <div
              className="p-3 rounded-lg flex items-center text-xs font-medium"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                color: "#4ade80",
                border: "1px solid rgba(34, 197, 94, 0.2)",
              }}
            >
              <span className="flex h-2 w-2 rounded-full mr-2" style={{ background: "#4ade80" }} />
              Solicitud enviada. Te contactaremos pronto.
            </div>
          ) : (
            <div className="space-y-2.5">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: "var(--lab-bg)",
                  border: "1px solid var(--lab-border)",
                  color: "var(--lab-text)",
                }}
              />
              <input
                type="tel"
                placeholder="Tu teléfono (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: "var(--lab-bg)",
                  border: "1px solid var(--lab-border)",
                  color: "var(--lab-text)",
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!email}
                className="w-full h-11 rounded-lg text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "var(--lab-accent)",
                  color: "#fff",
                  boxShadow: email ? "0 4px 16px var(--lab-accent-glow)" : "none",
                }}
              >
                <Send size={14} />
                Solicitar Precio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
