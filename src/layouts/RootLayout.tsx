import { useEffect } from 'react';
import { Outlet, Link } from 'react-router';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export default function RootLayout() {
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col font-sans antialiased bg-background text-foreground">
      <nav className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg font-bold shadow-sm">
            T
          </div>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium transition-colors border shadow-sm",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-input"
          )}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
