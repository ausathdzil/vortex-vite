import { useQuery } from '@tanstack/react-query';
import { type EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import {
  ContentWrapper,
  Header,
  Main,
  Title,
} from '../components/SharedStyles';
import { Skeleton } from '../components/Skeleton';
import { getProvinceSummary } from '../lib/data/news';
import type { ProvinceSummary } from '../lib/types/news';

export default function Dashboard() {
  return (
    <ContentWrapper>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Main>
        <ChartsWrapper />
      </Main>
    </ContentWrapper>
  );
}

function ChartsWrapper() {
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

  return (
    <div className="h-full grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ProvinceSummaryGraph data={data} />
      <ProvinceSummaryChart data={data} />
    </div>
  );
}

function ProvinceSummaryGraph({ data }: { data: ProvinceSummary[] }) {
  const provinceNodes = data.map((province, index) => ({
    id: province.province,
    name: province.province,
    symbolSize: Math.sqrt(province.article_count),
    value: province.article_count,
    category: index,
  }));

  const cityNodes = data.flatMap((province, provinceIndex) =>
    province.cities.map((city) => {
      return {
        id: `${province.province}-${city.city}`,
        name: city.city,
        symbolSize: Math.sqrt(city.article_count),
        value: city.article_count,
        category: provinceIndex,
      };
    })
  );

  const nodes = [...provinceNodes, ...cityNodes];

  const links = data.flatMap((province) =>
    province.cities.map((city) => ({
      source: province.province,
      target: `${province.province}-${city.city}`,
      value: city.article_count,
    }))
  );

  const categories = data.map((province) => ({
    name: province.province,
  }));

  const options: EChartsOption = {
    textStyle: {
      fontFamily: 'Inter',
    },
    tooltip: {},
    legend: [
      {
        data: categories.map((category) => category.name),
        itemGap: 16,
        itemWidth: 15,
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        zoom: 0.9,
        top: 'top',
        legendHoverLink: false,
        layout: 'circular',
        data: nodes,
        links: links,
        categories: categories,
        label: {
          position: 'top',
          formatter: '{b}',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Province Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts
          option={options}
          style={{ height: '100%', minHeight: '500px' }}
          opts={{ renderer: 'svg' }}
        />
      </CardContent>
    </Card>
  );
}

function ProvinceSummaryChart({ data }: { data: ProvinceSummary[] }) {
  const option: EChartsOption = {
    textStyle: {
      fontFamily: 'Inter',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.province),
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Article Count',
        type: 'bar',
        data: data.map((item) => item.article_count),
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Province Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts
          option={option}
          style={{ height: '100%', minHeight: '500px' }}
          opts={{ renderer: 'svg' }}
        />
      </CardContent>
    </Card>
  );
}
