import { defineStore } from 'pinia'
import type { City } from '@/types/city'

export const useCityStore = defineStore('city', {
  state: () => ({
    cities: [] as City[],
    city: {} as City,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    async getCities() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:4000/cities')
        const data = await response.json()
        if (data) {
          this.cities = data
        }
      } catch (error) {
        console.error('Error getting cities: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async getCityById(id: number) {
      try {
        const response = await fetch(`http://localhost:4000/cities/${id}`)
        const data = await response.json()
        if (data) {
          this.city = data
        }
      } catch (error) {
        console.error('Error getting city by id: ', error)
      }
    },

    async addCity(city: Partial<City>) {
      try {
        const response = await fetch('http://localhost:4000/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(city),
        })
        const data = await response.json()
        if (data) {
          this.cities.push(data)
        }
      } catch (error) {
        console.error('Error addin a new city: ', error)
      }
    },
  },
})
