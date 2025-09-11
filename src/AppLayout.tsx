import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { GlobalStyle } from './components/GlobalStyle';
import {
  Container,
  ContentWrapper,
  Header,
  Main,
} from './components/SharedStyles';
import { AppSidebar } from './components/ui/Sidebar';
import { Skeleton } from './components/ui/Skeleton';

export default function AppLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <AppSidebar />
        <Suspense fallback={<AppSkeleton />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}

function AppSkeleton() {
  return (
    <ContentWrapper>
      <Header>
        <Skeleton className="w-full h-6" />
      </Header>
      <Main>
        <Skeleton className="size-full" />
      </Main>
    </ContentWrapper>
  );
}
