<template>
  <div class="flex w-full justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold text-gray-900">Cities</h1>
    <BaseButton :type="ButtonType.PRIMARY" text="Add New City" @click="isCreateModalOpen = true" />
    <!-- <BaseButton :type="ButtonType.PRIMARY" text="Update City" @click="openEditModal(row.id) = true" /> -->
  </div>

  <BaseTable
    :headers="citiesHeader"
    :data="cityStore.cities"
    @on-row-click="onCityTableRowClicked"
    #action="{ row }"
  >
    >
  </BaseTable>

  <BaseModal
    :is-open="isCreateModalOpen"
    :is-primary-button-disabled="cityStore.isLoading"
    primary-button-text="Create"
    title="Create new city"
    description="This is a create new city modal"
    @on-close="closeCreateModal"
    @on-action-click="addNewCity"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="BuildingOfficeIcon" class="size-6 text-indigo-600" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Adding New City</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="newCity.name"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new city's name..."
          />
          <BaseInput
            v-model="newCity.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new city's description..."
          />
          <BaseInput
            v-model="newCity.population"
            :type="InputType.NUMBER"
            label="Population"
            placeholder="Add your new city's population..."
          />
          <BaseInput
            v-model="newCity.country_id"
            :type="InputType.NUMBER"
            label="Country ID"
            placeholder="Add your new city's country ID..."
          />
        </div>
      </div>
    </div>
  </BaseModal>
  <BaseModal
    :is-open="isEditModalOpen"
    :is-primary-button-disabled="cityStore.isLoading"
    primary-button-text="Save Changes"
    title="Edit City"
    description="Modify the selected city's information."
    @on-close="closeEditModal"
    @on-action-click="editCity"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="BuildingOfficeIcon" class="size-6 text-indigo-600" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Editing {{ selectedCity?.name }}</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="selectedCity.name"
            :type="InputType.TEXT"
            label="Name"
            placeholder="City name..."
          />
          <BaseInput
            v-model="selectedCity.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="City description..."
          />
          <BaseInput
            v-model="selectedCity.population"
            :type="InputType.NUMBER"
            label="Population"
            placeholder="City population..."
          />
          <BaseInput
            v-model="selectedCity.googleMapsUrl"
            :type="InputType.TEXT"
            label="Google Maps URL"
            placeholder="Google Maps URL..."
          />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { BuildingOfficeIcon } from '@heroicons/vue/24/outline'
import { useCityStore } from '@/stores/city'
import type { City } from '@/types/city'
import { InputType } from '@/types/input'
import { ButtonType } from '@/types/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const cityStore = useCityStore()

const citiesHeader = ref([
  { label: 'Name', key: 'name' as keyof City },
  { label: 'Description', key: 'description' as keyof City },
  { label: 'Population', key: 'population' as keyof City },
])

const newCity = ref(initializeNewCity())

const isCreateModalOpen = ref(false)

function initializeNewCity() {
  return {
    name: '',
    description: '',
    population: 0,
    country_id: 0,
  }
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  newCity.value = initializeNewCity()
}

async function addNewCity() {
  // validateData()

  cityStore.setIsLoading(true)
  await cityStore.addCity(newCity.value)
  closeCreateModal()
  cityStore.setIsLoading(false)
}

function onCityTableRowClicked(id: number) {
  router.push(`/cities/${id}`)
}

onBeforeMount(async () => {
  await cityStore.getCities()
})

const isEditModalOpen = ref(false)
const selectedCity = ref<City | null>(null)

function openEditModal(cityId: number) {
  const city = cityStore.cities.find((c) => c.id === cityId)
  if (city) {
    selectedCity.value = { ...city }
    isEditModalOpen.value = true
  }
}

function closeEditModal() {
  isEditModalOpen.value = false
  selectedCity.value = null
}

async function editCity() {
  if (selectedCity.value) {
    cityStore.setIsLoading(true)
    await cityStore.updateCity(selectedCity.value.id, selectedCity.value)
    closeEditModal()
    cityStore.setIsLoading(false)
  }
}
</script>
