"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeftRight } from "lucide-react";

const UPPER_CYCLE = { x: 280, y: 234, r: 128 };
const LOWER_CYCLE = { x: 280, y: 472, r: 68 };
const VIEWBOX = { width: 560, height: 900 };
const BATTERY_NODE = pointOnCircle(UPPER_CYCLE, 180);
const PANEL_NODE = pointOnCircle({ ...UPPER_CYCLE, r: UPPER_CYCLE.r + 22 }, -18);
const INVERTER_NODE = pointOnCircle(UPPER_CYCLE, 90);
const SAVINGS_CARD = { x: LOWER_CYCLE.x };
const BATTERY_NODE_OFFSET_Y = 10;
const CONSUMPTION_NODE_OFFSET_Y = 10;
const INVERTER_NODE_OFFSET_Y = 12;
const GRID_NODE_OFFSET_Y = 34;
const AUXILIARY_ICON_CLASS = "h-[1.34rem] w-[1.34rem]";
const PANEL_ICON_CLASS = "h-[1.56rem] w-[1.56rem]";
const INVERTER_ICON_CLASS = "h-[1.15rem] w-[1.15rem]";
const SIMULATION_INTERVAL_MS = 2000;
const SIMULATION_FADE_MS = 260;

const SIMULATION_DATA = [
  { mes: "Enero", sin: 205, con: 95, ahorro: 110, pct: 54 },
  { mes: "Febrero", sin: 185, con: 80, ahorro: 105, pct: 57 },
  { mes: "Marzo", sin: 170, con: 55, ahorro: 115, pct: 68 },
  { mes: "Abril", sin: 155, con: 35, ahorro: 120, pct: 77 },
  { mes: "Mayo", sin: 150, con: 20, ahorro: 130, pct: 87 },
  { mes: "Junio", sin: 175, con: 10, ahorro: 165, pct: 94 },
  { mes: "Julio", sin: 235, con: 0, ahorro: 235, pct: 100 },
  { mes: "Agosto", sin: 245, con: 0, ahorro: 245, pct: 100 },
  { mes: "Septiembre", sin: 180, con: 12, ahorro: 168, pct: 93 },
  { mes: "Octubre", sin: 160, con: 30, ahorro: 130, pct: 81 },
  { mes: "Noviembre", sin: 145, con: 55, ahorro: 90, pct: 62 },
  { mes: "Diciembre", sin: 131, con: 78, ahorro: 53, pct: 40 },
] as const;

type EnergyNodeProps = {
  label: string;
  className: string;
  delay: string;
  children: ReactNode;
  tone?: "blue" | "slate";
  prominent?: boolean;
  extra?: ReactNode;
  nodeClassName?: string;
  style?: CSSProperties;
};

type SimulationMetricProps = {
  label: string;
  value: number;
  tone?: "default" | "accent" | "success";
  highlightZero?: boolean;
};

const upperCyclePath = `M${UPPER_CYCLE.x} ${UPPER_CYCLE.y - UPPER_CYCLE.r}a${UPPER_CYCLE.r} ${UPPER_CYCLE.r} 0 1 1 0 ${UPPER_CYCLE.r * 2}a${UPPER_CYCLE.r} ${UPPER_CYCLE.r} 0 1 1 0 -${UPPER_CYCLE.r * 2}`;

const lowerCyclePath = `M${LOWER_CYCLE.x} ${LOWER_CYCLE.y - LOWER_CYCLE.r}a${LOWER_CYCLE.r} ${LOWER_CYCLE.r} 0 1 1 0 ${LOWER_CYCLE.r * 2}a${LOWER_CYCLE.r} ${LOWER_CYCLE.r} 0 1 1 0 -${LOWER_CYCLE.r * 2}`;

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function pointOnCircle(
  circle: { x: number; y: number; r: number },
  degrees: number,
) {
  const radians = (degrees * Math.PI) / 180;

  return {
    x: circle.x + circle.r * Math.cos(radians),
    y: circle.y + circle.r * Math.sin(radians),
  };
}

