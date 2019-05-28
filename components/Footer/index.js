import React from 'react';
import { space } from 'styled-system';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import Container from '../Container';
import Text from '../Text';
import { FormattedMessage } from 'react-intl';

const links = [
  {
    id: 'twitter',
    url: 'https://twitter.com/tripby_',
  },
  {
    id: 'github',
    url: 'https://github.com/tripby/tripby.org',
  },
];

const Anchor = styled.a`
  ${space}
`;

const Wrapper = styled(Flex)`
  justify-content: space-between;
  border-top: ${({ theme }) => theme.border};
`;

Wrapper.defaultProps = {
  variant: 'primary',
  py: 3,
};

const Footer = () => (
  <Container>
    <Wrapper>
      <Flex m={-2}>
        {links.map(link => (
          <Anchor p={2} href={link.url} key={link.id}>
            <Text variant="secondary">{link.id}</Text>
          </Anchor>
        ))}
      </Flex>
      <a
        href="https://psychonautwiki.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text fontSize={0} variant="secondary">
          <FormattedMessage id="App.wikiCredits" />
        </Text>
      </a>
    </Wrapper>
  </Container>
);

export default Footer;
