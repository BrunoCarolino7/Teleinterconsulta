import { Outlet } from 'react-router-dom'

export function Home() {
  return (
    <Outlet />
  );
}

//#region

// import { Text, Flex, Select, Stack, HStack, Textarea, useDisclosure, Icon, Box, Input as Calendar, useToast, Spinner } from "@chakra-ui/react";
// import { Header } from "../components/Header";
// import { Input } from "../components/Input";
// import { Button as ButtonComponent } from '../components/Button'
// import { Button } from '@chakra-ui/react'
// import { TfiClip } from "react-icons/tfi";
// import { Stepper } from "../components/Stepper";
// import { Link } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { ChangeEvent, useEffect, useState } from "react";
// import { usePacientes } from "../hooks/usePaciente";
// import { AlertaModal } from "../components/Modal/AlertaModal";
// import { useHospitais } from "../hooks/useHospitais";
// import { useEspecialidades } from "../hooks/useEspecialidades";
// import { UploadModal } from "../components/Modal/UploadModal";
// import { useMyHospital } from "../hooks/useMyHospital";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from 'yup';
// import { Selects } from "../components/Select";
// import { AiOutlineSearch } from "react-icons/ai";
// import Search from "antd/es/input/Search";

// type HandleSubmitData = {
//     suaInstituicao: string;
//     instituicaoSolicitada: string;
//     especialidade: string;
//     dataTeleinterconsulta: string;
//     cpf: string;
//     dataNascimento: string;
//     campoBuscaCPF: string;
//     nome: string;
//     nomeMae: string;
//     genero: string;
//     historiaPaciente: string;
//     justificativaSolicitacao: string;

// }

// export function SolicitacaoTeleinterconsulta() {

//     //#region
//     const { onOpen, isOpen, onClose } = useDisclosure();
//     const { pacientes } = usePacientes();
//     const { hospital } = useHospitais();
//     const { especialidades } = useEspecialidades();
//     const { myHospital } = useMyHospital();
//     const toast = useToast();

//     const [suaInstituicao, setSuaInstituicao] = useState<any>(null);
//     const [instituicaoSolicitada, setInstituicaoSolicitada] = useState<any>(null);
//     const [especialidade, setEspecialidades] = useState<any>(null);
//     const [dataTeleinterconsulta, setDataTeleinterconsulta] = useState<any>(null);
//     const [historiaPaciente, setHistoriaPaciente] = useState('');
//     const [justificativaSolicitacao, setJustificativaSolicitacao] = useState('');

//     const [isInputVisible, setIsInputVisible] = useState(false);
//     const handleIsVisible = () => { setIsInputVisible(false) }
//     const handleIsNotVisible = () => { setIsInputVisible(true) }


//     const [multiplosPacientes, setMultiplosPacientes] = useState(false);



//     const [dados, setDados] = useState<HandleSubmitData>({} as HandleSubmitData);

//     const [nome, setNome] = useState('');
//     const [cpf, setCpf] = useState('');
//     const [nomeMae, setNomeMae] = useState('');
//     const [dataNascimento, setDataNascimento] = useState('');
//     const [genero, setGenero] = useState('');

//     const [campoBuscaCPF, setCampoBuscaCPF] = useState('');

//     const [openModal, setOpenModal] = useState(false);
//     const [loading, setLoading] = useState(false);

//     //#endregion

//     const SchemaData = yup.object().shape({
//         suaInstituicao: yup.string().required(''),
//         instituicaoSolicitada: yup.string().required('Obrigatório'),
//         especialidade: yup.string().required('Obrigatório'),
//         dataTeleinterconsulta: yup.string().required('Obrigatório'),
//         cpf: yup.string().required('Obrigatório'),
//         dataNascimento: yup.string().required('Obrigatório'),
//         campoBuscaCPF: yup.string().required('Obrigatório'),
//         nome: yup.string().required('Obrigatório'),
//         nomeMae: yup.string().required('Obrigatório'),
//         genero: yup.string().required('Obrigatório'),
//         historiaPaciente: yup.string().required('Obrigatório'),
//         justificativaSolicitacao: yup.string().required('Obrigatório'),
//     })

//     const { handleSubmit, register, setFocus, setValue, formState: { errors, isSubmitting } } = useForm({
//         resolver: yupResolver(SchemaData)
//     });

//     const buscaPacienteCpf = pacientes.find(paciente => paciente.cpf.includes(campoBuscaCPF));
//     const buscaPacienteNome = pacientes.find(paciente => paciente.nome.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "").includes(campoBuscaCPF.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")));
//     // ...


//     const nomesIguais = pacientes.filter(x => x.nome === campoBuscaCPF);




//     //#region SWITCH
//     // switch (expression) {
//     //     case value1:
//     //       // code to execute if expression matches value1
//     //       break;
//     //     case value2:
//     //       // code to execute if expression matches value2
//     //       break;
//     //     // more cases as needed
//     //     default:
//     //       // code to execute if expression doesn't match any case
//     //   }
//     //#endregion


