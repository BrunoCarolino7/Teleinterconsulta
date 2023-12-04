import { Flex, HStack, Select, Stack, Text, Button, Table, Thead, Tr, Th, Tbody, Td, Box, Heading, Icon, Tooltip } from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { BsCircle, BsFillCameraVideoFill } from "react-icons/bs";
import { SideBar } from "../components/SideBar";
import { useHospitais } from "../hooks/useHospitais";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { usePacientes } from "../hooks/usePessoa";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Perfil } from "../components/Header/Perfil";
import axios from "axios";

export function Dashboard() {

    const navigate = useNavigate();

    const [unSaude, setUnSaude] = useState([]);
    const [payload, setPayload] = useState<any>();
    const [instituicao, setInstituicao] = useState<any>(null);
    const [solicitacaoEnderecos, setSolicitacaoEnderecos] = useState([]);

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
                            const response = await api.get(`usuario/obter/${userId}`);
                            setUnSaude(response.data.enderecoxpessoas.flatMap((x: any) => x.endereco.unSaude))


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

    const selecionarInstituicao = (e: any) => {
        setInstituicao(e.target.value)
    }

    useEffect(() => {
        api.get(`unsaude/solicitacao/${instituicao}`)
            .then(response => setSolicitacaoEnderecos(response.data.enderecos.flatMap((x: any) => x.solicitacaoEnderecos.map((x: any) => x))))
    }, [instituicao]);

    console.log(solicitacaoEnderecos)
    console.log(instituicao)

    return (
        <>
            <Perfil margin={-127} nome={nomeUsuario} />
            <Flex
                mt="2rem"
                w="100%"
                h="60vh"
            // bg="black"
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
                        // bg="lightskyblue"
                        direction="column"
                    >
                        <Box>
                            <Heading>
                                <Stack>
                                    <Text>Teleinterconsultas</Text>

                                    <HStack mb="1rem" >
                                        <Select w="60%" mb="2" value={instituicao} onChange={selecionarInstituicao} placeholder='Instituição'>
                                            {unSaude.length > 0 ? (
                                                unSaude.map((unsaude: any, index) => (
                                                    <option key={index} value={unsaude.id}>{unsaude.razaosocial}</option>
                                                ))
                                            ) : (
                                                <option value="" disabled>Sem vínculos institucionais</option>
                                            )}
                                        </Select>


                                        <Button _hover={{ bg: "#385898b5" }} color="white" bg="facebook.100" onClick={() => navigate('/solicitacaoteleinterconsulta')}>Solicitar Teleinterconsulta</Button>
                                    </HStack>
                                </Stack>

                            </Heading>
                            <Box overflowX="auto" overflowY="auto" maxHeight="460px">
                                <Table variant="striped" colorScheme="">
                                    <Thead position="sticky" top={0} bgColor="gray.100" zIndex="1">
                                        <Tr>
                                            <Th>Data solicitação</Th>
                                            <Th>Data/Hora agendamento</Th>
                                            <Th>Justificativa</Th>
                                            <Th>Paciente</Th>
                                            <Th>Status</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {solicitacaoEnderecos.map((solicitacao: any, index) => (
                                            <Tr key={index}>
                                                <Td>{solicitacao.datasolicitacao}</Td>
                                                <Td>30/11/2025 - 15:30</Td>
                                                <Td>
                                                    {solicitacao.justificativa}
                                                </Td>
                                                <Td>{solicitacao.paciente.nome}</Td>
                                                <Td pl="2.5rem">
                                                    <Icon fontSize="19" borderRadius="3rem" bg="green.500" as={BsCircle} />
                                                </Td>
                                                <Td>
                                                    <HStack spacing="5">
                                                        <Tooltip hasArrow label="Mais detalhes">
                                                            <Button onClick={() => { }} variant="unstyled">
                                                                <Icon fontSize="24" as={AiOutlineEye} />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip hasArrow label="Remover solicitação">
                                                            <Button variant="unstyled">
                                                                <Icon as={IoRemoveCircleOutline} fontSize="22" />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip hasArrow label="Realizar teleinterconsulta">
                                                            <Button onClick={() => { }} variant="unstyled">
                                                                <Icon fontSize="24" as={BsFillCameraVideoFill} />
                                                            </Button>
                                                        </Tooltip>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))}

                                    </Tbody>
                                </Table>
                            </Box>
                        </Box>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}


{/* {hospital.map((x) => (
                                            <Tr key={x.id}>
                                                <Td>{x.email}</Td>
                                                <Td>30/11/2025 - 15:30</Td>

                                                <Td >
                                                    {x.btnVermais ?
                                                        <Flex>
                                                            <Flex maxW={300} >
                                                                {x.btnVermais && <Box overflowY="scroll" maxH={100}>{x.conteudo}</Box>}
                                                            </Flex>
                                                            <Button variant="unstyled">{x.btnVermais && <Icon as={RiArrowUpSLine} />}</Button>
                                                        </Flex>
                                                        :
                                                        <Flex >
                                                            <Box overflowY="hidden" maxW={300} maxH={10}>{x.conteudo}</Box>
                                                            <Button variant="unstyled">{!x.btnVermais && <Icon as={RiArrowDownSLine} />}</Button>
                                                        </Flex>
                                                    }
                                                </Td>
                                                <Td>{x.profissional}</Td>
                                                <Td pl="2.5rem"><Icon fontSize="19" borderRadius="3rem" bg="green.500" as={BsCircle} /></Td>
                                                <Td>
                                                    <HStack spacing="5">
                                                        <Tooltip hasArrow label="Mais detalhes">
                                                            <Button onClick={() => { }} variant="unstyled"><Icon fontSize="24" as={AiOutlineEye} /></Button>
                                                        </Tooltip>
                                                        <Tooltip hasArrow label="Remover solicitação"><Button variant="unstyled"><Icon as={IoRemoveCircleOutline} fontSize="22" /></Button></Tooltip>
                                                        <Tooltip hasArrow label="Realizar teleinterconsulta"><Button onClick={() => { }} variant="unstyled"><Icon fontSize="24" as={BsFillCameraVideoFill} /></Button></Tooltip>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))} */}