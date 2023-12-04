import { Flex, HStack, Stack, Text, Button, Table, Thead, Tr, Th, Tbody, Td, Box, Heading, Icon, Tooltip, useDisclosure, Select, Input, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Checkbox, VStack } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { BsCircle, BsFillCameraVideoFill } from "react-icons/bs";
import { SideBar } from "../components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Perfil } from "../components/Header/Perfil";
//import { AdicionarUsuarioModal } from "../components/Modal/AdicionarUsuarioModal"
import { FaFilter } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";

export function GerenciarCredenciamentos() {

    // const obterCredsFiltrados = (estado: string) => {
    //     if (filtroAtual === estado) {
    //         setFiltroAtual('')
    //         credenciamentosFiltraodos([]);
    //     } else {
    //         // const filtro = 
    //         // setFiltroAtual(
    //     }
    // }

    const [payload, setPayload] = useState<any>();
    const [credenciamentos, setCredenciamentos] = useState<any>([]);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [filtroAtual, setFiltroAtual] = useState('');
    const [enderecoId, setEnderecoId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                setPayload(payloadToken);
                const userId = payloadToken.nameid;

                // Move a chamada à API para dentro do if onde userId é definido
                if (userId) {
                    const getUnSaudeUsuario = async () => {
                        try {
                            const response = await api.get(`usuario/obter/${userId}`)
                            setEnderecoId(response.data.enderecoxpessoas[0].enderecoid)

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

    var nomeUsuario = payload ? payload.unique_name : "";
    if (nomeUsuario) {
        const partesDoNome = nomeUsuario.split(" ");
        nomeUsuario = partesDoNome[0];
    }

    const instituicoesListaCred = credenciamentos.flatMap((x: any) => x)
    const credenciamentosFiltraodos = instituicoesListaCred.filter((item: any) => item.enderecosolicitado.unSaude.razaosocial.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "").includes(value.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")));


    console.log(credenciamentos.map((credenciamento: any) => (credenciamento.enderecosolicitante.unSaude.razaosocial)))

    const handleDeletarCred = async (id: number) => {

        const novoCredenciamentos = credenciamentos.filter((cred: any) => cred.id !== id);
        setCredenciamentos(novoCredenciamentos);
        await api.put(`credenciamento/deletar/${id} `)
    };

    useEffect(() => {
        const obterListagemCredenciamento = async () => {
            const response2 = await api.get(`credenciamento/obter/${enderecoId}`);
            setCredenciamentos(response2.data);
        }
        obterListagemCredenciamento();
    }, [enderecoId])


    return (
        <>
            <Perfil margin={-127} nome={nomeUsuario} />
            <Flex
                mt="2rem"
                w="100%"
                h="60vh"
            >
                <SideBar />

                <Flex
                    w="80%"
                    h="70vh"
                    ml="-2rem"
                    boxShadow="md"
                    bg="whiteAlpha.700"
                    justifyContent="center"
                >
                    <Flex
                        mt="2rem"
                        mb="2rem"
                        w="95%"
                        direction="column"
                    >
                        <Box>
                            <Heading>
                                <Stack>
                                    <Text mb="2rem">Credenciamentos</Text>
                                    <HStack mb="1rem">
                                        <Input w="60%" mb="2" placeholder='Filtre pela instituição solicitada' value={value} onChange={e => setValue(e.target.value)} />

                                        <Popover>
                                            <PopoverTrigger>
                                                <Button colorScheme="teal" mb="2">
                                                    <Icon as={FaFilter} mr="3" />
                                                    Filtrar
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent h="20" w={140}>
                                                <PopoverArrow />
                                                <PopoverBody>
                                                    <Button variant="unstyled">
                                                        <Stack>
                                                            <Stack mb="0.5" >
                                                                <Checkbox colorScheme="teal">Aprovado</Checkbox>
                                                            </Stack>
                                                            <Stack borderBottomWidth={1} borderBottomColor="blackAlpha.400">
                                                            </Stack>
                                                            <Stack>
                                                                <Checkbox colorScheme="teal">Reprovado</Checkbox>
                                                            </Stack>
                                                        </Stack>
                                                    </Button>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>

                                        <Button mb="2" _hover={{ bg: "#385898b5" }} color="white" bg="facebook.100" onClick={() => navigate('/solicitacaocredenciamento')}>Solicitar Credenciamento</Button>
                                    </HStack>
                                </Stack>

                            </Heading>
                            <Box overflowX="auto" overflowY="auto" maxHeight="460px">
                                <Table variant="striped" colorScheme="">
                                    <Thead position="sticky" top={0} bgColor="gray.100" zIndex="1">
                                        <Tr>
                                            <Th>Instituição Solicitante</Th>
                                            <Th>Instituição Solicitada</Th>
                                            <Th>Especialidade Solicitada</Th>
                                            <Th>Status</Th>
                                            <Th></Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {value.length > 0 ? (
                                            credenciamentosFiltraodos.map((credenciamento: any, index: any) => (
                                                <Tr key={index}>
                                                    <Td>{credenciamento.enderecosolicitante.unSaude.razaosocial}</Td>
                                                    <Td>{credenciamento.enderecosolicitado.unSaude.razaosocial}</Td>
                                                    <Td pl="1.8rem">{credenciamento.enderecosolicitado.enderecoxespecialidades.map((x: any) => x.especialidade.descricao)}</Td>
                                                    <Td pl="2.5rem"><Icon fontSize="19" borderRadius="3rem" bg="green.500" as={BsCircle} /></Td>
                                                    <Td></Td>
                                                    <Td>
                                                        <HStack spacing="5">
                                                            {/* <Tooltip hasArrow label="Mais detalhes">
                                                            <Button onClick={onOpen} variant="unstyled">
                                                                <Icon fontSize="24" as={AiOutlineEye} />
                                                            </Button>
                                                        </Tooltip> */}
                                                            <Tooltip hasArrow label="Remover solicitação">
                                                                <Button onClick={() => handleDeletarCred(credenciamento.id)} variant="unstyled">
                                                                    <Icon as={IoRemoveCircleOutline} fontSize="22" />
                                                                </Button>
                                                            </Tooltip>
                                                        </HStack>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) :
                                            credenciamentos.map((credenciamento: any, index: any) => (
                                                <Tr key={index}>
                                                    <Td>{credenciamento.enderecosolicitante.unSaude.razaosocial}</Td>
                                                    <Td>{credenciamento.enderecosolicitado.unSaude.razaosocial}</Td>
                                                    <Td pl="1.8rem">{credenciamento.enderecosolicitado.enderecoxespecialidades.map((x: any) => x.especialidade.descricao)}</Td>
                                                    <Td pl="2.5rem"><Icon fontSize="19" borderRadius="3rem" bg="green.500" as={BsCircle} /></Td>
                                                    <Td></Td>
                                                    <Td>
                                                        <HStack spacing="5">
                                                            {/* <Tooltip hasArrow label="Mais detalhes">
                                                        <Button onClick={onOpen} variant="unstyled">
                                                            <Icon fontSize="24" as={AiOutlineEye} />
                                                        </Button>
                                                    </Tooltip> */}
                                                            <Tooltip hasArrow label="Remover solicitação">
                                                                <Button onClick={() => handleDeletarCred(credenciamento.id)} variant="unstyled">
                                                                    <Icon as={IoRemoveCircleOutline} fontSize="22" />
                                                                </Button>
                                                            </Tooltip>
                                                        </HStack>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </Box>
                        </Box>
                    </Flex>
                    {/* <AdicionarUsuarioModal  onClose={onClose} isOpen={isOpen} /> */}
                </Flex>
            </Flex >
        </>
    )
}

//FILTRO


// export function Dashboard() {
//     const [listaFiltrada, setListaFiltrada] = useState<SituacaoProp[]>([]);
//     const [filtroAtual, setFiltroAtual] = useState<string>('');

//     const estadoSolicitacao: SituacaoProp[] = [
//         { estado: 'aprovado' },
//         { estado: 'aprovado' },
//         { estado: 'reprovado' },
//         { estado: 'reprovado' }
//     ]

//     const obterListaFiltrada = (estado: string) => {
//         if (filtroAtual === estado) {
//             setFiltroAtual('');
//             setListaFiltrada([]);
//         } else {
//             setFiltroAtual(estado);
//             const filtro = estadoSolicitacao.filter(f => f.estado === estado);
//             setListaFiltrada(filtro);
//         }
//     }

//     return (
//         <Flex align="center" justify="center" minH="100vh">
//             <Button onClick={() => obterListaFiltrada("aprovado")}>
//                 Aprovado{/* {!filtroAtual || filtroAtual !== 'aprovado' ? 'Filtrar Aprovado' : 'Remover Filtro'} */}
//             </Button>
//             <Button onClick={() => obterListaFiltrada("reprovado")}>
//                 Reprovado{/* {!filtroAtual || filtroAtual !== 'reprovado' ? 'Filtrar Reprovado' : 'Remover Filtro'} */}
//             </Button>
//             <ul>
//                 {listaFiltrada.length === 0 ?
//                     estadoSolicitacao.map((x: SituacaoProp, index: number) => (
//                         <li key={index}>{x.estado}</li>
//                     )) :
//                     listaFiltrada.map((x: SituacaoProp, index: number) => (
//                         <li key={index}>{x.estado}</li>
//                     ))

//                 }
//             </ul>
//         </Flex>
//     )
// }