function formatEuro(value: number) {
  return `${value} €`;
}

function SolarPanelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={PANEL_ICON_CLASS}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 7.5H19.5L17.6 15.5H6.4L4.5 7.5Z" />
      <path d="M7.8 10.7H16.2" />
      <path d="M7.1 13.4H16.9" />
      <path d="M10 7.5L9.1 15.5" />
      <path d="M14 7.5L13.1 15.5" />
      <path d="M12 15.5V18.7" />
      <path d="M9.4 18.7H14.6" />
    </svg>
  );
}

function BatteryStorageIcon() {
  return (
    <svg
      viewBox="6 11 28 18"
      className={AUXILIARY_ICON_CLASS}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="13" width="22" height="14" rx="3.5" />
      <path d="M30 17H33V23H30" />
      <path d="M13 20H25" />
      <path d="M19 16V24" />
    </svg>
  );
}

function InverterIcon() {
  return (
    <ArrowLeftRight
      className={`hero-inverter-icon ${INVERTER_ICON_CLASS}`}
      aria-hidden="true"
      strokeWidth={2}
    />
  );
}

function PowerGridIcon() {
  return (
    <svg
      viewBox="11 6 18 28"
      className={AUXILIARY_ICON_CLASS}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L12 16H17L13 34" />
      <path d="M20 6L28 16H23L27 34" />
      <path d="M11 17H29" />
      <path d="M14 24H26" />
      <path d="M16 30H24" />
    </svg>
  );
}

function BulbGraphic() {
  return (
    <svg
      viewBox="0 0 48 64"
      className="h-[3.5rem] w-[3.5rem]"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient
          id="heroBulbGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(24 24) rotate(90) scale(20 18)"
        >
          <stop offset="0" stopColor="#FEF08A" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#FACC15" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FACC15" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="heroBulbGlass"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(24 18) rotate(90) scale(23 20)"
        >
          <stop offset="0" stopColor="#FFFDF2" />
          <stop offset="0.65" stopColor="#FFF3BF" />
          <stop offset="1" stopColor="#FDE68A" />
        </radialGradient>
        <linearGradient
          id="heroBulbBase"
          x1="24"
          y1="42"
          x2="24"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
      </defs>

      <ellipse cx="24" cy="24" rx="18" ry="19" fill="url(#heroBulbGlow)" />
      <path
        d="M24 8.5C16.3 8.5 10.2 14.7 10.2 22.4C10.2 27.5 12.3 31.4 15.1 34.7C17.2 37.1 18.7 39.4 19.2 42.2H28.8C29.3 39.4 30.8 37.1 32.9 34.7C35.7 31.4 37.8 27.5 37.8 22.4C37.8 14.7 31.7 8.5 24 8.5Z"
        fill="url(#heroBulbGlass)"
        stroke="#F59E0B"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8 42.2H29.2"
        stroke="#64748B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M19.6 47H28.4"
        stroke="url(#heroBulbBase)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20.8 51.4H27.2"
        stroke="url(#heroBulbBase)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M21.4 55H26.6"
        stroke="#475569"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18.9 18.6C20.4 16.7 22 15.8 24 15.8C26 15.8 27.6 16.7 29.1 18.6"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20.1 29.8L22.5 26.8C23.3 25.8 24.7 25.8 25.5 26.8L27.9 29.8"
        stroke="#F59E0B"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.3 33.1H25.7"
        stroke="#F59E0B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 17.6V23.1"
        stroke="#FCD34D"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M16.8 14.4C14.9 16.5 13.9 19.1 13.9 22"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EnergyNode({
  label,
  className,
  delay,
  children,
  tone = "blue",
  extra,
  nodeClassName,
  style,
}: EnergyNodeProps) {
  const toneClass =
    tone === "slate"
      ? "bg-white/92 text-blue-950"
      : "bg-white/92 text-blue-950";

  const frameClass = "h-[4.2rem] w-[4.2rem] rounded-[1.55rem]";
  const borderClass = "border-white/88";
  const labelClass = "mt-2 text-[0.66rem] tracking-[0.22em]";
  const haloClass = "absolute inset-[-0.5rem] rounded-full bg-slate-200/32 blur-lg";

  return (
    <div className={`absolute z-10 text-center ${className}`} style={style}>
      <div className="relative">
        <div className={`pointer-events-none ${haloClass}`} />
        <div className="relative">
          <div
            className={`hero-node-sequence relative mx-auto flex items-center justify-center border ${borderClass} ${toneClass} shadow-[0_18px_38px_rgba(15,23,42,0.1)] backdrop-blur ${frameClass} ${nodeClassName ?? ""}`}
            style={{ "--hero-delay": delay } as CSSProperties}
          >
            {children}
          </div>
        </div>
        {extra}
      </div>
      <div className={`font-semibold uppercase text-slate-400 ${labelClass}`}>
        {label}
      </div>
    </div>
  );
}

