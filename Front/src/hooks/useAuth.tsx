import { ReactNode, createContext, useState } from "react";
import api from "../services/api";

type AuthProviderChildren = {
    children: ReactNode;
}

type Token = {
    token: string;
}

const AuthContext = createContext({});

export function AuthProvider({ children }: AuthProviderChildren) {

    const [token, setToken] = useState<Token>({} as Token);

    const signIn = async () => {
        api.post('/')
    }

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    )
}