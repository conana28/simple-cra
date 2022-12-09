import { Navigate, useRoutes, createBrowserRouter } from 'react-router-dom';
// <Navigate> element changes the current location when it is rendered.
// It's a component wrapper around useNavigate,
// and accepts all the same arguments as props.

// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageSix,
  PageFour,
  PageFive,
  LoginPage,
  PageThree,
} from './elements';

// ----------------------------------------------------------------------

// export default function Router() {
// The useRoutes hook is the functional equivalent of <Routes>,
// but it uses JavaScript objects instead of <Route> elements
// to define your routes. These objects have the same properties
// as normal <Route> elements, but they don't require JSX.
// The return value of useRoutes is either a valid React element
// you can use to render the route tree, or null if nothing matched.

// return useRoutes([

export const r = createBrowserRouter([
  {
    path: '/',
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      { path: 'one', element: <PageOne /> },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'user',
        children: [
          { element: <Navigate to="/dashboard/user/four" replace />, index: true },
          { path: 'four', element: <PageFour /> },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
  {
    element: <CompactLayout />,
    children: [{ path: '404', element: <Page404 /> }],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
// }
