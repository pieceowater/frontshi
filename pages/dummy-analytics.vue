<template>
  <div class="m-5">
    <BasicChart/>
    <!--    <GradientStackedAreaChart/>-->
    <DonutChart/>
    <CategoryBars/>
  </div>
</template>
<script setup lang="ts">
import BasicChart from "~/components/charts/BasicChart.vue";
import CategoryBars from "~/components/charts/CategoryBars.vue";
import DonutChart from "~/components/charts/DonutChart.vue";
</script>