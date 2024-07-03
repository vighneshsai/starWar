import React from 'react';
import { Image } from '@chakra-ui/react';

const CircularImage = ({ src, alt, size = '100px' }) => (
  <Image
    src={src}
    alt={alt}
    boxSize={{ base: "250px", md: size }}
    borderRadius="full"
    objectFit="cover"
    objectPosition="top"
    margin={{ base: "0 0 20px 0", md: "0 32px 0 0" }}

  />
);

export default CircularImage;
