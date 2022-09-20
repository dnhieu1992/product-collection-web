import { useState } from "react"
import httpClient from "../../../lib/apiRequest";
import { UserRequest } from '../../../ultils/interfaces/UserInterface';
import userService, { User } from '../../../ultils/userService';

export const useLogin = () => {
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
    const login = async (userRequest: UserRequest) => {

        try{
            const { data } = await httpClient.post("/login", { ...userRequest });

            if (data && data.token) {
                userService.storeUser({ ...data })
                setLoginSuccess(true);
                userService.storeUser(data as User);
            }
        } catch {
            window.alert("Incorrect username or password.");
        };     
    };

    return [loginSuccess, login] as const
};