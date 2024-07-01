import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/backend';
import { useNavigate } from 'react-router-dom';
import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';

function HomePage() {
    const {State, dispatch} = useAppContext()
    const {character} = State;
    const navigate = useNavigate()
    useEffect(()=> {
        getCharacters();
      },[]);

      const getCharacters = async () => {
        const data = await MakeGetRequest(`/people`);
        if (data?.response?.status != 403) {
          await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
          console.log(data.result)
        }
        
      }
      const getId = (url) => {
        
        let parts = url.split('/');
        return  parts[parts.length - 2];

      }
      
  return (
    <div style={{display: "flex"}}>
        
                
                <SimpleGrid templateColumns='repeat(5, 1fr)' gap={4}>
                {character?.characterArr?.results?.map((item, i)=> {
            const id = getId(item.url)
            let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
            return (
                   <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                     <Image src={newUrl} alt={item.name} />
                     <Text mt={2} fontSize="xl" fontWeight="semibold">
                       {item.name}
                     </Text>
                   </Box>
                 )
                })}
               </SimpleGrid>
            
    </div>
  )
}

export default HomePage
