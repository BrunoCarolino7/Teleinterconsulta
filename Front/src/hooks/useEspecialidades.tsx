import { ReactNode, createContext, useContext, useEffect, useState } from "react";



interface EspecialidadesProps {
    nome: string;
}

type ProviderProp = {
    children: ReactNode;
}

interface EspecialidadeDataContext {
    especialidades: EspecialidadesProps[];
}


export const EspecialidadesContext = createContext<EspecialidadeDataContext>({} as EspecialidadeDataContext);


export function EspecialidadesProvider({ children }: ProviderProp) {

    const [especialidades, setEspecialidades] = useState<EspecialidadesProps[]>([]);


    // useEffect(() => {
    //     api.get('especialidades')
    //         .then(response => setEspecialidades(response.data.especialidades))
    // }, [])

    return (
        <EspecialidadesContext.Provider value={{ especialidades }}>
            {children}
        </EspecialidadesContext.Provider>
    )
}


export function useEspecialidades() {

    const context = useContext(EspecialidadesContext)

    return context;
} 