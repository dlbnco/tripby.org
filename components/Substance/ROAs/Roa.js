import React, { useState } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import styled, { css } from 'styled-components';
import { Flex } from 'rebass';
import Text from '../../Text';
import { FormattedMessage } from 'react-intl';

const Header = styled(Flex).attrs(() => ({
  justifyContent: 'space-between',
  pb: 2,
  variant: 'primary',
  role: 'button',
  fontSize: 2,
}))`
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  ${({ isCollapsed, theme: { colors, borderWidth, borderColor } }) =>
    css`
      border-bottom: ${borderWidth.medium} solid
        ${isCollapsed ? colors.purpleHeart : borderColor};
      &:hover {
        color: ${colors.purpleHeart};
      }
      ${({ isCollapsed }) =>
        isCollapsed &&
        css`
          color: ${colors.purpleHeart};
          font-weight: 500;
        `}
    `};
`;

const Arrow = styled(Text)`
  transition: 0.2s;
  transform: rotate(${({ isCollapsed }) => (isCollapsed ? 180 : 0)}deg);
`;

const Roa = ({ roa }) => {
  const [isCollapsed, toggleCollapse] = useState(true);
  const { dose } = roa;
  const { units } = dose;
  const doseLevels = Object.keys(dose).filter(
    item => item !== 'units' && item !== '__typename'
  );
  return (
    <Flex flexDirection="column">
      <Header
        isCollapsed={isCollapsed}
        onClick={() => toggleCollapse(!isCollapsed)}
      >
        <span>{upperFirst(roa.name)}</span>
        <Arrow isCollapsed={isCollapsed}>⌄</Arrow>
      </Header>
      {isCollapsed && (
        <Flex flexDirection="column" py={2}>
          {dose && (
            <Flex flexDirection="column" m={-1}>
              <Text fontWeight="500" p={1}>
                <FormattedMessage id="Substance.dosage" />
              </Text>
              {doseLevels.map(doseLevel => {
                const _doseLevel = dose[doseLevel];
                if (_doseLevel) {
                  return (
                    <Flex
                      p={1}
                      justifyContent="space-between"
                      key={`${roa.name}-${doseLevel}`}
                    >
                      <Text>{upperFirst(doseLevel)}</Text>
                      <Text>
                        {typeof _doseLevel === 'number'
                          ? _doseLevel
                          : `${_doseLevel.min}–${_doseLevel.max}`}{' '}
                        {units}
                      </Text>
                    </Flex>
                  );
                }
              })}
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

Roa.propTypes = {};

export default Roa;
