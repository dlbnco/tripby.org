import React from 'react';
import { space } from 'styled-system';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import Container from '../Container';
import Text from '../Text';
import WikiLogo from '../Logo/Wiki';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Button from '../Button';
import Donate from '../Donate';

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

const Wrapper = styled(Box)`
  border-top: ${({ theme }) => theme.border};
`;

Wrapper.defaultProps = {
  variant: 'primary',
  py: 3,
};

const Footer = () => (
  <Container py={[2, 3]}>
    <Wrapper flexWrap="wrap" m={-1}>
      <Flex p={1} justifyContent="space-between">
        <Flex m={-2}>
          {links.map(link => (
            <Box p={2} key={link.id}>
              <Anchor href={link.url}>
                <Text variant="secondary">{link.id}</Text>
              </Anchor>
            </Box>
          ))}
        </Flex>
        <Flex alignItems="center">
          <WikiLogo size={24} />
          <a
            href="https://psychonautwiki.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text p={1} fontSize={0} variant="secondary">
              <FormattedMessage id="App.wikiCredits" />
            </Text>
          </a>
        </Flex>
      </Flex>
      <Text fontSize={0} p={1} variant="secondary">
        <FormattedHTMLMessage id="App.license" />
      </Text>
    </Wrapper>
    <Donate />
  </Container>
);

export default Footer;
