import { ICharacter } from "@/enities"
import { CreateCharacter } from "@/enities/Character/types/character.interface"
import { API_URL, axiosWithAuth } from "@/shared"

class UserService {
    async getCharactersByUser() {
		const response = await axiosWithAuth<ICharacter[]>({
			url: API_URL.user('/get-characters'),
			method: 'GET'
		})

		return response
	}
    async getCharacterByUser() {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/get-character'),
            method: 'GET'
        })

        return response
    }
    async createUserCharacter(data: CreateCharacter) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/new-character'),
            method: 'POST',
            data
        })
        return response
    }
    async chooseCharacter(data: {character_id: string}) {
        const response = await axiosWithAuth<ICharacter>({
            url: API_URL.user('/choose-character'),
            method: 'POST',
            data
        })
        return response
    }

    
}
export const userService = new UserService()