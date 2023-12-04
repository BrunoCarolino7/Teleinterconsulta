import { Button, Link, Stack } from "@chakra-ui/react";
import { RiContactsLine } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
import { BiLogIn, BiSolidCameraMovie } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { useNavigate } from "react-router-dom";


export function SidebarNav() {

    const navigate = useNavigate();

    return (
        <Stack spacing="10" align="flex-start">

            <NavSection fontSize="md" fontWeight="bold" color="gray.400" title="Menu">

                <Button variant="unstyled" onClick={() => navigate('/dashboard')} >
                    <NavLink icon={BiSolidCameraMovie}>Teleinterconsultas</NavLink>
                </Button>

                <Button variant="unstyled" onClick={() => navigate('/credenciamento')} >
                    <NavLink icon={FaThList}>Credenciamentos</NavLink>
                </Button>

                <Button variant="unstyled" onClick={() => navigate('/meuperfil')} >
                    <NavLink icon={RiContactsLine}>Meu Perfil</NavLink>
                </Button>

                <Button variant="unstyled" onClick={() => navigate('/gerenciarinstituicao')} >
                    <Link _hover={{ textDecoration: "underline" }}>
                        <NavLink icon={BsBuilding}>Gerenciar Instituição</NavLink>
                    </Link>
                </Button>


            </NavSection >

            <Link _hover={{ textDecoration: "underline" }}>
                <Button variant="unstyled" onClick={() => navigate('/')} >
                    <Link _hover={{ textDecoration: "underline" }}>
                        <NavLink mt="-9" ml="-0.5" icon={BiLogIn}>Sair</NavLink>
                    </Link>
                </Button>
            </Link>
        </Stack>
    )
}


