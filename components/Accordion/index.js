import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Flex, Box } from 'rebass';
import Text from '../Text';

const Header = styled(Flex).attrs(() => ({
  alignItems: 'center',
  pb: 2,
  variant: 'primary',
  role: 'button',
}))`
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  color: ${({ theme }) => theme.colors.purpleHeart};
  ${({ isCollapsed, theme: { colors, borderWidth, borderColor } }) =>
    css`
      border-bottom: ${borderWidth.regular} solid
        ${isCollapsed ? colors.purpleHeart : borderColor};
      ${({ isCollapsed }) =>
        isCollapsed &&
        css`
          font-weight: 500;
        `}
    `};
`;

const Arrow = styled(Text).attrs(() => ({ fontSize: 2, color: 'inherit' }))`
  transition: 0.2s;
  transform: rotate(${({ isCollapsed }) => (isCollapsed ? 360 : 0)}deg);
`;

const Accordion = ({ label, children, ...props }) => {
  const [isCollapsed, toggleCollapse] = useState(false);
  return (
    <Flex flexDirection="column" {...props}>
      <Header
        isCollapsed={isCollapsed}
        onClick={() => toggleCollapse(!isCollapsed)}
      >
        <Arrow isCollapsed={isCollapsed} mr={2}>
          {isCollapsed ? '–' : '+'}
        </Arrow>
        <span>{label}</span>
      </Header>
      {isCollapsed && <Box mt={2}>{children}</Box>}
    </Flex>
  );
};

Accordion.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
