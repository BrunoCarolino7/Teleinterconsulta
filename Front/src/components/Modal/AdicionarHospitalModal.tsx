import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Perfil } from "../Header/Perfil";

interface AdicionarHospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type UnSaudeData = {
    Cnpj: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Perfilid: any;
}

type TipoInstituicao = {
    descricao: string;
}

type TipoEndereco = {
    descricao: string;
}

type Endereco = {
    Cep: string;
    Pais: string;
    Estado: string;
    Cidade: string;
    Bairro: string
    Logradouro: string
    Numero: string;
    Nome: string;
    Telefone: string;
    TelefoneAlternativo: string;
}

type EnderecoxPessoa = {
    Pessoaid: number;
    TipoProfissionalid: any;
}

export function AdicionarHospitalModal({ isOpen, onClose }: AdicionarHospitalModalProps) {

    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [tipInstituicao, setTipInstituicao] = useState('');
    const [CEP, setCEP] = useState('');
    const [pais, setPais] = useState('');
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [jardim, setJardim] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [descricaoEndereco, setDescricaoEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [tipoEndereco, setTipoEndereco] = useState('');
    const [payload, setPayload] = useState<any>('');
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


    const AdicionarHospital = async (e: FormEvent) => {

        e.preventDefault();

        setLoading(true)

        try {
            const unSaude: UnSaudeData = {
                Cnpj: cnpj,
                RazaoSocial: razaoSocial,
                NomeFantasia: nomeFantasia,
                Perfilid: 2,
            }

            const tipoInstituicao: TipoInstituicao = {
                descricao: tipInstituicao
            }

            const tipEndereco: TipoEndereco = {
                descricao: tipoEndereco
            }

            const endereco: Endereco = {
                Cep: CEP,
                Pais: pais,
                Estado: estado,
                Cidade: municipio,
                Bairro: jardim,
                Logradouro: rua,
                Numero: numero,
                Nome: descricaoEndereco,
                Telefone: telefone,
                TelefoneAlternativo: telefone2,
            }

            const enderecoxpessoa: EnderecoxPessoa = {
                Pessoaid: 1,
                TipoProfissionalid: 1
            }

            const requestBody = {
                RegisterUnSaudeEnderecoViewModel: unSaude,
                RegisterEnderecoViewModel: endereco,
                RegisterTipoEnderecoViewModel: tipEndereco,
                RegisterTipoUnSaudeViewModel: tipoInstituicao,
                RegisterEnderecoXPessoaViewModel: enderecoxpessoa,
            }

            //await api.post('https://localhost:7092/unsaude/cadastrar', requestBody)            

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="5xl"
            >
                <ModalOverlay
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader fontSize="2xl">Adicionar Instituição</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mt={4}>
                            <HStack spacing="27.6rem">
                                <FormLabel>CNPJ</FormLabel>
                                <FormLabel>Razão Social</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={cnpj} onChange={e => setCnpj(e.target.value)} />
                                <Input value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing="23.6rem">
                                <FormLabel>Nome fantasia</FormLabel>
                                <FormLabel>Tipo Instituição</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
                                <Input value={tipInstituicao} onChange={e => setTipInstituicao(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing="28.6rem">
                                <FormLabel>CEP</FormLabel>
                                <FormLabel>País</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={CEP} onChange={e => setCEP(e.target.value)} />
                                <Input value={pais} onChange={e => setPais(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing="27.3rem">
                                <FormLabel>Estado</FormLabel>
                                <FormLabel>Cidade</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={estado} onChange={e => setEstado(e.target.value)} />
                                <Input value={municipio} onChange={e => setMunicipio(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing="27.8rem">
                                <FormLabel>Bairro</FormLabel>
                                <FormLabel>Logradouro</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={jardim} onChange={e => setJardim(e.target.value)} />
                                <Input value={rua} onChange={e => setRua(e.target.value)} />
                            </HStack>
                        </FormControl>


                        <FormControl mt={4}>
                            <HStack spacing="26.8rem">
                                <FormLabel>Número</FormLabel>
                                <FormLabel>Descrição do endereço</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={numero} onChange={e => setNumero(e.target.value)} />
                                <Input value={descricaoEndereco} onChange={e => setDescricaoEndereco(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <HStack spacing="26.5rem">
                                <FormLabel>Telefone</FormLabel>
                                <FormLabel>Telefone Alternativo</FormLabel>
                            </HStack>
                            <HStack>
                                <Input value={telefone} onChange={e => setTelefone(e.target.value)} />
                                <Input value={telefone2} onChange={e => setTelefone2(e.target.value)} />
                            </HStack>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Tipo endereço</FormLabel>
                            <Input w="30.2rem" value={tipoEndereco} onChange={e => setTipoEndereco(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading} onClick={AdicionarHospital} colorScheme='facebook' mr={3}>
                            Salvar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}