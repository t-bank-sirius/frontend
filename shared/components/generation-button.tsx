"use client"

import type React from "react"
import { Loader2 } from "lucide-react"

interface LoadingButtonProps {
  onClick: () => void
  isLoading?: boolean
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

export function LoadingButton({
  onClick,
  isLoading = false,
  className = "",
  children,
  disabled = false,
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative flex items-center justify-center py-3 px-6 rounded-xl transition-all duration-300 ${
        isLoading ? "bg-orange-500/80 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"
      } text-white font-semibold ${className}`}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <Loader2 className="w-5 h-5 absolute animate-spin" />
        </>
      ) : (
        children
      )}
    </button>
  )
}