//     console.log(multiplosPacientes)

//     const onSearchs = async () => {

//         setLoading(true)

//         await new Promise(resolve => setTimeout(resolve, 1000))

//         if (nomesIguais) {
//             console.log("MULTIPLOS NOMES", nomesIguais)
//         } else {
//             setMultiplosPacientes(false);
//         }
//         setLoading(false);
//     }

//     useEffect(() => {
//         handleIsNotVisible();
//     }, [])


//     const handleExec: SubmitHandler<HandleSubmitData> = async (data) => {

//         await new Promise(resolve => setTimeout(resolve, 1000))
//         setDados(data);
//         // onOpen();
//     }

//     const handleSuaInstituicao = (e: ChangeEvent<HTMLInputElement>) => {
//         setSuaInstituicao(e.target.value)
//     }
//     const handleInstituicaoSolicitada = (e: ChangeEvent<HTMLInputElement>) => {
//         setInstituicaoSolicitada(e.target.value)
//     }
//     const handleEspecialidade = (e: ChangeEvent<HTMLInputElement>) => {
//         setEspecialidades(e.target.value)
//     }
//     const handleDataTeleinterconsulta = (e: ChangeEvent<HTMLInputElement>) => {
//         setDataTeleinterconsulta(e.target.value)
//     }
//     const handleDataNascimento = (e: ChangeEvent<HTMLInputElement>) => {
//         setDataNascimento(e.target.value)
//     }
//     const handleNome = (e: ChangeEvent<HTMLInputElement>) => {
//         setNome(e.target.value)
//     }
//     const handleNomeMae = (e: ChangeEvent<HTMLInputElement>) => {
//         setNomeMae(e.target.value)
//     }
//     const handleGenero = (e: ChangeEvent<HTMLInputElement>) => {
//         setGenero(e.target.value)
//     }
//     const handleHistoriaPaciente = (e: ChangeEvent<HTMLInputElement>) => {
//         setHistoriaPaciente(e.target.value)
//     }
//     const handleJustificativa = (e: ChangeEvent<HTMLInputElement>) => {
//         setJustificativaSolicitacao(e.target.value)
//     }
//     const handleCpf = (e: ChangeEvent<HTMLInputElement>) => {
//         setCpf(e.target.value)
//     }

//     const handleOpenModal = () => {
//         setOpenModal(true);
//     }

//     const handleCloseModal = () => {
//         setOpenModal(false);
//     }

//     return (

//         <>
//             <Header />
//             <Stepper />

//             <Flex
//                 // bg="lightcyan"
//                 justifyContent="center"
//             >
//                 <Flex
//                     as="form"
//                     bg="whiteAlpha.700"
//                     boxShadow="md"
//                     justifyContent="center"
//                     w="60vw"
//                     mr="auto" ml="auto" mt="2rem" mb="4rem"
//                     h="100%"
//                     align="center"
//                     direction="column"
//                     p="8"
//                     borderRadius="5"
//                     onSubmit={handleSubmit(handleExec)}
//                 >
//                     <Flex
//                         w="50vw"
//                         direction="column"
//                     >
//                         <>
//                             <Flex >
//                                 <Text mt="-1" mb="4rem" fontSize="29">Solicitação de teleinterconsulta</Text>
//                             </Flex>

//                             <Flex position="absolute">
//                                 <Link to="/login"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
//                             </Flex>
//                             <Stack mb="1rem">
//                                 <Text mb="-3rem">Sua instituição</Text>
//                                 <Selects value={suaInstituicao} {...register('suaInstituicao', { onChange: (b) => handleSuaInstituicao(b) })} mt="3rem" placeholder='Selecione'>
//                                     {myHospital.map((option, index) => (
//                                         <option key={index}>{option.nome}</option>
//                                     ))}
//                                 </Selects>
//                             </Stack>

//                             <Stack mb="1rem" >
//                                 <Text mb="-3rem">Instituição solicitada</Text>
//                                 <Selects value={instituicaoSolicitada} {...register('instituicaoSolicitada', { onChange: (r) => handleInstituicaoSolicitada(r) })} mt="3rem" placeholder='Selecione' >
//                                     {hospital.map((x, index) => (
//                                         <option key={index}>{x.name}</option>
//                                     ))}
//                                 </Selects>
//                             </Stack>

//                             <Stack mb="0.6rem" >
//                                 <Text mb="-3rem">Especialidade</Text>

//                                 <Selects value={especialidade} {...register('especialidade', { onChange: (u) => handleEspecialidade(u) })} mt="3rem" placeholder='Selecione' >
//                                     <option value="">Selecione uma opção</option>
//                                     {especialidades.map((option, index) => (
//                                         <option key={index}>{option.nome}</option>
//                                     ))}
//                                 </Selects>
//                             </Stack>

