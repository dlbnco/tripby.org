import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

import Heading from '../../Heading';
import Text from '../../Text';
import { colors } from '../../../lib/constants';
import { FormattedMessage } from 'react-intl';
import SubstanceRoas from '../ROAs';

const SubstancePageHeader = ({ substance }) => {
  return (
    <>
      <Box mb={3}>
        <Heading
          style={{ textOverflow: '-' }}
          as="h1"
          fontSize={5}
          fontWeight="500"
        >
          {substance.name}
        </Heading>
        <Text fontSize={0} variant="secondary">
          <a href={substance.url} target="_blank" rel="noopener noreferrer">
            Wiki ↗
          </a>
        </Text>
      </Box>
      <Box mb={3}>
        <Text mb={1} fontSize={0} as="h2" variant="secondary">
          <FormattedMessage id="Substance.psychoactiveClass" />
        </Text>
        <Text color={colors.persianGreen} fontWeight="500">
          {substance.class.psychoactive.join('/')}
        </Text>
      </Box>
      <Box mb={3}>
        <Text mb={1} fontSize={0} as="h2" variant="secondary">
          <FormattedMessage id="Substance.chemicalClass" />
        </Text>
        <Text color={colors.persianGreen} fontWeight="500">
          {substance.class.chemical.join('/').replace('_', ' ')}
        </Text>
      </Box>
      <Box mb={3}>
        <Text fontSize={0} mb={2} variant="secondary">
          <FormattedMessage id="Substance.roas" />
        </Text>
        <SubstanceRoas substance={substance} />
      </Box>
    </>
  );
};

SubstancePageHeader.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstancePageHeader;
