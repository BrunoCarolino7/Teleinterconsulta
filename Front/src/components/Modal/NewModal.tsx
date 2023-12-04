import { ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Text, Modal, ModalHeader } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Button } from '../Button'

type ModalProp = {
    isOpen: boolean;
    onClose: () => void;
    hospitalId?: any;
    nomeInstituicao?: any;
}

export function NewModal({ hospitalId, isOpen, onClose, nomeInstituicao }: ModalProp) {

    useEffect(() => {
        const obterGestor = async () => {
            const response = await api.get(`unsaude/obter/gestor/${hospitalId}`)
            console.log(response.data.enderecos.flatMap((x: any) => x.enderecoxpessoas))

        }
        obterGestor();
    }, [])


    console.log(nomeInstituicao)

    const Navigate = useNavigate();

    return (

        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            motionPreset='slideInBottom'
            closeOnEsc={false}
            closeOnOverlayClick={false}
            size={"xl"}
        >
            <ModalOverlay
                // bg='none'
                backdropFilter='auto'
                backdropBlur='2px' />
            <ModalContent>
                <ModalHeader fontSize={24}>Instituição já cadastrada!</ModalHeader>
                <ModalCloseButton onClick={() => Navigate('/')} />
                <ModalBody>
                    <Text fontSize={18}>{`A instituição ${nomeInstituicao} já está cadastrada no sistema. Seu gestor local é o Roberto Augusto, contate-o para que ele possa inclui-lo ao sistema de teleinterconsulta.`}</Text>
                </ModalBody>

                <ModalFooter mt="-4">
                    <Button onClick={() => Navigate('/')}>Ok</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}    