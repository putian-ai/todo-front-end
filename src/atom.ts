import { atomWithStorage } from 'jotai/utils'
import { PaginateModel_Tag_ } from './client';
import { atom } from 'jotai'

export interface UserInfo {
  id: number
  username: string
}

export const userAtom = atomWithStorage<UserInfo | null>('user-info', null);
export const tokenAtom = atomWithStorage<string | null>('token', null);
export const tagPageAtom = atom<PaginateModel_Tag_ | null>(null);

export const selectedTagIDAtom = atom<number | null>(null);