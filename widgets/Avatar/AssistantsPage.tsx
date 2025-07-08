"use client"
import Link from "next/link"
import { Plus } from "lucide-react"
import { ICharacter } from "@/enities"
import { CharacterCard } from "@/shared"
import { useRouter } from "next/navigation"

export default function UserAssistants({characters}: {characters: ICharacter[]}) {
    const router = useRouter()
  const handleAssistantClick = async (id: string) => {
    // Here you would navigate to chat with the assistant
  }

  const handleCreateNew = () => {
    window.location.href = "/create-character"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <div className="w-full max-w-md mb-4 mt-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Назад</span>
        </Link>
      </div>

      {/* Beach Scene Placeholder */}
      <div className="w-full max-w-md mb-8">{/* Beach scene would go here */}</div>

      {/* Title Section */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Твои
          <br />
          ассистенты
        </h1>
      </div>

      {/* Assistant Cards */}
      <div className="w-full max-w-md space-y-4">
              {characters.map((character) => (
                <CharacterCard
                  name={character.name}
                  subtitle={character.subtitle || ''}
                  avatar={character.avatar_img_url}
                  bg_color={character.bg_color}
                  onClick={async () => await handleAssistantClick(character.id)}
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

      {/* Empty State Message */}
      {characters.length === 0 && (
        <div className="text-center mt-8 text-white/60">
          <p className="text-lg mb-4">У тебя пока нет ассистентов</p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white underline transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Создать первого ассистента</span>
          </button>
        </div>
      )}

      {/* Additional Options */}
      <div className="mt-8">
        <Link
          href="/loading"
          className="text-white/60 hover:text-white text-sm underline transition-colors duration-200 decoration-white/60 hover:decoration-white underline-offset-2"
        >
          тест страницы загрузки
        </Link>
      </div>
    </div>
  )
}