import type { TelegramWebApps } from "telegram-webapps-types";
declare global {
    interface Window {
        Telegram: TelegramWebApps
    }

    namespace NodeJs {
        interface ProccesEnv {
            BOT_TOKEN: string
        }
    }
}
export {}