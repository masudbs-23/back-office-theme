import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthRedirect } from 'src/components/auth-redirect';
import { ProtectedRoute } from 'src/components/protected-route';

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
export const OrdersPage = lazy(() => import('src/pages/orders'));
export const OrderDetailPage = lazy(() => import('src/pages/order-detail'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const VerifyOtpPage = lazy(() => import('src/pages/verify-otp'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const FoodsPage = lazy(() => import('src/pages/foods'));
export const NewFoodPage = lazy(() => import('src/pages/new-food'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ChangePasswordPage = lazy(() => import('src/pages/change-password'));
export const NotificationsPage = lazy(() => import('src/pages/notifications'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ERP Modules
export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const NewInventoryPage = lazy(() => import('src/pages/new-inventory'));
export const SuppliersPage = lazy(() => import('src/pages/suppliers'));
export const NewSupplierPage = lazy(() => import('src/pages/new-supplier'));
export const SupplierDetailPage = lazy(() => import('src/pages/supplier-detail'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const NewCustomerPage = lazy(() => import('src/pages/new-customer'));
export const CustomerDetailPage = lazy(() => import('src/pages/customer-detail'));
export const EmployeesPage = lazy(() => import('src/pages/employees'));
export const NewEmployeePage = lazy(() => import('src/pages/new-employee'));
export const EmployeeDetailPage = lazy(() => import('src/pages/employee-detail'));
export const CategoriesPage = lazy(() => import('src/pages/categories'));
export const NewCategoryPage = lazy(() => import('src/pages/new-category'));
export const PurchaseOrdersPage = lazy(() => import('src/pages/purchase-orders'));
export const AttendancePage = lazy(() => import('src/pages/attendance'));
export const NewAttendancePage = lazy(() => import('src/pages/new-attendance'));
export const LeaveManagementPage = lazy(() => import('src/pages/leave-management'));
export const NewLeaveRequestPage = lazy(() => import('src/pages/new-leave-request'));
export const SalesReportsPage = lazy(() => import('src/pages/sales-reports'));
export const PerformanceReviewsPage = lazy(() => import('src/pages/performance-reviews'));

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
      <AuthRedirect>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'verify-otp',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <VerifyOtpPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'user/new', element: <NewUserPage /> },
      { path: 'user/:id', element: <UserDetailPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/new', element: <NewProductPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'foods', element: <FoodsPage /> },
      { path: 'foods/new', element: <NewFoodPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/new', element: <NewBlogPage /> },
      { path: 'blog/:id', element: <BlogDetailPage /> },
      // ERP Routes
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'inventory/new', element: <NewInventoryPage /> },
      { path: 'suppliers', element: <SuppliersPage /> },
      { path: 'suppliers/new', element: <NewSupplierPage /> },
      { path: 'suppliers/:id', element: <SupplierDetailPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'customers/new', element: <NewCustomerPage /> },
      { path: 'customers/:id', element: <CustomerDetailPage /> },
      { path: 'employees', element: <EmployeesPage /> },
      { path: 'employees/new', element: <NewEmployeePage /> },
      { path: 'employees/:id', element: <EmployeeDetailPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'categories/new', element: <NewCategoryPage /> },
      { path: 'purchase-orders', element: <PurchaseOrdersPage /> },
      { path: 'attendance', element: <AttendancePage /> },
      { path: 'attendance/new', element: <NewAttendancePage /> },
      { path: 'leave-management', element: <LeaveManagementPage /> },
      { path: 'leave-management/new', element: <NewLeaveRequestPage /> },
      { path: 'performance-reviews', element: <PerformanceReviewsPage /> },
      { path: 'sales-reports', element: <SalesReportsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
    ],
  },
  {
    path: 'profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ProfilePage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'change-password',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <ChangePasswordPage />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: 'sign-in',
    element: (
      <AuthRedirect>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </AuthRedirect>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
