import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps {
    icon?: ElementType;
    children?: string;
}

export function NavLink({ icon, children, ...props }: NavLinkProps) {
    return (
        <ChakraLink display="flex" {...props} >
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontSize="14" fontWeight="normal" >{children}</Text>
        </ChakraLink>
    )
}