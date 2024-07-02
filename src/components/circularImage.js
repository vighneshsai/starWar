import React from 'react';
import { Image } from '@chakra-ui/react';

const CircularImage = ({ src, alt, size = '100px' }) => (
  <Image
    src={src}
    alt={alt}
    boxSize={size}
    borderRadius="full"
    objectFit="cover"
    objectPosition="top"
    margin={"0 32px 0 0"}
  />
);

export default CircularImage;
