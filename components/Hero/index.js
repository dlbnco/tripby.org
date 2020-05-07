import React from 'react';
import { Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import transition from 'styled-transition-group';

import Text from '../Text';
import Input from '../Input';
import Container from '../Container';

const Wrapper = styled(Box)`
  background: ${({ theme }) => theme.greys['100']};
  transition: 0.25s ease-in;
`;

Wrapper.defaultProps = {
  py: [3, 4, 5],
};

const Heading = transition.div`
  &:enter { opacity: 0.01; max-height: 0; }
  &:enter-active {
    opacity: 1;
    max-height: 500px;
    transition: 0.25s ease-in;
  }
  &:exit { opacity: 1; max-height: 500px; }
  &:exit-active {
    max-height: 0;
    opacity: 0;
    transition: 0.25s ease-in;
  }
`;

const Title = styled(Text).attrs(() => ({ as: 'h1' }))`
  text-transform: uppercase;
`;

const Description = styled(Text)``;

const Hero = ({ filter, onChange, shrink, ...props }) => {
  return (
    <Wrapper py={shrink ? 4 : undefined} width={1} {...props}>
      <Container>
        {/* {!shrink && ( */}
        <Heading unmountOnExit timeout={100} in={!shrink}>
          <Title fontSize={[5, 6]} fontWeight="800" mb={1}>
            <FormattedMessage id="Hero.title" />
          </Title>
          <Description color="persianGreen" variant="secondary" mb={[3, 4]}>
            <FormattedMessage id="Hero.description" />
          </Description>
        </Heading>
        {/* )} */}
        <FormattedMessage id="Home.filter">
          {(placeholder) => (
            <Input
              fontSize={2}
              autoFocus
              placeholder={placeholder}
              value={filter}
              onChange={(e) => onChange(e.target.value)}
              width={1}
            />
          )}
        </FormattedMessage>
      </Container>
    </Wrapper>
  );
};

export default Hero;
