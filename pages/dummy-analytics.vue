<template>
  <div class="m-5">
    <div class="flex gap-2">
      <input
          type="password"
          v-model="authToken"
          class="p-2 rounded-[calc(var(--ui-radius)*2.5)]"
          placeholder="AUTH TOKEN"
      />
      <button
          @click="handleAuth"
          class="text-l text-white shadow-lg font-bold bg-[var(--ui-primary)] rounded-[calc(var(--ui-radius)*2.5)] px-5">
        Auth / Submit
      </button>
    </div>
    
    <BasicChart :data="chartData"/>
    <DonutChart :data="donutChartData"/>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import BasicChart from "~/components/charts/BasicChart.vue";
import DonutChart from "~/components/charts/DonutChart.vue";

const authToken = ref<string>('');
const chartData = ref<any>([]);  // Default empty array
const donutChartData = ref<any>([]);  // Default empty array

const handleAuth = () => {
  if (authToken.value) {
    fetchData(); // Fetch data if token exists
  } else {
    chartData.value = []; // Clear data if token is cleared
    donutChartData.value = []; // Clear data if token is cleared
  }
};

const fetchData = async () => {
  if (!authToken.value) return;

  try {
    const response = await fetch('http://localhost:3100/apiv2/analytics/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken.value}`,
      },
      body: JSON.stringify({
        presetId: 1,
        pagination: {
          page: 1,
          length: 10
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Update chartData with a new array reference to trigger reactivity
    chartData.value = data.rows.map(item => ({
      count: item.data.orders.count,
      day: item.CreatedAt
    }));

    donutChartData.value = data.rows.map(item => ({
      name: item.CreatedAt,
      value: item.data.orders.count
    }))

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
</script>