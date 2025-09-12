'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarSheetContent,
  SidebarSheetHeader,
  SidebarSheet,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { Button } from './ui/button';
import { PanelLeft } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          className="bg-card border-r"
          collapsible="icon"
        >
          <SidebarHeader>
            <AppLogo className="w-8 h-8" />
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1">
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
        <SidebarSheet>
          <header className="flex items-center justify-between p-2 border-b md:hidden">
            <div className="flex items-center gap-2">
              <AppLogo className="w-6 h-6"/>
              <h1 className="text-lg font-headline font-semibold text-primary">HomeAI</h1>
            </div>
            <SidebarTrigger asChild>
                <Button variant="ghost" size="icon"><PanelLeft /></Button>
            </SidebarTrigger>
          </header>
          <SidebarSheetContent>
              <SidebarSheetHeader>
                  <AppLogo className="w-8 h-8" />
                  <h1 className="text-xl font-headline font-semibold tracking-tight text-primary">
                      HomeAI
                  </h1>
              </SidebarSheetHeader>
              <MainNav />
          </SidebarSheetContent>
        </SidebarSheet>
      </div>
    </SidebarProvider>
  );
}
