import { ICharacter } from "@/enities"
import { CreateAvatar, CreateCharacter } from "@/enities/Character/types/character.interface"
import { API_URL, axiosWithAuth } from "@/shared"

class UserService {
    async getCharactersByUser(cookie?: any, owns: 'true' | 'false' = 'false') {
		const response = await axiosWithAuth<ICharacter[]>({
			url: API_URL.user(`/get-characters?owns=${owns}`),
			method: 'GET'
		})

		return response
	}
    async getCharacterByUser(cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/get-character'),
            method: 'GET',
        })

        return response
    }
    async createUserCharacter(data: CreateCharacter, cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/new-character'),
            method: 'POST',
            data,
        })
        return response
    }
    async chooseCharacter(data: {character_id: string}, cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/choose-character'),
            method: 'POST',
            data,
        })
        return response
    }
    async createAvatar(data: CreateAvatar) {
        const response = await axiosWithAuth<{image: string}>({
            url: API_URL.user('/create-avatar'),
            method: 'POST',
            data
        })
        return response
    }

    
}
export const userService = new UserService()