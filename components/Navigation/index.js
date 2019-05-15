import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import Link from 'next/link';

import Logo from '../Logo';

const Wrapper = styled(Box).attrs(() => ({ variant: 'primary' }))`
  border-right: ${({ theme }) => theme.borderWidth.regular} solid
    ${({ theme }) => theme.borderColor};
`;

const Navigation = props => {
  return (
    <Wrapper {...props}>
      <Box p={[2, 3]}>
        <Link href="/">
          <a>
            <Logo size={48} />
          </a>
        </Link>
      </Box>
    </Wrapper>
  );
};

export default Navigation;