//                             <HStack>

//                                 <Stack w="50%" mt={2}>
//                                     <Text mb={-8}>Data e hora teleinterconsulta</Text>
//                                     <Calendar
//                                         _hover={{ cursor: 'pointer' }}
//                                         mt="2rem"
//                                         placeholder="Select Date and Time"
//                                         size="md"
//                                         type="datetime-local"
//                                         value={dataTeleinterconsulta} {...register('dataTeleinterconsulta', { onChange: (n) => handleDataTeleinterconsulta(n) })}
//                                     />
//                                 </Stack>
//                             </HStack>
//                             {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

//                             <Text mt="3rem" mb="2rem" fontSize="xl"  >Paciente</Text>
//                             <HStack >
//                                 <HStack spacing="3rem" mb="1rem">
//                                     <>
//                                         <Box>
//                                             <Input value={campoBuscaCPF} onChange={e => setCampoBuscaCPF(e.target.value)} name="">
//                                                 {loading ?
//                                                     <Button zIndex={10} _hover={{ color: "blue", borderColor: "blue" }} borderWidth={1} ml="-2.5rem" position="absolute" variant="unstyled" onClick={onSearchs}>
//                                                         <Spinner mt="1.5" color="gray.400" size='sm' />
//                                                     </Button>
//                                                     :
//                                                     <Button zIndex={10} _hover={{ color: "blue", borderColor: "blue" }} borderWidth={1} ml="-2.5rem" position="absolute" variant="unstyled" onClick={onSearchs}><Icon mt="1.5" fontSize="lg" as={AiOutlineSearch} /></Button>
//                                                 }
//                                             </Input>
//                                             <Input w="475px" disabled={isInputVisible} error={errors.cpf} label="CPF" type="text" value={cpf}  {...register('cpf', { onChange: (e) => handleCpf(e) })} />
//                                         </Box>

//                                         <Calendar
//                                             mt="5.5rem"
//                                             placeholder="Select Date and Time"
//                                             size="md"
//                                             type="date"
//                                             disabled={isInputVisible}
//                                             value={dataNascimento}
//                                             {...register('dataNascimento', { onChange: (o) => handleDataNascimento(o) })}
//                                         />
//                                     </>
//                                 </HStack>
//                             </HStack>

//                             <Stack mb="1rem">
//                                 <Input disabled={isInputVisible} label="Nome" type="text" value={nome} {...register('nome', { onChange: (e) => handleNome(e) })} />
//                             </Stack>

//                             <Stack mb="1rem">
//                                 <Input disabled={isInputVisible} label="Nome da mãe" value={nomeMae}   {...register('nomeMae', { onChange: (e) => handleNomeMae(e) })} />
//                             </Stack>
//                             <Flex>
//                                 <HStack spacing="3rem" mb="1rem">

//                                     <Stack>
//                                         <Text>Gênero</Text>
//                                         <Select disabled={isInputVisible} value={genero} {...register('genero', { onChange: (e) => handleGenero(e) })} >
//                                             <option value="">Selecione</option>
//                                             <option value="Masculino">Masculino</option>
//                                             <option value="Feminino">Feminino</option>
//                                         </Select>
//                                     </Stack>

//                                     <Stack>
//                                         <Text>Upload de exames</Text>
//                                         <Button
//                                             cursor="pointer"
//                                             variant="outline"
//                                             _hover={{ bg: "none" }}
//                                             w="15rem"
//                                             mt="-1"
//                                             mb="-1"
//                                             onClick={handleOpenModal}
//                                         >
//                                             <UploadModal x={openModal} onOpen={handleOpenModal} close={handleCloseModal} />

//                                             <Text opacity={0.8} fontSize="14" fontWeight="normal">Adicionar documentos</Text>
//                                             <Icon ml="auto" fontSize="23" as={TfiClip}></Icon>
//                                         </Button>
//                                     </Stack>

//                                 </HStack>
//                             </Flex>

//                             <Text mb='8px'>História do paciente</Text>
//                             <Textarea
//                                 value={historiaPaciente} {...register('historiaPaciente', { onChange: (e) => handleHistoriaPaciente(e) })}
//                                 mb="1rem"
//                                 placeholder='Here is a sample placeholder'
//                                 size='sm'
//                             />
//                             <Text mb='8px'>Justificativa de solicitação</Text>
//                             <Textarea
//                                 value={justificativaSolicitacao} {...register('justificativaSolicitacao', { onChange: (e) => handleJustificativa(e) })}
//                                 mb="2rem"
//                                 placeholder='Here is a sample placeholder'
//                                 size='sm'
//                             />
//                             <AlertaModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />

//                             <ButtonComponent isLoading={isSubmitting}>Solicitar</ButtonComponent>
//                         </>
//                     </Flex>
//                 </Flex>
//             </Flex >
//         </>
//     )
// }
//#endregion
