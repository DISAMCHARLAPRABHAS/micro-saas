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

export function MainNav() {
  const pathname = usePathname();

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
