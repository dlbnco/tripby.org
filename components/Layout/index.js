import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from '../Header';
import AppMeta from './Meta';

const Content = styled(Box)``;

const Layout = ({ children }) => {
  return (
    <>
      <AppMeta />
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
