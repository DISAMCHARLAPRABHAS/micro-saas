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
import { LogOut, PanelLeft, User } from 'lucide-react';
import { SheetTitle } from './ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const isSignedIn = !!user;

  const showLayout = !['/sign-in', '/register'].includes(pathname) && !loading;

  if (!showLayout) {
    return <>{children}</>;
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
