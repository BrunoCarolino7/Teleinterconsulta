import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { HospitaisProvider } from './hooks/useHospitais';
import { PessoaProvider } from './hooks/usePessoa';
import { EspecialidadesProvider } from './hooks/useEspecialidades';
import { MyHospitalProvider } from './hooks/useMyHospital';
import { ProfissaoProvider } from './hooks/useProfissao';
import { Rotas } from './Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProfissaoProvider>
      <MyHospitalProvider>
        <EspecialidadesProvider>
          <PessoaProvider>
            <HospitaisProvider>
              <ChakraProvider theme={theme}>
                <Rotas />
              </ChakraProvider>
            </HospitaisProvider>
          </PessoaProvider>
        </EspecialidadesProvider>
      </MyHospitalProvider>
    </ProfissaoProvider>
  </React.StrictMode>

);
