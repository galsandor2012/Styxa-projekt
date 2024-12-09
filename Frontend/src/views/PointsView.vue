<template>
  <div class="flex w-full justify-between items-center mb-8">
    <h1 class="text-2xl font-semibold text-gray-900">Point Of Interests</h1>
    <BaseButton :type="ButtonType.PRIMARY" text="Add New Point" @click="isCreateModalOpen = true" />
  </div>

  <BaseTable
    :headers="pointsHeader"
    :data="pointStore.pointofinterests"
    @on-row-click="onCityTableRowClicked"
  />

  <BaseModal
    :is-open="isCreateModalOpen"
    :is-primary-button-disabled="pointStore.isLoading"
    primary-button-text="Create"
    title="Create new point"
    description="This is a create new point modal"
    @on-close="closeCreateModal"
    @on-action-click="addNewPoint"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
      >
        <component :is="MapIcon" class="size-6 text-indigo-600" aria-hidden="true" />
      </div>
      <div class="flex flex-col gap-y-8 ml-4">
        <h1 class="text-3xl font-semibold text-gray-900">Adding New Point</h1>

        <div class="flex flex-col gap-y-4 w-[300px]">
          <BaseInput
            v-model="newPoint.name"
            :type="InputType.TEXT"
            label="Name"
            placeholder="Add your new point's name..."
          />
          <BaseInput
            v-model="newPoint.description"
            :type="InputType.TEXT"
            label="Description"
            placeholder="Add your new point's description..."
          />
          <BaseInput
            v-model="newPoint.city_id"
            :type="InputType.NUMBER"
            label="City ID"
            placeholder="Add your new point's city ID..."
          />
          <BaseInput
            v-model="newPoint.googlemapsurl"
            :type="InputType.TEXT"
            label="Google Maps"
            placeholder="Add your new point's Google Maps URL..."
          />
          <BaseInput
            v-model="newPoint.image"
            :type="InputType.TEXT"
            label="Image"
            placeholder="Add your new point's image URL..."
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
import { MapIcon } from '@heroicons/vue/24/outline'
import { usePointStore } from '@/stores/point'
import type { Point } from '@/types/point'
import { InputType } from '@/types/input'
import { ButtonType } from '@/types/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const pointStore = usePointStore()

const pointsHeader = ref([
  { label: 'Name', key: 'name' as keyof Point },
  { label: 'Description', key: 'description' as keyof Point },
  //{ label: 'City ID', key: 'city_id' as keyof Point },
  //{ label: 'Google Maps', key: 'googlemapsurl' as keyof Point },
  //{ label: 'Image', key: 'image' as keyof Point },
])

const newPoint = ref(initializeNewPoint())

const isCreateModalOpen = ref(false)

function initializeNewPoint() {
  return {
    name: '',
    description: '',
    city_id: 0,
    googlemapsurl: '',
    image: '',
  }
}

function closeCreateModal() {
  isCreateModalOpen.value = false
  newPoint.value = initializeNewPoint()
}

async function addNewPoint() {
  // validateData()

  pointStore.setIsLoading(true)
  await pointStore.AddPointOfInterests(newPoint.value)
  closeCreateModal()
  pointStore.setIsLoading(false)
}

function onCityTableRowClicked(id: number) {
  router.push(`/point/${id}`)
}

onBeforeMount(async () => {
  await pointStore.GetPointOfInterests()
})
</script>
