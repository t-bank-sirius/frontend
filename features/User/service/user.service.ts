import { ICharacter } from "@/enities"
import { CreateCharacter } from "@/enities/Character/types/character.interface"
import { API_URL, axiosWithAuth } from "@/shared"

class UserService {
    async getCharactersByUser(cookie?: any, owns: 'true' | 'false' = 'false') {
		const response = await axiosWithAuth<ICharacter[]>({
			url: API_URL.user(`/get-characters?owns=${owns}`),
			method: 'GET',
            headers: cookie ? {Cookie: cookie}: {}
		})

		return response
	}
    async getCharacterByUser(cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/get-character'),
            method: 'GET',
            headers: cookie ? {Cookie: cookie}: {}
        })

        return response
    }
    async createUserCharacter(data: CreateCharacter, cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/new-character'),
            method: 'POST',
            data,
            headers: cookie ? {Cookie: cookie}: {}
        })
        return response
    }
    async chooseCharacter(data: {character_id: string}, cookie?: any) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/choose-character'),
            method: 'POST',
            data,
            headers: cookie ? {Cookie: cookie}: {}
        })
        return response
    }

    
}
export const userService = new UserService()