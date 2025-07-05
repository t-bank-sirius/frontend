import { ICharacter } from "@/enities/Character/types/character.interface"

export interface IUser {
    id: string
    first_name: string
    last_name: string
    characters: ICharacter[]
    chosen_character: ICharacter
}
export interface UserCreation {
    id: number,
    hash: string
}