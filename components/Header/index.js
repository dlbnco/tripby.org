import React from 'react';
import { Flex, Box } from 'rebass';
import Link from 'next/link';

import Logo from '../Logo';
import Container from '../Container';
import WikiLogo from '../Logo/Wiki';

const Header = () => {
  return (
    <Box py={[2, 3]} width={1}>
      <Container>
        <Flex justifyContent="space-between">
          <Link href="/">
            <a>
              <Logo size={40} />
            </a>
          </Link>
          <a
            href="https://psychonautwiki.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WikiLogo size={32} />
          </a>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
