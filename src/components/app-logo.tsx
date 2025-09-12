import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-5 h-5', props.className)}
      {...props}
    >
      <path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke="hsl(var(--primary))"
      />
      <polyline
        points="9 22 9 12 15 12 15 22"
        stroke="hsl(var(--foreground))"
      />
    </svg>
  );
}
