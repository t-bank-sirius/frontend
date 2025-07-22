import Auth from "@/widgets/Auth/Auth";

export default function Page() {
    return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 via-30% to-black flex flex-col items-center justify-center p-4">
        <Auth />
      {/* Loading Content */}
      <div className="text-center text-white space-y-8">
        {/* Loading Spinner */}
        <div className="relative">

          {/* Pulsing dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading Text */}

        {/* Floating Elements Animation */}
      </div>
    </div>
  )
}
 