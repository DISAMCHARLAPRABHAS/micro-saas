'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from './ui/button';
import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import { useToast } from '@/hooks/use-toast';
import { AppLogo } from './app-logo';

export function AppHeader() {
  const { toast } = useToast();
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6 z-20">
      <div className="flex items-center gap-4">
        <div className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <AppLogo />
        </div>
        <MainNav />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => toast({ title: 'Search coming soon!' })}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => toast({ title: 'Notifications coming soon!' })}
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
