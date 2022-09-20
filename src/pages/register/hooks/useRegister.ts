import { useState } from "react"
import httpClient from "../../../lib/apiRequest";
import { UserRegisterRequest } from "../../../ultils/interfaces/UserInterface";

export const useRegister = () => {
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
    const register = async (userRegisterRequest: UserRegisterRequest) => {
        const { data } = await httpClient.post("/register", { ...userRegisterRequest });

        if (data && data.token) {
            setRegisterSuccess(true);
        }
    }

    return [registerSuccess, register] as const
}