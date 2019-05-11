import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import Navigation from '../Navigation';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled(Flex)`
  width: 100vw;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper m={[-2, -3]} flexWrap="wrap">
      <GlobalStyle />
      <Box p={[2, 3]} width={[1, 1 / 3, 1 / 4, 1 / 5, 1 / 6]}>
        <Navigation />
      </Box>
      <Box p={[2, 3]} flex="1">
        {children}
      </Box>
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
