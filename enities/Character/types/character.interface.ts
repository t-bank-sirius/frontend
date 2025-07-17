export type Avatar = {
  emoji: string
  description: string
}
export interface ICharacter {
    id: string
    avatar_img_url: string //Отправлется С ФРОНТА НА СЕРВЕР (ссылка формируется строго на фронте)
    // В js работает как URL.createObjectURL(blob);
  name: string
  system_prompt: string
    init_message: string
    is_generated: boolean 
    subtitle?: string
    bg_color?: string //не трогай это поле в БД, оставь это фронту
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
export interface CreateAvatar {
  shape: Avatar
  name: string
  sex: string
  interests: string[]
  abilities: string[]
  places: string[]
  additionalDetails: string
}