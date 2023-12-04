import { Flex, Icon, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Stepper } from "../components/Stepper";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useHospitais } from "../hooks/useHospitais";
import { Button } from "../components/Button";
import { AlertaModal } from "../components/Modal/AlertaModal";
import api from "../services/api";

type credenciamento = {
    Enderecosolicitanteid: number;
    Enderecosolicitadoid: number;
    Enderecoxpessoaid: number;
}

export function SolicitacaoCredenciamento() {

    const { onOpen, isOpen, onClose } = useDisclosure();
    const location = useLocation();

    const [suaInstituicao, setSuaInstituicao] = useState<any>([]);
    const [hospital, setHospital] = useState<any>([]);
    const [instituicaoSolicitada, setInstituicaoSolicitada] = useState<any>([]);
    const [especialidade, setEspecialidades] = useState<any>([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState<any>([]);
    const [enderecoxPessoas, setEnderecoxPessoas] = useState(0);


    const handleSuaInstituicao = (e: ChangeEvent<HTMLSelectElement>) => {
        setSuaInstituicao(e.target.value)
    }
    const handleInstituicaoSolicitada = (e: ChangeEvent<HTMLSelectElement>) => {
        setInstituicaoSolicitada(e.target.value)
    }
    const handleEspecialidadesDisponiveis = (e: ChangeEvent<HTMLSelectElement>) => {
        setEspecialidadesDisponiveis(e.target.value)
    }

    const vemDoCadastro = location.state && location.state === 'cadastroinstituicao'
    const vemDeGerenciarCredenciamentos = location.state && location.state === 'credenciamento'

    const [unSaude, setUnSaude] = useState<any>([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [loading, setLoading] = useState(false);


    const handleSubmitDados = async (event: FormEvent) => {

        event.preventDefault();
        setLoading(true)

        try {
            const credenciamento: credenciamento = {
                Enderecosolicitadoid: Number(instituicaoSolicitada),
                Enderecosolicitanteid: Number(suaInstituicao),
                Enderecoxpessoaid: Number(enderecoxPessoas)
            }

            const corpoDeRequisicao = {
                RegisterCredenciamentoViewModel: credenciamento
            }

            await api.post(`credenciamento/criar`, corpoDeRequisicao)
            onOpen();

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                const userId = payloadToken.nameid;

                if (userId) {
                    const getUnSaudeUsuario = async () => {
                        try {
                            const response = await api.get(`usuario/obter/${userId}`);
                            setUnSaude(response.data.enderecoxpessoas.map((response: any) => response.endereco.unSaude));

                            const response2 = await api.get(`unsaude/obter/nomatch/${userId}`);
                            setHospital(response2.data)
                            setEnderecoxPessoas(response2.data[0].perfil.unSaudes[0].enderecos[0].enderecoxpessoas[0].id);
                            setIdUsuario(userId)

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

    useEffect(() => {
        const buscaEspecialidade = async () => {
            const response = await api.get(`unsaude/obter/espec/${instituicaoSolicitada}`)
            setEspecialidades((response.data.enderecos.map((x: any) => x.enderecoxespecialidades.flatMap((x: any) => x.especialidade.descricao))));
        }

        buscaEspecialidade();
    }, [instituicaoSolicitada])

    useEffect(() => {
        if (unSaude.length === 1)
            setSuaInstituicao(unSaude[0].id)
    }, [unSaude])



    return (
        <>

            {vemDoCadastro && <Stepper index={5} />}
            {vemDeGerenciarCredenciamentos && <Stepper index={5} />}

            <Flex
                // bg="lightcyan"
                justifyContent="center"
            >
                <Flex
                    as="form"
                    bg="whiteAlpha.700"
                    boxShadow="md"
                    justifyContent="center"
                    w="60vw"
                    mr="auto" ml="auto" mt="2rem" mb="4rem"
                    h="100%"
                    align="center"
                    direction="column"
                    p="8"
                    borderRadius="5"
                    onSubmit={handleSubmitDados}
                >
                    <Flex
                        w="50vw"
                        direction="column"
                    >
                        <>
                            <Flex >
                                <Text mt="-1" mb="4rem" fontSize="29">Solicitação de credenciamento</Text>
                            </Flex>

                            <Flex position="absolute">
                                {!vemDeGerenciarCredenciamentos ? (
                                    <Link to="/credenciamento"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                                ) :
                                    <Link to="/dashboard"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                                }
                            </Flex>

                            <Stack mb="1rem">
                                <Text mb="-3rem">Sua instituição</Text>

                                <Select
                                    value={suaInstituicao}
                                    onChange={handleSuaInstituicao}
                                    mt="3rem"
                                    placeholder='Selecione'
                                >
                                    {unSaude.map((option: any, index: number) => (
                                        <option key={index} value={option.id}>{option.razaosocial}</option>
                                    ))}
                                </Select>

                            </Stack>

                            <Stack mb="1rem" >
                                <Text mb="-3rem">Instituição solicitada</Text>
                                <Select value={instituicaoSolicitada} onChange={handleInstituicaoSolicitada} mt="3rem" placeholder='Selecione' >
                                    {hospital.map((x: any, index: any) => (
                                        <option key={index} value={x.id}>{x.razaosocial}</option>
                                    ))}
                                </Select>
                            </Stack>

                            {especialidade.length === 0 || (especialidade.length === 1 && especialidade[0].length === 0) ?
                                <Stack mb="1rem" >
                                    <Text mb="-3rem">Especialidades</Text>
                                    <Select value={especialidadesDisponiveis} onChange={handleEspecialidadesDisponiveis} mt="3rem" placeholder='Selecione'>
                                        <option disabled>Não há especialidades disponíveis</option>
                                    </Select>
                                </Stack>
                                :
                                <Stack mb="1rem" >
                                    <Text mb="-3rem">Especialidades</Text>
                                    <Select value={especialidadesDisponiveis} onChange={handleEspecialidadesDisponiveis} mt="3rem" placeholder='Selecione'>
                                        {especialidade.map((descricao: string, index: number) => (
                                            <option key={index} value={descricao}>{descricao}</option>
                                        ))}
                                    </Select>
                                </Stack>
                            }
                        </>
                        <Button isLoading={loading}> Solicitar</Button>
                    </Flex>
                    <AlertaModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
                </Flex>
            </Flex>
        </>
    )
}