// Header.js
import React from 'react';
import { Box, Image, Flex, Spacer, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import profileImg from '../public/profile.jpg'

const Header = () => {
  return (
    <Box w="100%" bg="black" p={4} paddingLeft="5%" paddingRight= "5%">
      <Flex align="center">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
          alt="Star Wars Logo"
          h="50px"
        />
         <Spacer />
        {/* <Link href="/" color="white" fontSize="lg" mr={4}>
          Home
        </Link> */}
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
