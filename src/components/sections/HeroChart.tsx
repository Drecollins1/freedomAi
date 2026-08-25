"use client";

import { useCallback, useRef, useState } from "react";

/**
 * The candlestick panel in the hero: a dip, a chop, then a rally, with the
 * AI-marked SELL/BUY tags and a glowing trend arrow riding over the top.
 *
 * Drawn as SVG rather than shipped as an image so it stays sharp at every
 * width and recolors with the palette. Swap in a real screenshot later if the
 * client would rather show their own chart.
 *
 * On hover it behaves like a terminal: a crosshair snaps to the nearest
 * candle, the rest of the series dims, an OHLC readout follows the cursor and
 * the trend line redraws. Idle, the last price keeps a slow live pulse.
 * The prices are sample data — the readout says so.
 */

const CLOSES = [
  26050, 26120, 26210, 26180, 26300, 26380, 26340, 26430, 26390, 26290, 26180,
  26100, 26010, 25960, 26030, 25940, 25880, 25950, 26020, 25960, 25900, 25980,
  26060, 26010, 26120, 26080, 26180, 26260, 26200, 26310, 26400, 26350, 26460,
  26520, 26480, 26580, 26650, 26600, 26700, 26760, 26720, 26800, 26860, 26820,
  26880, 26900,
];

const W = 640;
const H = 460;
const AXIS_W = 62;
const PLOT_W = W - AXIS_W;
const PLOT_TOP = 12;
const PLOT_H = 322;
const VOL_TOP = 366;
const VOL_H = 78;
const P_MIN = 25150;
const P_MAX = 26950;

const step = PLOT_W / CLOSES.length;
const bodyW = step * 0.62;

const priceY = (price: number) =>
  PLOT_TOP + ((P_MAX - price) / (P_MAX - P_MIN)) * PLOT_H;

const candles = CLOSES.map((close, i) => {
  const open = i === 0 ? close - 40 : CLOSES[i - 1];
  const wick = 18 + ((i * 37) % 34);
  const up = close >= open;
  return {
    i,
    x: i * step + step / 2,
    open,
    close,
    high: Math.max(open, close) + wick,
    low: Math.min(open, close) - wick,
    up,
    body: Math.abs(close - open),
  };
});

const maxBody = Math.max(...candles.map((c) => c.body));

const GAIN = "var(--candle-up)";
const LOSS = "var(--candle-down)";

function Tag({
  x,
  y,
  label,
  tone,
}: {
  x: number;
  y: number;
  label: "SELL" | "BUY";
  tone: "sell" | "buy";
}) {
  const fill = tone === "sell" ? "var(--candle-down)" : "var(--signal)";
  const text = tone === "sell" ? "#ffffff" : "#08090b";
  const w = tone === "sell" ? 44 : 38;

  return (
    <g>
      <line
        x1={x}
        y1={y + 10}
        x2={x}
        y2={y + 30}
        stroke={fill}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <rect x={x - w / 2} y={y - 11} width={w} height={21} rx="4" fill={fill} />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={text}
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  );
}

