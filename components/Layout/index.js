import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import Navigation from '../Navigation';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled(Flex)`
  width: 100vw;
  height: 100vh;
  align-items: stretch;
  overflow: hidden;
`;

const Content = styled(Box)`
  overflow: auto;
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper flexWrap="wrap">
      <GlobalStyle />
      <Navigation width={[1, 1 / 4, null, 1 / 5, 1 / 6]} />
      <Content flex="1">{children}</Content>
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
