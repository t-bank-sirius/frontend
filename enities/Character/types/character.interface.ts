export type Avatar = {
  emoji: string
  description: string
}
export interface ICharacter {
    id: string
    avatar_img_url: string
  name: string
  sex: string
  interests: string[]
  abilities: string[]
  places: string[]
  additionalDetails: string
    // appearance: string
    subtitle?: string //пока только у изначальных
    is_generated: boolean 
    bg_color?: string //не храни в БД!!!
}
export interface CreateCharacter {
  avatar_img_url: string
  shape: Avatar
  name: string
  sex: string
  interests: string[]
  abilities: string[]
  places: string[]
  additionalDetails: string
}