import { createBrowserRouter, RouterProvider } from 'react-router';
import {
  AUTH_LOGIN_PAGE_ROUTE,
  AUTH_SIGNUP_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  JOB_POSTING_CREATION_PAGE_ROUTE,
  JOB_POSTING_EDIT_PAGE_ROUTE,
  JOBS_PAGE_ROUTE,
  UNKNOWN_ROUTE,
} from './constants/routes';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/essentials/error-boundary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyLoadingProvider = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  const LazyComponent = lazy(importFunc);
  return (props: React.ComponentProps<T>) => (
    <ErrorBoundary>
      <Suspense fallback={<>Loading .....</>}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

const NotFoundPage = lazyLoadingProvider(() => import('./pages/not-found/page'));
const HomePage = lazyLoadingProvider(() => import('./App'));
const AuthPage = lazyLoadingProvider(() => import('./pages/auth/page'));
const JobsPage = lazyLoadingProvider(() => import('./pages/jobs/page'));
const JobsFormPage = lazyLoadingProvider(() => import('./pages/jobs/create-or-edit/page'));

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: HOME_PAGE_ROUTE,
      element: <HomePage />,
    },
    {
      path: AUTH_LOGIN_PAGE_ROUTE,
      element: <AuthPage />,
    },
    {
      path: AUTH_SIGNUP_PAGE_ROUTE,
      element: <AuthPage />,
    },
    {
      path: JOBS_PAGE_ROUTE,
      element: <JobsPage />,
      children: [
        {
          path: JOB_POSTING_CREATION_PAGE_ROUTE,
          element: <JobsFormPage />,
        },
        {
          path: JOB_POSTING_EDIT_PAGE_ROUTE,
          element: <JobsFormPage />,
        },
      ],
    },
    {
      path: UNKNOWN_ROUTE,
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
