<template>
  <!-- Basic container for ECharts with dynamic resizing -->
  <div ref="chart" class="w-full h-64"></div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import * as echarts from 'echarts'

const chart = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chart.value) {
    // Initialize the chart
    chartInstance = echarts.init(chart.value)

    // Define chart options
    const options: echarts.EChartsOption = {
      title: {
        text: 'Общее Количество Заказов',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Пон', 'Вт', 'Ср', 'Чет', 'Пят', 'Суб', 'Вос']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Заказов Всего',
          type: 'bar',
          data: [150, 220, 236, 260, 270, 274, 300]
        }
      ]
    }

    // Set the options
    chartInstance.setOption(options)

    // Handle resizing
    window.addEventListener('resize', resizeChart)
  }
})

// Cleanup on unmount
onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', resizeChart)
    chartInstance.dispose()
  }
})

// Function to resize chart on window resize
function resizeChart() {
  if (chartInstance) chartInstance.resize()
}
</script>

<style scoped>
/* Ensure the chart container has a defined size */
.chart {
  width: 100%;
  height: 100%;
}
</style>