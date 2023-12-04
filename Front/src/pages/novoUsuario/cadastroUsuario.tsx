import { Flex, HStack, Icon, Select, Stack, Text, useBreakpointValue, useDisclosure, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Input";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NewModal } from "../../components/Modal/NewModal";
import { Button } from "../../components/Button";
import { Stepper } from "../../components/Stepper";
import { FormEvent, useState } from "react";
import { useProfissao } from "../../hooks/useProfissao";
import api from "../../services/api";

type PessoaModel = {
    Cpf?: string;
    Nome?: string;
    Ddd?: number;
    Telefone?: number;
    Ddd2?: number;
    Telefone2?: number;
    Email?: string;
    Emailalternativo?: string;
    Numeroconselho?: number;
}

export function CadastroUsuario() {

    const navigate = useNavigate();

    const toast = useToast()
    const location = useLocation();
    const { guardaProfissao } = useProfissao();
    const { settoken, ddd, cpfs, tel, email }: any = useParams();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });


    const [nome, setNome] = useState('');
    const [ddd2, setDdd2] = useState('');
    const [ddd1, setDdd1] = useState('');
    const [telefone1, setTelefone1] = useState('');
    const [tel2, setTel2] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [profissao, setProfissao] = useState(1);
    const [numeroconselho, setNumeroConselho] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);


    const vemDeChecktoken = location.state && location.state === 'checktoken'


    const handleButtonClick = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!vemDeChecktoken) {

            if (settoken === "2") {
                try {
                    const response = await api.put('usuario/editar', {
                        Cpf: cpfs,
                        Nome: nome,
                        Ddd: parseInt(ddd1, 10),
                        Telefone: parseInt(telefone1),
                        Ddd2: parseInt(ddd2, 10),
                        Telefone2: parseInt(tel2, 10),
                        Email: email,
                        Emailalternativo: email2,
                        Numeroconselho: parseInt(numeroconselho, 10),
                    });

                    guardaProfissao(profissao);
                    const token = response.data.data;
                    localStorage.setItem('token', token)
                    navigate('/homecnpj')

                } catch (error) {
                    toast({
                        title: "Erro",
                        description: "Usuário já cadastrado",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                try {
                    const response = await api.put('usuario/editar', {
                        Cpf: cpfs,
                        Nome: nome,
                        Ddd: parseInt(ddd, 10),
                        Telefone: parseInt(tel),
                        Ddd2: parseInt(ddd2, 10),
                        Telefone2: parseInt(tel2, 10),
                        Email: email1,
                        Emailalternativo: email2,
                        Numeroconselho: parseInt(numeroconselho, 10),
                    });

                    guardaProfissao(profissao);
                    const token = response.data.data;
                    localStorage.setItem('token', token)
                    navigate('/homecnpj')

                } catch (error) {
                    toast({
                        title: "Erro",
                        description: "Usuário já cadastrado",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } finally {
                    setIsSubmitting(false);
                }
            }
        } else {
            if (settoken === "2") {
                try {
                    const response = await api.post('usuario/editar', {
                        Cpf: cpfs,
                        Nome: nome,
                        Ddd: parseInt(ddd1, 10),
                        Telefone: parseInt(telefone1),
                        Ddd2: parseInt(ddd2, 10),
                        Telefone2: parseInt(tel2, 10),
                        Email: email,
                        Emailalternativo: email2,
                        Numeroconselho: parseInt(numeroconselho, 10),
                    });

                    guardaProfissao(profissao);
                    const token = response.data.data;
                    localStorage.setItem('token', token)
                    navigate('/homecnpj')

                } catch (error) {
                    toast({
                        title: "Erro",
                        description: "Usuário já cadastrado",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                try {
                    const response = await api.post('usuario/editar', {
                        Cpf: cpfs,
                        Nome: nome,
                        Ddd: parseInt(ddd, 10),
                        Telefone: parseInt(tel),
                        Ddd2: parseInt(ddd2, 10),
                        Telefone2: parseInt(tel2, 10),
                        Email: email1,
                        Emailalternativo: email2,
                        Numeroconselho: parseInt(numeroconselho, 10),
                    });

                    guardaProfissao(profissao);
                    const token = response.data.data;
                    localStorage.setItem('token', token)
                    navigate('/homecnpj')

                } catch (error) {
                    toast({
                        title: "Erro",
                        description: "Usuário já cadastrado",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } finally {
                    setIsSubmitting(false);
                }
            }

        }

    };

    const handleProfissao = (e: any) => {
        setProfissao(e.target.value);
    }

    if (isWideVersion) {
        return (
            <>
                <Stepper index={2} />

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
                        h="53rem"
                        w="40vw"
                        px="5rem"
                        direction="column"
                        boxShadow="md"
                        bg="whiteAlpha.700"
                        borderRadius="5"
                        mb="2rem"
                        onSubmit={handleButtonClick}
                    >
                        <Flex position="absolute">
                            <Link to="/"><Icon ml="-4rem" mt="2.3rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                        </Flex>

                        <Stack>
                            <Text mb="1.5rem" mt="2rem" fontSize="29">Cadastro de usuário</Text>
                        </Stack>

                        <Stack >

                            <Input name="" type="number" size="md" label="CPF" value={cpfs} />
                            <Input name="" size="md" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} isRequired />
                            <HStack>
                                {settoken === "1" ?
                                    <>
                                        <Input name="" maxLength={2} type="number" w="5rem" size="md" label="DDD" value={ddd} isRequired />
                                        <Input name="" maxLength={9} type="number" w="32rem" size="md" value={tel} label="Telefone" isRequired />
                                    </>
                                    :
                                    <>
                                        <Input name="" maxLength={2} type="number" w="5rem" size="md" label="DDD" value={ddd1} onChange={e => setDdd1(e.target.value)} isRequired />
                                        <Input name="" maxLength={9} type="number" w="32rem" size="md" value={telefone1} label="Telefone" onChange={e => setTelefone1(e.target.value)} isRequired />
                                    </>
                                }
                            </HStack>

                            <HStack>
                                <Input name="" maxLength={2} w="20" placeholder="" label="DDD" value={ddd2} onChange={(e) => setDdd2(e.target.value)} isRequired />
                                <Input name="" maxLength={9} w="32rem" size="md" label="Telefone alternativo" value={tel2} onChange={(e) => setTel2(e.target.value)} isRequired />
                                <CustomCard label="Telefone para recuperação do token" marginBoxLeft={248} marginBoxBottom={12} marginLabelLeft={5} marginLabelBottom={0} />
                            </HStack>
                            {settoken === "2" ?
                                <Input name="" size="md" type="email" label="Email pessoal" value={email} isRequired />
                                :
                                <Input name="" size="md" type="email" label="Email pessoal" value={email1} isRequired onChange={e => setEmail1(e.target.value)} />
                            }
                            <HStack>
                                <Input name="" size="md" type="email" label="Email alternativo" value={email2} onChange={e => setEmail2(e.target.value)} isRequired />
                                <CustomCard label="Email para recuperação do token" marginBoxLeft={130} marginBoxBottom={12} marginLabelLeft={5} marginLabelBottom={0} />
                            </HStack>
                            <HStack >
                                <Text position="absolute" mb="7">Profissão</Text>
                                <Select isDisabled value={1} onChange={handleProfissao} w="14rem" mt="3rem" placeholder='Selecione'>
                                    <option value={1}>Médico</option>
                                </Select>
                                <Input name="" type="number" size="md" label="Número do conselho de classe" value={numeroconselho} onChange={(e) => setNumeroConselho(e.target.value)} />
                            </HStack>
                        </Stack>

                        <Button isLoading={isSubmitting}>Salvar</Button>
                    </Flex>
                </Flex>
            </>
        )
    }

    return (
        <></>
        // <>
        //     <Header />

        //     <Flex
        //         //bg="blue"
        //         mx="auto"
        //         px="4"
        //     // onSubmit={handleSubmit(handleInput)}
        //     >
        //         <Flex
        //             as="form"
        //             my="2rem"
        //             px="4"
        //             pb="6"
        //             direction="column"
        //             boxShadow="md"
        //             bg="whiteAlpha.700"
        //             borderRadius="5"
        //         >
        //             <Stack>
        //                 <Text mb="1.5rem" mt="2rem" fontSize={["25", "29"]}>Cadastro de usuário</Text>
        //             </Stack>

        //             <Stack >
        //                 <Input type="number" size="md" label="CPF" {...("CPF")} error={errors.CPF} />
        //                 <Input size="md" label="Nome"  {...("Nome")} error={errors.Nome} />
        //                 <HStack >
        //                     <Input type="number" size="md" label="DDD"  {...("DDD")} error={errors.DDD} />
        //                     <Input w="150" type="number" size="md" label="Telefone"  {...("Telefone")} error={errors.Telefone} />
        //                 </HStack>
        //                 <HStack>
        //                     <Input type="number" size="md" label="DDD"  {...("DDD2")} error={errors.DDD2} />
        //                     <Input w="150" type="number" size="md" label="Telefone alternativo"  {...("TelefoneAlternativo")} error={errors.TelefoneAlternativo} />
        //                 </HStack>
        //                 <Input size="md" label="Email pessoal"  {...("Email")} error={errors.Email} />
        //                 <HStack>
        //                     <Input size="md" label="Email alternativo"  {...("EmailAlternativo")} error={errors.EmailAlternativo} />
        //                 </HStack>
        //                 <HStack>
        //                     <Text position="absolute" mb="7">Profissão</Text>
        //                     {/* <Select borderColor={errors.profissao ? 'red' : 'gray'} value={profissao} {...('profissao', { onChange: (e) => handleProfissao(e) })} w="14rem" mt="3rem" placeholder='Selecione'>
        //                         <option value='Enfermeiro'>Enfermeiro</option>
        //                         <option value='Médico'>Médico</option>
        //                         <option value='Nutricionista'>Nutricionista</option>
        //                     </Select> */}
        //                     <Input type="number" size="md" label="Número conselho classe"  {...("NumeroConselho")} error={errors.NumeroConselho} />
        //                 </HStack>
        //             </Stack>
        //             <Button isLoading={isSubmitting} >Salvar</Button>
        //             <NewModal isOpen={isOpen} onClose={onClose} />
        //         </Flex>
        //     </Flex>        
    )
}

