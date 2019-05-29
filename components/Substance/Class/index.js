import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import Text from '../../Text';
import { colors } from '../../../lib/constants';

const SubstanceClass = ({ substance }) => {
  return (
    <>
      <Flex flexDirection="column" m={-1}>
        {Array.isArray(substance.class.psychoactive) && (
          <Box p={1}>
            <Text mb={1} as="h2" variant="secondary">
              <FormattedMessage id="Substance.psychoactiveClass" />
            </Text>
            <Text fontSize={2} color={colors.persianGreen} fontWeight="500">
              {substance.class.psychoactive.join(' / ')}
            </Text>
          </Box>
        )}
        {Array.isArray(substance.class.chemical) && (
          <Box p={1}>
            <Text mb={1} as="h2" variant="secondary">
              <FormattedMessage id="Substance.chemicalClass" />
            </Text>
            <Text fontSize={2} color={colors.persianGreen} fontWeight="500">
              {substance.class.chemical.join(' / ').replace('_', ' ')}
            </Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

SubstanceClass.propTypes = {};

export default SubstanceClass;
