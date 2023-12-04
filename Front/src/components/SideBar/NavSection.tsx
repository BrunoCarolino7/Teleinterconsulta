import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
    title: string;
    color: string;
    fontWeight: string;
    fontSize: string;
    children: ReactNode
}


export function NavSection({ fontSize, fontWeight, color, title, children }: NavSectionProps) {
    return (
        <Box>
            <Text fontWeight={fontWeight} color={color} fontSize={fontSize}>{title}</Text>

            <Stack spacing="2" mt="5" align="stretch">
                {children}
            </Stack>
        </Box>
    )

}
