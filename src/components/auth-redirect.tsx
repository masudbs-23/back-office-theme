import type { ReactNode} from 'react';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/contexts/AuthContext';

interface AuthRedirectProps {
  children: ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Don't show loading spinner on sign-in or sign-up pages
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  
  // Show loading spinner while checking authentication (but not on auth pages)
  if (isLoading && !isAuthPage) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If authenticated, don't render children (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, render children
  return <>{children}</>;
}
