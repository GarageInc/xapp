import { createAction } from '@reduxjs/toolkit'
import { SupportedLocale } from 'constants/locales'

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')

export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')

export const updateSelectedWallet = createAction<{ wallet: any }>('user/updateSelectedWallet')

export const updateUserLocale = createAction<{ userLocale: SupportedLocale }>('user/updateUserLocale')
