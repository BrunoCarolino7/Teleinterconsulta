import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import api from "../../services/api";
import { Perfil } from "../Header/Perfil";

interface AdicionarUsuarioModalProps {
    isOpen: boolean;
    Cpf: any;
    Nome: any;
    Perfil?: any;
    onClose: () => void;
    DDD: any;
    Tel: any;
    DDD2: any;
    Tel2: any;
    Email1: any;
    EmailAlternativo: any;
    NumeroConselho1: any;
    atualizaLista: any;
    idEndereco: number;
}

type Pessoa = {
    Cpf: string;
    Nome: string;
    Ddd: number;
    Telefone: number;
    Ddd2: number;
    Telefone2: number;
    Email: string;
    Emailalternativo: string;
    Numeroconselho: number;
}

type EnderecoxPessoa = {
    Enderecoid: number;
    TipoProfissionalid: number;
}

export function AdicionarUsuarioModalProps(
    {
        Cpf,
        Nome,
        Tel,
        DDD,
        DDD2,
        Tel2,
        Email1,
        EmailAlternativo,
        NumeroConselho1,
        isOpen,
        onClose,
        atualizaLista,
        idEndereco
    }
        : AdicionarUsuarioModalProps) {

    const toast = useToast()


    const [cpf, setCpf] = useState('')
    const [nomeCompleto, setNomeCompleto] = useState('')
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')
    const [ddd2, setDdd2] = useState('')
    const [telefone2, setTelefone2] = useState('')
    const [email, setEmail] = useState('')
    const [email2, setEmail2] = useState('')
    const [profissao, setProfissao] = useState('')
    const [numeroConselho, setNumeroConselho] = useState('')
    const [loading, setLoading] = useState(false)

    const [id, setId] = useState('')

    const token = localStorage.getItem('Token');

    useEffect(() => {
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                setId(payloadToken.nameid)
                console.log(payloadToken)

            } else {
                console.log("Token não válido");
            }
        } else {
            console.log("Token não encontrado");
        }
    }, []);

    const procurarUsuario = async () => {
        const response = await api.post(`usuario/obter/cpf`, {
            Cpf: cpf
        })

        if (response.status === 200) {
            const { nome, ddd, ddd2, email, emailalternativo, numeroconselho, telefone, telefone2 } = response.data
            setNomeCompleto(nome)
            setDdd(ddd)
            setTelefone(telefone)
            setDdd2(ddd2)
            setTelefone2(telefone2)
            setEmail(email)
            setEmail2(emailalternativo)
            setNumeroConselho(numeroconselho)
        }
    }


    const AdicionarUsuario = async () => {

        try {
            setLoading(true)

            const pessoa: Pessoa = {
                Cpf: cpf,
                Nome: nomeCompleto,
                Ddd: parseInt(ddd, 10),
                Telefone: parseInt(telefone),
                Ddd2: parseInt(ddd2, 10),
                Telefone2: parseInt(telefone),
                Email: email,
                Emailalternativo: email2,
                Numeroconselho: parseInt(numeroConselho, 10),
            }

            const enderecoxPessoa: EnderecoxPessoa = {
                Enderecoid: idEndereco,
                TipoProfissionalid: 1,
            }

            const RequestyBody = {
                RegisterPessoaViewModel: pessoa,
                RegisterEnderecoXPessoaViewModel: enderecoxPessoa,
            }

            await api.post(`unsaude/cadastrar/pessoa`, RequestyBody)

            atualizaLista(pessoa);

            onClose();

            toast({
                title: 'Usuário adicionado com sucesso!',
                status: 'success',
                duration: 2500,
                isClosable: true,
            })

        } catch (error) {
            toast({
                title: 'Erro ao adicionar usuario!',
                status: 'error',
                duration: 2500,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="2xl"
            >
                <ModalOverlay
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader fontSize="2xl">Adicionar usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <FormControl mb="4">
                            <FormLabel>CPF</FormLabel>
                            <Input value={cpf} onChange={e => setCpf(e.target.value)} onBlur={procurarUsuario} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nome completo</FormLabel>
                            <Input value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing={8}>
                                <FormLabel>DDD</FormLabel>
                                <FormLabel>Telefone</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={ddd} onChange={e => setDdd(e.target.value)} w="20" />
                                <Input value={telefone} onChange={e => setTelefone(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing={8}>
                                <FormLabel>DDD</FormLabel>
                                <FormLabel>Telefone Alternativo</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={ddd2} onChange={e => setDdd2(e.target.value)} w="20" />
                                <Input value={telefone2} onChange={e => setTelefone2(e.target.value)} />
                            </HStack>
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>Email pessoal</FormLabel>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email alternativo</FormLabel>
                            <Input value={email2} onChange={e => setEmail2(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Profissão</FormLabel>
                            <Select isDisabled value={1} placeholder='Selecione' onChange={e => setProfissao(e.target.value)}>
                                <option value={1}>Médico</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Número do conselho</FormLabel>
                            <Input value={numeroConselho} onChange={e => setNumeroConselho(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} onClick={AdicionarUsuario} colorScheme='facebook' mr={3}>
                            Salvar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}