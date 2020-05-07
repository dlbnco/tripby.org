import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box } from 'rebass';
import throttle from 'lodash/throttle';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GET_SUBSTANCES from '../../queries/substances';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';
import Spinner from '../Spinner';
import Text from '../Text';
import ApolloError from '../ApolloError';
import Hero from '../Hero';
import HomeSubstanceList from './SubstanceList';
import HomeClassSelector from './ClassSelector';
import getFilteredSubstances from './utils/getFilteredSubstances';

const Home = () => {
  const { query, replace } = useRouter();
  const selectedClass = query?.class;
  const [filter, handleFilter] = useState('');
  const { data, loading, error } = useQuery(GET_SUBSTANCES, {
    variables: { limit: 300 },
  });

  const substances = data?.substances;
  const noResults = filter.length > 0 && substances?.length === 0;
  const isFiltering = filter.length > 0;
  const _getFilteredSubstances = throttle(
    () => getFilteredSubstances(data, filter, selectedClass),
    500
  );
  return (
    <>
      <Hero shrink={isFiltering} onChange={handleFilter} />
      <Container>
        <Box
          py={isFiltering ? 4 : [4, 5, 6]}
          style={{ transition: '.1s ease-in' }}
        >
          {error && <ApolloError error={error} />}
          {loading && <Spinner size={96} mx="auto" />}
          {!loading && noResults && (
            <Text variant="secondary" p={2} mx="auto" fontSize={3}>
              <FormattedMessage
                id="Home.noResults"
                values={{ query: filter }}
              />
            </Text>
          )}
          {!loading && !isFiltering && !error && (
            <HomeClassSelector
              selectedClass={selectedClass}
              data={data}
              onSelect={() => replace('/')}
            />
          )}
          {selectedClass && !filter && (
            <Text
              fontSize={[1, 2]}
              mb={[3, 4]}
              color="purpleHeart"
              textAlign="center"
            >
              <Link href="/" scroll={false}>
                <a>{selectedClass} ×</a>
              </Link>
            </Text>
          )}
          {(selectedClass || filter) && (
            <HomeSubstanceList substances={_getFilteredSubstances()} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
