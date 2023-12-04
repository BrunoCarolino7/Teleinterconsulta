import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import update from 'immutability-helper'
import axios from "axios";
import api from "../services/api";

interface HospitaisData {
    id: number;
    razaosocial: string;
    email: string;
    conteudo: string;
    btnVermais: boolean;
    profissional: string;
}

interface HospitalProviderProps {
    children: ReactNode;
}

interface HospitaisContextData {
    hospital: HospitaisData[];
    handleMostrar: any;
}

export const HospitaisContext = createContext<HospitaisContextData>({} as HospitaisContextData);


export function HospitaisProvider({ children }: HospitalProviderProps) {

    const [hospital, setHospitals] = useState<HospitaisData[]>([]);

    useEffect(() => {
        api.get('unsaude/obter')
            .then(response => setHospitals(response.data))

        //.then(response => setHospitals(response.data.enderecoxPessoas.map((x: any) => x.endereco.un_Saude.razaosocial)))

    }, [])

    const handleMostrar = (b: HospitaisData) => {
        setHospitals(update(hospital, { [hospital.findIndex(e => e.id === b.id)]: { btnVermais: { $set: !b.btnVermais } } }))
    }

    return (
        <HospitaisContext.Provider value={{ hospital, handleMostrar }}>
            {children}
        </HospitaisContext.Provider>
    )
}

export function useHospitais() {
    const context = useContext(HospitaisContext);

    return context;
}