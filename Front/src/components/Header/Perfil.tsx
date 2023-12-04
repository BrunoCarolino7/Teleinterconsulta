import { Avatar, Button, Flex, HStack, Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { RiArrowDownSLine } from 'react-icons/ri'
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

type PerfilProps = {
    nome?: any;
    margin?: number
}

export function Perfil({ nome, margin }: PerfilProps) {

    const navigate = useNavigate();
    const deslogar = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Flex
            w="17%"
            mt={margin}
            ml="1505"
            bg="whiteAlpha.900"
            boxShadow="md"
            justify="right"
            pr="5"
            py="3"
            borderRadius="5"
            position="absolute"
        >
            <HStack>
                <HStack
                    borderRightWidth={1}
                    mr="5"
                    h="7"
                    borderRightColor="blackAlpha.400"
                >
                    <Text mr="-1" fontWeight="bold">Bem vindo, {nome}</Text>

                    {/* <Sidebar /> */}
                    <Popover>
                        <PopoverTrigger>
                            <Button mt="1" fontSize="20" variant="unstyled"><Icon as={RiArrowDownSLine} /></Button>
                        </PopoverTrigger>
                        <PopoverContent w={260}>
                            <PopoverArrow />
                            <PopoverBody>
                                <Button _hover={{ textDecoration: "underline" }} w="100%" variant="unstyled">
                                    <Link to={"/meuperfil"}>
                                        <HStack>
                                            <Icon fontSize="25" as={AiOutlineUser} />
                                            <Text ml="auto" >Meu perfil</Text>
                                        </HStack>
                                    </Link>
                                </Button>
                                <Button _hover={{ textDecoration: "underline" }} w="100%" variant="unstyled">
                                    <Link to='/gerenciarInstituicao' >
                                        <HStack>
                                            <Icon fontSize="25" as={BsBuilding} />
                                            <Text ml="auto">Instituição</Text>
                                        </HStack>
                                    </Link>
                                </Button>
                                <Button w="100%" _hover={{ textDecoration: "underline" }} variant="unstyled">
                                    <HStack>
                                        <Icon fontSize="25" as={IoMdExit} />
                                        <Button variant="unstyled" ml="auto" onClick={deslogar}><Text ml="auto">Sair</Text></Button>
                                    </HStack>
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </HStack>

                <Avatar name='Dan Abrahmov' src='https://bit.ly/code-beast' />
            </HStack>

        </Flex >
    )
}
