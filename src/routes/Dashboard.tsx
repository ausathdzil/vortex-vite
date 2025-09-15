import { useQuery } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';

import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '@/components/SharedStyles.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card.tsx';
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

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      <ChartContainer title="Province Graph">
        <Suspense fallback={<Skeleton className="size-full min-h-[500px]" />}>
          <ProvinceSummaryGraph
            data={data}
            isLoading={isPending}
            error={error}
          />
        </Suspense>
      </ChartContainer>
      <ChartContainer title="Province Bar">
        <Suspense fallback={<Skeleton className="size-full min-h-[500px]" />}>
          <ProvinceSummaryBar data={data} isLoading={isPending} error={error} />
        </Suspense>
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
      <CardContent>{children}</CardContent>
    </Card>
  );
}
