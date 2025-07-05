'use client'

import { authService } from "@/features"
import { userService } from "@/features/User/service/user.service"
import { PUBLIC_URL } from "@/shared"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
    const router = useRouter()
    useEffect(() => {
        const check = async () => {
            try {
                console.log(window.Telegram.WebApp)
            const data = await authService.main('login', {
                id: window.Telegram.WebApp.initDataUnsafe.user.id,
                hash: window.Telegram.WebApp.initDataUnsafe.hash
            })
            router.push(PUBLIC_URL.root())
        } catch(e) {
            const data = await authService.main('register', {
                id: window.Telegram.WebApp.initDataUnsafe.user.id,
                hash: window.Telegram.WebApp.initDataUnsafe.hash
            })
            router.push(PUBLIC_URL.root())
        }
        }
        check()
    }, [])
    return (<></>)
}