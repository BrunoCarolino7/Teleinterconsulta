import { Text, Flex, Select, Stack, HStack, Textarea, useDisclosure, Icon, Box, Input as Calendar, useToast, Spinner, FormLabel } from "@chakra-ui/react";
import { Input } from "../components/Input";
import { Button as ButtonComponent } from '../components/Button'
import { Button } from '@chakra-ui/react'
import { TfiClip } from "react-icons/tfi";
import { Stepper } from "../components/Stepper";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AlertaModal } from "../components/Modal/AlertaModal";
import { useHospitais } from "../hooks/useHospitais";
import { useEspecialidades } from "../hooks/useEspecialidades";
import { UploadModal } from "../components/Modal/UploadModal";
import { useMyHospital } from "../hooks/useMyHospital";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Selects } from "../components/Select";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import api from "../services/api";

export function SolicitacaoTeleinterconsulta() {

    //#region     
    const { onOpen, isOpen, onClose } = useDisclosure();    

    const [suaInstituicao, setSuaInstituicao] = useState('');
    const [instituicaoSolicitada, setInstituicaoSolicitada] = useState('');
    const [especialidade, setEspecialidades] = useState<any>(null);
    const [dataTeleinterconsulta, setDataTeleinterconsulta] = useState<any>(null);
    const [historiaPaciente, setHistoriaPaciente] = useState('');
    const [justificativaSolicitacao, setJustificativaSolicitacao] = useState('');

    const [isInputVisible, setIsInputVisible] = useState(false);
    const handleIsNotVisible = () => { setIsInputVisible(true) }

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [campoBuscaCPF, setCampoBuscaCPF] = useState('');
    const [userId, setUserId] = useState('');    

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    //#endregion
    
    //const buscaPacienteCpf = pacientes.find(paciente => paciente.cpf.includes(campoBuscaCPF));


    // const buscaPacienteNome = pacientes.find(paciente => paciente.nome.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
    //     .includes(campoBuscaCPF.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")));

  

    // const onSearchs = async () => {

    //     if (!campoBuscaCPF) {
    //         toast({
    //             title: 'Digite um CPF válido',
    //             status: 'info',
    //             duration: 4000,
    //             isClosable: true,
    //         })
    //     } else {
    //         setLoading(true)       

    //             await new Promise(resolve => setTimeout(resolve, 1000))

    //             if (buscaPacienteCpf) {

    //                 handleIsNotVisible();
    //                 console.log("Encontrado");
    //                 //Mostra o valor pro usuario no input
    //                 setCpf(buscaPacienteCpf.cpf);
    //                 //Grava no register
    //                 setValue('cpf', buscaPacienteCpf.cpf);
    //                 setValue('dataNascimento', buscaPacienteCpf.dataNascimento);
    //                 setValue('nome', buscaPacienteCpf.nome);
    //                 setValue('nomeMae', buscaPacienteCpf.nomaMae);
    //                 setValue('genero', buscaPacienteCpf.genero);
    //                 setValue('campoBuscaCPF', campoBuscaCPF);

    //                 //Preenche automaticamente os campos:
    //                 setNome(buscaPacienteCpf.nome);
    //                 setDataNascimento(buscaPacienteCpf.dataNascimento);
    //                 setNomeMae(buscaPacienteCpf.nomaMae);
    //                 setGenero(buscaPacienteCpf.genero);
    //             } else {
    //                 console.log("NÃO ENCONTRADO");

    //                 handleIsVisible();

    //                 setCpf('')
    //                 setNome('')
    //                 setDataNascimento('')
    //                 setNomeMae('')
    //                 setGenero('')

    //                 setValue('campoBuscaCPF', campoBuscaCPF);
    //                 setValue('cpf', campoBuscaCPF);
    //                 setValue('dataNascimento', dataNascimento);
    //                 setValue('nome', nome);
    //                 setValue('nomeMae', nomeMae);
    //                 setValue('genero', genero);
    //                 setValue('campoBuscaCPF', campoBuscaCPF);

    //                 setCpf(campoBuscaCPF);
    //             }
    //         }
    //         setLoading(false);               
    // }

  
        // onOpen();
    


    const handleSuaInstituicao  = (e: any) => {
        setSuaInstituicao(e.target.value)      
    }  

    const handleInstituicaoSolicitada = (e: any) => {       
        setInstituicaoSolicitada(e.target.value)       
    } 

    const handleEspecialidade = (e: any) => {
        setEspecialidades(e.target.value)
    }
    const handleDataNascimento = (e: any) => {
        setDataNascimento(e.target.value)
    }
    const handleNome = (e: ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value)
    }
    const handleNomeMae = (e: any) => {
        setNomeMae(e.target.value)
    }
    const handleGenero = (e: any) => {
        setGenero(e.target.value)
    }
    const handleHistoriaPaciente = (e: any) => {
        setHistoriaPaciente(e.target.value)
    }
    const handleJustificativa = (e: any) => {
        setJustificativaSolicitacao(e.target.value)
    }
    const handleCpf = (e: any) => {
        setCpf(e.target.value)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const [unSaude, setUnSaude] = useState<any>([]);
    const [allUnSaude, setAllUnSaude] = useState<any>([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState<any>([]);
    const [idUsuario, setIdUsuario] = useState('');   
    

    useEffect(() => {
        const token = localStorage.getItem('Token');

        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payloadToken = JSON.parse(atob(parts[1]));                
                const userId =payloadToken.nameid
                setIdUsuario(userId)
                
                if (userId) {
                    const getUnSaudeUsuario = async () => {
                        try {
                            const response = await api.get(`usuario/obter/${userId}`);                          
                            setUnSaude(response.data.enderecoxpessoas.map((response: any) => response.endereco.unSaude));                                                 
                          
                        } catch (error) {
                            console.error("Erro na chamada da API:", error);
                        }
                    };
                    getUnSaudeUsuario();
                }
            } else {
                console.log("Token não válido");
            }
        } else {
            console.log("Token não encontrado");
        }
    }, []);  


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`unsaude/obter/nomatch/${idUsuario}`);
            setAllUnSaude(response.data);            
        };
    
        if (idUsuario) {
            fetchData();
        }

    }, [suaInstituicao]);   


    useEffect(() => {
        const buscaEspecialidade=async()=>{
        const response = await api.get(`unsaude/obter/espec/${instituicaoSolicitada}`)       
        
        setEspecialidadesDisponiveis((response.data.enderecos.map((x:any)=>x.enderecoxespecialidades.flatMap((x:any)=> x.especialidade.descricao))))
        }
    
    buscaEspecialidade();
    }, [instituicaoSolicitada])    
    


