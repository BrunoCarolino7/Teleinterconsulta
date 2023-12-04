import { Flex, HStack, Icon, PinInput, PinInputField, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useParams } from "react-router-dom";
import { Stepper } from "../../components/Stepper";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

export function CheckToken() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const Navigate = useNavigate();
    const { ddd, telefone, cpfs, settoken, email } = useParams();
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const [codigo, setCodigo] = useState('');

    const executaVerificacaoCodigo = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.put(`usuario/verifica-codigo`, {
                Cpf: cpfs,
                Codigo: codigo,
            });

            if (response.status === 200) {
                Navigate(`/cadastrousuario/${settoken}/${email}/${ddd}/${cpfs}/${telefone}`);
            }
        } catch (error: any) {
            toast({
                title: `Erro ${error}!`,
                status: 'error',
                duration: 2500,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    };

    console.log(codigo)

    return (
        <>
            {isWideVersion && <Stepper index={1} />}
            <Flex
                as="form"
                h="60vh"
                px="6"
                justifyContent="center"
                flexDirection="column"
                align="center"
                onSubmit={executaVerificacaoCodigo}
            >
                <Flex
                    direction="column"
                    boxShadow="dark-lg"
                    bg="whiteAlpha.700"
                    w={["20rem", "30rem"]}
                    h={["25rem", "30rem"]}
                    p="2rem"
                    mt={["10rem", "0rem"]}
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
                        //bg="yellow"
                        justifyContent="center"
                    >
                        {settoken === '1' ? (
                            <>
                                <Text mt={["3rem", "5rem"]} align="center" fontSize={14}>O token foi enviado para o número:</Text>

                                <Text fontWeight="bold" align="center" fontSize={14}>{`(${ddd}) ` + `${telefone}`}</Text>
                            </>
                        ) :
                            <>
                                <Text mt={["3rem", "5rem"]} align="center" fontSize={14}>O token foi enviado para o email:</Text>

                                <Text fontWeight="bold" align="center" fontSize={14}>{email}</Text>
                            </>
                        }
                        <Flex mb="auto" mt="auto">
                            <HStack m="auto">
                                <PinInput value={codigo} type="alphanumeric" placeholder="" otp autoFocus onChange={e => setCodigo(e)}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                        </Flex>
                        <Button isLoading={loading}>Validar</Button>
                    </Flex>

                </Flex>
            </Flex>
        </>
    );
}
