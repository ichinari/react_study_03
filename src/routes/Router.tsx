import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './routeConfig';

export const AppRoutes = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
