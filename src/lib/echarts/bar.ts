import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer,
]);

export default echarts;
