import { registerAPI } from '@/apis/user'
import type { UserInterface } from '@/apis/user/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  async function register(user: UserInterface): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      registerAPI(user)
        .then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  return { register }
})
