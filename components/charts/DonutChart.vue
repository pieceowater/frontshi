<template>
  <div class="mb-5 p-5">
    <h1 class="text-xl font-bold">Пирог</h1>
    <!-- Basic container for ECharts with dynamic resizing -->
    <div ref="chart" class="w-full h-64"></div>
    <hr>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import * as echarts from 'echarts';

// Define props to accept data from parent
const props = defineProps<{ data: { name: string, value: number }[] }>();

const chart = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);
    updateChart();
    window.addEventListener('resize', resizeChart);
  }
});

// Watch for changes in props.data to re-render the chart
watch(() => props.data, updateChart, {deep: true});

function updateChart() {
  if (!chartInstance || !props.data) return;

  // Define chart options with dynamic data
  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Pirog',
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        // Bind data to the series
        data: props.data
      }
    ]
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

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>