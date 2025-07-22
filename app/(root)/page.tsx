import { ICharacter } from "@/enities";
import { userService } from "@/features/User/service/user.service";
import { CharacterSelection } from "@/widgets";
import { cookies } from "next/headers";

export default async function Page() {
    // const cookieStore = await cookies()
  // Преобразуем куки обратно в строку (требует импортировать 'cookie' или собрать строку вручную)
    // const cookieString = Array.from(cookieStore)
    // .map((name, value) => `${name}=${value}`)
    // .join('; ')

    // console.log(cookieString)
    // const data = await userService.getCharactersByUser(cookieString, 'false')
    // const arr = data.data
    // arr.push({id: 'create-character', name: 'Создай своего персонажа', bg_color: 'bg-purple-500', is_generated: false,  avatar_img_url: '', sex: '', interests: [], abilities: [], places: [], additionalDetails: ''})
    // const new_data: ICharacter[] = arr
    return <CharacterSelection/>
}