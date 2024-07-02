import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Flex 
      justify="center" 
      align="center" 
      position="fixed" 
      top="0" 
      left="0" 
      width="100vw" 
      height="100vh" 
      bg="rgba(255, 255, 255, 0.8)" 
      zIndex="9999"
    >
      <Spinner size="xl" />
    </Flex>
  );
};

export default Loader;
