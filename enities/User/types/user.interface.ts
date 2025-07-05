import { ICharacter } from "@/enities/Character/types/character.interface"

export interface IUser {
    id: string
    telegram_id: string
    chat_id: string
    characters: ICharacter[]
    chosen_character: ICharacter
}
export interface UserCreation {
    telegram_id: string
}