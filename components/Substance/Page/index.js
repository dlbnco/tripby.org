import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';

import Container from '../../Container';
import GET_SUBSTANCE from './query';
import SubstancePageHeader from '../Header';
import Card from '../../Card';

const SubstancePage = ({ name }) => {
  const { data } = useQuery(GET_SUBSTANCE, { variables: { query: name } });
  if (data && data.substances && data.substances.length) {
    const substance = data.substances[0];
    return (
      <Container py={[2, 3]}>
        <Flex flexWrap="wrap" m={[-2, null, -3]}>
          <Box width={[1, null, 2 / 5, 1 / 3, 1 / 4]} p={[2, null, 3]}>
            <SubstancePageHeader substance={substance} />
          </Box>
          <Box flex="1" p={[2, null, 3]}>
            <Card>{substance.summary}</Card>
          </Box>
        </Flex>
      </Container>
    );
  }
  return null;
};

SubstancePage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SubstancePage;
