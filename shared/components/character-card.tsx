"use client"

interface CharacterCardProps {
  name: string
  subtitle: string
  avatar: string
  onClick: () => void
  bg_color?: string
}

export function CharacterCard({ name, subtitle, avatar, onClick, bg_color }: CharacterCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center space-x-4 text-left text-white hover:bg-white/20 hover:scale-105 transform transition-all duration-300 ease-out active:scale-95 shadow-lg hover:shadow-xl"
    >
      {/* Avatar */}
      <div className={`w-16 h-16 ${bg_color ? bg_color : "bg-yellow-600"} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
        {avatar}
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
    </button>
  )
}
