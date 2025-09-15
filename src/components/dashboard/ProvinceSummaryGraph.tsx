import { type EChartsOption } from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';

import { Skeleton } from '@/components/ui/Skeleton';
import echarts from '@/lib/echarts/graph.ts';
import type { ProvinceSummary } from '@/lib/types/news.ts';

export default function ProvinceSummaryGraph({
  data,
  isLoading,
  error,
}: {
  data: ProvinceSummary[] | undefined;
  isLoading: boolean;
  error: Error | null;
}) {
  if (isLoading) {
    return <Skeleton className="size-full min-h-[500px]" />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] text-destructive">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        No data available
      </div>
    );
  }

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
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '100%', minHeight: '500px' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
