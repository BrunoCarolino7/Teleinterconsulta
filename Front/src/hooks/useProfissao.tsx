import { createContext, ReactNode, useContext, useState } from "react";

interface ProfissaoData {
    id: any;
}

interface ProfissaoChilredn {
    children: ReactNode;
}

interface ProfissaoDataContext {
    profissao: ProfissaoData;
    guardaProfissao: any;
}

const ProfissaoContext = createContext({} as ProfissaoDataContext);

export function ProfissaoProvider({ children }: ProfissaoChilredn) {

    const [profissao, setProfissao] = useState<ProfissaoData>({} as ProfissaoData);


    const guardaProfissao = (profissao: ProfissaoData) => {
        setProfissao(profissao);
    }

    return (
        <ProfissaoContext.Provider value={{ profissao, guardaProfissao }}>
            {children}
        </ProfissaoContext.Provider>
    )
}

export function useProfissao() {

    const context = useContext(ProfissaoContext);
    return context;
}


