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
    const options: echarts.EChartOption = {
      title: {
        text: 'Sample ECharts Graph',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 30]
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