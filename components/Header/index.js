import React from 'react';
import { Flex, Box } from 'rebass';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withTheme } from 'styled-components';

import Text from '../Text';
import Logo from '../Logo';
import Container from '../Container';
import WikiLogo from '../Logo/Wiki';
import { useTimeMachine } from '../TimeMachine';
import Moon from 'react-moon';

const Header = ({ theme }) => {
  const { isActive, phase, substance } = useTimeMachine();
  const { pathname } = useRouter();
  return (
    <Box py={[2, 3]} width={1}>
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
                  <Moon
                    lightColor={theme.colors.purpleHeart}
                    darkColor={theme.greys['400']}
                    phase={phase}
                    size={16}
                    border="0"
                  />
                  <Text ml={1} variant="secondary">
                    You are taking {substance.name} →
                  </Text>
                </Flex>
              </a>
            </Link>
          )}
          <span>
            <Text color="purpleHeart">
              <a
                href="https://tripby.bigcartel.com  "
                target="_blank"
                rel="noopener noreferrer"
              >
                SHOP ↗
              </a>
            </Text>
          </span>
        </Flex>
      </Container>
    </Box>
  );
};

export default withTheme(Header);
