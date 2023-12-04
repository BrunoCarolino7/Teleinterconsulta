import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SidebarNav } from "./SideBarNav";


type SideBarProps = {
    marginTop?: string;
}

export function SideBar({ marginTop }: SideBarProps) {

    const { isOpen, onClose } = useDisclosure();

    const isDrawerSideBar = useBreakpointValue({
        base: true,
        lg: false,
    })

    if (isDrawerSideBar) {
        return (
            //menu interativo
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay >
                    <DrawerContent bg="gray.800">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody >
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }
    return (
        <Box as="aside" w="13%" px="8" mr={20} mt={marginTop}>
            <SidebarNav />
        </Box>
    )
}