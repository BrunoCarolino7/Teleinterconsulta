import { Button, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Text, Modal } from "@chakra-ui/react";

interface UploadModalProps {
    x: boolean;
    close: () => void;
    onOpen: () => void;
}

export function UploadModal({ x, close }: UploadModalProps) {

    return (
        <>
            <Modal
                isCentered
                isOpen={x}
                onClose={close}
                motionPreset='slideInBottom'
                closeOnEsc={true}
                closeOnOverlayClick={true}
                size={"xl"}
            >
                <ModalOverlay /* bg='none'*/ backdropFilter='auto' backdropBlur='2px' />
                <ModalContent>
                    {/* <ModalHeader>d</ModalHeader> */}
                    <ModalCloseButton onClick={close} />
                    <ModalBody mb="4rem" mt="3rem" alignSelf="center">
                        <Text fontWeight="bold" fontSize="20">x realizado!</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={close} colorScheme='facebook' w="5rem" m="auto" >Ok</Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}    