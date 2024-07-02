import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/static';
import MakeGetCharacterRequest from '../api/getCharactersApi';
import { Box, Center, Divider, Flex, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import Header from '../components/header';

function CharacterDetails() {
  const { State, dispatch } = useAppContext()
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { character } = State;

  useEffect(() => {
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
    <VStack spacing={8} background="#F0FFF0">
      <Header />
      {loading ? (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      ) : data &&

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        bg={'white'}
        position="relative"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease',
          zIndex: '1',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
        width="90%"
      >
        <Flex>
          <Box
            // flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW="50%"
            p={4}
          >
            <Image
              src={newUrl}
              alt={data.name}
              width='100%'
              onError={(e) => { console.error('Error loading image:', e.nativeEvent.error); }}
            />
          </Box>
          <Box
            flex="1"
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minW="50%"
          >
            <Text fontSize="50px" fontWeight="semibold" textAlign="center">
              {data.name}
            </Text>
            <Divider my={2} />
            <Box fontSize="30px" width="100%">
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Height:</Text>
                <Text >{data.height}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Mass:</Text>
                <Text>{data.mass}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Hair Color:</Text>
                <Text>{data.hair_color}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Skin Color:</Text>
                <Text>{data.skin_color}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Eye Color:</Text>
                <Text>{data.eye_color}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Birth Year</Text>
                <Text>{data.birth_year}</Text>
              </Flex>
              <Flex justify="space-around" width="100%">
                <Text fontWeight="bold">Gender</Text>
                <Text>{data.gender}</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>

      </Box>


      }
      {!loading && <Box mt={8} width="90%" borderWidth="1px" p={4}
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
