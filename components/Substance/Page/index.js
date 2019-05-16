import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';

import Container from '../../Container';
import Heading from '../../Heading';
import GET_SUBSTANCE from './query';
import SubstancePageHeader from '../Header';
import Card from '../../Card';
import { FormattedMessage } from 'react-intl';
import SubstanceEffects from '../Effects';

const SubstancePage = ({ name }) => {
  const { data } = useQuery(GET_SUBSTANCE, { variables: { query: name } });
  if (data && data.substances && data.substances.length) {
    const substance = data.substances[0];
    return (
      <Container py={[2, 3]}>
        <Flex flexWrap="wrap" m={[-2, null, -3]}>
          <Box
            width={[1, null, 2 / 5, 1 / 3, 1 / 4]}
            p={[2, null, 3]}
            style={{ position: 'sticky', top: 0, height: '100%' }}
          >
            <SubstancePageHeader substance={substance} />
          </Box>
          <Box flex="1" p={[2, null, 3]}>
            <Card>
              {substance.summary.length > 0 && (
                <>
                  <Heading as="h2" fontSize={2}>
                    <FormattedMessage id="Substance.summary" />
                  </Heading>
                  {substance.summary}
                </>
              )}
              {substance.effects && (
                <>
                  <Heading as="h2" fontSize={2} mb={3}>
                    <FormattedMessage id="Substance.effects" />
                  </Heading>
                  <SubstanceEffects effects={substance.effects} />
                </>
              )}
            </Card>
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
