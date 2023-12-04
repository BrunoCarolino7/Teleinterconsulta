import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './components/Header';

interface LayoutType {
    children: ReactNode;
}

function Layout({ children }: LayoutType) {

    return (
        <Box>
            <Header />
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;



