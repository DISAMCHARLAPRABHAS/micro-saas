'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
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
    label: 'Chatbot',
    icon: MessageSquare,
  },
  {
    path: '/design-suggestions',
    label: 'Design Ideas',
    icon: ImageIcon,
  },
  {
    path: '/planning-ideas',
    label: 'Planning Ideas',
    icon: LayoutTemplate,
  },
  {
    path: '/materials',
    label: 'Materials',
    icon: Wrench,
  },
  {
    path: '/color-palettes',
    label: 'Color Palettes',
    icon: Palette,
  },
];

type MainNavProps = {
  onLinkClick?: () => void;
  isBottomNav?: boolean;
};


export function MainNav({ onLinkClick, isBottomNav = false }: MainNavProps) {
  const pathname = usePathname();

  if (isBottomNav) {
     return (
      <div className="flex justify-around items-center h-full">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.path} onClick={onLinkClick} className={cn("flex flex-col items-center justify-center gap-1 w-full h-full", 
          pathname.startsWith(item.path) ? 'text-primary' : 'text-muted-foreground'
          )}>
            <item.icon className="shrink-0 w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.path)}
            variant="ghost"
            className="justify-start"
            tooltip={item.label}
            onClick={onLinkClick}
          >
            <Link href={item.path}>
              <item.icon className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