const solicitarTeleinterconsulta=(e: FormEvent)=> {
    e.preventDefault();
        console.log(suaInstituicao)
        console.log(instituicaoSolicitada)
        console.log(especialidade)
        console.log(cpf)
        console.log(dataNascimento)
        console.log(nome)
        console.log(nomeMae)
        console.log(genero)
        console.log(historiaPaciente)
        console.log(justificativaSolicitacao)

        

}

console.log(dataNascimento)


    return (
        <>
            <Stepper />
                        
            <Flex
                // bg="lightcyan"
                justifyContent="center"
            >
                <Flex
                    as="form"
                    bg="whiteAlpha.700"
                    boxShadow="md"
                    justifyContent="center"
                    w="60vw"
                    mr="auto" ml="auto" mt="2rem" mb="4rem"
                    h="100%"
                    align="center"
                    direction="column"
                    p="8"
                    borderRadius="5"
                    onSubmit={solicitarTeleinterconsulta}
                >
                    <Flex
                        w="50vw"
                        direction="column"
                    >
                        <>
                            <Flex >
                                <Text mt="-1" mb="4rem" fontSize="29">Solicitação de teleinterconsulta</Text>
                            </Flex>

                            <Flex position="absolute">
                                <Link to="/dashboard"><Icon ml="-4.5rem" fontSize="2rem" as={BsArrowLeft} color="#385898" transition="300ms" /></Link>
                            </Flex>
                            <Stack mb="1rem">
                                <Text mb="-3rem">Sua instituição</Text>
                                <Select value={suaInstituicao} onChange={handleSuaInstituicao} mt="3rem" placeholder='Selecione'>
                                    {unSaude.map((option:any, index:any) => (
                                        <option key={index} value={option.id}>{option.razaosocial}</option>
                                    ))}
                                </Select>
                            </Stack>

                            <Stack mb="1rem">
                                <Text mb="-3rem">Instituição solicitada</Text>
                                <Select value={instituicaoSolicitada} onChange={handleInstituicaoSolicitada} mt="3rem" placeholder='Selecione'>
                                    {Array.isArray(allUnSaude) ? (
                                    allUnSaude.map((option: any, index: any) => (
                                        <option key={index} value={option.id}>{option.razaosocial}</option>
                                    ))
                                    ) : (
                                    <option disabled>Sem instituições disponíveis para a instituição solicitada</option>
                                    )}
                                </Select>
                            </Stack>
                            <Stack mb="0.6rem">
                                <Text mb="-3rem">Especialidade</Text>                                    
                                <Select value={especialidade} onChange={e => setEspecialidades(e.target.value)} mt="3rem" placeholder='Selecione'>
                                    {especialidadesDisponiveis.length > 0 ? (
                                        especialidadesDisponiveis.map((descricao: string, index: number) => (
                                            <option key={index} value={descricao}>{descricao}</option>
                                        ))
                                    ) : (
                                        <option disabled>Nenhuma especialidade disponível para a instituição solicitada</option>
                                    )}
                                </Select>                                                           

                            </Stack>

                            <Text mt="3rem" mb="2rem" fontSize="xl">Paciente</Text>
                            <HStack >
                                <HStack spacing="3rem" mb="1rem">
                                    <>
                                        <Box>
                                            <Input value={campoBuscaCPF} onChange={e => setCampoBuscaCPF(e.target.value)} name="">
                                                {loading ?
                                                    <Button zIndex={10} _hover={{ color: "blue", borderColor: "blue" }} borderWidth={1} ml="-2.5rem" position="absolute" variant="unstyled" /*onClick={onSearchs}*/>
                                                        <Spinner mt="1.5" color="gray.400" size='sm' />
                                                    </Button>
                                                    :
                                                    <Button zIndex={10} _hover={{ color: "blue", borderColor: "blue" }} borderWidth={1} ml="-2.5rem" position="absolute" variant="unstyled" /*onClick={onSearchs}*/><Icon mt="1.5" fontSize="lg" as={AiOutlineSearch} /></Button>
                                                }
                                            </Input>
                                            <Input name="" w="475px"  label="CPF" type="text" value={cpf}  onChange={e=> setCpf(e.target.value)} />
                                        </Box>

                                        <FormLabel mb="-2" fontWeight="normal" ml={525} position="absolute">Data de nascimento</FormLabel>
                                        <Calendar                                        
                                            mt="5.5rem"
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="date"
                                            disabled={isInputVisible}
                                            value={dataNascimento}
                                            onChange={e=> setDataNascimento(e.target.value)}
                                        />
                                    </>
                                </HStack>
                            </HStack>

                            <Stack mb="1rem">
                                <Input name="" label="Nome" type="text" value={nome} onChange={ handleNome } />
                            </Stack>

                            <Stack mb="2rem">
                                <Input name="" label="Nome da mãe" value={nomeMae}  onChange={ (e) => setNomeMae(e.target.value) } />
                            </Stack>
                            <Flex>
                                <HStack spacing="3rem" mb="2rem">

                                    <Stack>
                                        <Text>Gênero</Text>
                                        <Select disabled={isInputVisible} value={genero} onChange={ (e) => setGenero(e.target.value) } >
                                            <option value="">Selecione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                        </Select>
                                    </Stack>

                                    <Stack>
                                        <Text>Upload de exames</Text>
                                        <Button
                                            cursor="pointer"
                                            variant="outline"
                                            _hover={{ bg: "none" }}
                                            w="15rem"
                                            mt="-1"
                                            mb="-1"
                                            onClick={handleOpenModal}
                                        >
                                            <UploadModal x={openModal} onOpen={handleOpenModal} close={handleCloseModal} />

                                            <Text opacity={0.8} fontSize="14" fontWeight="normal">Adicionar documentos</Text>
                                            <Icon ml="auto" fontSize="23" as={TfiClip}></Icon>
                                        </Button>
                                    </Stack>

                                </HStack>
                            </Flex>

                            <Text mb='8px'>História do paciente</Text>
                            <Textarea                                
                                value={historiaPaciente}onChange={ (e) => setHistoriaPaciente(e.target.value) } 
                                mb="2rem"
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />
                            <Text mb='8px'>Justificativa de solicitação</Text>
                            <Textarea
                                value={justificativaSolicitacao} onChange={ (e) => setJustificativaSolicitacao(e.target.value) }
                                mb="2rem"
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <AlertaModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />

                            <ButtonComponent>Solicitar</ButtonComponent>
                        </>
                    </Flex>
                </Flex>
            </Flex >
        </>
    )
}





