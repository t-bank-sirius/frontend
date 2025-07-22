"use client"

import { CreateCharacter } from "@/enities/Character/types/character.interface"

interface ConfirmationViewProps {
  characterData: CreateCharacter
  onConfirm: () => void
}

export function ConfirmationView({ characterData, onConfirm }: ConfirmationViewProps) {
  return (
    <>
      {/* Title */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Подтвердите информацию о персонаже</h1>
        <p className="text-lg opacity-90">Проверьте данные перед созданием</p>
      </div>

      {/* Confirmation Details */}
      <div className="w-full max-w-md space-y-4 pb-8">
        {/* Avatar */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium mb-2">Аватар</h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-xl">
              {characterData.shape.emoji}
            </div>
            <p className="text-white/80 text-sm">{characterData.shape.description}</p>
          </div>
        </div>

        {/* Name */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium mb-2">Имя персонажа</h3>
          <p className="text-white/80">{characterData.name || "Не указано"}</p>
        </div>

        {/* Sex */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium mb-2">Пол</h3>
          <p className="text-white/80">
            {characterData.sex === "male" ? "Мужской" : characterData.sex === "female" ? "Женский" : "Не указано"}
          </p>
        </div>

        {/* Interests */}
        {characterData.interests.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Интересы</h3>
            <div className="flex flex-wrap gap-2">
              {characterData.interests.map((interest) => (
                <span key={interest} className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        


        {/* Abilities */}
        {characterData.abilities.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Способности</h3>
            <div className="flex flex-wrap gap-2">
              {characterData.abilities.map((ability) => (
                <span key={ability} className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  {ability}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Places */}
        {characterData.places.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Любимые места</h3>
            <div className="flex flex-wrap gap-2">
              {characterData.places.map((place) => (
                <span key={place} className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  {place}
                </span>
              ))}
            </div>
          </div>
        )}
        {characterData.archetypes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Архетипы</h3>
            <div className="flex flex-wrap gap-2">
              {characterData.archetypes.map((interest) => (
                <span key={interest} className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Details */}
        {characterData.additionalDetails && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Дополнительные детали</h3>
            <p className="text-white/80 text-sm">{characterData.additionalDetails}</p>
          </div>
        )}

        {characterData.appearance && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
            <h3 className="text-white text-sm font-medium mb-2">Внешность</h3>
            <p className="text-white/80 text-sm">{characterData.appearance}</p>
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 mt-6"
        >
          Подтвердить и создать персонажа
        </button>
      </div>
    </>
  )
}
