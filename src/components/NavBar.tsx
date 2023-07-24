
import { Box , Button ,  Text , HStack,useColorModeValue , useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const {toggleColorMode,  colorMode} = useColorMode();
 
  let navigate = useNavigate();

  return (
  <Box onClick={()=> navigate('/')}   boxShadow={'sm'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}  padding='7px'>
  <HStack px={10} py={5} justifyContent='space-between'>
        <Text  fontWeight={'800'} >Where in the world?</Text>
        <HStack>
        <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                <Text px={2}> {colorMode === 'light' ? 'Dark Mode': 'Light Mode'}</Text>
              </Button>     
    </HStack>
    </HStack>
    </Box>
  )
}

export default NavBar