// const pax = await axios.get('https://webapiicr.icr.usp.br/api/Paciente/carregapacienteicr')
        //     .then((response) => response.data)
        //     .catch((error) => error)

        // const nomesIguais = pax.filter((x: any) => x.nome.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "") === campoBuscaCPF.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, ""));

        
        // if (buscaPacienteNome) {

        //     if (!campoBuscaCPF) {
        //         toast({
        //             title: 'Digite um nome ou Cpf válido',
        //             status: 'warning',
        //             duration: 4000,
        //             isClosable: true,
        //         })

        //     }
        
        
        
        
        // else {



        //     await new Promise(resolve => setTimeout(resolve, 1000))

        //     if (buscaPacienteNome) {

        //         handleIsNotVisible();
        //         console.log("Encontrado");
        //         //Mostra o valor pro usuario no input
        //         setCpf(buscaPacienteNome.cpf);
        //         //Grava no register
        //         setValue('cpf', buscaPacienteNome.cpf);
        //         setValue('dataNascimento', buscaPacienteNome.dataNascimento);
        //         setValue('nome', buscaPacienteNome.nome);
        //         setValue('nomeMae', buscaPacienteNome.nomaMae);
        //         setValue('genero', buscaPacienteNome.genero);
        //         setValue('campoBuscaCPF', campoBuscaCPF);

        //         //Preenche automaticamente os campos:
        //         setNome(buscaPacienteNome.nome);
        //         setDataNascimento(buscaPacienteNome.dataNascimento);
        //         setNomeMae(buscaPacienteNome.nomaMae);
        //         setGenero(buscaPacienteNome.genero);
        //     }
        // }














            //#region
    // useEffect(()=>{
        
    //     for (let i = 0; i < allUnSaude.length; i++) {
    //         if (unSaude.includes(allUnSaude[i])) {
    //             alert("Repetido: " + allUnSaude[i]);
    //         }
    //     }
    // },[])

    //   useEffect(()=>{
          
    //     const unSaudeSemRepetidos = unSaude.filter(item => !allUnSaude.includes(item));       
        
    //     setUnSaude(unSaudeSemRepetidos)
    //     console.log(unSaude)

    //   },[]) 
    //#endregion 
    // ...

