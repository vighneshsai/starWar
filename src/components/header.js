// Header.js
import React from 'react';
import { Box, Image, Flex, Spacer, Avatar } from '@chakra-ui/react';
import profileImg from '../public/profile.jpg'
import { useNavigate } from 'react-router-dom';
import logo from '../public/logo.png'



const Header = () => {
    const navigate = useNavigate();
    return (
        <Box w="100%" color={'white'} p={3} paddingLeft="5%" paddingRight="5%">
            <Flex align="center">
                <Image
                    cursor={'pointer'}
                    onClick={() => navigate('/')}
                    src={logo}
                    alt="Star Wars Logo"
                    h="40px"
                />
                <Spacer />
                <Avatar
                    name="Profile"
                    src={profileImg}
                    size="md"
                    cursor={'pointer'}
                />

            </Flex>
        </Box>
    );
};

export default Header;
