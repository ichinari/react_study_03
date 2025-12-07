import type { ReactNode } from 'react';
import Home from '@pages/Home.tsx';
import Login from '@pages/Login.tsx';
import Logout from '@pages/Logout.tsx';
import List from '@pages/List.tsx';

export type RouteConfig = {
  name: string;
  path: string;
  element: ReactNode;
};

export const routeConfig = {
  home: {
    name: 'home',
    path: '/',
    element: <Home />,
  },
  login: {
    name: 'login',
    path: '/login',
    element: <Login />,
  },
  logout: {
    name: 'logout',
    path: '/logout',
    element: <Logout />,
  },
  list: {
    name: 'list',
    path: '/list',
    element: <List />,
  },
} as const satisfies Record<string, RouteConfig>;
