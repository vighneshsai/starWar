// Header.js
import React from 'react';
import { Box, Image, Flex, Spacer, Avatar } from '@chakra-ui/react';
import profileImg from '../public/profile.jpg'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
  return (
    <Box w="100%" color={'white'}  p={3} paddingLeft="5%" paddingRight= "5%">
      <Flex align="center">
        <Image
          cursor={'pointer'}
          onClick={() => navigate('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Star_Wars_-_The_Last_Jedi_logo.png/800px-Star_Wars_-_The_Last_Jedi_logo.png?20201015132623"
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
