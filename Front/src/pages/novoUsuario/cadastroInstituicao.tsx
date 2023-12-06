import { Box, Flex, Icon, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Input";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button as ButtonComponent } from '../../components/Button'
import { Stepper } from "../../components/Stepper";
import { AlertaModal } from "../../components/Modal/AlertaModal";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { usePessoa } from "../../hooks/usePessoa";
import api from "../../services/api";
import { useProfissao } from "../../hooks/useProfissao";

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


export function CadastroInstituicao() {

    const { onOpen, isOpen, onClose } = useDisclosure();
    const location = useLocation();
    const toast = useToast()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const { pessoa } = usePessoa();

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

    const token = localStorage.getItem('token');


    useEffect(() => {
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                var payloadToken = JSON.parse(atob(parts[1]));
                setPayload(payloadToken)
            } else {
                <h1>Token não validado</h1>
            }
        } else {
            <h1>Token não validado</h1>

        }
    }, [])

    const idUser = payload.nameid

    console.log(idUser)

    const { profissao } = useProfissao();

    const handleFormSubmit = async (event: FormEvent<HTMLInputElement>) => {

        event.preventDefault();

        setLoading(true)

        try {
            const unSaude: UnSaudeData = {
                Cnpj: cnpj,
                RazaoSocial: razaoSocial,
                NomeFantasia: nomeFantasia,
                //------------Verificar esse perfil está certo com idUser mesmo------------------//
                Perfilid: idUser,
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
                Pessoaid: idUser,
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

            navigate('/solicitacaocredenciamento')

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    console.log("Sua profissão é:", profissao)

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        const limitedValue = numericValue.slice(0, 8);
        setCEP(limitedValue);
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData('text/plain');
        const numericValue = pastedValue.replace(/[^0-9]/g, '');
        const limitedValue = numericValue.slice(0, 8);
        setCEP(limitedValue);
    }

    const veioDeGerenciarInstituicao = location.state && location.state === 'gerenciarinstituicao';


    console.log(profissao)

    return (
        <>
            {veioDeGerenciarInstituicao && < Stepper index={4} />}

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
                onSubmit={handleFormSubmit}
            >

                <Flex
                    direction="column"
                    w="50vw"
                >
                    <Flex>
                        <Text mt="-1" mb="4rem" fontSize="29">Cadastro da instituição</Text>
                    </Flex>

                    <Flex position="absolute">
                        {veioDeGerenciarInstituicao ? (
                            <Link to="/"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                        ) :
                            <Link to="/gerenciarInstituicao"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                        }
                    </Flex>

                    <Text mb="1rem" fontSize="22" fontWeight="bold"  >Instituição</Text>

                    <Box>
                        <SimpleGrid spacing="1rem" minChildWidth="240px">
                            <Input name="" label="CNPJ" value={cnpj} onChange={e => setCnpj(e.target.value)} isRequired />
                            <Input name="" label="Razão Social" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} isRequired />
                        </SimpleGrid>

                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input name="" label="Nome fantasia" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} isRequired />
                            <Input name="" label="Tipo instituição" value={tipInstituicao} onChange={e => setTipInstituicao(e.target.value)} isRequired />
                        </SimpleGrid>
                    </Box>

                    <Box w="40vw" mr="auto" ml="auto" mt="3rem" mb="3rem" borderBottomWidth={1}></Box>

                    <Flex>
                        <Text mb="1rem" fontSize="22" fontWeight="bold" >Endereço</Text>
                    </Flex>

                    <Box>
                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input isRequired type="number" name="" label="CEP" onBlur={checkCep} value={CEP} onPaste={handlePaste} onChange={handleInputChange} />
                            <Input name="" label="País" value={pais} onChange={e => setPais(e.target.value)} isRequired />
                        </SimpleGrid>

                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input name="" label="Estado" value={estado} onChange={e => setEstado(e.target.value)} isRequired />
                            <Input name="" label="Cidade" value={municipio} onChange={e => setMunicipio(e.target.value)} isRequired />
                        </SimpleGrid>

                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input name="" label="Bairro" value={jardim} onChange={e => setJardim(e.target.value)} isRequired />
                            <Input name="" label="Logradouro" value={rua} onChange={e => setRua(e.target.value)} isRequired />
                        </SimpleGrid>

                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input name="" label="Número" value={numero} onChange={e => setNumero(e.target.value)} isRequired />
                            <Input name="" label="Descrição do endereço" value={descricaoEndereco} onChange={e => setDescricaoEndereco(e.target.value)} isRequired />
                        </SimpleGrid>

                        <SimpleGrid mt="1rem" spacing="1rem" minChildWidth="240px">
                            <Input name="" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} isRequired />
                            <Input name="" label="Telefone alternativo" value={telefone2} onChange={e => setTelefone2(e.target.value)} isRequired />
                        </SimpleGrid>
                        <SimpleGrid mt="1rem" mb="2rem" spacing="1rem" minChildWidth="240px">
                            <Input w="49%" name="" label="Tipo endereço" value={tipoEndereco} onChange={e => setTipoEndereco(e.target.value)} isRequired />
                        </SimpleGrid>
                    </Box>
                </Flex>
                <AlertaModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />

                <ButtonComponent isLoading={loading}>Salvar</ButtonComponent>
            </Flex >

        </>
    )
}
