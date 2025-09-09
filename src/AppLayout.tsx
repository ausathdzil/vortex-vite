import { Outlet } from 'react-router';

import { GlobalStyle } from './components/GlobalStyle';
import { Container } from './components/SharedStyles';
import { AppSidebar } from './components/Sidebar';

export default function AppLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <AppSidebar />
        <Outlet />
      </Container>
    </>
  );
}
