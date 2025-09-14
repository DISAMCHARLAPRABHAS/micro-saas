'use client';
import { BottomNav } from '@/components/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  // The layout for authenticated users
  if (user) {
    return (
      <>
        <div className="flex flex-col flex-1 min-h-0">
          <AppHeader />
          <main className="flex-1 overflow-auto md:pb-0 pb-20">{children}</main>
          <AppFooter />
          <div className="md:hidden">
            <BottomNav />
          </div>
        </div>
      </>
    );
  }

  // The layout for unauthenticated users (login, signup pages)
  return <>{children}</>;
}
