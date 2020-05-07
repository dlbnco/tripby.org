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

const Wrapper = styled(Flex)`
  border-top: ${({ theme }) => theme.border};
  justify-content: space-between;
`;

Wrapper.defaultProps = {
  variant: 'primary',
  py: 3,
};

const Footer = () => (
  <Container py={[2, 3]}>
    <Wrapper flexWrap="wrap" m={-1}>
      <Box p={1}>
        <Flex m={-2} mb={1}>
          {links.map((link) => (
            <Box p={2} key={link.id}>
              <Anchor href={link.url}>
                <Text variant="secondary">{link.id}</Text>
              </Anchor>
            </Box>
          ))}
        </Flex>
        <Text fontSize={0} variant="secondary">
          <FormattedHTMLMessage id="App.license" />
        </Text>
      </Box>
      <Flex alignItems="flex-end" flexDirection="column" p={1}>
        <Flex alignItems="center" mb={1}>
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
        <a
          href="https://absurd.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text p={1} fontSize={0} variant="secondary">
            <FormattedMessage id="App.illustrationCredits" />
          </Text>
        </a>
      </Flex>
    </Wrapper>
    <Donate />
  </Container>
);

export default Footer;
