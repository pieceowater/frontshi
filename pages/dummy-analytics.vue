<template>
  <div class="m-5">
    <BasicChart/>
    <GradientStackedAreaChart/>
    <CategoryBars/>
  </div>
</template>
<script setup lang="ts">
import BasicChart from "~/components/charts/BasicChart.vue";
import GradientStackedAreaChart from "~/components/charts/GradientStackedAreaChart.vue";
import CategoryBars from "~/components/charts/CategoryBars.vue";
</script>