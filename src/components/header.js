// Header.js
import React from 'react';
import { Box, Image, Flex, Spacer, Avatar } from '@chakra-ui/react';
import profileImg from '../public/profile.jpg'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    return (
        <Box w="100%" color={'white'} p={3} paddingLeft="5%" paddingRight="5%">
            <Flex align="center">
                <Image
                    cursor={'pointer'}
                    onClick={() => navigate('/')}
                    src="https://i.pinimg.com/originals/af/88/44/af8844965ad2573b78e7700595de00ee.png"
                    alt="Star Wars Logo"
                    h="50px"
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
