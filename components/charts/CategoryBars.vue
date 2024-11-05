<template>
  <div class="mb-5 p-5">
    <h1 class="text-xl font-bold">Палки</h1>
    <div ref="chart" class="w-full h-64"></div>
    <hr>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import * as echarts from 'echarts';

// Define props to accept data from parent
const props = defineProps<{
  categories: string[];
  seriesData: {
    name: string;
    data: number[];
  }[];
}>();

const chart = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);
    updateChart(); // Initial render with provided data
    window.addEventListener('resize', resizeChart);
  }
});

// Watch for changes in props.seriesData to re-render the chart
watch([() => props.seriesData, () => props.categories], updateChart, {deep: true});

function updateChart() {
  if (!chartInstance) return;

  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: props.categories,
    },
    yAxis: {
      type: 'value',
    },
    series: props.seriesData.map(series => ({
      name: series.name,
      type: 'bar',
      data: series.data,
    })),
  };

  chartInstance.clear();
  chartInstance.setOption(options);
}

// Cleanup on unmount
onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', resizeChart);
    chartInstance.dispose();
  }
});

function resizeChart() {
  if (chartInstance) chartInstance.resize();
}
</script>