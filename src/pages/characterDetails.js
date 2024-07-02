import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/static';
import MakeGetCharacterRequest from '../api/getCharactersApi';
import { Box, Center, Divider, Flex, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import Header from '../components/header';
import Loader from '../components/loader';
import CircularImage from '../components/circularImage.js';

function CharacterDetails() {
  const { State, dispatch } = useAppContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { character } = State;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getCharacter();
  }, []);

  const getCharacter = async () => {
    setLoading(true);
    await dispatch({ type: "SET_CHARACTER_FILM_EMPTY", payload: [] });
    const data = await MakeGetRequest(`/people/${id}`);
    data?.result?.films.map(async (item) => {
      const filmData = await MakeGetCharacterRequest(item)
      await dispatch({ type: "SET_CHARACTER_FILM", payload: filmData.result });
    })
    if (data?.response?.status != 403) {
      await dispatch({ type: "SET_CHARACTER_ARRAY", payload: data.result });
    }
    setLoading(false);
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
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        bg={'rgb(26, 26, 26)'}
        p={"5% 10% 5% 10%"}
        position="relative"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease',
          zIndex: '1',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        width="100%"
      >
        <Flex>
          <Box
            // flex="1"
            display="flex"
            alignItems="center"
            // justifyContent="center"
            minW="80%"
            p={4}
          >
            <CircularImage src={newUrl} alt="A circular image" size="350px" />
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
      {!loading && <Box mt={8} width="80%" borderWidth="1px" p={4}
        borderRadius="lg"
        overflow="hidden"
        bg={'white'}
        cursor="pointer"
        position="relative"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease',
          zIndex: '1',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}>
        <Heading as="h3" size="lg" mb={4} textAlign="center">
          Film List
        </Heading>
        <Divider mb={4} />
        <VStack spacing={3}>
          {peopleFilmData && peopleFilmData.length > 0 ? (
            peopleFilmData.map((film, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                width="100%"
                _hover={{
                  backgroundColor: 'gray.100',
                }}
              >
                <Text>{film.title}</Text>
              </Box>
            ))
          ) : (
            <Text>No films available</Text>
          )}
        </VStack>
      </Box>}
    </VStack>
  )
}

export default CharacterDetails
