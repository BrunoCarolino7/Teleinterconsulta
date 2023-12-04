import { Checkbox, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/Button";
import { useState } from "react";

type Data = {
    cpf: string;
    tel1: string;
    // tel2: string;
    ddd: string;
    // ddd2: string;
}

export function AlterarTelEmailToken() {

    const Schema = yup.object().shape({
        cpf: yup.string().required(),
        tel1: yup.string().required(),
        // tel2: yup.string().required(),
        ddd: yup.string().required(),
        // ddd2: yup.string().required(),
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(Schema)
    });


    const handleExec: SubmitHandler<Data> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(data);
    }

    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (value: any) => {
        setSelectedOption(value);
    };

    return (
        <>
        {JSON.stringify("Commit")}
            <Flex
                as="form"
                w="100vw"
                h="70vh"
                alignItems="center"
                justifyContent="center"
                position="relative"
                onSubmit={handleSubmit(handleExec)}
            >
                <Flex
                    w="43%" 
                    h="80%"
                    direction="column"
                    borderRadius="5"
                    bg="whiteAlpha.700"
                    boxShadow="md"
                    px="20"
                    pb="8"
                    justifyContent="center"
                >
                    <Flex h="52%" position="absolute">
                        <Link to="/"><Icon ml="-4rem" mt="-10" fontSize="2rem" as={BsArrowLeft} color="#385898" /></Link>
                    </Flex>
                    <Stack>
                        <Text mb="1.5rem" mt="2rem" fontSize="29">Cadastro de usuário</Text>
                    </Stack>

                    <Stack alignItems="initial" pr="80">
                        <Input w="327px" type="number" size="md" label="CPF"  {...register("cpf")} error={errors.cpf} />

                        <HStack>
                            <Input isDisabled={selectedOption === "option2"} w="5rem" type="number" size="md" label="DDD"  {...register("ddd")} error={errors.ddd} />
                            <Input isDisabled={selectedOption === "option2"} w="15rem" type="number" size="md" label="Telefone alternativo"  {...register("tel1")} error={errors.tel1} />
                            <Checkbox
                                mt="12"
                                mr="4"
                                ml="2"
                                value="option1"
                                isChecked={selectedOption === "option1"}
                                onChange={() => handleChange("option1")}
                            ></Checkbox>
                            {selectedOption === "option1" &&
                                <>
                                    <Input type="number" size="md" label="DDD"  {...register("ddd")} error={errors.ddd} />
                                    <Input w="15rem" type="number" size="md" label="Novo número"  {...register("tel1")} error={errors.tel1} />
                                </>
                            }
                        </HStack>

                        <HStack>
                            <Input isDisabled={selectedOption === "option1"} w="5rem" type="number" size="md" label="DDD"  {...register("ddd")} error={errors.ddd} />
                            <Input isDisabled={selectedOption === "option1"} w="15rem" type="number" size="md" label="Telefone alternativo"  {...register("tel1")} error={errors.tel1} />
                            <Checkbox
                                mt="12"
                                mr="4"
                                ml="2"
                                value="option2"
                                isChecked={selectedOption === "option2"}
                                onChange={() => handleChange("option2")}
                            ></Checkbox>
                            {selectedOption === "option2" &&
                                <>
                                    <Input type="number" size="md" label="DDD"  {...register("ddd")} error={errors.ddd} />
                                    <Input w="15rem" type="number" size="md" label="Novo número"  {...register("tel1")} error={errors.tel1} />
                                </>
                            }
                        </HStack>
                    </Stack>
                    <Button isLoading={isSubmitting}>Salvar</Button>
                </Flex>
            </Flex >
        </>
    )
}

// /* {...register("DDD2")} error={errors.DDD2} /*