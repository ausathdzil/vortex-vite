import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <>
      <aside>Sidebar</aside>
      <Outlet />
    </>
  );
}
