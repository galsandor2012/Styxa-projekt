<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">Point Of Interest Detail</h1>
    <h2><b>Name:</b> {{ localPoint.name }}</h2>
    <h2><b>Description:</b> {{ localPoint.description }}</h2>
    <h2><b>Google Maps:</b> {{ localPoint.googlemapsurl }}</h2>
    <h2><b>Image:</b> {{ localPoint.image }}</h2>
  </div>
</template>

<script setup lang="ts">
import { usePointStore } from '@/stores/point'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pointStore = usePointStore()

const localPoint = computed(() => pointStore.pointofinterests)

onBeforeMount(async () => {
  const pointId = Number(route.params.id)
  await pointStore.GetPointOfInterestsById(pointId)
  console.log(pointStore.pointofinterests)
})
</script>
