import { ImageResponse } from "next/og";

/**
 * Apple touch icon. iOS ignores SVG favicons, so this renders the same mark as
 * a PNG. Slightly heavier strokes and more padding than icon.svg — the icon
 * gets rounded and shown large on a home screen.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090B",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 17.5 8.5 10l4 4.5L21 5"
            stroke="#C8FF4D"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 5H21v5.5"
            stroke="#C8FF4D"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
