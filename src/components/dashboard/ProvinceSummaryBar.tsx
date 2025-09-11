import { type EChartsOption } from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';

import echarts from '../../lib/echarts/bar';
import type { ProvinceSummary } from '../../lib/types/news';

export default function ProvinceSummaryBar({
  data,
}: {
  data: ProvinceSummary[];
}) {
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
