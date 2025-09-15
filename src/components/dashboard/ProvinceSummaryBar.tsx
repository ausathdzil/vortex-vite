import { type EChartsOption } from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';

import { Skeleton } from '@/components/ui/Skeleton';
import echarts from '@/lib/echarts/bar.ts';
import type { ProvinceSummary } from '@/lib/types/news.ts';

export default function ProvinceSummaryBar({
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
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '100%', minHeight: '500px' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
