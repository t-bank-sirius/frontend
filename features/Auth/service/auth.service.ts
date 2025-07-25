import { IAuthResponse } from "@/enities"
import { API_URL, axiosClassic, axiosWithAuth } from "@/shared"
import { removeFromStorage, saveTokenStorage } from "./auth-token.service"
import { UserCreation } from "@/enities/User/types/user.interface"
import { AxiosHeaders } from "axios"


class AuthService {
	async main(type: 'login' | 'register', data: UserCreation, cookie?: any) {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth(`/${type}`),
			method: 'POST',
			data,
			headers: cookie ? {Cookie: cookie}: {}
		})

		if (response.data.accessToken)
			saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic<IAuthResponse>({
			url: API_URL.auth('/login/access-token'),
			method: 'POST'
		})

		if (response.data.accessToken)
			saveTokenStorage(response.data.accessToken)

		return response
	}

	async logout() {
		const response = await axiosWithAuth<boolean>({
			url: API_URL.auth('/logout'),
			method: 'POST'
		})

		if (response.data) removeFromStorage()

		return response
	}
}

export const authService = new AuthService()
