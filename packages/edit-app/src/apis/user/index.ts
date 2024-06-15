import request from '@/apis'
import type { UserInterface } from './types'

export const registerAPI = (user: UserInterface): Promise<any> => {
  return request.post(
    {
      url: '/user',
      data: user
    },
    false
  )
}

export const usernameCheckAPI = (username: string): Promise<any> => {
  const params = {
    username
  }
  return request.get(
    {
      url: '/user/check-username',
      params
    },
    false
  )
}

export const emailCheckAPI = (email: string): Promise<any> => {
  const params = {
    email
  }
  return request.get(
    {
      url: '/user/check-email',
      params
    },
    false
  )
}

export const resendActiveEmailAPI = (email: string): Promise<any> => {
  const data = {
    email
  }
  return request.post(
    {
      url: '/user/resend-activation-email',
      data
    },
    false
  )
}
