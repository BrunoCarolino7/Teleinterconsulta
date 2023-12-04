import { Text, Icon, Tooltip, Box } from "@chakra-ui/react"
import { BsExclamationCircle } from 'react-icons/bs'

interface CustomCardProps {
    marginLabelLeft: number;
    marginLabelBottom: number;
    marginBoxLeft: number;
    marginBoxBottom: number;
    label: string;
}

export function CustomCard({ marginLabelLeft, marginLabelBottom, marginBoxLeft, marginBoxBottom, label }: CustomCardProps) {

    return (
        <Tooltip ml={marginLabelLeft} mb={marginLabelBottom} label={label} placement='auto-start'>
            <Box bg="green" ml={marginBoxLeft} mb={marginBoxBottom} position="absolute">
                <Text cursor="pointer" ><Icon color="facebook.100" position="absolute" as={BsExclamationCircle} /></Text>
            </Box>
        </Tooltip>
    )
}