const priceAt = (y: number) =>
  P_MAX - ((y - PLOT_TOP) / PLOT_H) * (P_MAX - P_MIN);

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export function HeroChart({ className = "" }: { className?: string }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{
    x: number;
    y: number;
    index: number;
  } | null>(null);

  const track = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    // Touch devices get the static chart — a crosshair under a finger is
    // hidden by the finger.
    if (event.pointerType !== "mouse") return;

    const box = shellRef.current?.getBoundingClientRect();
    if (!box) return;

    const x = ((event.clientX - box.left) / box.width) * W;
    const y = ((event.clientY - box.top) / box.height) * H;

    if (x > PLOT_W || y < PLOT_TOP || y > PLOT_TOP + PLOT_H) {
      setCursor(null);
      return;
    }

    const index = Math.min(
      candles.length - 1,
      Math.max(0, Math.round((x - step / 2) / step)),
    );
    setCursor({ x: candles[index].x, y, index });
  }, []);

  const hovered = cursor ? candles[cursor.index] : null;
  const last = candles[candles.length - 1];

  const sellA = candles[7];
  const sellB = candles[15];
  const buy = candles[22];

  return (
    <div
      ref={shellRef}
      onPointerMove={track}
      onPointerLeave={() => setCursor(null)}
      className={`chart-shell relative ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Candlestick chart with AI-marked sell and buy points and a rising trend line"
      >
        <defs>
          <linearGradient id="chart-bg" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="var(--chart-bg-top)" />
            <stop offset="1" stopColor="var(--chart-bg-bottom)" />
          </linearGradient>
          <linearGradient id="trend-stroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--trend-a)" />
            <stop offset="0.7" stopColor="var(--trend-b)" />
            <stop offset="1" stopColor="var(--trend-c)" />
          </linearGradient>
          <filter id="trend-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="floor-glow" cx="0.5" cy="1" r="0.7">
            <stop offset="0" stopColor="var(--trend-b)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--trend-b)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} rx="16" fill="url(#chart-bg)" />
        <rect width={W} height={H} rx="16" fill="url(#floor-glow)" />

        {/* horizontal price grid */}
        {Array.from({ length: 9 }, (_, i) => {
          const price = 26800 - i * 200;
          const y = priceY(price);
          return (
            <g key={price}>
              <line
                x1="0"
                y1={y}
                x2={PLOT_W}
                y2={y}
                stroke="var(--fg)"
                strokeOpacity="0.07"
                strokeWidth="1"
              />
              <text
                x={PLOT_W + 10}
                y={y + 4}
                fill="var(--axis-label)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {price.toLocaleString("en-US")}.00
              </text>
            </g>
          );
        })}

        {/* candles */}
        {candles.map((c) => {
          const color = c.up ? GAIN : LOSS;
          const top = priceY(Math.max(c.open, c.close));
          const height = Math.max(2, priceY(Math.min(c.open, c.close)) - top);
          return (
            <g key={c.i}>
              <line
                className="chart-wick"
                data-active={cursor?.index === c.i}
                x1={c.x}
                y1={priceY(c.high)}
                x2={c.x}
                y2={priceY(c.low)}
                stroke={color}
                strokeWidth="1.2"
                strokeOpacity="0.85"
              />
              <rect
                className="chart-candle"
                data-active={cursor?.index === c.i}
                x={c.x - bodyW / 2}
                y={top}
                width={bodyW}
                height={height}
                fill={color}
                fillOpacity={c.up ? 0.95 : 0.85}
                rx="1"
              />
            </g>
          );
        })}

        {/* volume */}
        {candles.map((c) => {
          const h = Math.max(3, (c.body / maxBody) * VOL_H);
          return (
            <rect
              key={`v-${c.i}`}
              x={c.x - bodyW / 2}
              y={VOL_TOP + (VOL_H - h)}
              width={bodyW}
              height={h}
              fill={c.up ? GAIN : LOSS}
              fillOpacity="0.35"
              rx="1"
            />
          );
        })}

        {/* AI-marked entries and exits */}
        <Tag x={sellA.x} y={priceY(sellA.high) - 26} label="SELL" tone="sell" />
        <Tag x={sellB.x} y={priceY(sellB.high) - 26} label="SELL" tone="sell" />
        <Tag x={buy.x} y={priceY(buy.low) + 46} label="BUY" tone="buy" />

        {/* trend arrow */}
        <g filter="url(#trend-glow)">
          <path
            className="chart-trend"
            d={`M8 ${H - 40} C ${PLOT_W * 0.3} ${H - 70}, ${PLOT_W * 0.52} ${PLOT_H - 40}, ${PLOT_W - 34} 44`}
            stroke="url(#trend-stroke)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${PLOT_W - 62} 74 L${PLOT_W - 26} 34 L${PLOT_W - 62} 30 Z`}
            fill="var(--arrowhead)"
            transform={`rotate(12 ${PLOT_W - 44} 52)`}
          />
        </g>

        {/* Idle: the last price keeps a slow live pulse. */}
        <circle
          cx={last.x}
          cy={priceY(last.close)}
          r="3.5"
          fill="var(--trend-b)"
        />
        <circle
          className="chart-pulse"
          cx={last.x}
          cy={priceY(last.close)}
          r="4"
          fill="none"
          stroke="var(--trend-b)"
          strokeWidth="1.5"
        />

        {/* Hover: crosshair snapped to the nearest candle, with a price tag. */}
        {cursor && hovered && (
          <g pointerEvents="none">
            <line
              x1={cursor.x}
              y1={PLOT_TOP}
              x2={cursor.x}
              y2={PLOT_TOP + PLOT_H}
              stroke="var(--fg)"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1="0"
              y1={cursor.y}
              x2={PLOT_W}
              y2={cursor.y}
              stroke="var(--fg)"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle
              cx={cursor.x}
              cy={priceY(hovered.close)}
              r="3.5"
              fill="var(--fg)"
              stroke="var(--chart-bg-bottom)"
              strokeWidth="1.5"
            />
            <rect
              x={PLOT_W + 2}
              y={cursor.y - 9}
              width={58}
              height={18}
              rx="3"
              fill="var(--fg)"
            />
            <text
              x={PLOT_W + 8}
              y={cursor.y + 4}
              fill="var(--chart-bg-bottom)"
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-mono)"
            >
              {fmt(priceAt(cursor.y))}
            </text>
          </g>
        )}
      </svg>

      {/* OHLC readout, the way a terminal shows it. */}
      <div
        className={`border-line-strong bg-panel/90 pointer-events-none absolute top-3 left-3 rounded-lg border px-3 py-2 backdrop-blur-sm transition-opacity duration-150 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-wide">
          {(
            [
              ["O", hovered?.open],
              ["H", hovered?.high],
              ["L", hovered?.low],
              ["C", hovered?.close],
            ] as const
          ).map(([label, value]) => (
            <span key={label} className="flex items-center gap-1">
              <span className="text-fg-dim">{label}</span>
              <span
                style={{
                  color: hovered?.up
                    ? "var(--candle-up)"
                    : "var(--candle-down)",
                }}
                className="font-semibold"
              >
                {value === undefined ? "—" : fmt(value)}
              </span>
            </span>
          ))}
        </div>
        <p className="text-fg-faint mt-1 font-mono text-[9px] tracking-[0.12em] uppercase">
          Sample data · illustrative
        </p>
      </div>
    </div>
  );
}
