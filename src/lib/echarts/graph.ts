import { GraphChart } from 'echarts/charts';
import {
	LegendComponent,
	TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  CanvasRenderer,
  GraphChart,
  LegendComponent,
  TooltipComponent,
]);

export default echarts;
