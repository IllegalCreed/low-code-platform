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
