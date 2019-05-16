import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import Text from '../../Text';
import { colors } from '../../../lib/constants';

const SubstanceEffects = ({ effects }) => {
  return (
    <Flex flexWrap="wrap" m={-2}>
      {effects.map(effect => (
        <Box key={effect.name} p={2} width={[1, null, 1 / 2, 1 / 3, 1 / 4]}>
          <Text mb={1} color={colors.persianGreen}>
            {effect.name}
          </Text>
          <Text variant="secondary" fontSize={0}>
            <a target="_blank" rel="noopener noreferrer" href={effect.url}>
              Wiki ↗
            </a>
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

SubstanceEffects.propTypes = {
  effects: PropTypes.array.isRequired,
};

export default SubstanceEffects;
