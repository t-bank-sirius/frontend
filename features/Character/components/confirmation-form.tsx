"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar } from "@/enities/Character/types/character.interface"
import type { CreateCharacter } from "@/enities/Character/types/character.interface"
interface CharacterFormProps {
  onSubmit: (data: CreateCharacter) => void
  initialData?: CreateCharacter | null
}

export function CharacterForm({ onSubmit, initialData }: CharacterFormProps) {
  const avatars: Avatar[] = [
    { emoji: "🤖", description: "Робот - технологичный и логичный персонаж" },
    { emoji: "👨", description: "Мужчина - классический дружелюбный персонаж" },
    { emoji: "👩", description: "Женщина - элегантная и умная собеседница" },
    { emoji: "🧑", description: "Человек - универсальный и понимающий персонаж" },
    { emoji: "👦", description: "Мальчик - энергичный и любознательный персонаж" },
    { emoji: "👧", description: "Девочка - веселая и творческая личность" },
    { emoji: "🐱", description: "Кот - игривый и независимый персонаж" },
    { emoji: "🐶", description: "Собака - верный и дружелюбный компаньон" },
    { emoji: "🦊", description: "Лиса - хитрый и умный персонаж" },
    { emoji: "🐼", description: "Панда - спокойный и мудрый персонаж" },
    { emoji: "🦁", description: "Лев - сильный и уверенный лидер" },
    { emoji: "🐸", description: "Лягушка - веселый и оптимистичный персонаж" },
    { emoji: "🐙", description: "Осьминог - многозадачный и креативный персонаж" },
    { emoji: "👽", description: "Инопланетянин - загадочный и необычный персонаж" },
    { emoji: "🎭", description: "Театральная маска - артистичный и выразительный персонаж" },
    { emoji: "🎪", description: "Цирк - развлекательный и веселый персонаж" },
  ]

  // Find initial avatar index if initialData exists
  const getInitialAvatarIndex = () => {
    if (initialData?.shape) {
      const index = avatars.findIndex((avatar) => avatar.emoji === initialData.shape.emoji)
      return index !== -1 ? index : 0
    }
    return 0
  }

  const [currentIndex, setCurrentIndex] = useState(getInitialAvatarIndex())
  const [selectedSex, setSelectedSex] = useState(initialData?.sex || "")
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData?.interests || [])
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>(initialData?.abilities || [])
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>(initialData?.places || [])
  const [characterName, setCharacterName] = useState(initialData?.name || "")
  const [additionalDetails, setAdditionalDetails] = useState(initialData?.additionalDetails || "")

  // Update states when initialData changes
  useEffect(() => {
    if (initialData) {
      setCurrentIndex(getInitialAvatarIndex())
      setSelectedSex(initialData.sex || "")
      setSelectedInterests(initialData.interests || [])
      setSelectedAbilities(initialData.abilities || [])
      setSelectedPlaces(initialData.places || [])
      setCharacterName(initialData.name || "")
      setAdditionalDetails(initialData.additionalDetails || "")
    }
  }, [initialData])

  const interests = [
    "Футбол",
    "Музыка",
    "Кино",
    "Книги",
    "Путешествия",
    "Готовка",
    "Спорт",
    "Искусство",
    "Игры",
    "Танцы",
    "Фотография",
    "Природа",
  ]
  const abilities = [
    "Юмор",
    "Мудрость",
    "Креативность",
    "Логика",
    "Эмпатия",
    "Лидерство",
    "Терпение",
    "Оптимизм",
    "Аналитика",
    "Интуиция",
  ]
  const places = [
    "Дом",
    "Парк",
    "Кафе",
    "Библиотека",
    "Пляж",
    "Горы",
    "Лес",
    "Город",
    "Деревня",
    "Офис",
    "Спортзал",
    "Театр",
  ]

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
        ...avatars[index],
        index: index,
        position: i,
      })
    }
    return visible
  }

  const toggleSelection = (item: string, selectedArray: string[], setSelectedArray: (items: string[]) => void) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter((i) => i !== item))
    } else {
      setSelectedArray([...selectedArray, item])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data: CreateCharacter = {
        avatar_img_url: '', //generated image
      shape: avatars[currentIndex],
      name: characterName,
      sex: selectedSex,
      interests: selectedInterests,
      abilities: selectedAbilities,
      places: selectedPlaces,
      additionalDetails: additionalDetails,
    }
    onSubmit(data)
  }

  const ChipSelector = ({
    title,
    items,
    selectedItems,
    onToggle,
  }: {
    title: string
    items: string[]
    selectedItems: string[]
    onToggle: (item: string) => void
  }) => (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
      <label className="block text-white text-sm font-medium mb-3">{title}</label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
              selectedItems.includes(item)
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Title */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Создай своего персонажа</h1>
        <p className="text-lg opacity-90">Настрой внешность и характер</p>
      </div>

      {/* Avatar Carousel */}
      <div className="w-full max-w-md mb-8">
        <h2 className="block text-white text-xl font-semibold mb-2 text-center">Выберите аватар</h2>
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
                      avatar.position === 0
                        ? "bg-orange-500 shadow-xl"
                        : "bg-black/90 border border-white/20 hover:bg-black/70 shadow-lg"
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
                index === currentIndex % 8 ? "bg-black w-6" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Character Creation Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 pb-8">
        {/* Name Input */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Имя персонажа</label>
          <input
            type="text"
            placeholder="Введите имя..."
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>

        {/* Sex Choice */}
        <div>
          <label className="block text-white text-sm font-medium mb-3">Пол</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setSelectedSex("male")}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                selectedSex === "male"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              Мужской
            </button>
            <button
              type="button"
              onClick={() => setSelectedSex("female")}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                selectedSex === "female"
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              Женский
            </button>
          </div>
        </div>

        {/* Interests */}
        <ChipSelector
          title="Интересы"
          items={interests}
          selectedItems={selectedInterests}
          onToggle={(item) => toggleSelection(item, selectedInterests, setSelectedInterests)}
        />

        {/* Abilities */}
        <ChipSelector
          title="Способности"
          items={abilities}
          selectedItems={selectedAbilities}
          onToggle={(item) => toggleSelection(item, selectedAbilities, setSelectedAbilities)}
        />

        {/* Favourite Places */}
        <ChipSelector
          title="Любимые места"
          items={places}
          selectedItems={selectedPlaces}
          onToggle={(item) => toggleSelection(item, selectedPlaces, setSelectedPlaces)}
        />

        {/* Additional Details */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">Дополнительные детали</label>
          <textarea
            placeholder="Расскажите больше о персонаже..."
            rows={4}
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent resize-none"
          />
        </div>

        {/* Create Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 mt-6"
        >
          Создать персонажа
        </button>
      </form>
    </>
  )
}