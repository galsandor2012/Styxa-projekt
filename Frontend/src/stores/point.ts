import { defineStore } from 'pinia'
import type { Point } from '@/types/point'

export const usePointStore = defineStore('point', {
  state: () => ({
    pointofinterests: [] as Point[],
    point: {} as Point,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    async GetPointOfInterests() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:4000/pointofinterests')
        const data = await response.json()
        if (data) {
          this.pointofinterests = data
        }
      } catch (error) {
        console.error('Error getting points: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async GetPointOfInterestsById(id: number) {
      try {
        const response = await fetch(`http://localhost:4000/pointofinterests/${id}`)
        const data = await response.json()
        if (data) {
          this.pointofinterests = data
        }
      } catch (error) {
        console.error('Error getting point by id: ', error)
      }
    },

    async AddPointOfInterests(point: Partial<Point>) {
      try {
        const response = await fetch('http://localhost:4000/pointofinterests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(point),
        })
        const data = await response.json()
        if (data) {
          this.pointofinterests.push(data)
        }
      } catch (error) {
        console.error('Error addin a new point: ', error)
      }
    },
  },
})
