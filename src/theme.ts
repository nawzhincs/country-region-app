// theme.js


import { extendTheme  } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',

}

// 3. extend the theme
const theme = extendTheme({ config  , 
   styles: {
  'light': () => ({
    body: {
      bg: '#FAFAFA',
    },
  }),
},})

export default theme