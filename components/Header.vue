<template>
  <!-- Main container with shadow effect -->
  <div class="shadow-xl">
    <!-- Inner container for header and link section -->
    <div class="m-5 py-2 flex items-center justify-between">
      <!-- Title section -->
      <NuxtLink to=".">
        <h1 class="text-2xl font-bold">YA Playground</h1>
      </NuxtLink>

      <!-- GitHub link container with padding and shadow for visual emphasis -->
      <div class="m-2 flex items-center px-3 py-1 rounded shadow-lg hover:shadow-none">
        <!-- GitHub link opens in a new tab -->
        <NuxtLink to="https://github.com/pieceowater" target="_blank">
          <div class="flex items-center gap-3">
            <!-- User Avatar component with small size and alt text for accessibility -->
            <UAvatar
                alt="pieceowater"
                size="2xs"
                src="https://avatars.githubusercontent.com/u/94337419?v=4"
            />
            <!-- Display username with styling -->
            <span class="text-lg font-semibold">pcwt</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>