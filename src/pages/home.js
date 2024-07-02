import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/static';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Image, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import MakeGetCharacterRequest from '../api/getCharactersApi';
import starWarImage from '../public/star-wars.jpg'
import Header from '../components/header';

function HomePage() {
    const { State, dispatch } = useAppContext()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    const { character } = State;


    const navigate = useNavigate()


    useEffect(() => {
        getCharacters();
    }, []);

    const getCharacters = async () => {
        setLoading(true);
        const data = await MakeGetRequest(`/people`);
        if (data?.response?.status != 403) {
            await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
            setLoading(false);
           setTotalPages(Math.ceil(character?.characterArr?.count / itemsPerPage));

        }

    }

    const handlePrevPage = async () => {
        if (currentPage > 1) {
            try {
                if (character?.characterArr?.previous) {
                    setLoading(true);
                    const data = await MakeGetCharacterRequest(character.characterArr.previous)
                    await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
                    setLoading(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });


                }
                setCurrentPage(currentPage - 1);

            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            }
        }
    };

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            try {
                if (character?.characterArr?.next) {
                    setLoading(true);
                    const data = await MakeGetCharacterRequest(character.characterArr.next)
                    await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
                    setLoading(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setCurrentPage(currentPage + 1);

            } catch (error) {
                setLoading(false);
                console.error('Error:', error);
            }
        }

    };

    const getId = (url) => {
        let parts = url.split('/');
        return parts[parts.length - 2];

    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return (
        <VStack spacing={0} background="#F0FFF0">
            <Header />
            <Box
                w="100%"
                h="300px"
                mt={'30px'}
                mb={'30px'}
                bgImage={starWarImage}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
            />
            <Box 
          p={3}
          textAlign="center"
          w={'100%'}
        >
          <Text fontWeight="bold" fontSize= "50px" >
            Star War Characters
          </Text>
          </Box>
            {loading ? (
                <Center h="100vh">
                    <Spinner size="xl" />
                </Center>
            ) :
                (<SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}  marginLeft="5%" marginRight= "5%" marginTop="30px" background="white" p={4} >
                    {character?.characterArr?.results?.map((item, i) => {
                        console.log(item)
                        const id = getId(item.url)
                        let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
                        console.log(newUrl)
                        return (
                            <Box onClick={() => { navigate(`/details/${id}`) }} key={i} borderWidth="1px"
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
                                <Image src={newUrl} alt={item.name} onError={(e) => { console.error('Error loading image:', e.nativeEvent.error) }} />
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    w="100%"
                                    textAlign="center"
                                    bg="blackAlpha.700"
                                    color="white"
                                    p={2}
                                >
                                    <Text fontSize="xl" fontWeight="semibold">
                                        {item.name}
                                    </Text>
                                </Box>
                            </Box>
                        )
                    })}

                </SimpleGrid>)}
            <Flex justify="center" align='center' mt={6}>
                <Button
                    colorScheme={currentPage === 1 ? 'gray' : 'blue'}
                    variant="solid"
                    mr={2}
                    onClick={() => { handlePrevPage() }}
                    isDisabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Box 
          borderWidth="1px"
          borderRadius="md"
          p={3}
          textAlign="center"
          bg="gray.50"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          minWidth="120px"
        >
          <Text fontWeight="bold" fontSize="lg">
            {currentPage} of {totalPages}
          </Text>
        </Box>
                <Button
                    colorScheme={currentPage === totalPages ? 'gray' : 'blue'}
                    variant="solid"
                    ml={2}
                    onClick={() => { handleNextPage() }}
                    isDisabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Flex>

        </VStack>
    )
}

export default HomePage