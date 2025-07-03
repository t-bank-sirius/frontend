"use client"
import { ICharacter } from "@/enities"
import { CharacterCard, PUBLIC_URL, useTelegramInitData } from "@/shared"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CharacterSelection({characters}: {characters: ICharacter[]}) {
  const [done, setDone] = useState(false)
  const [chosenId, setChosenId] = useState('')
  // useEffect(() => {
  //   alert(JSON.stringify(window.Telegram.WebApp.viewportHeight))
  // }, [])
  useEffect(() => {
    if (chosenId) {
      window.Telegram.WebApp.sendData(JSON.stringify('Выбран аватар с id: ' + chosenId))
    }
  }, [chosenId])
  const onClick = (id: string) => {
    setChosenId(id)
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-center p-4">
      {/* Beach Scene */}
      <div className="w-full max-w-md mb-8 mt-8">{/* Beach scene would go here */}</div>

      {/* Title Section */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Выбери персонажа</h1>
        <Link
          href={PUBLIC_URL.create_character()}
          className="text-lg opacity-90 hover:opacity-100 transition-opacity duration-200 cursor-pointer group"
        >
          <span className="underline decoration-2 underline-offset-4 decoration-white/60 group-hover:decoration-white italic font-medium">
            или создай своего
          </span>
        </Link>
      </div>

      {/* Character Cards */}
      <div className="w-full max-w-md space-y-4">
        {characters.map((character) => (
          <CharacterCard
            name={character.name}
            subtitle={character.nature}
            avatar={character.avatar}
            onClick={() => onClick(character.id)}
          />
        ))}
      </div>
    </div>
  )
}
