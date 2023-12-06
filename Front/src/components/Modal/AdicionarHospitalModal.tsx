import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import axios from "axios";
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Perfil } from "../Header/Perfil";

interface AdicionarHospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    atualizaLista: any;
}

type EnderecoxPessoa = {
    Enderecoid?: number | null;
    Pessoaid?: number;
    TipoProfissionalid?: any;
}

type UnSaudeData = {
    Cnpj: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Perfilid: any;
}

type TipoInstituicao = {
    Descricao: string;
}

type TipoEndereco = {
    Descricao: string;
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

export function AdicionarHospitalModal({ atualizaLista, isOpen, onClose }: AdicionarHospitalModalProps) {
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
    const [idUsuario, setIdUsuario] = useState(0);
    const [usuarioJaPertenceAoHospital, setUsuarioJaPertenceAoHospital] = useState(false);
    const token = localStorage.getItem('token');
    const [caminho, setCaminho] = useState<number | null>(null);
    const [idEndereco, setIdEndereco] = useState<number | null>(null);




    useEffect(() => {
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));
                setIdUsuario(Number(payloadToken.nameid))
            } else {
                console.log("Token não válido");
            }
        } else {
            console.log("Token não encontrado");
        }
    }, [token]);

    const buscaUnSaudeCadastrada = async () => {
        try {
            const response2 = await api.get(`usuario/obter/${idUsuario}`)
            const hospitais = response2.data.enderecoxpessoas.map((x: any) => x.endereco.unSaude.cnpj)

            const usuarioJaPertenceAoHospital = hospitais.some((hospitalCnpj: any) => hospitalCnpj === cnpj);

            if (usuarioJaPertenceAoHospital) {
                toast({
                    title: 'Instituição já cadastrada!',
                    status: 'info',
                    duration: 4000,
                    isClosable: true,
                });
                setUsuarioJaPertenceAoHospital(true);
            } else {
                const response = await api.get(`unsaude/obter/cnpj?cnpj=${cnpj}`)
                if (response.status && response.status === 204) {
                    setUsuarioJaPertenceAoHospital(false)
                    console.log("Não encontrado")
                    setCaminho(1);
                    //libera pra ele preencher dado por dado
                } else {
                    setUsuarioJaPertenceAoHospital(false)
                    console.log(response.data.enderecos[0])
                    let responseUnSaude = (response.data)
                    let responseEndereco = (response.data.enderecos[0])

                    setRazaoSocial(responseUnSaude.razaosocial)
                    setNomeFantasia(responseUnSaude.nomefantasia)

                    setIdEndereco(responseEndereco.id)
                    setCEP(responseEndereco.cep)
                    setPais(responseEndereco.pais)
                    setEstado(responseEndereco.estado)
                    setMunicipio(responseEndereco.cidade)
                    setJardim(responseEndereco.bairro)
                    setRua(responseEndereco.logradouro)
                    setNumero(responseEndereco.numero)
                    setDescricaoEndereco(responseEndereco.nome)
                    setTelefone(responseEndereco.telefone)
                    setTelefone2(responseEndereco.telefone2)
                    setTipoEndereco(responseEndereco.tipoEndereco)
                    setCaminho(2);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkCep = async () => {
        const ceps = CEP.replace(/[^0-9]/g, '');

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${ceps}/json/`);

            if (response.data.erro) {
                toast({
                    title: `CEP não encontrado`,
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                });
                setRua('');
                setJardim('');
                setMunicipio('');
                setPais('');
                setEstado('');
            } else {
                const { bairro, localidade, logradouro, uf } = response.data;
                setRua(logradouro);
                setJardim(bairro);
                setMunicipio(localidade);
                setCEP(ceps);
                setEstado(uf);
                setPais('Brasil');
            }
        } catch (error) {
            toast({
                title: `Necessário oito números`,
                status: 'warning',
                duration: 2500,
                isClosable: true,
            });
            setRua('');
            setJardim('');
            setMunicipio('');
            setEstado('');
            setPais('');
        }
    }

    const AdicionarHospital = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (caminho === 1) {
                const unSaude: UnSaudeData = {
                    Cnpj: cnpj,
                    RazaoSocial: razaoSocial,
                    NomeFantasia: nomeFantasia,
                    Perfilid: 2,
                }

                const tipoInstituicao: TipoInstituicao = {
                    Descricao: tipInstituicao
                }

                const tipEndereco: TipoEndereco = {
                    Descricao: tipoEndereco
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
                    Pessoaid: idUsuario,
                    TipoProfissionalid: 1
                }

                const requestBody = {
                    RegisterUnSaudeEnderecoViewModel: unSaude,
                    RegisterEnderecoViewModel: endereco,
                    RegisterTipoEnderecoViewModel: tipEndereco,
                    RegisterTipoUnSaudeViewModel: tipoInstituicao,
                    RegisterEnderecoXPessoaViewModel: enderecoxpessoa,
                }

                await api.post('unsaude/cadastrar', requestBody)
                atualizaLista()
                onClose()

            } else if (caminho === 2) {

                const enderecoxpessoa: EnderecoxPessoa = {
                    Enderecoid: idEndereco
                }

                const requestBody = {
                    RegisterEnderecoXPessoaViewModel: enderecoxpessoa
                }

                await api.post(`unsaude/cadastrar/existente/${idUsuario}`, requestBody)
                atualizaLista()
                onClose()
            }
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
                                <Input value={cnpj} onChange={e => setCnpj(e.target.value)} onBlur={buscaUnSaudeCadastrada} />
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
                                <Input value={CEP} onChange={e => setCEP(e.target.value)} onBlur={checkCep} />
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
                        <Button isDisabled={usuarioJaPertenceAoHospital} isLoading={loading} onClick={AdicionarHospital} colorScheme='facebook' mr={3}>
                            Salvar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}