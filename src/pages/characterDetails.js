import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/static';
import MakeGetCharacterRequest from '../api/getCharactersApi';
import { Box, Center, Divider, Flex, Heading, Image, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import Header from '../components/header';
import Loader from '../components/loader';
import CircularImage from '../components/circularImage.js';
import episode4 from '../public/film1.jpg'
import episode5 from '../public/film2.jpg'
import episode6 from '../public/film3.jpg'
import episode1 from '../public/film4.jpg'
import episode2 from '../public/film5.jpg'
import episode3 from '../public/film6.jpg'
import episode7 from '../public/film7.jpg'



function CharacterDetails() {
  const { State, dispatch } = useAppContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { character } = State;
  const filmImages = [
    episode1,
    episode2,
    episode3,
    episode4,
    episode5,
    episode6,
    episode7
  ]
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getCharacter();
  }, []);

  const getCharacter = async () => {
    setLoading(true);
    await dispatch({ type: "SET_CHARACTER_FILM_EMPTY", payload: [] });
    const data = await MakeGetRequest(`/people/${id}`);
    await data?.result?.films.map(async (item, i) => {
      const filmData = await MakeGetCharacterRequest(item)
      await dispatch({ type: "SET_CHARACTER_FILM", payload: filmData.result });
      if(i == data?.result?.films.length - 1) {
        setLoading(false)
      }
    })
    if (data?.response?.status != 403) {
      await dispatch({ type: "SET_CHARACTER_ARRAY", payload: data.result });
    }
  }
  const data = character?.peopleArr
  const peopleFilmData = character?.peopleFilm
  let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
  return (
    <VStack  >
      <Header />
      {loading ? (
       <Loader/>
      ) : data &&

      <Box
        overflow="hidden"
        cursor="pointer"
        bg={'rgb(26, 26, 26)'}
        p={{ base: "5%", md: "5%", lg: "5% " }}
        position="relative"
        
        width="100%"
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box
            // flex="1"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="center"
            // justifyContent="center"
            minW="80%"
            p={4}
          >
            <CircularImage src={newUrl} alt="A circular image" size="350px"  />
            <Box>
            <Text fontWeight="bold" fontFamily= "Roboto" fontSize = "36px" lineHeight="42px" textAlign="center" color={'white'} padding={"10px 0px"}>
              {data.name}
            </Text>
            {/* <Divider my={2} /> */}
            <Box width="100%" color={"white"} fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" >
              <Flex  padding={"10px 0px"} width="100%">
                <Text textAlign= "start"  color= "rgb(179, 179, 179)" width={"150px"}>Height</Text>
                <Text textAlign= "start">{data.height}</Text>
              </Flex>
              <Flex padding={"10px 0px"}  width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Mass</Text>
                <Text textAlign= "start">{data.mass}</Text>
              </Flex>
              <Flex padding={"10px 0px"}  width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Hair Color</Text>
                <Text textAlign= "start">{data.hair_color}</Text>
              </Flex>
              <Flex padding={"10px 0px"} width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Skin Color</Text>
                <Text textAlign= "start">{data.skin_color}</Text>
              </Flex>
              <Flex padding={"10px 0px"} width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Eye Color</Text>
                <Text textAlign= "start">{data.eye_color}</Text>
              </Flex>
              <Flex padding={"10px 0px"} width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Birth Year</Text>
                <Text textAlign= "start">{data.birth_year}</Text>
              </Flex>
              <Flex padding={"10px 0px"} width="100%">
                <Text textAlign= "start" fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px" color= "rgb(179, 179, 179)" width={"150px"}>Gender</Text>
                <Text textAlign= "start">{data.gender}</Text>
              </Flex>
              </Box>
            </Box>
          </Box>
          
        </Flex>

      </Box>


      }
      <Box 
          p={3}
          pl={"5%"}
          w={'100%'}
          // bg={"rgb(245, 245, 245)"}
        >
          <Text fontWeight={700} fontFamily= "Roboto" fontSize = "24px" lineHeight="30px" >
            Film List
          </Text>
          </Box>
      {!loading && <Box  width="100%" 
        borderRadius="lg"
        overflow="hidden"
        bg={'white'}
        cursor="pointer"
        position="relative"
        >
        
          {peopleFilmData && peopleFilmData.length > 0 ? (
              <SimpleGrid columns={{ base: 2 , sm: 3, md: 4, lg: 5 }} spacing={4}  marginLeft="5%" marginRight= "5%" background="white"  >
            {peopleFilmData.map((film, i) => {
              
            return(
                            <Box o key={i} borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                cursor="pointer"
                                position="relative"
                                _hover={{
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease',
                                    zIndex: '1',
                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                }}>
                                <Image src={filmImages[film?.episode_id -1]} alt={film.title} w={"100%"} onError={(e) => { console.error('Error loading image:', e.nativeEvent.error) }} />
                                <Box
                                    // position=""
                                    // bottom="0"
                                    w="100%"
                                    textAlign="center"
                                    bg="blackAlpha.700"
                                    color="white"
                                    p={2}
                                    height={"100%"}
                                >
                                    <Text color={"white"} fontSize= "16px" fontWeight= {400} lineHeight= "24px" letterSpacing= "0.2px">
                                        {film.title}
                                    </Text>
                                </Box>
                            </Box>
)})}
                </SimpleGrid>
            
          ) : (
            <Text>No films available</Text>
          )}
      </Box>}
    </VStack>
  )
}

export default CharacterDetails
