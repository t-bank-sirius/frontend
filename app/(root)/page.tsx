import { ICharacter } from "@/enities";
import { userService } from "@/features/User/service/user.service";
import { CharacterSelection } from "@/widgets";

export default async function Page() {

    const data = await userService.getCharactersByUser()
    const arr = data.data
    arr.push({id: 'create-character', name: 'Создай своего персонажа', bg_color: 'bg-purple-500', is_generated: false,  avatar_img_url: '', sex: '', interests: [], abilities: [], places: [], additionalDetails: ''})
    const new_data: ICharacter[] = arr
    return <CharacterSelection characters={new_data}/>
}