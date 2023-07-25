import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Center, GridItem, HStack, Image, Progress, SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import axios from "axios";

function SingleCountry() {
  let { countryname } = useParams();

  const [data, setData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/alpha/${countryname}`).then((response)=>{
    setData(response.data);
    }).catch((error)=>{
      console.log("Error in fetching data error is " , error.message);
      
    })
  }, [countryname]);

  return (
    <div>
      <NavBar />

      <Box m={'8'} onClick={() => navigate(-1)}   >
        <Button size="md" variant="solid" >
           <AiOutlineArrowLeft /> &nbsp; Back
        </Button>
      </Box>

      {data === undefined || data === null ? (
        <Progress colorScheme="black" size="xs" isIndeterminate />

      ) : (
        data.map((element) => {
          return (
            <Center key={element.name.common} >
              <SimpleGrid
                columns={{sm:1 ,md:1 , lg:2 , xl:2}}
                spacing={100}
                pt="100"
                pr="50"
                pl="50"
              >
                <GridItem w="100%">
                  <Image src={element?.flags.svg} alt={element?.Region} height="350" />
                </GridItem>
                <GridItem w="100%">
                  <Box
                    mb={4}
                    mt="1"
                    fontWeight="semibold"
                    fontSize={30}
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {element.name?.common}
                  </Box>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box><span style={{fontWeight:'600'}}>Native Name:</span> {element?.name?.common}</Box>
                    <Box><span style={{fontWeight:'600'}}>Top Level Domain:</span> {element?.tld[0]}</Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box><span style={{fontWeight:'600'}}> Population:</span> {element.population}</Box>
                    <Box>
                    <span style={{fontWeight:'600'}}>  Currencies:{" "}</span>
                      {element.currencies[Object?.keys(element.currencies)[0]]?.name}
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box><span style={{fontWeight:'600'}}> Region:</span> {element.region}</Box>
                    <Box>
                    <span style={{fontWeight:'600'}}>Language(s)</span>: {element.languages[Object.keys(element?.languages)[0]]}
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box> <span style={{fontWeight:'600'}}>Subregion:</span> {element.subregion}</Box>
                  </SimpleGrid>

                  <SimpleGrid columns={2} spacing={10}>
                    <Box><span style={{fontWeight:'600'}}>Capital:</span> {element.capital}</Box>
                  </SimpleGrid>
                 
                  <HStack mt={10} justifyContent={'space-between'}  >
                    <Box><span style={{fontWeight:'600'}}>  Border Countries:  </span></Box>
                    <Box ml={10}>
                      {element?.borders?.map((countryBorder) => (
                        <Button
                          onClick={() => navigate(`/singlecountry/${countryBorder}`)}
                          key={countryBorder}
                
                          m="1"
                        >
                          {countryBorder}
                        </Button>
                      ))}
                    </Box>
                  </HStack>
                </GridItem>
              </SimpleGrid>
            </Center>
          );
        })
      )}
    </div>
  );
}

export default SingleCountry;