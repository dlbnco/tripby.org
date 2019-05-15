import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import { FormattedMessage } from 'react-intl';
import upperFirst from 'lodash/upperFirst';

import Text from '../../Text';
import { colors } from '../../../lib/constants';

const Duration = ({ roa }) => {
  const { duration } = roa;
  const durationSteps = Object.keys(duration).filter(
    item => item !== 'duration' && item !== '__typename'
  );
  return (
    <Flex flexDirection="column" m={-1}>
      <Text fontWeight="500" color={colors.persianGreen} p={1}>
        <FormattedMessage id="Substance.duration" />
      </Text>
      {durationSteps.map(durationStep => {
        const _durationStep = duration[durationStep];
        if (_durationStep) {
          return (
            <Flex
              p={1}
              justifyContent="space-between"
              key={`${roa.name}-${durationStep}`}
            >
              <Text>{upperFirst(durationStep)}</Text>
              <Text>
                {typeof _durationStep === 'number'
                  ? _durationStep
                  : `${_durationStep.min}–${_durationStep.max}`}{' '}
                {_durationStep.units}
              </Text>
            </Flex>
          );
        }
      })}
    </Flex>
  );
};

Duration.propTypes = {};

export default Duration;
