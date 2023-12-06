import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CadastroUsuario } from '../pages/novoUsuario/cadastroUsuario';
import { CheckTokenFoundCpf } from '../pages/checkTokenFoundCpf';
import { CheckToken } from '../pages/novoUsuario/checkToken';
import { HomeCnpj } from '../pages/homeCnpj';
import { CadastroInstituicao } from '../pages/novoUsuario/cadastroInstituicao';
import { Stepper } from '../components/Stepper'
import { SolicitacaoTeleinterconsulta } from '../pages/solicitacaoTeleinterconsulta';
import { Dashboard } from '../pages/dashboard';
import { CadastroTelEmailToken } from '../pages/novoUsuario/cadastroTelEmailToken';
import { GerenciarInstituicao } from '../pages/gerenciarInstituicao';
import { SolicitacaoCredenciamento } from '../pages/solicitacaoCredenciamento';
import { AlterarTelEmailToken } from '../pages/alterarTelEmailToken';
import Layout from '../Layout';
import { Login } from '../pages/login';
import { GerenciarCredenciamentos } from '../pages/gerenciarCredenciamentos';
import { Home } from '../Home';
import { MeuPerfil } from '../pages/meuPerfil';

export function Rotas() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>                   
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checktoken/:settoken/:ddd/:telefone/:cpfs/:email" element={<CheckToken />} />
                    <Route path="/cadastrousuario/:settoken/:email/:ddd/:cpfs/:tel" element={<CadastroUsuario />} />
                    <Route path="/cadastroinstituicao" element={<CadastroInstituicao />} />
                    <Route path="/cadastroTelEmailToken/:cpfs/:settoken" element={<CadastroTelEmailToken />} />
                    <Route path="/alterarTelEmailToken" element={<AlterarTelEmailToken />} />
                    <Route path="/checktokenfoundcpf/:settoken" element={<CheckTokenFoundCpf />} />                    
                    <Route path="/credenciamento" element={<GerenciarCredenciamentos />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/homecnpj" element={<HomeCnpj />} />
                    <Route path="/teste" element={<Stepper />} />
                    <Route path="/solicitacaoteleinterconsulta" element={<SolicitacaoTeleinterconsulta />} />
                    <Route path="/gerenciarInstituicao" element={<GerenciarInstituicao />} />
                    <Route path="/solicitacaocredenciamento" element={<SolicitacaoCredenciamento />} />
                    <Route path="/meuPerfil" element={<MeuPerfil />} />                  
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}








// export function Rotas() {
//     return (
//         <BrowserRouter>
//             <Layout>
//                 <Routes >
//                     <Route element={<PrivateRoute ><Home /></PrivateRoute>}>
//                         <Route path="/" element={<Login />} />
//                         <Route path="/login" element={<Login />} />
//                         <Route path="/checktoken/:settoken/:ddd/:telefone/:cpfs/:email" element={<CheckToken />} />
//                         <Route path="/cadastrousuario/:settoken/:email/:ddd/:cpfs/:tel" element={<CadastroUsuario />} />
//                         <Route path="/cadastroinstituicao" element={< CadastroInstituicao />} />
//                         <Route path="/cadastroTelEmailToken/:cpfs/:settoken" element={<CadastroTelEmailToken />} />
//                         <Route path="/alterarTelEmailToken" element={<AlterarTelEmailToken />} />
                        
//                         {/* As rotas acima quero que sejam publicas*/}

//                         <Route path="/credenciamento" element={<GerenciarCredenciamentos />} />
//                         <Route path="/checktokenfoundcpf/:settoken" element={<CheckTokenFoundCpf />} />
//                         <Route path="/homecnpj" element={<HomeCnpj />} />
//                         <Route path="/teste" element={<Stepper />} />
//                         <Route path="/solicitacaoteleinterconsulta" element={<SolicitacaoTeleinterconsulta />} />
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route path="/gerenciarInstituicao" element={<GerenciarInstituicao />} />
//                         <Route path="/solicitacaocredenciamento" element={<SolicitacaoCredenciamento />} />
//                         <Route path="/meuPerfil" element={<MeuPerfil />} />
//                     </Route>
//                 </Routes>
//             </Layout>
//         </BrowserRouter>        
//     )
// }