//     const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);
//     const [apiData, setApiData] = useState<any>();     
    
//     useEffect(() => {
//       api.get('https://localhost:7092/unsaude/obter/2')
//         .then((response) => {
//           setApiData(response.data);
//         })
//         .catch((error) => {
//           console.error("Erro na chamada da API:", error);
//         });
//     }, []);
    

//     const findEspecialidades = async (hospitalSelecionado: any) => {
        
//       const data = await apiData;  
//       console.log(data)
      
//       const hospital:any = data.find((item: any) => item.razaosocial === hospitalSelecionado);     
      
      
//       if (hospital) {
          
//           const especialidadesDoHospital = hospital.enderecos[0].enderecoxespecialidades;
          
//           console.log(especialidadesDoHospital)
//           // Extraia as descrições das especialidades
//           const especialidades = especialidadesDoHospital.map((especialidade: any) => especialidade.especialidade.descricao);
          
//           return especialidades;
//         } else {
//             // Se o hospital não for encontrado, retorne um array vazio
//             return [];
//         }
//     };    
    
    
//     const handleInstituicaoSolicitada = (e: any) => {
//     const instituicaoSelecionada = e.target.value; 
    
//     const especialidadesCorrespondentes:any = findEspecialidades(instituicaoSelecionada); 
    
//     setEspecialidadesDisponiveis(especialidadesCorrespondentes);    
//     setInstituicaoSolicitada(instituicaoSelecionada);
//   };
  