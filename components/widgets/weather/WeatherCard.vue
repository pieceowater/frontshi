<template>
  <div v-if="weather && weather.main && weather.weather[0]"
       class="m-5 p-3 bg-cyan-100 rounded-[calc(var(--ui-radius)*3.5)] shadow-lg">
    <div class="flex items-center gap-1">
      <span class="sm:text-xl font-bold">Current Weather</span>
      <span class="text-sm font-light">Almaty</span>
    </div>
    <div class="flex items-bottom gap-1">
      <span class="text-8xl">{{ weather.main.temp }}</span>
      <span class="text-4xl">C°</span>
    </div>
    <div>
      <span>{{ weather.weather[0].description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const weather = ref<WeatherData | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('/api/weather');
    if (!res.ok) throw new Error("Failed to fetch weather data");
    weather.value = await res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
</script>