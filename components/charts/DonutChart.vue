<template>
  <div class="mb-5 p-5">
    <h1 class="text-xl font-bold">Количество заказов по регионам</h1>
    <!-- Basic container for ECharts with dynamic resizing -->
    <div ref="chart" class="w-full h-64"></div>
    <hr>
  </div>
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
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Количество заказов по регионам',
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
          data: [
            {value: 1048, name: 'Павлодар'},
            {value: 735, name: 'Алматинская область'},
            {value: 580, name: 'Восточно-Казахстанская область'},
            {value: 484, name: 'Западно-Казахстанская область'}
          ]
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