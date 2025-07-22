import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	localStorage.setItem(EnumTokens.ACCESS_TOKEN, accessToken)
	// Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
	// 	domain: process.env.APP_DOMAIN,
	// 	sameSite: 'strict',
	// 	expires: 1
	// })
}

export const removeFromStorage = () => {
	localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
}
