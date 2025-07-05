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
                initData: window.Telegram.WebApp.initData
            })
            router.push(PUBLIC_URL.root())
        } catch(e) {
            const data = await authService.main('register', {
                initData: window.Telegram.WebApp.initData
            })
            router.push(PUBLIC_URL.root())
        }
        }
        check()
    }, [])
    return (<></>)
}