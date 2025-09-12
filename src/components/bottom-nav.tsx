'use client';
import { MainNav } from './main-nav';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-10 md:hidden">
      <MainNav isMobile={true} />
    </div>
  );
}
