import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import Logo from '../Logo';

const Wrapper = styled(Box).attrs(() => ({ p: 2, variant: 'primary' }))`
  border-right: ${({ theme }) => theme.borderWidth.regular} solid
    ${({ theme }) => theme.borderColor};
`;

const Navigation = () => {
  return (
    <Wrapper>
      <Logo size={48} />
    </Wrapper>
  );
};

export default Navigation;
