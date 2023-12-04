import { Flex, HStack, Icon, PinInput, PinInputField, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { BsArrowLeft } from 'react-icons/bs'
import { Link, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { usePessoa } from "../hooks/usePessoa";
import api from "../services/api";


export function CheckTokenFoundCpf() {

    const navigate = useNavigate();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });
    const toast = useToast()
    const { handleSubmit, formState: { isSubmitting } } = useForm();
    const { settoken } = useParams();
    const [email, setEmail] = useState('');
    const [ddd, setDdd] = useState('');
    const [tel, setTel] = useState('');
    const [codigo, setCodigo] = useState('');
    const { pessoa } = usePessoa();
    const [loading, setLoading] = useState(false);

    const handleVerificaToken = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);
        try {
            const response = await api.post(`usuario/login`, {
                Cpf: pessoa.cpf,
                Codigo: codigo
            });

            if (response.status === 200) {
                const token = response.data.data;
                localStorage.setItem('token', token);
                console.log(token);
                navigate('/dashboard');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 406) {
                toast({
                    title: 'Código inválido!',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                navigate('/login');
                toast({
                    title: 'Código expirado!',
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* {isWideVersion && <Stepper index={1} />} */}
            <Flex
                as="form"
                h="60vh"
                px="6"
                justifyContent="center"
                flexDirection="column"
                align="center"
                onSubmit={handleVerificaToken}
            >
                <Flex
                    direction="column"
                    boxShadow="dark-lg"
                    bg="whiteAlpha.700"
                    w={["20rem", "30rem"]}
                    h={["25rem", "30rem"]}
                    p="2rem"
                    mt={["10rem", "4rem"]}
                    borderRadius="5"
                >
                    <Flex>
                        <Flex>
                            <Link to="/login"><Icon ml="-1rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                        </Flex>
                        <Flex align="center" ml={["3rem", "7rem"]}>
                            <Text mt={["-1", "-1"]} fontSize={["1.3rem", "1.5rem"]} fontWeight="bold"> Digite o token</Text>
                        </Flex>
                    </Flex>
                    <Flex
                        direction="column"
                        h="50rem"
                        justifyContent="center"
                    >

                        {settoken === '1' ? (
                            <>
                                <Text mt={["3rem", "5rem"]} align="center" fontSize={14}>O token foi enviado para o número:</Text>

                                <Text fontWeight="bold" align="center" fontSize={14}>{`(${ddd}) ${tel}`}</Text>
                            </>
                        ) :
                            <>
                                <Text mt={["3rem", "5rem"]} align="center" fontSize={14}>O token foi enviado para o email: </Text>
                                <Text fontWeight="bold" align="center" fontSize={14}>{pessoa.email}</Text>
                            </>
                        }

                        <Flex mb="auto" mt="auto">
                            <HStack m="auto">
                                <PinInput value={codigo} onChange={e => setCodigo(e)} type="alphanumeric" placeholder="" otp autoFocus >
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                        </Flex>
                        <Button isLoading={isSubmitting}>Validar</Button>
                    </Flex>

                </Flex>
            </Flex>
        </>
    );
}
