'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  ImageIcon,
  Wrench,
  Palette,
  LayoutTemplate,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    path: '/chat',
    label: 'Chat',
    icon: MessageSquare,
  },
  {
    path: '/design-suggestions',
    label: 'Design',
    icon: ImageIcon,
  },
  {
    path: '/planning-ideas',
    label: 'Planning',
    icon: LayoutTemplate,
  },
  {
    path: '/materials',
    label: 'Materials',
    icon: Wrench,
  },
  {
    path: '/color-palettes',
    label: 'Colors',
    icon: Palette,
  },
];

type MainNavProps = {
  onLinkClick?: () => void;
  isMobile?: boolean;
};

export function MainNav({ onLinkClick, isMobile = false }: MainNavProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <nav className="flex justify-around items-center h-full">
        {menuItems.map(item => (
          <Link
            href={item.path}
            key={item.path}
            className={cn(
              'flex flex-col items-center justify-center gap-1 w-full h-full',
              pathname.startsWith(item.path)
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
            onClick={onLinkClick}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="p-4 space-y-2">
      {menuItems.map(item => (
        <Link
          href={item.path}
          key={item.path}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
            pathname.startsWith(item.path)
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted'
          )}
          onClick={onLinkClick}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
