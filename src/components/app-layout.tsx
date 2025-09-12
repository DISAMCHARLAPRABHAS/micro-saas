'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { BottomNav } from '@/components/bottom-nav';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="md:flex flex-1 min-h-0 hidden">
        <Sidebar className="bg-card border-r flex">
          <SidebarHeader className="border-b">
            <AppLogo />
            <h1 className="text-lg font-headline font-semibold text-primary">
              NexaHome
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 min-h-0">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
      <div className="flex md:hidden flex-col flex-1 min-h-0">
        <main className="flex-1 overflow-auto pb-20">{children}</main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
