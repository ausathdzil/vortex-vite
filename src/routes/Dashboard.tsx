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
    <div className="size-full grid grid-cols-2 gap-8">
      <ProvinceSummaryGraph data={data} />
      <ProvinceSummaryChart data={data} />
    </div>
  );
}

function ProvinceSummaryGraph({ data }: { data: ProvinceSummary[] }) {
  const provinceNodes = data.map((province, index) => ({
    id: province.province,
    name: province.province,
    symbolSize: Math.min(Math.sqrt(province.article_count) * 3, 50),
    value: province.article_count,
    category: index,
  }));

  const cityNodes = data.flatMap((province, provinceIndex) =>
    province.cities.map((city) => {
      return {
        id: `${province.province}-${city.city}`,
        name: city.city,
        symbolSize: Math.min(Math.sqrt(city.article_count) * 1.5, 25),
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
        padding: -12,
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        legendHoverLink: false,
        layout: 'circular',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        label: {
          position: 'right',
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
    <ReactECharts
      option={options}
      style={{ height: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
}

function ProvinceSummaryChart({ data }: { data: ProvinceSummary[] }) {
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
      style={{ height: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
}
