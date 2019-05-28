import React, { useState } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import styled, { css } from 'styled-components';
import { Flex, Box } from 'rebass';
import Text from '../../Text';
import Dose from './Dose';
import Duration from './Duration';

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

const RoaSection = ({ roa }) => {
  const [isCollapsed, toggleCollapse] = useState(false);
  const { dose, duration } = roa;
  return (
    <Flex flexDirection="column">
      <Header
        isCollapsed={isCollapsed}
        onClick={() => toggleCollapse(!isCollapsed)}
      >
        <Arrow isCollapsed={isCollapsed} mr={2}>
          {isCollapsed ? '–' : '+'}
        </Arrow>
        <span>{upperFirst(roa.name)}</span>
      </Header>
      {isCollapsed && (
        <Flex flexDirection="column" m={-2} py={2}>
          {dose && (
            <Box p={2}>
              <Dose roa={roa} />
            </Box>
          )}
          {duration && (
            <Box p={2}>
              <Duration roa={roa} />
            </Box>
          )}
        </Flex>
      )}
    </Flex>
  );
};

RoaSection.propTypes = {
  roa: PropTypes.object.isRequired,
};

export default RoaSection;
