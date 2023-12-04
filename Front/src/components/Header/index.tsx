import { Flex, HStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function Header() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <>
            <Flex
                as="header"
                justifyContent="center"
                bg="white"
                w="100%"
                boxShadow="md"
            >
                {isWideVersion ? (
                    <Flex
                        // bg="pink"
                        justify="center"
                        pt="6" pb="6"
                        w="100%"
                    >
                        <HStack
                            spacing="80"
                        >
                            <>
                                <Link to={'/login'}><Image src="/logo.png" width={180} alt="Logo Hospital das Clínicas" /></Link>
                                <Image mt="5" src="/logoIcr.jpg" width={250} alt="Logo ICR" />
                            </>
                        </HStack>

                    </Flex>
                ) :
                    <Flex
                        w="100%"
                        py="4"
                        px="4"
                        justifyContent="space-between"
                        align="center"
                    >
                        <a href="/"><Image src="/logo.png" width="110px" alt="Logo Hospital das Clínicas" /></a>
                        <Image src="/logoIcr.jpg" width="40" alt="Logo ICR" />
                    </Flex>
                }
            </Flex >
        </>
    )
}
// const [flag, setFlag] = useBoolean();

//             <div onMouseEnter={setFlag.on} onMouseLeave={setFlag.off}>
//                 {flag ? 'The flag is ON!' : 'Hover me to turn ON'}
//             </div>