import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import upperFirst from 'lodash/upperFirst';

import Text from '../../Text';
import { FormattedMessage } from 'react-intl';
import { colors } from '../../../lib/constants';

const Dose = ({ roa }) => {
  const { dose } = roa;
  const doseLevels = Object.keys(dose).filter(
    item => item !== 'units' && item !== '__typename'
  );
  const { units } = dose;
  return (
    <Flex flexDirection="column" m={-1}>
      <Text color={colors.persianGreen} fontWeight="500" p={1}>
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
  );
};

Dose.propTypes = {};

export default Dose;
