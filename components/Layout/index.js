import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import { height } from 'styled-system';
import Navigation from '../Navigation';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled(Flex).attrs(() => ({
  alignItems: ['flex-start', 'stretch'],
  flexDirection: ['column', 'row'],
  height: ['100%', '100vh'],
}))`
  ${height};
  width: 100%;
`;

const Content = styled(Box)`
  overflow-y: auto;
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper flexWrap="wrap">
      <GlobalStyle />
      <Navigation width={[1, 1 / 4, null, 1 / 5, 1 / 6]} />
      <Content width={[1, 3 / 4, null, 4 / 5, 5 / 6]}>{children}</Content>
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
