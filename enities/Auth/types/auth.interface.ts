import { IUser } from "@/enities/User/types/user.interface"


export interface IAuthResponse {
	user: IUser
	accessToken: string
}
