import { Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { Link, useParams } from 'react-router-dom'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Stepper } from '../../components/Stepper'
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from "react";
import api from "../../services/api";


export function CadastroTelEmailToken() {

    const navigate = useNavigate();
    var { cpfs, settoken } = useParams();

    const [email, setEmail] = useState('');
    const [ddd, setDdd] = useState('');
    const [loading, setLoading] = useState(false);
    const [Telefone, setTelefone] = useState('');


    const handleExec = async (event: FormEvent) => {

        setLoading(true)
        event.preventDefault();
        try {
            if (settoken === "1") {
                const response = await api.post(`usuario/envia-codigo`, {
                    Settoken: settoken,
                    Cpf: cpfs,
                    Telefone: Telefone
                })
                if (response.status && response.status === 200)
                    navigate(`/checktoken/${settoken}/${ddd}/${Telefone}/${cpfs}/sms`);

            } else {
                const response = await api.post(`usuario/envia-codigo`, {
                    Settoken: settoken,
                    Cpf: cpfs,
                    Email: email
                })
                if (response.status && response.status === 200)
                    navigate(`/checktoken/${settoken}/s$f/*h/${cpfs}/${email}`);
            }
        } catch (error: any) {
            alert("error")
        } finally {
            setLoading(false)
        }
    }


    console.log(settoken)

    return (
        <>
            <Stepper index={0} />
            <Flex
                as="form"
                w="100vw"
                h="70vh"
                alignItems="center"
                justifyContent="center"
                position="relative"
                onSubmit={handleExec}

            >
                <Flex
                    w="30%"
                    h="50%"
                    direction="column"
                    borderRadius="5"
                    bg="whiteAlpha.700"
                    boxShadow="md"
                    alignItems="center"
                    justifyContent="center"
                    mt="-6rem"
                >
                    <Flex h="35%" position="absolute">
                        <Link to="/"><Icon ml="-17rem" mt="-4" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                    </Flex>

                    <Stack spacing="1rem">
                        {settoken === "1" ? (
                            <>
                                <Input name="" placeholder="" label="CPF" value={cpfs} />
                                <HStack mb="6">
                                    <Input name="" maxLength={2} w="20" placeholder="" label="DDD" value={ddd} onChange={e => setDdd(e.target.value)} />
                                    <Input name="" maxLength={9} w="100" placeholder="" label="Telefone" value={Telefone} onChange={e => setTelefone(e.target.value)} />
                                </HStack>
                            </>
                        ) :
                            <>
                                <Input name="" placeholder="" label="CPF" value={cpfs} />
                                <HStack >
                                    <Input name="" isRequired w="80" placeholder="" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                </HStack>
                            </>
                        }
                    </Stack>
                    <Button isLoading={loading}>Ok</Button>
                </Flex>
            </Flex>
        </>
    )
}


