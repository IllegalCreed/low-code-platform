import { registerAPI, usernameCheckAPI, emailCheckAPI, resendActiveEmailAPI } from '@/apis/user'
import type { UserInterface } from '@/apis/user/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  async function register(user: UserInterface): Promise<void> {
    try {
      return await registerAPI(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function usernameCheck(username: string): Promise<boolean> {
    try {
      const res = await usernameCheckAPI(username)
      return res.data.available
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function emailCheck(email: string): Promise<boolean> {
    try {
      const res = await emailCheckAPI(email)
      return res.data.available
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function resendActiveEmail(email: string): Promise<boolean> {
    try {
      const res = await resendActiveEmailAPI(email)
      return res.data.available
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { register, usernameCheck, emailCheck, resendActiveEmail }
})
