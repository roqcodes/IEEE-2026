"use client";

import { useReducedMotion } from "framer-motion";
import {
  WORLD_LAND_PATH,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_HUBS,
  WORLD_MAP_WIDTH,
} from "@/components/home/worldLandPath";

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const lift = Math.min(120, Math.abs(from.x - to.x) * 0.12 + 28);
  const midY = (from.y + to.y) / 2 - lift;
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

const MAP_MASK_DESKTOP = [
  "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
  "linear-gradient(to left, black 18%, rgba(0,0,0,0.85) 42%, rgba(0,0,0,0.2) 68%, transparent 100%)",
  "linear-gradient(to right, black 42%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.2) 88%, transparent 100%)",
].join(", ");

const MAP_MASK_MOBILE =
  "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";

export default function HeroNetworkMap({
  className = "",
  variant = "desktop",
}: {
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const reduce = useReducedMotion();
  const home = WORLD_MAP_HUBS.find((h) => h.id === "cusat")!;
  const remoteHubs = WORLD_MAP_HUBS.filter((h) => h.id !== "cusat");
  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative w-full pointer-events-none select-none overflow-hidden ${
        isMobile ? "h-[200px]" : "h-full min-h-[240px] sm:min-h-[280px] lg:min-h-0"
      } ${className}`}
      aria-hidden="true"
      style={{
        maskImage: isMobile ? MAP_MASK_MOBILE : MAP_MASK_DESKTOP,
        WebkitMaskImage: isMobile ? MAP_MASK_MOBILE : MAP_MASK_DESKTOP,
        maskComposite: isMobile ? undefined : "intersect, intersect",
        WebkitMaskComposite: isMobile ? undefined : "source-in, source-in",
      }}
    >
      <svg
        viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio={isMobile ? "xMidYMid meet" : "xMaxYMid slice"}
      >
        <defs>
          <radialGradient id="heroMapGlow" cx="92%" cy="48%" r="58%">
            <stop offset="0%" stopColor="#00629B" stopOpacity="0.2" />
            <stop offset="65%" stopColor="#0085CA" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#00629B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heroArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00629B" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0085CA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00629B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <rect width={WORLD_MAP_WIDTH} height={WORLD_MAP_HEIGHT} fill="url(#heroMapGlow)" />

        <path
          d={WORLD_LAND_PATH}
          fill="#00629B"
          fillOpacity={0.16}
          stroke="#00629B"
          strokeOpacity={0.42}
          strokeWidth={0.85}
          strokeLinejoin="round"
        />

        {remoteHubs.map((hub) => (
          <path
            key={hub.id}
            d={arcPath(home, hub)}
            fill="none"
            stroke="url(#heroArcGrad)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={reduce ? undefined : "5 7"}
            className={reduce ? undefined : "hero-network-line"}
          />
        ))}

        {remoteHubs.map((hub) => (
          <g key={`node-${hub.id}`}>
            <circle cx={hub.x} cy={hub.y} r={5.5} fill="#F5FAFD" />
            <circle
              cx={hub.x}
              cy={hub.y}
              r={5.5}
              fill="none"
              stroke="#00629B"
              strokeOpacity={0.5}
              strokeWidth={1.25}
            />
            <circle cx={hub.x} cy={hub.y} r={2.25} fill="#00629B" />
          </g>
        ))}

        <g>
          {!reduce && (
            <>
              <circle
                cx={home.x}
                cy={home.y}
                r={13}
                fill="#00629B"
                opacity={0.2}
                className="hero-network-pulse"
              />
              <circle
                cx={home.x}
                cy={home.y}
                r={22}
                fill="#00629B"
                opacity={0.1}
                className="hero-network-pulse hero-network-pulse-delay"
              />
            </>
          )}
          <circle cx={home.x} cy={home.y} r={7.5} fill="#00629B" />
          <circle cx={home.x} cy={home.y} r={3} fill="#EAF4FA" />
        </g>
      </svg>
    </div>
  );
}
