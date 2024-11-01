<template>
  <!-- Basic container for ECharts with dynamic resizing -->
  <div ref="chart" class="w-full h-64"></div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import * as echarts from 'echarts';

const chart = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chart.value) {
    // Initialize the chart
    chartInstance = echarts.init(chart.value);

    // Define chart options
    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['26/10/24', '27/10/24', '28/10/24', '29/10/24', '30/10/24', '31/10/24', '1/11/24'],
      },
      series: [
        {
          name: 'Новый',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: 'Черновик',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'В работе',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Отклонено',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [150, 212, 201, 154, 190, 330, 410],
        },
        {
          name: 'Завершено',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    // Set the options
    chartInstance.setOption(options);

    // Handle resizing
    window.addEventListener('resize', resizeChart);
  }
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', resizeChart);
    chartInstance.dispose();
  }
});

// Function to resize chart on window resize
function resizeChart() {
  if (chartInstance) chartInstance.resize();
}
</script>

<style scoped>
/* Ensure the chart container has a defined size */
.chart {
  width: 100%;
  height: 100%;
}
</style>