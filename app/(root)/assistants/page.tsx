import { userService } from "@/features/User/service/user.service"
import UserAssistants from "@/widgets/Avatar/AssistantsPage"
import { cookies } from "next/headers"

export default async function Page() {
    // const cookieStore = await cookies()
      // Преобразуем куки обратно в строку (требует импортировать 'cookie' или собрать строку вручную)
        // const cookieString = Array.from(cookieStore)
        // .map((name, value) => `${name}=${value}`)
        // .join('; ')
    
        // console.log(cookieString)
        // const data = await userService.getCharactersByUser(cookieString, 'true')
    return (
       <UserAssistants/>
    )
}