import React from 'react';
import { space } from 'styled-system';
import styled from 'styled-components';
import { Flex, Box, Image, Link as RLink } from 'rebass';
import Container from '../Container';
import Text from '../Text';
import WikiLogo from '../Logo/Wiki';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Button from '../Button';
import Link from 'next/link';
import Donate from '../Donate';

const links = [
  {
    id: 'about',
    path: '/about',
  },
  {
    id: 'privacy policy',
    path: '/privacy-policy',
  },
  {
    id: 'terms & conditions',
    path: '/terms-conditions',
  },
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

const HybridLink = ({ to, ...props }) => {
  if (to.includes('http')) {
    return <Anchor href={to} {...props} />;
  }
  return (
    <Link href={to}>
      <a {...props} />
    </Link>
  );
};

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
    <Wrapper flexWrap="wrap" m={-2}>
      <Box p={2}>
        <Flex m={-2} flexDirection={['column', null, 'row']} mb={2}>
          {links.map((link) => (
            <Box p={2} key={link.id}>
              <HybridLink to={link.url ?? link.path}>
                <Text variant="secondary">{link.id}</Text>
              </HybridLink>
            </Box>
          ))}
        </Flex>
        <Text fontSize={0} variant="secondary" mb={2}>
          <FormattedHTMLMessage id="App.license" />
        </Text>
        <Donate />
      </Box>
      <Flex
        alignItems={['flex-start', null, 'flex-end']}
        flexDirection="column"
        p={2}
      >
        <Flex alignItems="center" mb={2}>
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
        <RLink
          href="https://absurd.design"
          target="_blank"
          rel="noopener noreferrer"
          mb={2}
        >
          <Text p={1} fontSize={0} variant="secondary">
            <FormattedMessage id="App.illustrationCredits" />
          </Text>
        </RLink>
        <Image src="/static/powered-vercel.svg" />
      </Flex>
    </Wrapper>
  </Container>
);

export default Footer;
