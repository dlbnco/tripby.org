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
      <Flex m={-2} flexWrap="wrap">
        <Box width={1} p={2}>
          <SubstanceClass substance={substance} />
        </Box>
        <Box width={1} p={2}>
          <SubstanceRoas substance={substance} />
        </Box>
        {substance.tolerance && (
          <Box width={1} p={2}>
            <SubstanceTolerance substance={substance} />
          </Box>
        )}
        <Box width={1} p={2}>
          <Card shadow={false}>
            <Flex flexDirection="column" m={-1}>
              {substance.toxicity && (
                <Box p={1}>
                  <Text fontSize={0} mb={2} variant="secondary">
                    <FormattedMessage id="Substance.toxicity" />
                  </Text>
                  {upperFirst(substance.toxicity)}
                </Box>
              )}
              {substance.addictionPotential && (
                <Box p={1}>
                  <Text fontSize={0} mb={2} variant="secondary">
                    <FormattedMessage id="Substance.addictionPotential" />
                  </Text>
                  {upperFirst(substance.addictionPotential)}
                </Box>
              )}
            </Flex>
          </Card>
        </Box>
      </Flex>
    </>
  );
};

SubstancePageHeader.propTypes = {
  substance: PropTypes.object.isRequired,
};

export default SubstancePageHeader;
