import React from 'react';
import { Flex, Box } from 'rebass';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Text from '../Text';
import Logo from '../Logo';
import Container from '../Container';
import WikiLogo from '../Logo/Wiki';
import { useExperienceTracker } from '../ExperienceTracker';
import Moon from '../ExperienceTracker/Wizard/Moon';

const Header = () => {
  const { isActive, phase, substance } = useExperienceTracker();
  const { pathname } = useRouter();
  return (
    <Box pt={[2, 3]} width={1}>
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="/">
            <a>
              <Logo size={40} />
            </a>
          </Link>
          {isActive && pathname !== '/tracker' && (
            <Link href="/tracker">
              <a>
                <Flex alignItems="center" mx={1}>
                  <Moon phase={phase} size={16} />
                  <Text ml={1} variant="secondary">
                    You are taking {substance.name} →
                  </Text>
                </Flex>
              </a>
            </Link>
          )}
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
