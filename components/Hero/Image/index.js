import React, { useMemo } from 'react';
import styled from 'styled-components';
import { width, space, maxHeight, height } from 'styled-system';

import images from './images';

const Image = styled.img`${space}${width}${height}${maxHeight}`;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const HeroImage = (props) => {
  const currentImg = useMemo(() => images[getRandomInt(0, images.length)], []);
  return <Image src={currentImg.src} {...props} />;
};

export default HeroImage;
