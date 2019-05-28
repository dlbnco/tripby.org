import React from 'react';
import { Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Heading from '../Heading';
import Container from '../Container';

const Wrapper = styled(Box).attrs(() => ({ py: [3, 4] }))`
  background: ${({ theme }) => theme.greys['100']};
`;

const Title = styled(Heading).attrs(() => ({ as: 'h1', fontSize: [4, 5, 6] }))`
  text-transform: uppercase;
`;

const Hero = props => {
  return (
    <Wrapper width={1} {...props}>
      <Container>
        <Title fontSize={[4, 5]} fontWeight="800">
          <FormattedMessage id="Hero.title" />
        </Title>
      </Container>
    </Wrapper>
  );
};

export default Hero;
