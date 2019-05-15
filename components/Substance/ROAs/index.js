import React from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { Flex, Box } from 'rebass';
import Card from '../../Card';
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

SubstanceRoas.propTypes = {};

export default SubstanceRoas;
