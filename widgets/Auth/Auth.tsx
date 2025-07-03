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
            const data = await authService.main('login', {
                first_name: window.Telegram.WebApp.initDataUnsafe.user.first_name,
                last_name:window.Telegram.WebApp.initDataUnsafe.user.last_name
            })
            router.push(PUBLIC_URL.root())
        } catch(e) {
            const data = await authService.main('register', {
                first_name: window.Telegram.WebApp.initDataUnsafe.user.first_name,
                last_name:window.Telegram.WebApp.initDataUnsafe.user.last_name
            })
            router.push(PUBLIC_URL.root())
        }
        }
        check()
    }, [])
    return (<></>)
}