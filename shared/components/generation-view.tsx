"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Edit, Check } from "lucide-react"
import { CreateCharacter } from "@/enities/Character/types/character.interface"
import { userService } from "@/features/User/service/user.service"

interface GenerationViewProps {
  characterData: CreateCharacter
  onRedo: () => void
  onChange: () => void
  onComplete: () => Promise<void>
  setCharacterData: any
}

export function GenerationView({ characterData, setCharacterData, onRedo, onChange, onComplete }: GenerationViewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  function convertBase64ToBlob(base64Image: string) {
  // Split into two parts
  const parts = base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
}
  const gen = async () => {
    const data = await userService.createAvatar(characterData)
    setIsLoading(false)
      const blob = convertBase64ToBlob(data.data.image)
      setGeneratedImage(URL.createObjectURL(blob))
      console.log(generatedImage)
      setCharacterData({...characterData, avatar_img_url: data.data.image})
      console.log(characterData)
  }
  useEffect(() => {
    
    gen()

  }, [])
  const complete = async () => {
    await onComplete()
    window.location.href = "/assistants"
  }

  const handleRedo = () => {
    setIsLoading(true)
    setGeneratedImage(null)

    gen()
  }

  return (
    <>
      {/* Title */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Генерируем изображение персонажа</h1>
        <p className="text-lg opacity-90">Создаем уникальный образ для вашего персонажа</p>
      </div>

      {/* Generation Content */}
      <div className="w-full max-w-md space-y-6 pb-8">
        {/* Character Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-xl">
              {characterData.shape.emoji}
            </div>
            <div>
              <h3 className="text-white font-medium">{characterData.name || "Безымянный персонаж"}</h3>
              <p className="text-white/60 text-sm">{characterData.shape.description}</p>
            </div>
          </div>
        </div>

        {/* Loading or Image Display */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
          {isLoading ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-white text-lg font-medium mb-2">Подожди загрузку картинки</p>
              <p className="text-white/60 text-sm">Генерируем уникальное изображение...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                {generatedImage && (
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated character"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </div>
              <p className="text-white text-lg font-medium mb-2">Изображение готово!</p>
              <p className="text-white/60 text-sm">Вам нравится результат?</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isLoading && (
          <div className="space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={handleRedo}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <RotateCcw size={18} />
                <span>Переделать</span>
              </button>
              <button
                onClick={onChange}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Edit size={18} />
                <span>Изменить</span>
              </button>
            </div>
            <button
              onClick={async () => await complete()}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Check size={18} />
              <span>Отлично!</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
    function convertBase64ToBlob(image: string) {
      throw new Error("Function not implemented.")
    }

