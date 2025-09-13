'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  ImageIcon,
  Wrench,
  Palette,
  LayoutTemplate,
  Home,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const menuItems = [
  {
    path: '/planning-ideas',
    label: 'Home',
    icon: Home,
    desktopLabel: 'Home (Planning)',
  },
  {
    path: '/color-palettes',
    label: 'Colors',
    icon: Palette,
  },
  {
    path: '/materials',
    label: 'Materials',
    icon: Wrench,
  },
  {
    path: '/design-suggestions',
    label: 'Design Ideas',
    icon: ImageIcon,
  },
  {
    path: '/chat',
    label: 'Chatbot',
    icon: Bot,
  },
];

type MainNavProps = {
  isMobile?: boolean;
};

export function MainNav({ isMobile = false }: MainNavProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <nav className="flex justify-around items-center h-full">
        {menuItems.map(item => (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <Link
                href={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 w-full h-full text-xs',
                  pathname.startsWith(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.desktopLabel || item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-1">
      {menuItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <Link
            href={item.path}
            className={cn(
              buttonVariants({
                variant: pathname.startsWith(item.path) ? 'secondary' : 'ghost',
                size: 'sm',
              }),
              'font-normal'
            )}
          >
            {item.desktopLabel || item.label}
          </Link>
          {index < menuItems.length - 1 && (
            <span className="text-muted-foreground/50">|</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
