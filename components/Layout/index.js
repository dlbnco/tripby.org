import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import { height } from 'styled-system';
import GlobalStyle from './GlobalStyle';
import Header from '../Header';

const Wrapper = styled(Flex).attrs(() => ({
  alignItems: ['flex-start', 'stretch'],
  flexDirection: ['column', 'row'],
  height: ['100%', '100vh'],
}))`
  ${height};
  width: 100%;
`;

const Content = styled(Box)``;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Content width={1} py={[2, 3, 4]}>
        {children}
      </Content>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
