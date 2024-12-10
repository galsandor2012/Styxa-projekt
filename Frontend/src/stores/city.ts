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
    async updateCity(id: number, city: Partial<City>) {
      try {
        const response = await fetch(`http://localhost:4000/cities/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(city),
        })
        const updatedCity = await response.json()
        if (updatedCity) {
          const index = this.cities.findIndex((c) => c.id === id)
          if (index !== -1) {
            this.cities[index] = updatedCity
          }
        }
      } catch (error) {
        console.error('Error updating city: ', error)
      }
    },
  },
})
