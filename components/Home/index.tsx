import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box } from 'rebass';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '../Container';
import { FormattedMessage } from 'react-intl';
import Text from '../Text';
import ApolloError from '../ApolloError';
import Hero from '../Hero';
import HomeSubstanceList from './SubstanceList';
import HomeClassSelector from './ClassSelector';
import getFilteredSubstances from './utils/getFilteredSubstances';
import { Substance } from '../../lib/psy.is';

interface HomeProps {
  substances: Substance[];
}

const Home: React.FC<HomeProps> = ({ substances, error }) => {
  const { query, replace } = useRouter();
  const selectedClass = query?.class;
  const [filter, handleFilter] = useState('');

  const isFiltering = filter.length > 0;
  const _getFilteredSubstances = debounce(getFilteredSubstances, 500, {
    leading: true,
  });
  const filteredSubstances = useMemo(
    () => _getFilteredSubstances(substances, filter, selectedClass),
    [filter, selectedClass]
  );
  const noResults = filter.length > 0 && filteredSubstances?.length === 0;
  return (
    <>
      <Hero shrink={isFiltering} onChange={handleFilter} />
      <Container>
        <Box
          py={isFiltering ? 4 : [3, 4, 5]}
          style={{ transition: '.1s ease-in' }}
        >
          {error && <ApolloError error={error} />}
          {noResults && (
            <Text variant="secondary" p={2} mx="auto" fontSize={3}>
              <FormattedMessage
                id="Home.noResults"
                values={{ query: filter }}
              />
            </Text>
          )}
          {!isFiltering && !error && (
            <HomeClassSelector
              selectedClass={selectedClass}
              data={{ substances }}
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
          {(selectedClass || filter?.length > 2) && (
            <HomeSubstanceList substances={filteredSubstances} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
