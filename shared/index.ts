import { axiosClassic, axiosWithAuth } from "./api/api.interceptors";
import { CharacterCard } from "./components/character-card";
import { API_URL } from "./config/api.config";
import { PUBLIC_URL } from "./config/url.config";
import useTelegramInitData from "./hooks/useTelegramInitData";

export {
    CharacterCard,
    axiosClassic,
axiosWithAuth,
API_URL,
PUBLIC_URL,
useTelegramInitData,
}