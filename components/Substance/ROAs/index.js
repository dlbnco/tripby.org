import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import RoaSection from './Section';

const SubstanceRoas = ({ substance, ...props }) => {
  return (
    <Flex flexDirection="column" {...props} m={-2}>
      {substance.roas.map(roa => (
        <Box p={2} key={`${substance.name}-roa-${roa.name}`}>
          <RoaSection roa={roa} />
        </Box>
      ))}
    </Flex>
  );
};

SubstanceRoas.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstanceRoas;
