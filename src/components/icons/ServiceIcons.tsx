import type { SVGProps } from "react";

export type ServiceIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

export function AerotermiaIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3.8C8.7 4.5 8.7 5.5 8 6.2C7.3 6.9 7.3 7.9 8 8.6" />
      <path d="M12 3.2C12.7 3.9 12.7 4.9 12 5.6C11.3 6.3 11.3 7.3 12 8" />
      <path d="M16 3.8C16.7 4.5 16.7 5.5 16 6.2C15.3 6.9 15.3 7.9 16 8.6" />
      <path d="M5.5 20.5V14c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v6.5" />
      <path d="M10.5 20.5V14c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v6.5" />
      <path d="M15.5 20.5V14c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v6.5" />
    </svg>
  );
}

export function SolarThermalIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: ServiceIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3.8C8.7 4.5 8.7 5.5 8 6.2C7.3 6.9 7.3 7.9 8 8.6" />
      <path d="M12 3.2C12.7 3.9 12.7 4.9 12 5.6C11.3 6.3 11.3 7.3 12 8" />
      <path d="M16 3.8C16.7 4.5 16.7 5.5 16 6.2C15.3 6.9 15.3 7.9 16 8.6" />
      <path d="M12 10.6C9.7 13.1 7.9 15.1 7.9 17.1C7.9 19.4 9.7 21.2 12 21.2C14.3 21.2 16.1 19.4 16.1 17.1C16.1 15.1 14.3 13.1 12 10.6Z" />
      <path d="M10.2 16.4C10.7 15.6 11.4 15.1 12.4 14.8" />
      <path d="M10.3 18.2C10.8 18.8 11.4 19.1 12.2 19.1C13.2 19.1 14 18.5 14.4 17.5" />
    </svg>
  );
}
