import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Box, Flex } from 'rebass';

import GET_SUBSTANCES from '../../queries/substances';
import Input from '../Input';
import SubstanceCard from '../Substance/Card';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';
import Spinner from '../Spinner';
import Text from '../Text';

const Home = () => {
  const [filter, handleFilter] = useState('');
  const { data, loading } = useQuery(GET_SUBSTANCES, {
    variables: { limit: 300 },
  });
  const filterSubstances = useCallback(
    substances => {
      const lowerCaseFilter = filter.toLowerCase();
      return substances.filter(
        sub =>
          sub.name.toLowerCase().includes(lowerCaseFilter) ||
          (sub.class &&
            Object.values(sub.class).some(
              _class =>
                Array.isArray(_class) &&
                _class.some(__class =>
                  __class.toLowerCase().includes(lowerCaseFilter)
                )
            ))
      );
    },
    [filter]
  );
  const sortSubstances = useCallback(
    substances => {
      return substances.sort(a => {
        if (a.featured) {
          return -1;
        }
        return 0;
      });
    },
    [filter]
  );
  const substanceList =
    data && data.substances
      ? sortSubstances(filterSubstances(data.substances))
      : [];
  const noResults = filter.length > 0 && substanceList.length === 0;
  return (
    <>
      <Container>
        <Box mb={[3, 4]}>
          <FormattedMessage id="Home.filter">
            {placeholder => (
              <Input
                autoFocus
                placeholder={placeholder}
                value={filter}
                onChange={e => handleFilter(e.target.value)}
                width={1}
              />
            )}
          </FormattedMessage>
        </Box>
        <Flex flexWrap="wrap" m={-2}>
          {loading && <Spinner size={96} mx="auto" />}
          {!loading && noResults && (
            <Text variant="secondary" p={2} mx="auto" fontSize={3}>
              <FormattedMessage
                id="Home.noResults"
                values={{ query: filter }}
              />
            </Text>
          )}
          {substanceList.map(substance => (
            <Box
              width={[1, null, 1 / 2, 1 / 3, 1 / 4]}
              p={2}
              key={substance.name}
            >
              <SubstanceCard substance={substance} />
            </Box>
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default Home;
