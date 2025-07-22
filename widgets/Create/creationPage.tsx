"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CharacterForm } from "@/features/Character/components/confirmation-form"

import { CreateCharacter } from "@/enities/Character/types/character.interface"
import { ConfirmationView } from "@/shared/components/confirmation-view"
import { GenerationView } from "@/shared/components/generation-view"
import { userService } from "@/features/User/service/user.service"
import { useRouter } from "next/navigation"
import { PUBLIC_URL } from "@/shared"

export default function CreateACharacter() {
  const [currentStep, setCurrentStep] = useState<"form" | "confirmation" | "generation">("form")
  const [characterData, setCharacterData] = useState<CreateCharacter | null>(null)

  const router = useRouter()
  const handleFormSubmit = (data: CreateCharacter) => {
    setCharacterData(data)
    setCurrentStep("confirmation")
  }

  const handleConfirm = () => {
    setCurrentStep("generation")
  }

  const handleBackToForm = () => {
    setCurrentStep("form")
  }

  const handleBackToConfirmation = () => {
    setCurrentStep("confirmation")
  }

  const handleGenerationComplete = async () => {
    // Navigate back to main page or wherever needed
    if (characterData) {
    console.log(characterData)
    const data = await userService.createUserCharacter(characterData)
    window.location.href = "/assistants"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-start p-4">
      {/* Back Button */}
      <div className="w-full max-w-md mb-8 mt-8">
        {currentStep === "form" ? (
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Назад</span>
          </Link>
        ) : currentStep === "confirmation" ? (
          <button
            onClick={handleBackToForm}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Назад</span>
          </button>
        ) : (
          <button
            onClick={handleBackToConfirmation}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Назад</span>
          </button>
        )}
      </div>

      {/* Render current step */}
      {currentStep === "form" && <CharacterForm onSubmit={handleFormSubmit} initialData={characterData} />}
      {currentStep === "confirmation" && characterData && (
        <ConfirmationView characterData={characterData} onConfirm={handleConfirm} />
      )}
      {currentStep === "generation" && characterData && (
        <GenerationView
          characterData={characterData}
          setCharacterData={setCharacterData}
          onRedo={() => setCurrentStep("generation")}
          onChange={handleBackToForm}
          onComplete={async () => await handleGenerationComplete()}
        />
      )}
    </div>
  )
}