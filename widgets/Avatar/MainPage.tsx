"use client"
import { ICharacter } from "@/enities"
import { Loading } from "@/features"
import { userService } from "@/features/User/service/user.service"
import { CharacterCard, PUBLIC_URL, useTelegramInitData } from "@/shared"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CharacterSelection() {
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const init = async () => {
      const data = await userService.getCharactersByUser()
      setCharacters(data.data)
      setLoading(false)
    }
    init()
  }, [])
  const [done, setDone] = useState(false)
  const router = useRouter()
  const [chosenId, setChosenId] = useState('')
  // useEffect(() => {
  //   alert(JSON.stringify(window.Telegram.WebApp.viewportHeight))
  // }, [])
  const handleCreateNew = () => {
    window.location.href = "/create-character"
  }
  const onClick = async (id: string) => {
    if (id == 'create-character') {
      router.push(PUBLIC_URL.create_character())
    }
    const data = await userService.chooseCharacter({character_id: id})
    console.log(data)
    if (window.Telegram.WebApp.close) {
      window.Telegram.WebApp.close()
    }
    
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-center p-4">
      {/* Beach Scene */}
      <div className="w-full max-w-md mb-8 mt-8">{/* Beach scene would go here */}</div>

      {/* Title Section */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-center">
          С кем хочешь
          <br />
          пообщаться сегодня?
        </h1>
      </div>

      {/* Character Cards */}
      <div className="w-full max-w-md space-y-4">
        {characters.map((character) => (
          <CharacterCard
            name={character.name}
            subtitle={character.subtitle || ''}
            avatar={character.avatar_img_url}
            bg_color={character.bg_color}
            onClick={async () => await onClick(character.id)}
          />
        ))}
        <CharacterCard
          name="Создать нового ассистента"
          subtitle="Добавь еще одного помощника"
          avatar="➕"
          bg_color="bg-orange-500"
          onClick={handleCreateNew}
        />
      </div>

      {/* Test Loading Page Link */}
      <div className="mt-8">
        <Link
          href={PUBLIC_URL.assistants()}
          className="text-lg opacity-90 hover:opacity-100 transition-opacity duration-200 cursor-pointer group"
        >
          <span className="underline decoration-2 underline-offset-4 decoration-white/60 group-hover:decoration-white italic font-medium">
            Мои персонажи
          </span>
        </Link>
      </div>
    </div>
  )
}
