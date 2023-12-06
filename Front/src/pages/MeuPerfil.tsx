import { Avatar, Button as ButtonChakra, Flex, HStack, Icon, Select, Stack, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Input } from "../components/Input";
import { CustomCard } from "../components/CustomCard/CustomCard";
import { Button } from "../components/Button";
import { NewModal } from "../components/Modal/NewModal";
import { SideBar } from "../components/SideBar";
import api from "../services/api";
import { AlertaModal } from "../components/Modal/AlertaModal";
import { UploadModal } from "../components/Modal/UploadModal";
import { TfiClip } from "react-icons/tfi";
import { EditarUsuarioModal } from "../components/Modal/EditarUsuarioModal";


export function MeuPerfil() {

    const Navigate = useNavigate();

    const { onOpen, isOpen, onClose } = useDisclosure();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const [profissao, setProfissao] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [ddd, setDdd] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ddd2, setDdd2] = useState('');
    const [email, setEmail] = useState('');
    const [emailalternativo, setEmailalternativo] = useState('');
    const [numeroConselho, setNumeroConselho] = useState('');
    const [telefone2, setTelefoneAlternativo] = useState('');
    const [tipoProfissional] = useState('Médico');

    const handleInput = async () => {
        Navigate('/homecnpj')
    }

    const handleProfissao = (e: ChangeEvent<HTMLInputElement>) => {
        setProfissao(e.target.value);
    }

    const handleOpenModal = () => {
        onOpen();
    }

    const handleCloseModal = () => {
        onClose();
    }

    const token = localStorage.getItem('token');
    useEffect(() => {

        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                const userId = payloadToken.nameid
                console.log(payloadToken)

                if (userId) {
                    const getUnSaudeUsuario = async () => {
                        try {
                            const response = await api.get(`usuario/obter/meuperfil/${userId}`)

                            setCpf(response.data.cpf)
                            setNome(response.data.nome)
                            setDdd(response.data.ddd)
                            setTelefone(response.data.telefone)
                            setDdd2(response.data.ddd2)
                            setTelefoneAlternativo(response.data.telefone2)
                            setEmail(response.data.email)
                            setEmailalternativo(response.data.emailalternativo)
                            setNumeroConselho(response.data.numeroconselho)

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

    console.log(tipoProfissional)

    if (isWideVersion) {
        return (
            <Flex>
                <SideBar marginTop="2rem" />

                <Flex
                    //bg="blue"
                    w="40vw"
                    h="100vh"
                    m="auto"
                    justifyContent="center"
                >
                    <Flex
                        as="form"
                        mt="2rem"
                        mr="21rem"
                        h="53rem"
                        w="40vw"
                        px="5rem"
                        direction="column"
                        boxShadow="md"
                        bg="whiteAlpha.700"
                        borderRadius="5"
                    >
                        <Flex position="absolute">
                            <ButtonChakra ml="-8" variant="unstyled" onClick={() => Navigate(-1)}><Icon ml="-4rem" mt="2.3rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></ButtonChakra>
                        </Flex>

                        <Stack>
                            <Text mb="1.5rem" mt="2rem" fontSize="29">Meu perfil</Text>
                        </Stack>

                        <Avatar position="absolute" ml="30rem" mt="5.5rem" size="2xl" src='https://bit.ly/code-beast' />{' '}

                        <Stack >
                            <Input name="" type="number" w="450px" size="md" label="CPF" value={cpf} />
                            <Input name="" size="md" label="Nome" value={nome} />
                            <HStack>
                                <Input name="" type="number" w="5rem" size="md" label="DDD" value={ddd} />
                                <Input name="" type="number" w="32rem" size="md" label="Telefone" value={telefone} />
                            </HStack>

                            <HStack>
                                <Input name="" maxLength={2} w="20" placeholder="" label="DDD" value={ddd2} />
                                <Input name="" maxLength={9} w="32rem" size="md" label="Telefone alternativo" value={telefone2} />
                                <CustomCard label="Telefone para recuperação do token" marginBoxLeft={248} marginBoxBottom={12} marginLabelLeft={5} marginLabelBottom={0} />
                            </HStack>

                            <Input name="" size="md" label="Email pessoal" value={email} />

                            <HStack>
                                <Input name="" size="md" label="Email alternativo" value={emailalternativo} />
                                <CustomCard label="Email para recuperação do token" marginBoxLeft={130} marginBoxBottom={12} marginLabelLeft={5} marginLabelBottom={0} />
                            </HStack>
                            <HStack >
                                <Input name="" type="text" size="md" label="Profissão" isDisabled value={tipoProfissional} />
                                <Input name="" type="number" size="md" label="Número do conselho de classe" value={numeroConselho} />
                            </HStack>
                        </Stack>
                        <Button
                            onClick={(e: FormEvent) => { e.preventDefault(); handleOpenModal(); }}
                        >
                            <EditarUsuarioModal
                                Nome={setNome}
                                DDD={setDdd}
                                Tel={setTelefone}
                                DDD2={setDdd2}
                                Tel2={setTelefoneAlternativo}
                                Email1={setEmail}
                                EmailAlternativo={setEmailalternativo}
                                NumeroConselho1={setNumeroConselho}
                                isOpen={isOpen}
                                onClose={handleCloseModal}
                                idProfissional={0}
                            />
                            Editar
                        </Button>

                    </Flex>
                </Flex >
            </Flex>
        )
    }

    return (
        <>
            <Flex
                //bg="blue"
                mx="auto"
                px="4"
                onSubmit={handleInput}
            >
                <Flex
                    as="form"
                    my="2rem"
                    px="4"
                    pb="6"
                    direction="column"
                    boxShadow="md"
                    bg="whiteAlpha.700"
                    borderRadius="5"
                >
                    <Stack>
                        <Text mb="1.5rem" mt="2rem" fontSize={["25", "29"]}>Cadastro de usuário</Text>
                    </Stack>

                    <Stack >
                        <Input name="" type="number" size="md" label="CPF" />
                        <Input name="" size="md" label="Nome" />
                        <HStack >
                            <Input name="" type="number" size="md" label="DDD" />
                            <Input name="" w="150" type="number" size="md" label="Telefone" />
                        </HStack>
                        <HStack>
                            <Input name="" type="number" size="md" label="DDD" />
                            <Input name="" w="150" type="number" size="md" label="Telefone alternativo" />
                        </HStack>
                        <Input name="" size="md" label="Email pessoal" />
                        <HStack>
                            <Input name="" size="md" label="Email alternativo" />
                        </HStack>
                        <HStack>
                            <Text position="absolute" mb="7">Profissão</Text>
                            <Select value={profissao} w="14rem" mt="3rem" placeholder='Selecione'>
                                <option value='Enfermeiro'>Enfermeiro</option>
                                <option value='Médico'>Médico</option>
                                <option value='Nutricionista'>Nutricionista</option>
                            </Select>
                            <Input name="" type="number" size="md" label="Número conselho classe" />
                        </HStack>
                    </Stack>
                    <Button>Salvar</Button>
                    <NewModal isOpen={isOpen} onClose={onClose} />
                </Flex>
            </Flex>
        </>
    )
}

