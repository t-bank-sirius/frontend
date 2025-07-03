"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { useInputValidation } from "@/shared/hooks/useInputValidation"
import { userService } from "@/features/User/service/user.service"

export default function CreateCharacter() {
  const [done, setDone] = useState(false)
  
  const [loading, setLoading] = useState(false)
  let nameInput = useInputValidation('', {isEmpty: {value: true, message: 'У ассистента ведь должно быть имя, правильно?'}})
  useEffect(() => {
    if (done) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        appearance: appearanceInput.value,
        name: nameInput.value,
        nature: natureInput.value
      }))
    }
  }, [done])
  let natureInput = useInputValidation('', {isEmpty: {value: true, message: 'Пропиши характер персонажа'}})
  let appearanceInput = useInputValidation('', {isEmpty: {value: true, message: 'Опиши внешность персонажа'}})
  const avatars = ["🙅","🤖", "👨", "👩", "🧑", "👦", "👧", "🐱", "🐶", "🦊", "🐼", "🦁", "🐸", "🐙", "👽", "🎭", "🎪"]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextAvatar = () => {
    setCurrentIndex((prev) => (prev + 1) % avatars.length)
  }

  const prevAvatar = () => {
    setCurrentIndex((prev) => (prev - 1 + avatars.length) % avatars.length)
  }

  const getVisibleAvatars = () => {
    const visible = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + avatars.length) % avatars.length
      visible.push({
        emoji: avatars[index],
        index: index,
        position: i,
      })
    }
    return visible
  }
  const onSubmitFunc = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      setLoading(true)
      const data = await userService.createUserCharacter({
        appearance: appearanceInput.value,
        name: nameInput.value,
        nature: natureInput.value
      })
      
      setLoading(false)
      setDone(true)
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <div className="w-full max-w-md mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Назад</span>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Создай своего персонажа</h1>
        <p className="text-lg opacity-90">Настрой внешность и характер</p>
      </div>

      {/* Avatar Carousel - Right after subtitle */}
      <div className="w-full max-w-md mb-8">
        <h2 className="block text-white text-xl font-semibold mb-6 text-center">Выберите облик</h2>
        <p className="text-white/40 text-sm text-center mb-6">оставьте 🙅, если хотите создать кого-то нового</p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevAvatar}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 p-2"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="relative w-48 h-20 overflow-hidden">
            <div className="flex items-center justify-center h-full">
              {getVisibleAvatars().map((avatar, index) => (
                <div
                  key={`${avatar.index}-${currentIndex}`}
                  className={`absolute transition-all duration-500 ease-out ${
                    avatar.position === 0
                      ? "transform translate-x-0 scale-125 z-10"
                      : avatar.position === -1
                        ? "transform -translate-x-16 scale-75 opacity-50 z-0"
                        : "transform translate-x-16 scale-75 opacity-50 z-0"
                  }`}
                >
                  <button
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                      avatar.position === 0 ? "bg-orange-500 shadow-xl" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {avatar.emoji}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextAvatar}
            className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 p-2"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Avatar indicator dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {avatars.slice(0, 8).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex % 8 ? "bg-orange-500 w-6" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Character Creation Form - No background/borders */}
      <form className="w-full max-w-md space-y-6" onSubmit={onSubmitFunc}>
        {/* Name Input */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Имя персонажа</label>
          <input
            type="text"
            placeholder="Введите имя..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            {...nameInput}
          />
          {(nameInput.isDirty && nameInput.isEmpty.value) &&<label className="block text-white text-sm font-medium mb-2">{nameInput.isEmpty.message}</label>}
        </div>

        {/* Personality Input */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Характер</label>
          <textarea
            placeholder="Опишите характер персонажа..."
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
            {...natureInput}

          />
          {(natureInput.isDirty && natureInput.isEmpty.value) &&<label className="block text-white text-sm font-medium mb-2">{natureInput.isEmpty.message}</label>}
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Описание</label>
          <textarea
            placeholder="Опишите внешность персонажа..."
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
            {...appearanceInput}

          />
          {(appearanceInput.isDirty && appearanceInput.isEmpty.value) &&<label className="block text-white text-sm font-medium mb-2">{appearanceInput.isEmpty.message}</label>}
        </div>

        {/* Create Button */}
        <button
         type="submit" disabled={loading || (!nameInput.isInputValid || !appearanceInput || !natureInput)}
         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 mt-6">
          Создать персонажа
        </button>
      </form>
    </div>
  )
}
