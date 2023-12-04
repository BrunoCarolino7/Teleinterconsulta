import { Flex, Icon, Text } from "@chakra-ui/react";
import { useHospitais } from "../hooks/useHospitais";
import { Stepper } from "../components/Stepper";
import AutoComplete from "antd/es/auto-complete";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NewModal } from "../components/Modal/NewModal";
import { useNavigate } from 'react-router-dom'
import { usePessoa } from "../hooks/usePessoa";

export function HomeCnpj() {

    const Navigate = useNavigate();
    const { hospital } = useHospitais();

    const [value, setValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState<any>(false);

    const hospitaisFiltrados = hospital.filter(item => item.razaosocial.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "").includes(value.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")));

    console.log(selectedHospital)


    return (
        <>
            <Stepper index={3} />
            <Flex
                w="100vw"
                h="70vh"
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    w="40vw"
                    mt="-15rem"
                    h="30vh"
                    bg="whiteAlpha.700"
                    p="2rem"
                    borderRadius="5"
                    boxShadow="md"
                >
                    <Flex
                        direction="column"
                        w="35vw"
                        m="auto"
                    >
                        <Text fontSize="21" fontWeight="bold" alignSelf="center" mb="2rem">Buscar ou cadastrar instituição</Text>

                        <Flex
                            position="relative"
                            // bg="green"
                            as="form"
                        >
                            <>
                                <AutoComplete
                                    options={[
                                        {            
                                                                           
                                            value: "Cadastrar Nova Instituição",
                                            action: () => {
                                                window.location.href = `http://localhost:3000/cadastroinstituicao`;
                                            },
                                        },
                                        ...hospitaisFiltrados.map((item) => ({
                                            label: item.razaosocial,
                                            value: item.id,
                                        })),
                                    ]}
                                    style={{ width: 700 }}
                                    onChange={(value) => {
                                        if (value === "Cadastrar Nova Instituição") {
                                            Navigate(`/cadastroinstituicao`);
                                        } else {
                                            const selectedOption = hospitaisFiltrados.find((item) => item.id === value);
                                            if (selectedOption) {
                                                const selectedHospital = hospital.find((item) => item.razaosocial == selectedOption.razaosocial);
                                                if (selectedHospital) {
                                                    setSelectedHospital(selectedHospital);
                                                    setOpenModal(true);
                                                }
                                            }
                                        }
                                    }}
                                    onSearch={(value) => {
                                        setValue(value);
                                    }}
                                    placeholder="Busque pelo nome do hospital"
                                />
                                {openModal && selectedHospital && (
                                    <NewModal
                                        nomeInstituicao={selectedHospital.razaosocial}
                                        hospitalId={selectedHospital.id}
                                        isOpen={openModal}
                                        onClose={() => setOpenModal(false)}
                                    ></NewModal>
                                )}
                            </>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}