function SimulationMetric({
  label,
  value,
  tone = "default",
  highlightZero = false,
}: SimulationMetricProps) {
  const wrapperClass =
    tone === "accent"
      ? highlightZero
        ? "border-yellow-300/35 bg-[linear-gradient(180deg,rgba(250,204,21,0.24),rgba(255,255,255,0.08))] shadow-[0_18px_36px_rgba(250,204,21,0.14)]"
        : "border-yellow-300/28 bg-[linear-gradient(180deg,rgba(250,204,21,0.18),rgba(255,255,255,0.08))] shadow-[0_18px_36px_rgba(250,204,21,0.1)]"
      : tone === "success"
        ? "border-emerald-300/20 bg-emerald-300/8"
        : "border-white/10 bg-white/5";

  const labelClass =
    tone === "accent" ? "text-blue-100/82" : "text-blue-100/68";

  const valueClass =
    tone === "accent"
      ? highlightZero
        ? "text-[1.18rem] font-black tracking-[-0.05em] text-yellow-200 min-[380px]:text-[1.34rem] sm:text-[1.6rem]"
        : "text-[1.18rem] font-black tracking-[-0.05em] text-yellow-200 min-[380px]:text-[1.34rem] sm:text-[1.6rem]"
      : tone === "success"
        ? "text-[0.92rem] font-bold tracking-[-0.04em] text-emerald-200 min-[380px]:text-[1rem] sm:text-[1.16rem]"
        : "text-[0.88rem] font-semibold tracking-[-0.04em] text-white min-[380px]:text-[0.96rem] sm:text-[1.05rem]";

  return (
    <div className={`rounded-[1rem] border px-2 py-2 sm:rounded-[1.15rem] sm:px-2.5 sm:py-2.5 ${wrapperClass}`}>
      <div
        className={`text-[0.56rem] font-semibold uppercase tracking-[0.14em] ${labelClass}`}
      >
        {label}
      </div>
      <div className={`mt-1.5 ${valueClass}`}>{formatEuro(value)}</div>
    </div>
  );
}

function SavingsCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let swapTimeout: number | null = null;

    const interval = window.setInterval(() => {
      setIsVisible(false);

      swapTimeout = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % SIMULATION_DATA.length);
        setIsVisible(true);
      }, SIMULATION_FADE_MS);
    }, SIMULATION_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (swapTimeout !== null) {
        window.clearTimeout(swapTimeout);
      }
    };
  }, []);

  const current = SIMULATION_DATA[activeIndex];
  const zeroConsumptionMonth = current.con === 0;

  return (
    <div
      className="hero-consumption-sequence absolute z-30 -translate-x-1/2"
      style={{
        left: toPercent(SAVINGS_CARD.x, VIEWBOX.width),
        bottom: "1rem",
        "--hero-delay": "1.5s",
      } as CSSProperties}
    >
      <div className="w-[calc(100vw-4.5rem)] max-w-[20.25rem] rounded-[1.55rem] border border-blue-800/90 bg-[linear-gradient(180deg,rgba(19,35,75,0.98),rgba(29,78,216,0.92))] px-3 py-3.5 shadow-[0_28px_72px_rgba(23,37,84,0.34)] backdrop-blur sm:w-[24.75rem] sm:max-w-none sm:rounded-[1.85rem] sm:px-4.5 sm:py-4">
        <div className="text-[0.5rem] font-semibold uppercase leading-4 tracking-[0.16em] text-blue-100/74 sm:text-[0.54rem]">
          SIMULACIÓN · VIVIENDA EN SEVILLA · CONSUMO 9.800 KWH/AÑO
        </div>

        <div
          className={`mt-4 transition-all duration-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[1.34rem] font-black tracking-[-0.06em] text-white sm:text-[1.5rem]">
                {current.mes}
              </div>
              <div className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.13em] text-blue-100/62 sm:text-[0.62rem]">
                MI CONSUMO
              </div>
            </div>

            <div
              className={`rounded-full bg-yellow-300/18 px-2.5 py-1.5 text-[0.8rem] font-bold text-yellow-200 ${
                current.pct >= 90
                  ? "shadow-[0_0_22px_rgba(250,204,21,0.18)]"
                  : ""
              }`}
            >
              -{current.pct}%
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-1.5 sm:gap-2">
            <SimulationMetric label="Sin placas" value={current.sin} />
            <SimulationMetric
              label="Con solar"
              value={current.con}
              tone="accent"
              highlightZero={zeroConsumptionMonth}
            />
            <SimulationMetric
              label="Ahorro"
              value={current.ahorro}
              tone="success"
            />
          </div>
        </div>

        <p className="mt-3.5 border-t border-white/10 pt-3 text-[0.56rem] leading-[1.45] text-blue-100/72 sm:text-[0.6rem]">
          Estimación orientativa. El ahorro depende del consumo, la
          ubicación, la orientación y el tipo de instalación.
        </p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[510px] xl:max-w-[530px]">
      <div className="absolute left-12 top-8 h-28 w-28 rounded-full bg-yellow-200/34 blur-3xl" />
      <div className="absolute right-4 top-28 h-44 w-44 rounded-full bg-blue-200/28 blur-3xl" />
      <div className="absolute bottom-12 left-1/2 h-28 w-60 -translate-x-1/2 rounded-full bg-blue-200/18 blur-3xl" />

      <div className="rounded-[1.55rem] border border-white/80 bg-white/62 p-3 shadow-[0_40px_110px_rgba(37,99,235,0.14)] backdrop-blur sm:rounded-[2.2rem] sm:p-6">
        <div className="relative min-h-[760px] overflow-hidden rounded-[1.35rem] border border-white/80 bg-[radial-gradient(circle_at_22%_16%,rgba(250,204,21,0.11),transparent_18%),radial-gradient(circle_at_84%_22%,rgba(96,165,250,0.14),transparent_26%),linear-gradient(180deg,#fdfeff_0%,#eff6ff_54%,#e9f2ff_100%)] px-3 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] min-[420px]:min-h-[820px] sm:min-h-[900px] sm:rounded-[1.95rem] sm:px-6 sm:py-7">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.44),transparent_68%)]" />

          <div className="hero-sun-enter absolute left-1/2 top-[8.2%] z-20 -translate-x-1/2">
            <div className="relative h-[4.8rem] w-[4.8rem] rounded-full bg-[radial-gradient(circle,#fff8d6_0%,#facc15_54%,rgba(250,204,21,0.08)_72%,transparent_73%)] shadow-[0_0_48px_rgba(250,204,21,0.28)] sm:h-[5.5rem] sm:w-[5.5rem]">
              <div className="hero-sun-halo absolute inset-0 rounded-full border border-yellow-200/80" />
              <div className="absolute inset-[0.95rem] rounded-full bg-[radial-gradient(circle,#fffbee_0%,#ffd857_82%)]" />
            </div>
          </div>

          <svg
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
            className="hero-flow-enter pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <path id="heroUpperMotionPath" d={upperCyclePath} />
              <linearGradient
                id="heroUpperStroke"
                x1="146"
                y1="100"
                x2="414"
                y2="368"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#FACC15" stopOpacity="0.98" />
                <stop offset="0.24" stopColor="#FDE68A" stopOpacity="0.96" />
                <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.98" />
                <stop offset="0.78" stopColor="#93C5FD" stopOpacity="0.96" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0.92" />
              </linearGradient>
              <linearGradient
                id="heroLowerStroke"
                x1="206"
                y1="404"
                x2="354"
                y2="540"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#DBEAFE" stopOpacity="0.94" />
                <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.96" />
                <stop offset="1" stopColor="#60A5FA" stopOpacity="0.88" />
              </linearGradient>
              <linearGradient
                id="heroConnectorStroke"
                x1="280"
                y1="92"
                x2="280"
                y2="456"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#FDE68A" stopOpacity="0.92" />
                <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="1" stopColor="#93C5FD" stopOpacity="0.84" />
              </linearGradient>
            </defs>

            <circle
              cx={UPPER_CYCLE.x}
              cy={UPPER_CYCLE.y}
              r={UPPER_CYCLE.r}
              stroke="rgba(255,255,255,0.56)"
              strokeWidth="14"
              fill="none"
            />
            <circle
              cx={UPPER_CYCLE.x}
              cy={UPPER_CYCLE.y}
              r={UPPER_CYCLE.r}
              pathLength="1"
              className="hero-upper-ring"
              stroke="url(#heroUpperStroke)"
              strokeWidth="5.6"
              fill="none"
            />

            <circle
              cx={LOWER_CYCLE.x}
              cy={LOWER_CYCLE.y}
              r={LOWER_CYCLE.r}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx={LOWER_CYCLE.x}
              cy={LOWER_CYCLE.y}
              r={LOWER_CYCLE.r}
              pathLength="1"
              className="hero-lower-ring"
              stroke="url(#heroLowerStroke)"
              strokeWidth="4.5"
              fill="none"
            />

            <path
              d={`M${UPPER_CYCLE.x} 92C${UPPER_CYCLE.x} 98 ${UPPER_CYCLE.x} 102 ${UPPER_CYCLE.x} ${UPPER_CYCLE.y - UPPER_CYCLE.r}`}
              pathLength="1"
              className="hero-sun-link"
              stroke="url(#heroConnectorStroke)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d={`M${UPPER_CYCLE.x} ${INVERTER_NODE.y + 34}C${UPPER_CYCLE.x} ${INVERTER_NODE.y + 40} ${UPPER_CYCLE.x} ${INVERTER_NODE.y + 44} ${UPPER_CYCLE.x} ${LOWER_CYCLE.y - LOWER_CYCLE.r}`}
              pathLength="1"
              className="hero-connector-line hero-connector-line-secondary"
              stroke="url(#heroConnectorStroke)"
              strokeWidth="3.6"
              fill="none"
              strokeLinecap="round"
            />

            <circle r="5.4" fill="#FACC15" className="hero-energy-particle">
              <animateMotion begin="0.3s" dur="4.8s" repeatCount="indefinite">
                <mpath href="#heroUpperMotionPath" />
              </animateMotion>
            </circle>

            <circle r="3.2" fill="#93C5FD" className="hero-energy-particle">
              <animateMotion
                begin="2.15s"
                dur="6.9s"
                repeatCount="indefinite"
                path={lowerCyclePath}
              />
            </circle>

            <circle r="4" fill="#FACC15" className="hero-energy-particle">
              <animateMotion
                begin="0.6s"
                dur="1.55s"
                repeatCount="indefinite"
                path={`M${UPPER_CYCLE.x} 92C${UPPER_CYCLE.x} 98 ${UPPER_CYCLE.x} 102 ${UPPER_CYCLE.x} ${UPPER_CYCLE.y - UPPER_CYCLE.r}`}
              />
            </circle>
          </svg>

          <EnergyNode
            label="Batería"
            className="-translate-x-1/2 -translate-y-1/2"
            delay="1.05s"
            tone="slate"
            style={{
              left: toPercent(BATTERY_NODE.x, VIEWBOX.width),
              top: toPercent(BATTERY_NODE.y + BATTERY_NODE_OFFSET_Y, VIEWBOX.height),
            }}
            extra={
              <div className="hero-battery-fill absolute bottom-[0.42rem] left-1/2 h-1.5 w-8 -translate-x-1/2 overflow-hidden rounded-full bg-slate-200/90">
                <div className="h-full w-full rounded-full bg-[linear-gradient(90deg,#facc15_0%,#60a5fa_100%)]" />
              </div>
            }
          >
            <BatteryStorageIcon />
          </EnergyNode>

          <EnergyNode
            label="Placas"
            className="z-30 -translate-x-1/2 -translate-y-1/2"
            delay="1.2s"
            nodeClassName="hero-panel-heartbeat"
            style={{
              left: toPercent(PANEL_NODE.x, VIEWBOX.width),
              top: toPercent(PANEL_NODE.y, VIEWBOX.height),
            }}
          >
            <SolarPanelIcon />
          </EnergyNode>

          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              left: toPercent(UPPER_CYCLE.x, VIEWBOX.width),
              top: toPercent(UPPER_CYCLE.y + CONSUMPTION_NODE_OFFSET_Y, VIEWBOX.height),
            }}
          >
            <div
              className="hero-consumption-sequence relative"
              style={{ "--hero-delay": "1.38s" } as CSSProperties}
            >
              <div className="relative flex h-24 w-20 items-center justify-center">
                <div className="hero-consumption-halo absolute inset-x-0 top-[0.35rem] h-[4.9rem] rounded-full bg-yellow-200/65 blur-[30px]" />
                <div className="absolute inset-x-2 top-[0.95rem] h-[3.6rem] rounded-full bg-white/72 blur-xl" />
                <div className="hero-bulb-node absolute left-1/2 top-[0.7rem] h-[3.85rem] w-[3.85rem] -translate-x-1/2 rounded-full bg-yellow-100/70" />
                <div className="relative z-10 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(250,204,21,0.24)]">
                  <BulbGraphic />
                </div>
              </div>
              <div className="-mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Consumo
              </div>
            </div>
          </div>

          <SavingsCard />

          <EnergyNode
            label="Inversor"
            className="-translate-x-1/2 -translate-y-1/2"
            delay="1.55s"
            prominent
            style={{
              left: toPercent(INVERTER_NODE.x, VIEWBOX.width),
              top: toPercent(INVERTER_NODE.y + INVERTER_NODE_OFFSET_Y, VIEWBOX.height),
            }}
          >
            <InverterIcon />
          </EnergyNode>

          <EnergyNode
            label="Red eléctrica"
            className="-translate-x-1/2 -translate-y-1/2"
            delay="1.8s"
            tone="slate"
            style={{
              left: toPercent(LOWER_CYCLE.x, VIEWBOX.width),
              top: toPercent(LOWER_CYCLE.y + GRID_NODE_OFFSET_Y, VIEWBOX.height),
            }}
            extra={
              <div className="hero-grid-receive absolute inset-0 rounded-[1.55rem]" />
            }
          >
            <PowerGridIcon />
          </EnergyNode>

          <div className="pointer-events-none absolute bottom-8 left-1/2 z-0 h-16 w-[68%] -translate-x-1/2 rounded-full bg-blue-200/28 blur-2xl" />
        </div>
      </div>
    </div>
  );
}

