import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';

import { ContentWrapper, Header, Main, Title } from '@/components/SharedStyles.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Skeleton } from '@/components/ui/Skeleton.tsx';
import { getProvinceSummary } from '@/lib/data/news.ts';

const ProvinceSummaryGraph = lazy(
  () => import('@/components/dashboard/ProvinceSummaryGraph.tsx')
);
const ProvinceSummaryBar = lazy(
  () => import('@/components/dashboard/ProvinceSummaryBar.tsx')
);

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
      <ChartContainer title="Province Graph">
        <ProvinceSummaryGraph data={data} />
      </ChartContainer>
      <ChartContainer title="Province Bar">
        <ProvinceSummaryBar data={data} />
      </ChartContainer>
    </div>
  );
}

function ChartContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="size-full min-h-[500px]" />}>
          {children}
        </Suspense>
      </CardContent>
    </Card>
  );
}
