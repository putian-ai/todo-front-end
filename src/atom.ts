import { atomWithStorage } from 'jotai/utils'

export interface UserInfo {
  id: number
  username: string
}

export const userAtom = atomWithStorage<UserInfo | null>('user-info', null);
export const tokenAtom = atomWithStorage<string | null>('token', null);
