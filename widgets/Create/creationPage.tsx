"use client"

import { useEffect, useState } from "react"
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
  const [isCheckingLimit, setIsCheckingLimit] = useState(true)
  const [showLimitPopup, setShowLimitPopup] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Mock API request to check character count
    const checkCharacterLimit = async () => {
      setIsCheckingLimit(true)

      // Simulate 3 second API request
      const characters = await userService.getCharactersByUser('', 'true')

      // Mock character count - change this to test the popup
      const currentCharacterCount = characters.data.length // Change to 4 or less to allow creation

      if (currentCharacterCount >= 3) {
        setShowLimitPopup(true)
      }

      setIsCheckingLimit(false)
    }

    checkCharacterLimit()
  }, [])
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
  const handleClosePopup = () => {
    setShowLimitPopup(false)
    window.location.href = "/"
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
      {/* Loading State */}
      {isCheckingLimit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center text-white">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-lg font-medium">Проверяем лимит персонажей...</p>
          </div>
        </div>
      )}

      {/* Limit Reached Popup */}
      {showLimitPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center text-white max-w-sm w-full">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-3">Лимит достигнут</h2>
            <p className="text-white/80 mb-6">
              Вы уже создали максимальное количество персонажей (3). Удалите существующих персонажей, чтобы создать
              новых.
            </p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Main Content - only show if not checking limit and no popup */}
      {!isCheckingLimit && !showLimitPopup && (
        <>
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
              setCurrentStep={setCurrentStep}
              onChange={handleBackToForm}
              onComplete={handleGenerationComplete}
            />
          )}
        </>
      )}
    </div>
  )
}