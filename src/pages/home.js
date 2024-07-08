import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/static';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import MakeGetCharacterRequest from '../api/getCharactersApi';
import starWarImage from '../public/star-wars.jpg'
import Header from '../components/header';
import Loader from '../components/loader';
// import { FaHeart } from 'react-icons/fa';

function HomePage() {
    const { State, dispatch } = useAppContext()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;
    const { character } = State;


    const navigate = useNavigate()


    useEffect(() => {
        getCharacters(); // API for fetching all character
    }, []);

    const getCharacters = async () => {
        setLoading(true);
        const data = await MakeGetRequest(`/people`);
        if (data?.response?.status != 403) {
            await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
            setLoading(false);
            setTotalPages(Math.ceil(data?.result?.count / itemsPerPage));

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
            }
        }

    };

    const getId = (url) => {
        let parts = url.split('/');
        return parts[parts.length - 2];

    }

    const toggleFavorite = (id) => {
        let updatedFavorites;
        if (favorites.includes(id)) {
            updatedFavorites = favorites.filter(favId => favId !== id);
        } else {
            updatedFavorites = [...favorites, id];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    return (
        <VStack spacing={0} >
            <Header />
            <Box
                w="100%"
                h="300px"


                bgImage={starWarImage}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
            />
            <Box
                p={3}
                textAlign="center"
                w={'100%'}
                bg={"rgb(245, 245, 245)"}
            >
                <Text fontWeight="bold" fontFamily="Roboto" fontSize="36px" lineHeight="42px" >
                    Star War Characters
                </Text>
            </Box>
            {loading ? (
                <Loader />
            ) :
                (<SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4} marginLeft="5%" marginRight="5%" marginTop="30px" background="white" p={4} >
                    {character?.characterArr?.results?.map((item, i) => {
                        const id = getId(item.url)
                        let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
                        const isFavorite = favorites.includes(id);
                        return (
                            <Box
                                onClick={() => { navigate(`/details/${id}`) }}
                                key={i} borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                cursor="pointer"
                                position="relative"
                                _hover={{
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease',
                                    zIndex: '1',
                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                }}
                            >
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
                                    {/* <Box
                                    as={FaHeart}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(id);
                                    }}
                                    color={isFavorite ? 'red.500' : 'white'}
                                    position="absolute"
                                    top="5px"
                                    right="5px"
                                    cursor="pointer"
                                /> */}
                                </Box>
                            </Box>
                        )
                    })}

                </SimpleGrid>)}
            {!loading && <Flex justify="center" align='center' mt={6} mb={6}>
                <Button
                    style={{
                        backgroundColor: currentPage === 1 ? 'gray' : 'rgb(248, 68, 100)',
                        color: 'white', // Ensure text color is readable
                    }}
                    _hover={{
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease',
                        zIndex: '1',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    }}
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
                    p={2}
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
                    style={{
                        backgroundColor: currentPage === totalPages ? 'gray' : 'rgb(248, 68, 100)',
                        color: 'white', // Ensure text color is readable
                    }}
                    _hover={{
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease',
                        zIndex: '1',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    }}
                    variant="solid"
                    ml={2}
                    onClick={() => { handleNextPage() }}
                    isDisabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Flex>}

        </VStack>
    )
}

export default HomePage
