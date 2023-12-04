import { Button as Buttons } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick?: (() => Promise<void>) | (() => void) | any;
    isLoading?: boolean;
}

export function Button({ isLoading, children, onClick }: ButtonProps) {

    return (
        <Buttons
            type="submit"
            _hover={{ bg: "#385898b5" }}
            color="white"
            bg="facebook.100"
            mt="1.5rem"
            mx="auto"
            w="10rem"
            onClick={onClick}
            isLoading={isLoading}
        >
            {children}
        </Buttons>
    )
}