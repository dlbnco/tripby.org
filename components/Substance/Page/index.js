import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';

import Container from '../../Container';
import GET_SUBSTANCE from './query';
import Heading from '../../Heading';
import Text from '../../Text';
import { colors } from '../../../lib/constants';
import { FormattedMessage } from 'react-intl';
import SubstancePageHeader from '../Header';
import Card from '../../Card';
import SubstanceRoas from '../ROAs';

const SubstancePage = ({ name }) => {
  const { data } = useQuery(GET_SUBSTANCE, { variables: { query: name } });
  if (data && data.substances && data.substances.length) {
    const substance = data.substances[0];
    return (
      <Container py={[2, 3]}>
        <Flex style={{ maxWidth: '100%' }} flexWrap="wrap" m={[-2, -3, -4]}>
          <Box width={[1, null, 1 / 2, 1 / 3, 1 / 4]} p={[2, 3, 4]}>
            <SubstancePageHeader substance={substance} />
          </Box>
          <Box flex="1" p={[2, 3, 4]}>
            <Card>{substance.summary}</Card>
          </Box>
        </Flex>
      </Container>
    );
  }
  return null;
};

SubstancePage.propTypes = {};

export default SubstancePage;
