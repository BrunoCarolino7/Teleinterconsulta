import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";

type PessoaData = {
    id: number;
    cpf: string;
    nome: string;
    ddd: number;
    telefone: number;
    ddd2: any;
    telefone2: string;
    email: string;
    email2: string;
    numeroconselho: number;
    enderecoxPessoas: any;
};

type PacienteProviderProps = {
    children: ReactNode;
};

type PacienteContextData = {
    pessoa: any;
    salvaDadosPessoa: (pessoa: object) => Promise<void>;
};

export const PacienteContext = createContext<PacienteContextData>({} as PacienteContextData);

export const PessoaProvider = ({ children }: PacienteProviderProps) => {
    const [pessoa, setPessoa] = useState<object>({} as object);

    const salvaDadosPessoa = async (pessoa: object) => {
        setPessoa(pessoa);
    };

    return (
        <PacienteContext.Provider value={{ pessoa, salvaDadosPessoa }}>
            {children}
        </PacienteContext.Provider>
    );
};

export function usePessoa() {
    const context = useContext(PacienteContext);
    return context;
}

    // const handleMostrar = (b: PacienteData) => {
    //     setPaciente(update(pacientes, { [pacientes.findIndex(e => e.id === b.id)]: { indice: { $unshift: b.indice } } }))
    // }

