import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { lazy } from 'react';
import AppLayout from './AppLayout';

const queryClient = new QueryClient();

const HomePage = lazy(() => import('./routes/Home'));
const NewsPage = lazy(() => import('./routes/News'));
const DashboardPage = lazy(() => import('./routes/Dashboard'));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
