import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import upperFirst from 'lodash/upperFirst';
import Link from 'next/link';

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
        <Link href="/">
          <a>
            <Text mt={[0, null, -4]} fontSize={4} mb={2} variant="secondary">
              ←
            </Text>
          </a>
        </Link>
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
        <Box width={1} p={3}>
          <SubstanceClass substance={substance} />
        </Box>
        <Box width={1} p={3}>
          <SubstanceRoas substance={substance} />
        </Box>
        {substance.tolerance && (
          <Box width={1} p={3}>
            <SubstanceTolerance substance={substance} />
          </Box>
        )}
        {substance.toxicity && (
          <Box width={1} p={3}>
            <Text mb={2} variant="secondary">
              <FormattedMessage id="Substance.toxicity" />
            </Text>
            <Text fontSize={2}>{upperFirst(substance.toxicity)}</Text>
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
