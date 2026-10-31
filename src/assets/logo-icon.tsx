import React from "react";

export interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = "size-8" }: LogoIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.15" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <path
        d="M10 8.5H22V11.75H14.5V14.5H20.5V17.75H14.5V23.5H10V8.5Z"
        fill="currentColor"
      />
      <circle cx="21" cy="22.5" r="2" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

export { LogoIcon };
