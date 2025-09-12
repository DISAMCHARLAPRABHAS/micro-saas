import { MainNav } from './main-nav';

export function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-16 bg-card border-t z-10">
      <MainNav isBottomNav />
    </footer>
  );
}
