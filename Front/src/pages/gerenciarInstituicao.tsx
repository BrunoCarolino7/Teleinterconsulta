import { Box, Flex, Stack, Table, Th, Thead, Tr, Tbody, Td, Icon, Heading, Link, Button, HStack, Tooltip, TableContainer, useDisclosure } from "@chakra-ui/react";
import { BsCircle, BsTrash } from "react-icons/bs";
import { RiAddLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { SideBar } from "../components/SideBar";
import { Perfil } from "../components/Header/Perfil";
import { FormEvent, useEffect, useState } from "react";
import api from "../services/api";
import { EditarUsuarioModal } from "../components/Modal/EditarUsuarioModal";
import { useNavigate } from "react-router-dom";
import { UploadModal } from "../components/Modal/UploadModal";
import { AdicionarUsuarioModalProps } from "../components/Modal/AdicionarUsuarioModal";
import { AdicionarHospitalModal } from "../components/Modal/AdicionarHospitalModal";
import update from "immutability-helper";

export function GerenciarInstituicao() {

    const [hospitais, setHospitais] = useState<any>([]);
    const [payload, setPayload] = useState<any>();
    const [idUnSaude, setIdUnSaude] = useState(0);
    const [idEndereco, setIdEndereco] = useState(0);
    const [enderecoxPessoas, setEnderecoxPessoas] = useState<any>(idUnSaude === 0 && ['Selecione uma instituição']);
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [ddd, setDdd] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd2, setDdd2] = useState('');
    const [email, setEmail] = useState('');
    const [emailalternativo, setEmailalternativo] = useState('');
    const [numeroConselho, setNumeroConselho] = useState('');
    const [telefone2, setTelefoneAlternativo] = useState('');
    const [roleEnderecoxpessoas, setRoleEnderecoxpessoas] = useState(0);
    const [hospitalSelecionado, setHospitalSelecionado] = useState<number | null>(null);
    const [nomeHospitalSelecionado, setNomeHospitalSelecionado] = useState('');



    const [idUsuario, setIdUsuario] = useState(0);
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(0);
    const [idHospital, setIdHospital] = useState(0);


    const { isOpen: isOpenEditarUsuarioModal, onClose: onCloseEditarUsuarioModal, onOpen: onOpenEditarUsuarioModal } = useDisclosure();
    const { isOpen: isOpenUploadModal, onClose: onCloseUploadModal, onOpen: onOpenUploadModal } = useDisclosure();
    const { isOpen: isOpenAdicionarHospitalModal, onClose: onCloseAdicionarHospitalModal, onOpen: onOpenAdicionarHospitalModal } = useDisclosure();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                setPayload(payloadToken);
                const userId = payloadToken.nameid;
                setIdUsuarioLogado(Number(payloadToken.nameid));

                if (userId)
                    obterHospitais(userId);

            } else
                console.log("Token não válido");

        } else {
            console.log("Token não encontrado");
        }
    }, []);


    const obterHospitais = async (userId: number) => {

        try {
            const response = await api.get(`usuario/obter/${userId}`);
            setHospitais(response.data.enderecoxpessoas || []);
        } catch (error) {
            console.error("Erro na chamada da API:", error);
        }
    }


    const mostraNomeHospital = (nomeHospital: string) => {
        setNomeHospitalSelecionado(nomeHospital)
    }

    const obterPessoas = async (idHospital: number) => {
        try {
            const response = await api.get(`unsaude/profissionais/${idHospital}`);
            if (response.data[0] && response.data[0].enderecos) {
                setEnderecoxPessoas(response.data[0].enderecos[0].enderecoxpessoas);
                setRoleEnderecoxpessoas(hospitais.flatMap((x: any) => x.rolesid)[0])
                setIdEndereco(idHospital);
                setIdHospital(idHospital);
            } else {
                setEnderecoxPessoas([]);
            }
        } catch (error) {
            console.error("Erro na chamada da API:", error);
        }
    }


    const handleDeletarProfissionalDeUnSaude = async (profissionalId: number) => {
        try {

            alert("APAGAR USUARIO")
            setEnderecoxPessoas((profissionaisAtualizados: any) => profissionaisAtualizados.filter((profissional: any) => profissional.id !== profissionalId));
            api.delete(`enderecoxpessoa/deletar/${profissionalId}`)

        } catch (error) {
            console.error("Erro na chamada da API:", error);
        }
    }


    const alteraRolesProfissionais = async (enderecoxPessoaId: any, pessoaId: any) => {

        let pessoaPerteceAoHospital = hospitais[0].pessoaid;

        try {
            if (pessoaPerteceAoHospital === pessoaId) {
                await api.put(`usuario/altera-permissao/${enderecoxPessoaId}`)
                obterPessoas(idHospital)
                obterHospitais(pessoaId)
            } else {
                await api.put(`usuario/altera-permissao/${enderecoxPessoaId}`)
                obterPessoas(idHospital)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const setColorRolesProfissionais = (roleId: number) => {

        let color: any = [];
        switch (roleId) {
            case 1: color = "green.300"; break;
            case 2: color = "transparent"; break;
            default: color = "transparent"; break
        }

        return color;
    }

    const setColorRolesUnSaude = (roleId: number) => {

        let color: any = [];

        switch (roleId) {
            case 1: color = "green.300"; break;
            default: color = "transparent"; break;
        }

        return color;
    }

    const handleColorirHospitalSelecionado = (hospitalId: number) => {
        setHospitalSelecionado(hospitalId);
    };

    const setColorHospitalSelecionado = (hospitalId: number) => {
        return hospitalId === hospitalSelecionado ? "cyan.100" : "transparent";
    };

    const handleOpenEditarUsuarioModal = () => {
        onOpenEditarUsuarioModal();
    }

    const handleOpenUploadModal = () => {
        onOpenUploadModal();
    }

    const handleOpenAdicionarHospitalModal = () => {
        onOpenAdicionarHospitalModal();
    }

    var nomeUsuario = payload ? payload.unique_name : "";
    if (nomeUsuario) {
        const partesDoNome = nomeUsuario.split(" ");
        nomeUsuario = partesDoNome[0];
    }

    const adicionarProfissional = (novaPessoa: any) => {
        setEnderecoxPessoas([...enderecoxPessoas, novaPessoa]);
        obterPessoas(idHospital)
    };

    const adicionarHospital = async () => {
        obterHospitais(idUsuarioLogado);
    }


    return (
        <>
            <Perfil margin={-95} nome={nomeUsuario} />

            <Flex w="100%" alignContent="center">

                <SideBar marginTop="2rem" />
                <Flex
                    w="100%"
                    alignItems="center"
                    direction="column"
                    mb="4rem"
                    mt="2rem"
                >
                    <Stack bg="whiteAlpha.700" p="6" boxShadow="md" w="60%" ml="-18rem">
                        <Flex mb="8" justify="space-between" align="center">

                            <Heading size="lg" fontWeight="normal">
                                Hospitais
                            </Heading>

                            <Button
                                _hover={{ cursor: 'pointer', bg: 'gray.200' }}
                                as="a"
                                size="sm"
                                fontSize="sm"
                                leftIcon={<Icon as={RiAddLine} fontSize="18" pb="1" />}
                                onClick={handleOpenAdicionarHospitalModal}
                            >
                                <AdicionarHospitalModal
                                    isOpen={isOpenAdicionarHospitalModal}
                                    onClose={onCloseAdicionarHospitalModal}
                                    atualizaLista={adicionarHospital}
                                />
                                Adicionar hospital
                            </Button>
                        </Flex>
                        <Box overflowX="auto" overflowY="auto" maxHeight="310px">
                            <TableContainer>
                                <Table variant='striped' colorScheme=''>
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th>Instituição</Th>
                                            <Th></Th>
                                            <Th isNumeric>Gestor</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {hospitais.length > 0 ? (
                                            hospitais.map((hospital: any, index: any) => (
                                                <Tr bg={setColorHospitalSelecionado(hospital.id)} onClick={() => { obterPessoas(hospital.enderecoid); handleColorirHospitalSelecionado(hospital.id); mostraNomeHospital(hospital.endereco.unSaude.razaosocial) }} key={index} _hover={{ cursor: "pointer" }} >

                                                    <Td>{hospital.endereco.unSaude.razaosocial}</Td>
                                                    <Td></Td>
                                                    <Td isNumeric >
                                                        <Button variant="unstyled">
                                                            <Icon borderRadius="3rem" as={BsCircle} bg={setColorRolesUnSaude(hospital.rolesid)} />
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td fontStyle="italic">Não há instituições</Td>
                                                <Td></Td>
                                                <Td isNumeric></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </Stack>

                    <Stack bg="whiteAlpha.700" p="6" boxShadow="md" mt="2rem" w="60%" ml="-18rem">
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading size="lg" fontWeight="normal">{idHospital === 0 ? `Profissionais` : `Profissionais - ${nomeHospitalSelecionado}`}</Heading>
                            {idHospital !== 0 && roleEnderecoxpessoas === 3 &&
                                <Button
                                    _hover={{ cursor: 'pointer', bg: 'gray.200' }}
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    leftIcon={<Icon as={RiAddLine} fontSize="18" pb="1" />}
                                    onClick={handleOpenUploadModal}
                                >
                                    <AdicionarUsuarioModalProps
                                        Cpf={setCpf}
                                        Nome={setNome}
                                        DDD={setDdd}
                                        Tel={setTelefone}
                                        DDD2={setDdd2}
                                        Tel2={setTelefoneAlternativo}
                                        Email1={setEmail}
                                        EmailAlternativo={setEmailalternativo}
                                        NumeroConselho1={setNumeroConselho}
                                        isOpen={isOpenUploadModal}
                                        onClose={onCloseUploadModal}
                                        atualizaLista={adicionarProfissional}
                                        idEndereco={idEndereco}
                                    />
                                    Adicionar usuário
                                </Button>
                            }
                        </Flex>

                        <Box overflowX="auto" overflowY="auto" maxHeight="310px">
                            <TableContainer>
                                <Table variant='striped' colorScheme=''>
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th>Profissionais</Th>
                                            <Th></Th>
                                            <Th isNumeric></Th>
                                            <Th isNumeric></Th>
                                            <Th isNumeric>Gestor</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {enderecoxPessoas.length > 0 ? (
                                            enderecoxPessoas.flatMap((enderecoxpessoa: any, index: number) => (
                                                <Tr key={index}>
                                                    <Td>{enderecoxpessoa.pessoa?.nome ?? 'Selecione uma instituição'}</Td>
                                                    <Td></Td>
                                                    <Td>
                                                        {enderecoxpessoa.pessoa?.nome ? (
                                                            <HStack ml="18.7rem">
                                                                <Tooltip hasArrow label="Editar dados">
                                                                    <Button variant="unstyled"
                                                                        onClick={(e: FormEvent) => {
                                                                            e.preventDefault();
                                                                            handleOpenEditarUsuarioModal();
                                                                            setIdUsuario(enderecoxpessoa.pessoa.id)
                                                                            setRoleEnderecoxpessoas(enderecoxpessoa.rolesid)
                                                                        }}>
                                                                        <Icon as={MdOutlineModeEdit} />
                                                                    </Button>
                                                                </Tooltip>
                                                                <EditarUsuarioModal
                                                                    Nome={setNome}
                                                                    DDD={setDdd}
                                                                    Tel={setTelefone}
                                                                    DDD2={setDdd2}
                                                                    Tel2={setTelefoneAlternativo}
                                                                    Email1={setEmail}
                                                                    EmailAlternativo={setEmailalternativo}
                                                                    NumeroConselho1={setNumeroConselho}
                                                                    isOpen={isOpenEditarUsuarioModal}
                                                                    onClose={onCloseEditarUsuarioModal}
                                                                    idProfissional={idUsuario}
                                                                />

                                                                <Tooltip hasArrow label="Remover profissional">
                                                                    <Button onClick={() => handleDeletarProfissionalDeUnSaude(enderecoxpessoa.id)} variant="unstyled">
                                                                        <Icon as={BsTrash} />
                                                                    </Button>
                                                                </Tooltip>
                                                            </HStack>
                                                        ) :
                                                            <HStack ml="18.7rem">
                                                                <EditarUsuarioModal
                                                                    Nome={setNome}
                                                                    DDD={setDdd}
                                                                    Tel={setTelefone}
                                                                    DDD2={setDdd2}
                                                                    Tel2={setTelefoneAlternativo}
                                                                    Email1={setEmail}
                                                                    EmailAlternativo={setEmailalternativo}
                                                                    NumeroConselho1={setNumeroConselho}
                                                                    isOpen={isOpenEditarUsuarioModal}
                                                                    onClose={onCloseEditarUsuarioModal}
                                                                    idProfissional={idUsuario}
                                                                />
                                                            </HStack>
                                                        }
                                                    </Td>
                                                    <Td></Td>
                                                    <Td isNumeric>
                                                        <Button variant="unstyled">
                                                            <Icon
                                                                borderRadius="3rem"
                                                                bg={setColorRolesProfissionais(enderecoxpessoa.rolesid)}
                                                                as={BsCircle}
                                                                onClick={() => alteraRolesProfissionais(enderecoxpessoa.id, enderecoxpessoa.pessoaid)}
                                                            />
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td>Não há profissionais</Td>
                                                <Td></Td>
                                                <Td isNumeric></Td>
                                                <Td isNumeric></Td>
                                                <Td isNumeric></Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Stack>
                </Flex >
            </Flex >
        </>
    )
}
