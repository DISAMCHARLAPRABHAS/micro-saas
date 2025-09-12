import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', props.className)}
      {...props}
    >
      <path
        fill="hsl(var(--primary))"
        d="M12 2L2 8.5V10.5L12 4L22 10.5V8.5L12 2Z M18 7.5V6.5L20 7.5V8.5L18 7.5Z"
      />
      <path
        fill="hsl(var(--foreground))"
        d="M10.5 11H13.5V12.5H10.5V11Z M10.5 13.5H13.5V15H10.5V13.5Z"
      />
      <path
        fill="hsl(var(--foreground))"
        d="M4,10.85 L4,22 L9,22 L9,15 L15,15 L15,22 L20,22 L20,10.85 L12,6 L4,10.85 Z M13.5,13.5 L10.5,13.5 L10.5,11 L13.5,11 L13.5,13.5 Z"
      />
    </svg>
  );
}
