import { useQuery } from '@tanstack/react-query';

import { lazy, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/Card';
import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';
import { Skeleton } from '../components/ui/Skeleton';
import { getProvinceSummary } from '../lib/data/news';

export default function Dashboard() {
  return (
    <ContentWrapper>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Main>
        <DashboardCharts />
      </Main>
    </ContentWrapper>
  );
}

const ProvinceSummaryGraph = lazy(
  () => import('../components/dashboard/ProvinceSummaryGraph')
);
const ProvinceSummaryBar = lazy(
  () => import('../components/dashboard/ProvinceSummaryBar')
);

function DashboardCharts() {
  const { isPending, error, data } = useQuery({
    queryKey: ['province-summary'],
    queryFn: getProvinceSummary,
  });

  if (isPending) {
    return (
      <div className="grid xl:grid-cols-2 gap-6">
        <Skeleton className="size-full min-h-[614px]" />
        <Skeleton className="size-full min-h-[614px]" />
      </div>
    );
  }

  if (error) {
    return (
      <p>
        Error: <span className="text-destructive">{error.message}</span>
      </p>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Province Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="size-full min-h-[500px]" />}>
            <ProvinceSummaryGraph data={data} />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Province Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="size-full min-h-[500px]" />}>
            <ProvinceSummaryBar data={data} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
