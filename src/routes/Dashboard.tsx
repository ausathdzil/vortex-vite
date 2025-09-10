import { useQuery } from '@tanstack/react-query';

import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';
import { Skeleton } from '../components/Skeleton';
import { getProvinceSummary } from '../lib/data/news';

export default function Dashboard() {
  return (
    <ContentWrapper>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Main>
        <DashboardContent />
      </Main>
    </ContentWrapper>
  );
}

function DashboardContent() {
  const { isPending, error, data } = useQuery({
    queryKey: ['provinceSummary'],
    queryFn: getProvinceSummary,
  });

  if (isPending) return <Skeleton className="size-full" />;

  if (error)
    return (
      <p>
        Error: <span className="text-destructive">{error.message}</span>
      </p>
    );

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
