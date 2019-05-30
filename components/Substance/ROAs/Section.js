import React from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { Flex, Box } from 'rebass';
import Dose from './Dose';
import Duration from './Duration';
import Accordion from '../../Accordion';

const RoaSection = ({ roa }) => {
  const { dose, duration } = roa;
  return (
    <Accordion label={upperFirst(roa.name)}>
      <Flex flexDirection="column" m={-2} py={2}>
        {dose && (
          <Box p={2}>
            <Dose roa={roa} />
          </Box>
        )}
        {duration && (
          <Box p={2}>
            <Duration roa={roa} />
          </Box>
        )}
      </Flex>
    </Accordion>
  );
};

RoaSection.propTypes = {
  roa: PropTypes.object.isRequired,
};

export default RoaSection;
