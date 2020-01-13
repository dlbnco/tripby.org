import React from 'react';
import { Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Text from '../Text';
import Input from '../Input';
import Container from '../Container';

const Wrapper = styled(Box)`
  background: ${({ theme }) => theme.greys['100']};
  transition: 0.1s ease-in;
`;

Wrapper.defaultProps = {
  py: [4, 5, 6],
};

const Title = styled(Text).attrs(() => ({ as: 'h1' }))`
  text-transform: uppercase;
`;

const Description = styled(Text)``;

const Hero = ({ filter, onChange, shrink, ...props }) => {
  return (
    <Wrapper py={shrink ? 4 : undefined} width={1} {...props}>
      <Container>
        {!shrink && (
          <>
            <Title fontSize={[5, 6]} fontWeight="800" mb={1}>
              <FormattedMessage id="Hero.title" />
            </Title>
            <Description color="persianGreen" variant="secondary" mb={[3, 4]}>
              <FormattedMessage id="Hero.description" />
            </Description>
          </>
        )}
        <FormattedMessage id="Home.filter">
          {placeholder => (
            <Input
              fontSize={2}
              autoFocus
              placeholder={placeholder}
              value={filter}
              onChange={e => onChange(e.target.value)}
              width={1}
            />
          )}
        </FormattedMessage>
      </Container>
    </Wrapper>
  );
};

export default Hero;
