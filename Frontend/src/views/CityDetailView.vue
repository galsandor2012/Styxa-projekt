<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">City Detail</h1>
    <h2><b>Name:</b> {{ localCity.name }}</h2>
    <h2><b>Description:</b> {{ localCity.description }}</h2>
    <h2><b>Population:</b> {{ localCity.population }}</h2>
    <!-- <h2><b>Co:</b> {{ localCity.country_id }}</h2> -->
  </div>
</template>

<script setup lang="ts">
import { useCityStore } from '@/stores/city'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const cityStore = useCityStore()

const localCity = computed(() => cityStore.city)

onBeforeMount(async () => {
  const cityId = Number(route.params.id)
  await cityStore.getCityById(cityId)
  console.log(cityStore.city)
})
</script>
