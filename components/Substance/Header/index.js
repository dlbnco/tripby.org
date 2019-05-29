import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import upperFirst from 'lodash/upperFirst';

import Heading from '../../Heading';
import Text from '../../Text';
import { FormattedMessage } from 'react-intl';
import SubstanceRoas from '../ROAs';
import SubstanceTolerance from '../Tolerance';
import SubstanceClass from '../Class';
import Card from '../../Card';

const SubstancePageHeader = ({ substance }) => {
  return (
    <>
      <Box mb={3}>
        <Heading
          style={{ textOverflow: '-' }}
          as="h1"
          fontSize={[6, 7]}
          fontWeight="bold"
          mb={1}
        >
          {substance.name}
        </Heading>
        <Text fontSize={0} variant="secondary">
          <a href={substance.url} target="_blank" rel="noopener noreferrer">
            Wiki ↗
          </a>
        </Text>
      </Box>
      <Flex m={-3} flexWrap="wrap">
        {substance.class && (
          <Box width={1} p={3}>
            <SubstanceClass substance={substance} />
          </Box>
        )}
        {substance.roas.length > 0 && (
          <Box width={1} p={3}>
            <SubstanceRoas substance={substance} />
          </Box>
        )}
        {substance.tolerance && (
          <Box width={1} p={3}>
            <SubstanceTolerance substance={substance} />
          </Box>
        )}
        {substance.toxicity && Array.isArray(substance.toxicity) && (
          <Box width={1} p={3}>
            <Text mb={2} variant="secondary">
              <FormattedMessage id="Substance.toxicity" />
            </Text>
            <Flex flexDirection="column" m={-1}>
              {substance.toxicity.map(item => (
                <Text p={1} key={`toxicity-${item}`} fontSize={2}>
                  {upperFirst(item)}
                </Text>
              ))}
            </Flex>
          </Box>
        )}
        {substance.addictionPotential && (
          <Box width={1} p={3}>
            <Text mb={2} variant="secondary">
              <FormattedMessage id="Substance.addictionPotential" />
            </Text>
            <Text fontSize={2}>{upperFirst(substance.addictionPotential)}</Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

SubstancePageHeader.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstancePageHeader;
