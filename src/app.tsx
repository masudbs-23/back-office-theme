import 'src/global.css';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';
import { ScrollProgress } from 'src/components/scroll-progress';
import { SnackbarProvider } from 'src/components/snackbar';
import { Preloader } from 'src/components/preloader';
import { PreloaderProvider } from 'src/components/preloader-context';
import { AuthProvider } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <PreloaderProvider>
            <SnackbarProvider>
              <Preloader isLoading={isInitialLoading} onComplete={handlePreloaderComplete} />
              <ScrollProgress />
              {children}
            </SnackbarProvider>
          </PreloaderProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
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
