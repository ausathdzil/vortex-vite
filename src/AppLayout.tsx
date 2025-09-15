import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { GlobalStyle } from './components/GlobalStyle.tsx';
import {
  Container,
  ContentWrapper,
  Header,
  Main,
} from './components/SharedStyles.tsx';
import { AppSidebar } from './components/ui/Sidebar.tsx';
import { Skeleton } from './components/ui/Skeleton.tsx';

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
        <Skeleton className="w-full h-5" />
      </Header>
      <Main>
        <Skeleton className="size-full" />
      </Main>
    </ContentWrapper>
  );
}
