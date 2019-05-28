import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Flex, Box } from 'rebass';

import Card from '../../Card';
import Text from '../../Text';

const SubstanceTolerance = ({ substance }) => {
  const { tolerance } = substance;
  return (
    <>
      <Text variant="secondary" mb={2}>
        <FormattedMessage id="Substance.tolerance" />
      </Text>
      <Flex flexDirection="column" m={-1}>
        {tolerance.full && (
          <Box p={1}>
            <Text fontSize={2}>
              <FormattedMessage id="Substance.tolerance.full" />
              &nbsp;{tolerance.full}
            </Text>{' '}
          </Box>
        )}
        {(tolerance.half || tolerance.zero) && (
          <Text p={1} variant="secondary">
            <FormattedMessage id="Substance.tolerance.intro" />
          </Text>
        )}
        {tolerance.half && (
          <Text fontSize={2} p={1}>
            <FormattedMessage
              id="Substance.tolerance.half"
              values={{ half: tolerance.half }}
            />
          </Text>
        )}
        {tolerance.zero && (
          <Text fontSize={2} p={1}>
            <FormattedMessage
              id="Substance.tolerance.zero"
              values={{ zero: tolerance.zero }}
            />
          </Text>
        )}
      </Flex>
    </>
  );
};

SubstanceTolerance.propTypes = {};

export default SubstanceTolerance;
