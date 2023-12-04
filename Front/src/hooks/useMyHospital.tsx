import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";


type MyHospitalContextProp = {
    children: ReactNode;
}

export const MyHospitalContext = createContext({});


export const MyHospitalProvider = ({ children }: MyHospitalContextProp) => {

    const [userId, setUserId] = useState();
    const [minhaUnSaude, setMinhaUnSaude] = useState<[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('Token');

        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                setUserId(payloadToken.nameid)

                // Move a chamada à API para dentro do if onde userId é definido
                if (userId) {
                    const getUnSaudeUsuario = async () => {
                        try {
                            const response = await api.get(`unsaude/minha/obter`);
                            setMinhaUnSaude(response.data);
                            console.log(minhaUnSaude)
                        } catch (error) {
                            console.error("Erro na chamada da API:", error);
                        }
                    };
                    getUnSaudeUsuario();
                }
            } else {
                console.log("Token não válido");
            }
        } else {
            console.log("Token não encontrado");
        }
    }, []);

    return (
        <MyHospitalContext.Provider value={{ minhaUnSaude }}>
            {children}
        </MyHospitalContext.Provider >
    )
}

export function useMyHospital() {

    const context = useContext(MyHospitalContext)

    return context;
}