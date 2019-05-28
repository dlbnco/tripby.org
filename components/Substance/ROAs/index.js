import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import RoaSection from './Section';
import { FormattedMessage } from 'react-intl';
import Card from '../../Card';
import Text from '../../Text';

const SubstanceRoas = ({ substance, ...props }) => {
  return (
    <>
      <Text mb={2} variant="secondary">
        <FormattedMessage id="Substance.roas" />
      </Text>
      <Flex flexDirection="column" {...props} m={-2}>
        {substance.roas.map(roa => (
          <Box p={2} key={`${substance.name}-roa-${roa.name}`}>
            <RoaSection roa={roa} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

SubstanceRoas.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstanceRoas;
