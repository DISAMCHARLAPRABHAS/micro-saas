'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { useState } from 'react';
import { BottomNav } from './bottom-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <SidebarProvider>
      <div className="flex flex-1 min-h-0">
        <Sidebar className="bg-card border-r hidden md:flex" collapsible="icon">
          <SidebarHeader>
            <AppLogo className="w-8 h-8" />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 min-h-0">
          <main className="flex-1 overflow-auto pb-20 md:pb-0">{children}</main>
        </div>
      </div>
       <div className="md:hidden">
         <BottomNav />
      </div>
    </SidebarProvider>
  );
}
