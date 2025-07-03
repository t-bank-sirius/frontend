import { userService } from "@/features/User/service/user.service";
import { CharacterSelection } from "@/widgets";

export default async function Page() {

    const data = await userService.getCharactersByUser()
    return <CharacterSelection characters={data.data}/>
}