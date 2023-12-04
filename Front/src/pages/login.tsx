import { Flex, Text, Stack, Checkbox, HStack, Button, RadioGroup, Radio, useBreakpointValue, useToast } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useState } from "react";
import { Button as ButtonComponent } from "../components/Button"
import { useNavigate } from 'react-router-dom';

import { Input } from "../components/Input";
import { usePessoa } from "../hooks/usePessoa";
import api from "../services/api";
import axios from "axios";

type handleInputData = {
    cpf?: string;
    settoken: string;
    nome?: string;
}

export function Login() {
    //#region
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const navigate = useNavigate();
    const [settoken, setSettoken] = useState('');
    const {salvaDadosPessoa, pessoa} = usePessoa();

    const [loading, setLoading] = useState(false);
    const [cpfs, setCpfs] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');
    const [showTokenOptions, setShowTokenOptions] = useState(true);
    const handleShowTokenOptions = () => setShowTokenOptions(!showTokenOptions);
    const toast = useToast()


    const changeCpfs = (e: ChangeEvent<HTMLInputElement>) => {
        setCpfs(e.target.value)
    }

    const changeSetToken = (e: ChangeEvent<HTMLInputElement>) => {
        setSettoken(e.target.value)
    }

    const handleChange = async (value: any) => {
        setSelectedOption(value);
    };   


    const efetuarLogin = async (event: FormEvent) => {
        event.preventDefault();

        function calcularSomaPonderada(cpf: number[], start: number, end: number): number {
            let sum = 0;
            for (let i = start; i < end; i++) {
                sum += cpf[i] * (end + 1 - i);
            }
            return sum;
        }

        function calcularResto(cpf: number[], end: number): number {
            const sum = calcularSomaPonderada(cpf, 0, end);
            return (sum * 10) % 11;
        }

        function validarDigitos(cpf: number[], index: number): boolean {
            const resto = calcularResto(cpf, index);
            return resto < 10 ? cpf[index] === resto : cpf[index] === 0;
        }

        function validarRepeticao(cpf: number[]): boolean {
            const primeiro = cpf[0];
            return cpf.slice(1).some(digito => digito !== primeiro);
        }

        function validarCpf(cpf: number[]): boolean {
            if (cpf.length !== 11 || !validarRepeticao(cpf)) {
                return false;
            }

            const primeiroDigitoValido = validarDigitos(cpf, 9);
            const segundoDigitoValido = validarDigitos(cpf, 10);

            return primeiroDigitoValido && segundoDigitoValido;
        }

        const cpfNumerico = cpfs.split("").map(Number);
        const cpfValido = validarCpf(cpfNumerico);        
     

        if (settoken) {
            if (cpfValido) {
                setLoading(true);

                try {
                    const response = await api.post('usuario/login', {
                        Cpf: cpfs,
                        UsuarioId: null
                    });                    
                    salvaDadosPessoa(response.data);
                
                    if (response.status === 201) {                        
                        navigate(`/checktokenfoundcpf/${settoken}`);
                    }
                } catch (error: any) {
                    if (error.response && error.response.status === 404) {
                        navigate(`/cadastroTelEmailToken/${cpfs}/${settoken}`);
                    }
                } finally {
                    setLoading(false);
                }
                
            } else {
                toast({
                    title: 'Digite um Cpf válido',
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: 'Selecione onde receber o token',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Flex
                p="6"
                w="100vw"
                h="76vh"
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    justifyContent="center"
                    w={["23rem", "30rem"]}
                    //bg="green"
                    mb={["500", "550"]}
                    position="absolute"
                    borderBottomWidth={1}
                    borderBottomColor="gray.100"
                    >      
                    <Text color="gray.400" fontSize="30">Sistema Teleinterconsulta</Text>
                </Flex>

                <Flex
                    as="form"
                    flexDirection="column"
                    w={[450, 480]}
                    h={[240, 280]}
                    bg="whiteAlpha.700"
                    boxShadow="dark-lg"
                    px="6"
                    pt="3"
                    borderRadius={8}
                    onSubmit={efetuarLogin}
                >
                    {isWideVersion ? (
                        <Stack>
                            <Input name="" type="number" label="CPF" placeholder="Digite seu Cpf" value={cpfs} onChange={e => setCpfs(e.target.value)} />
                            {showTokenOptions ?
                                // <FormControl isInvalid={errors.settoken !== undefined}>
                                <HStack mt="0.5" mb="22px">
                                    <HStack>
                                        <Text fontSize="sm">Receber Token: </Text>
                                        <Stack direction='row'>
                                            <Checkbox
                                                isChecked={settoken === "1"}
                                                onChange={() => setSettoken("1")}
                                                value="1"
                                                size="sm"
                                            >Sms
                                            </Checkbox>
                                            <Checkbox
                                                value="2"
                                                isChecked={settoken === "2"}
                                                onChange={() => setSettoken("2")}
                                                size="sm"
                                            >Email
                                            </Checkbox>
                                        </Stack>
                                        {/* {errors.settoken && (
                                                <FormErrorMessage position="absolute" mt="10">{errors.settoken.message}</FormErrorMessage>
                                            )} */}
                                    </HStack>
                                    <HStack ml="auto">
                                        <Button fontWeight="normal" variant='unstyled' onClick={handleShowTokenOptions}>
                                            <Text _hover={{ textDecoration: 'underline', cursor: 'pointer' }} fontSize="13">Alterar onde receber token ?</Text>
                                        </Button>
                                    </HStack>
                                </HStack>
                                // </FormControl>

                                :
                                <Stack mt="11px" >
                                    <HStack spacing="4">
                                        <HStack>
                                            <Text fontSize="14">Enviar token para:</Text>
                                        </HStack>
                                        <HStack>
                                            <Checkbox
                                                value="tel1"
                                                onChange={() => handleChange("tel1")}
                                                isChecked={selectedOption === "tel1"}
                                                size="sm"
                                            >Nº principal
                                            </Checkbox>

                                            <Checkbox
                                                value="tel2"
                                                onChange={() => handleChange("tel2")}
                                                isChecked={selectedOption === "tel2"}
                                                size="sm"
                                            >Nº alternativo
                                            </Checkbox>

                                            <Checkbox
                                                value="email"
                                                onChange={() => handleChange("email")}
                                                isChecked={selectedOption === "email"}
                                                size="sm"
                                            >Email
                                            </Checkbox>
                                        </HStack>
                                    </HStack>
                                    <Button mx="auto" w="15%" mb="-4" fontWeight="normal" variant='unstyled' onClick={handleShowTokenOptions}>
                                        <Text _hover={{ textDecoration: 'underline', cursor: 'pointer' }} fontSize="13">Voltar</Text>
                                    </Button>
                                </Stack>
                            }

                            <ButtonComponent
                                onClick={() => efetuarLogin}
                                isLoading={loading}

                            >
                                Entrar
                            </ButtonComponent>
                        </Stack>
                    ) :
                        <Stack>
                            <Input name="" type="number" label="CPF" placeholder="Digite seu Cpf" value={cpfs} onChange={e => setCpfs(e.target.value)} />
                            {showTokenOptions ?
                                <Stack pt="1rem" pr="1">
                                    <HStack mt="-0.2rem" spacing="0.5rem" >
                                        <Text fontSize="sm">Receber Token: </Text>
                                        <RadioGroup onChange={setSettoken} value={settoken}>
                                            <Stack direction='row'>
                                                <Radio value='1' size="sm">Sms</Radio>
                                                <Radio value='2' size="sm">Email</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </HStack>
                                    <HStack mt="-0.5rem" ml="auto">
                                        <Button fontWeight="normal" variant='unstyled' onClick={handleShowTokenOptions}>
                                            <Text _hover={{ textDecoration: 'underline', cursor: 'pointer' }} fontSize="13">Trocar celular</Text>
                                        </Button>
                                    </HStack>
                                </Stack>
                                :
                                <>
                                    <HStack mt="-0.2rem" spacing="0.5rem" pt="1rem" pr="1">
                                        <HStack >
                                            <Text fontSize="14">Enviar token para:</Text>
                                        </HStack>
                                        <HStack>
                                            <Checkbox
                                                value="option1"
                                                onChange={() => handleChange("option1")}
                                                isChecked={selectedOption === "option1"}
                                                size="sm"
                                            >Tel 1
                                            </Checkbox>

                                            <Checkbox
                                                value="option2"
                                                onChange={() => handleChange("option2")}
                                                isChecked={selectedOption === "option2"}
                                                size="sm"
                                            >Tel 2
                                            </Checkbox>

                                            <Checkbox
                                                value="option3"
                                                onChange={() => handleChange("option3")}
                                                isChecked={selectedOption === "option3"}
                                                size="sm"
                                            >Email
                                            </Checkbox>

                                        </HStack>
                                    </HStack>
                                    <Stack mt="-0.5rem" ml="auto">
                                        <Button fontWeight="normal" variant='unstyled' onClick={handleShowTokenOptions}>
                                            <Text _hover={{ textDecoration: 'underline', cursor: 'pointer' }} fontSize="13">Voltar</Text>
                                        </Button>
                                    </Stack>
                                </>
                            }

                            <Button
                                _hover={{ bg: "#385898b5" }}
                                color="white"
                                bg="facebook.100"
                                mx="auto"
                                w="10rem"
                                isLoading={loading}
                            >
                                Entrar
                            </Button>
                        </Stack>
                    }
                </Flex>
            </Flex >

            <Flex
                as="footer"
                justifyContent="center"
                alignSelf="center"
                bg="facebook.100"
                px="4"
                mt={["0.8rem", "1.3rem"]}
                pt={["1rem", "0.6rem"]}
                pb={["1rem", "0.6rem"]}
            >
                <Text p="4" textAlign="center" fontSize="14" color="white">® Todos os Direitos Reservados. Instituto da Criança e do Adolescente</Text>
            </Flex>
        </>
    )
}

 // const { register, handleSubmit, formState } = useForm<SignInData>();

    // const handleSignIn = async (data: SignInData) => (

    //     await new Promise(resolver => setTimeout(resolver, 2000)),
    //     formState.isSubmitting,
    //     console.log(data)
    // );


    // using System.Net.Mail;

    // class Program
    // {
    //     static void Main()
    //     {
    //         try
    //         {
    //             MailMessage mail = new MailMessage();
    //             SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
    //             string meuEmail = "lopesb073@gmail.com";
    //             string meuPassword = "mnac czqx qfcf zehm";
    
    //             mail.From = new MailAddress(meuEmail, "Bruno Lopes");
    //             mail.To.Add(meuEmail);
    //             mail.Priority = MailPriority.High;
    //             mail.Subject = "Token para validação do acesso";
    
    //             string nome = "batata";
    //             string mensagem = "Ola, estou testando o corpo do email";
    
    //             // Ajuste do diretório de trabalho
    //             string diretorioDoProjeto = AppDomain.CurrentDomain.BaseDirectory;
    //             Directory.SetCurrentDirectory(diretorioDoProjeto);
    
    //             mail.Body = corpoDaMensagem(nome, mensagem);
    //             mail.IsBodyHtml = true;
    //             smtpServer.Port = 587;
    
    //             smtpServer.Credentials = new System.Net.NetworkCredential(meuEmail, meuPassword);
    //             smtpServer.EnableSsl = true;
    //             smtpServer.Send(mail);
    //         }
    //         catch (Exception ex)
    //         {
    //             Console.WriteLine(ex.ToString());
    //         }
    //     }
    
    //     public static string corpoDaMensagem(string nome, string mensagem)
    //     {
    
    //         string body =
    //           "<div style='background: #cbe4ea; padding: 50px; font-family: Arial, Helvetica, sans-serif; text-align:center; margin-top: 0;'>" +
    //     "<div style='background: #343635; display: inline-block; padding: 50px; font-family: Arial, Helvetica, sans-serif; text-align:center;'>" +
    //         "<img src='https://www.hc.fm.usp.br/hc/assets/images/logo.png' alt='Imagem de exemplo' width='300' height='150' style='margin-right: 400px; border-radius: 10px;'>" +
    //         "<img src='https://yt3.googleusercontent.com/ytc/APkrFKYZRYY4GfvX7fpGmoZJJtAu-4aEonGGfUSUXYrQ=s176-c-k-c0x00ffffff-no-rj' alt='Imagem de exemplo' width='150' height='150' style='border-radius: 10px;'>" +
    //         "<p style='border-bottom: 1px solid #657275; padding-bottom: 20px;'></p>" +
    //         "<div style='text-align: left;'>" +
    //             $"<p style='color: #fff; font-size: 24px; font-style: italic;'> Seu token para validação é:  <span style='font-size: 30px; font-weight: bold; color: #00a8c6;'>KD231S</span></p>" +
    //             "<p style='color: #fff; font-size: 18px;'>" + "Olá, Joaquim!" + "</p>" +
    //             "<p style='color: #fff; font-size: 18px;font-style: italic;'>" + " <span style='color: #fff'>" + "Nota: " + "</span>" + "O código irá expirar em 5 minutos, portanto faça a verificação o mais rápido possível!" + "</p>" +
    //             "<br><p style='color: #fff; font-size: 16px;'>" + "Bem vindo (a) ao sistema de Teleinterconsulta!" + "</p>" +
    //         "</div>" +
    //     "</div>" +
    //     "<div style='background: #3c3f3d; display: block; padding: 50px; font-family: Arial, Helvetica, sans-serif; text-align: left; width: 850px; margin: auto;'>" +
    //         "<p style='color: #fff; font-size: 14px;text-align: center'>" + "® Todos os Direitos Reservados. Instituto da Criança e do Adolescente" + "</p>" +
    //     "</div>" +
    // "</div>";
    
    
    //         return body;
    //     }
    // }
    
