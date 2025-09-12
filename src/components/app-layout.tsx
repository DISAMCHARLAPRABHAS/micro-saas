'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarSheetContent,
  SidebarSheetHeader,
  SidebarSheet,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { MainNav } from '@/components/main-nav';
import { Button } from './ui/button';
import { PanelLeft } from 'lucide-react';
import { SheetTitle } from './ui/sheet';
import { UserButton, useUser } from '@clerk/nextjs';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {isSignedIn && (
          <Sidebar
            className="bg-card border-r hidden md:flex"
            collapsible="icon"
          >
            <SidebarHeader>
              <AppLogo className="w-8 h-8" />
            </SidebarHeader>
            <SidebarContent>
              <MainNav />
            </SidebarContent>
            <SidebarFooter>
              <UserButton />
            </SidebarFooter>
          </Sidebar>
        )}
        <div className="flex flex-col flex-1">
          {isSignedIn && (
            <header className="flex items-center justify-between p-2 border-b md:hidden">
              <div className="flex items-center gap-2">
                <AppLogo className="w-6 h-6" />
                <h1 className="text-lg font-headline font-semibold text-primary">
                  HomeAI
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <UserButton />
                <SidebarSheet>
                  <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <PanelLeft />
                    </Button>
                  </SidebarTrigger>
                  <SidebarSheetContent>
                    <SidebarSheetHeader>
                      <AppLogo className="w-8 h-8" />
                      <SheetTitle className="text-xl font-headline font-semibold tracking-tight text-primary">
                        HomeAI
                      </SheetTitle>
                    </SidebarSheetHeader>
                    <MainNav />
                  </SidebarSheetContent>
                </SidebarSheet>
              </div>
            </header>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
