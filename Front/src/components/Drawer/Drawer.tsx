import { Button, Drawer as DrawerComponent, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react"

export function Drawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>
                Open
            </Button>
            <DrawerComponent placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerComponent>
        </>
    )
}