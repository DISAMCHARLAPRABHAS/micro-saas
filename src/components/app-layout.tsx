'use client';
import { BottomNav } from '@/components/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // For unauthenticated users on login/signup pages, we render a minimal layout
  if (isAuthPage || !user) {
    const { loading } = useAuth();
    if (loading) return null; // Or a loading spinner
    if (isAuthPage) {
       return <>{children}</>;
    }
  }

  // The full layout for authenticated users
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
