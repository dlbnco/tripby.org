import React from 'react';
import { Box, Flex } from 'rebass';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { borderWidth } from 'styled-system';

import Logo from '../Logo';

const Wrapper = styled(Box).attrs(
  ({
    theme: {
      borderWidth: { regular },
    },
  }) => ({
    borderWidth: [`0 0 ${regular} 0`, `0 ${regular} 0 0`],
  })
)`
  border: ${({ theme }) => theme.border};
  ${borderWidth}
`;

Wrapper.defaultProps = {
  variant: 'primary',
};

const Navigation = props => {
  return (
    <Wrapper {...props}>
      <Flex flexDirection="column" style={{ height: '100%' }} p={[2, 3]}>
        <Box flex={1}>
          <Link href="/">
            <a>
              <Logo size={48} />
            </a>
          </Link>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Navigation;
