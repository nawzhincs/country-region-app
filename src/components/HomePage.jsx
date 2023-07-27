import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Image } from '@chakra-ui/react'
import { Box, HStack } from '@chakra-ui/layout'
import { Button, GridItem, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Progress, SimpleGrid } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import {BsChevronDown} from 'react-icons/bs'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AdvancedExample from './AdvancedExample'
import DataTable from 'datatables.net-dt'
import { act } from 'react-dom/test-utils'
import ReactPaginate from 'react-paginate'

const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

const HomePage = () => {

    //state 
    const [menuItem , setMenuItem] = useState('all');
    const [searchInput , setSearchInput] = useState('');
    const [error , setErrors] = useState();
    const [data, setData]=useState([]);
   
    const [index, setIndex] = useState(0);


    const [page , setPage]= useState(0);

    const [activePage , setActivePage] = useState(0);

    const [searchData, setSearchData]=useState([]);

    // data 
    const filterRegion = ['all' , 'Africa', 'Americas' , 'Asia', 'Europe' , 'Oceania'];


    let navigate = useNavigate();

    // handle search input and filter
   const handleMenuItem =(value)=>{
    setIndex(1);
    setActivePage(1)
    
    console.log("Index now " , index);
    setMenuItem(value);

 
    




    
   }
 
 
   const handleActivePage = (activePage)=>{
    setActivePage(activePage)
   

    setIndex(activePage)
   


   }



   //TODO: search section 
   const handleSearchInput =(e)=>{
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
    setData(
        searchData.filter((element) =>
          element.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
   }


   useEffect(() => {

    if (menuItem === "all") {

      axios.get(`https://restcountries.com/v3.1/all`).then((response)=>{

       setPage(response.data.length / 8)
       
        setData(chunkIntoN(response.data , response.data.length / 8)),

        setSearchData(response.data); 
        

        
      }).catch((error)=>{
        console.log(error.message);
        setErrors(error.message)
      })
    } else {

        axios.get(`https://restcountries.com/v3.1/region/${menuItem}`)
        .then((response)=>{
           
            
            setPage(response.data.length / 8)

            setData(chunkIntoN(response.data , response.data.length / 8)),
            
            setSearchData(response.data);
        }).catch((error)=>{
            console.log(error.message);
            setErrors(error.message)
        })
  }
}, [menuItem]);


    if(error) return <span style={{  color:'orange', fontSize:'25px' , display:'flex' , justifyContent:'center' }}>Error in server {error}</span>
  return (
    <div>
        <NavBar />
        <Box p={10}>
            <HStack flexWrap={'wrap'}  justifyContent={'space-between'}>
           <Box boxShadow={'sm'}>
           <InputGroup  w={'300px'} >
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={searchInput}
                onChange={handleSearchInput}
                focusBorderColor='gray.400'
                type="text"
                placeholder="Search for a country "
              />
            </InputGroup>
           </Box>
            <Menu>
            <MenuButton  fontWeight={'400'} marginY={2} as={Button}  rightIcon={< BsChevronDown />} > {menuItem==='all' ? <span>Filter By Regions</span> : <span>{menuItem}</span> } </MenuButton>
            <MenuList 
            >
            {filterRegion.map(element=><MenuItem key={element}
            onClick={()=>{
              handleMenuItem(element)
            }
              }>{element}</MenuItem>)}
            </MenuList>
            </Menu>
            </HStack>
        </Box>
                {
            data.length===0 ?   (<Progress colorScheme="blue" size="xs" isIndeterminate />
            ) :
                    (
                        <Box w="100%">
                          <SimpleGrid
                            columns={{sm:1 ,md:2 , lg:3 , xl:4}}
                            spacing={10}
                   
                            pr="50"
                            pl="50"
                          >
                            {data[index].map((element , index ) => (
                              <GridItem
                             
                                key={element.name.common}
                                onClick={() =>
                                  navigate(`/singlecountry/${element?.cca2?.toLowerCase()}`, {})
                                  }
                              >
                                <Box
                                  margin={'0 auto'}
                                  maxW="sm"
                                  borderWidth="1px"
                                  borderRadius="lg"
                                  overflow="hidden"
                                  boxShadow={'md'}
                                  transition={'transform .2s'}
                                >
                                
                                  <Image
                                    src={element.flags.svg}
                                    alt={element.name.common}
                                    height="200px"
                                    width="100%"
                                  />
                                  <Box p="6">
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                    >
                                      {element.name.common}
                                    </Box>
                
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                    >
                                      Population: 
                                      <span style={{fontWeight:'normal' , marginLeft:'4px'}}>{element.population}</span>

                                    
                                    </Box>
                
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                    >
                                      Region: 
                                      <span style={{fontWeight:'normal',marginLeft:'4px'}}>{element.region}</span>
                                    </Box>
                
                                    <Box
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                    >
                                      Capital: 
                                      <span style={{fontWeight:'normal' , marginLeft:'4px'}}>{element.capital}</span>
                                    
                                    </Box>
                                  </Box>
                                </Box>
                              </GridItem>
                            ))}
                          </SimpleGrid>
                          <HStack pt={10} justifyContent={'Center'} >
                        
                     <ReactPaginate 

                      initialPage={index}
                      pageCount={page}
                      nextLabel={'next'}
                      previousLabel='previous'
                      breakLabel='...... '
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={4}
                      onPageChange={(page)=>{
                      }}
                      onClick={(data)=>{
                        // setPage(data.selected)
                        setIndex(data.selected);
                      }}
                      containerClassName='pagination justify-content-center'
                      pageClassName='page-item'
                      pageLinkClassName='page-link'
                      previousClassName='page-link'
                      nextClassName='page-link'
                      breakClassName='page-link'
                      activeClassName='active'
           

                      
                         />
                      </HStack>
                        </Box>

                        
             )
                
                }

    </div>
  )
}

export default HomePage