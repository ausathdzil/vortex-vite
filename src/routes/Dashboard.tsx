import { useQuery } from '@tanstack/react-query';
import { graphic, type EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

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
        <ProvinceSummaryChart />
      </Main>
    </ContentWrapper>
  );
}

function ProvinceSummaryChart() {
  const { isPending, error, data } = useQuery({
    queryKey: ['province-summary'],
    queryFn: getProvinceSummary,
  });

  if (isPending) {
    return <Skeleton className="size-full" />;
  }

  if (error) {
    return (
      <p>
        Error: <span className="text-destructive">{error.message}</span>
      </p>
    );
  }

  const option: EChartsOption = {
    textStyle: {
      fontFamily: 'Inter',
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.province),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.map((item) => item.article_count),
        type: 'bar',
        itemStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: 'var(--chart-1)' },
          ]),
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '500px' }}
      opts={{ renderer: 'svg' }}
    />
  );
}
