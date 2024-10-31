<script lang="ts" setup>
interface IContentCarouselItem {
  title: string
  description?: string
  destination: string
}

const items: IContentCarouselItem[] = [
  {
    title: "Simple Analytics",
    description: "Just a simple analytics for testing purposes! Bruh tbh...",
    destination: "dummy-analytics"
  },
  {
    title: "Coming Soon",
    description: "It's nothing there yet",
    destination: "."
  }
]
</script>

<template>
  <div class="m-5">
    <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-xl overflow-hidden" arrows>
      <div class="bg-emerald-500 p-5 text-white rounded-xl cursor-grab">
        <h2 class="text-2xl font-bold">{{ item.title }}</h2>
        <p v-if="item.description" class="text-sm">{{ item.description }}</p>

        <a :href="item.destination">
          <UButton label="Open"
                   class="mt-7 bg-emerald-100 text-emerald-800 font-bold shadow-xl cursor-alias hover:shadow-none hover:text-emerald-600"
                   color="gray">
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5"/>
            </template>
          </UButton>
        </a>
      </div>
    </UCarousel>
  </div>
</template>