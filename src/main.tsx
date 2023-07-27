import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from './theme.ts'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleCountry from './components/SingeCountry.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(




  
     <ChakraProvider theme={theme}>
      {/* Make the theme first color */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/singlecountry/:countryname" element={<SingleCountry/>} />
      </Routes> 
 
    </BrowserRouter>
    </ChakraProvider>

)
