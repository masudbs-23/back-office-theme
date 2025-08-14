import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const NewBlogPage = lazy(() => import('src/pages/new-blog'));
export const BlogDetailPage = lazy(() => import('src/pages/blog-detail'));
export const UserPage = lazy(() => import('src/pages/user'));
export const NewUserPage = lazy(() => import('src/pages/new-user'));
export const UserDetailPage = lazy(() => import('src/pages/user-detail'));
export const NewProductPage = lazy(() => import('src/pages/new-product'));
export const ProductDetailPage = lazy(() => import('src/pages/product-detail'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const VerifyOtpPage = lazy(() => import('src/pages/verify-otp'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ChangePasswordPage = lazy(() => import('src/pages/change-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    ),
  },
  {
    path: 'verify-otp',
    element: (
      <AuthLayout>
        <VerifyOtpPage />
      </AuthLayout>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'user/new', element: <NewUserPage /> },
      { path: 'user/:id', element: <UserDetailPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/new', element: <NewProductPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/new', element: <NewBlogPage /> },
      { path: 'blog/:id', element: <BlogDetailPage /> },
    ],
  },
  {
    path: 'profile',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <ProfilePage />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: 'change-password',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <ChangePasswordPage />
        </Suspense>
      </DashboardLayout>
    ),
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
