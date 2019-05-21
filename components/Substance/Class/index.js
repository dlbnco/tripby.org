import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import Text from '../../Text';
import { colors } from '../../../lib/constants';
import Card from '../../Card';

const SubstanceClass = ({ substance }) => {
  return (
    <Card shadow={false}>
      <Flex flexDirection="column" m={-1}>
        <Box p={1}>
          <Text mb={1} fontSize={0} as="h2" variant="secondary">
            <FormattedMessage id="Substance.psychoactiveClass" />
          </Text>
          <Text fontSize={2} color={colors.persianGreen} fontWeight="500">
            {substance.class.psychoactive.join(' / ')}
          </Text>
        </Box>
        <Box p={1}>
          <Text mb={1} fontSize={0} as="h2" variant="secondary">
            <FormattedMessage id="Substance.chemicalClass" />
          </Text>
          <Text fontSize={2} color={colors.persianGreen} fontWeight="500">
            {substance.class.chemical.join(' / ').replace('_', ' ')}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

SubstanceClass.propTypes = {};

export default SubstanceClass;
