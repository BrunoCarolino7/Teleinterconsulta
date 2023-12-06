import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import api from "../../services/api";
import { Perfil } from "../Header/Perfil";

interface EditarUsuarioModalProps {
    isOpen: boolean;
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
    idProfissional: any;
    atualizaLista?: any;
}

export function EditarUsuarioModal(
    {
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
        idProfissional,
        atualizaLista
    }
        : EditarUsuarioModalProps) {

    const initialRef = useRef(null)
    const finalRef = useRef(null)

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


    const editarDados = async () => {

        try {
            setLoading(true)
            const response = await api.put(`usuario/editar/${idProfissional}`, {

                Nome: nomeCompleto,
                Ddd: parseInt(ddd, 10),
                Telefone: parseInt(telefone),
                Ddd2: parseInt(ddd2, 10),
                Telefone2: parseInt(telefone),
                Email: email,
                Emailalternativo: email2,
                Numeroconselho: parseInt(numeroConselho, 10),
            })

            if (response.status === 200) {

                setLoading(false)

                Nome(nomeCompleto)
                DDD(ddd)
                Tel(telefone)
                DDD2(ddd2)
                Tel2(telefone2)
                Email1(email)
                EmailAlternativo(email2)
                NumeroConselho1(numeroConselho)

                const pessoa = {
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

                // atualizaLista(pessoa);

                onClose();

                toast({
                    title: 'Dados alterados com sucesso!',
                    status: 'success',
                    duration: 2500,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Não foi possível alterar os dados!',
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size="2xl"
            >
                <ModalOverlay
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader fontSize="2xl">Editar dados</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
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
                            <Select isDisabled value={1} placeholder='Selecione'>
                                <option value={1}>Médico</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Número do conselho</FormLabel>
                            <Input value={numeroConselho} onChange={e => setNumeroConselho(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} onClick={editarDados} colorScheme='facebook' mr={3}>
                            Salvar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}