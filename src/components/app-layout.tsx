'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { BottomNav } from '@/components/bottom-nav';
import { UserNav } from '@/components/user-nav';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 min-h-0">
        <Sidebar className="bg-card border-r flex">
          <SidebarHeader className="border-b group transition-transform duration-300 hover:scale-105">
            <AppLogo className="transition-transform duration-300 group-hover:animate-pulse" />
            <h1 className="text-lg font-headline font-semibold text-primary transition-colors duration-300 group-hover:text-primary/80">
              NexaHome
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 min-h-0">
           <header className="flex h-14 items-center justify-end gap-4 border-b bg-card px-6">
              <UserNav />
            </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col flex-1 min-h-0">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <AppLogo className="transition-transform duration-300 group-hover:animate-pulse" />
            <h1 className="text-lg font-headline font-semibold text-primary transition-colors duration-300 group-hover:text-primary/80">
              NexaHome
            </h1>
          </div>
           <UserNav />
        </header>
        <main className="flex-1 overflow-auto pb-20">{children}</main>
        <BottomNav />
      </div>
    </>
  );
}
