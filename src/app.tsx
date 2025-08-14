import 'src/global.css';

import { useEffect, useState } from 'react';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';
import { ScrollProgress } from 'src/components/scroll-progress';
import { SnackbarProvider } from 'src/components/snackbar';
import { Preloader } from 'src/components/preloader';
import { PreloaderProvider } from 'src/components/preloader-context';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <ThemeProvider>
      <PreloaderProvider>
        <SnackbarProvider>
          <Preloader isLoading={isInitialLoading} onComplete={handlePreloaderComplete} />
          <ScrollProgress />
          {children}
        </SnackbarProvider>
      </PreloaderProvider>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
