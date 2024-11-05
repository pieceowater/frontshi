<template>
  <div class="mb-5 p-5">
    <div ref="chart" class="w-full h-64"></div>
    <hr>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{ data: { count: number, day: string }[] }>();

const chart = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);
    updateChart();
    window.addEventListener('resize', resizeChart);
  }
});

watch(() => props.data, updateChart, {deep: true});

function updateChart() {
  if (!chartInstance || !chart.value || !props.data) return;

  const days = props.data.map(item => item.day);
  const counts = props.data.map(item => item.count);

  const options: echarts.EChartsOption = {
    title: {
      text: 'Вертикальные палки',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: days,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Заказов Всего',
        type: 'bar',
        data: counts,
      },
    ],
  };

  chartInstance.clear();
  chartInstance.setOption(options);
}

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

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>