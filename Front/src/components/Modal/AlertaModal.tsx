import { ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, Modal, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { Button } from '../Button'
import { useNavigate } from "react-router-dom";

type ModalProp = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}


export function AlertaModal({ isOpen, onClose }: ModalProp) {

    const navigate = useNavigate();

    const encaminharParaPainelCredenciamento = async () => {
        navigate('/credenciamento')
    }

    return (
        <>
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
                    backdropBlur='2px'
                />
                <ModalContent p="2">
                    <ModalHeader fontSize="23">Credenciamento em análise!</ModalHeader>
                    <ModalCloseButton onClick={encaminharParaPainelCredenciamento} />
                    <ModalBody>
                        <Text>Seu credenciamento foi enviado para análise. Por favor, aguarde o resultado em seu painel gerenciador de credenciamentos.</Text>
                    </ModalBody>

                    <ModalFooter m="auto">
                        <Button onClick={encaminharParaPainelCredenciamento}>Ok</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}    