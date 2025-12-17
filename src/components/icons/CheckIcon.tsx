import type { IconProps } from '@/types';

export function CheckIcon({ className, size = 16, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden ? 'true' : 'false'}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
