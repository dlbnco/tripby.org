import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box, Flex } from 'rebass';
import flatMap from 'lodash/flatMap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GET_SUBSTANCES from '../../queries/substances';
import SubstanceCard from '../Substance/Card';
import Container from '../Container';
import { FormattedMessage } from 'react-intl';
import Spinner from '../Spinner';
import Text from '../Text';
import ApolloError from '../ApolloError';
import Hero from '../Hero';
import Card from '../Card';

const getClasses = (list, type) => {
  return [...new Set(flatMap(list, substance => substance?.class?.[type]))]
    .filter(Boolean)
    .sort((a, b) => a > b);
};

const Home = () => {
  const { query } = useRouter();
  const selectedClass = query?.class;
  const [filter, handleFilter] = useState('');
  const { data, loading, error } = useQuery(GET_SUBSTANCES, {
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
    data && data.substances && Array.isArray(data.substances)
      ? sortSubstances(filterSubstances(data?.substances))
      : [];
  const noResults = filter.length > 0 && substanceList.length === 0;
  const psychoactiveClasses = getClasses(substanceList, 'psychoactive');
  const isFiltering = filter.length > 0;
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
          {!loading && !isFiltering && (
            <Text
              textAlign="center"
              mb={[3, 4, 5]}
              fontSize={3}
              variant="secondary"
            >
              <FormattedMessage id="Home.classes.title" />{' '}
              {selectedClass && (
                <span>
                  →{' '}
                  <Link href="/" scroll={false}>
                    <a>{selectedClass} ×</a>
                  </Link>
                </span>
              )}
            </Text>
          )}
          <Flex flexWrap="wrap" m={isFiltering ? undefined : -2}>
            {psychoactiveClasses
              .filter(psychoactiveClass =>
                selectedClass ? psychoactiveClass === selectedClass : true
              )
              .map(psychoactiveClass =>
                isFiltering || selectedClass ? (
                  <Box width={1} key={`classList-${psychoactiveClass}`}>
                    {!selectedClass && (
                      <Text p={2} fontSize={2} mb={1}>
                        {psychoactiveClass}
                      </Text>
                    )}
                    <Flex flexWrap="wrap" width={1}>
                      {substanceList
                        .filter(substance =>
                          substance.class?.psychoactive?.includes(
                            psychoactiveClass
                          )
                        )
                        .filter(substance =>
                          selectedClass
                            ? substance.class?.psychoactive?.includes(
                                selectedClass
                              )
                            : true
                        )
                        .map(substance => (
                          <Box
                            width={[1, null, 1 / 2, 1 / 3, 1 / 4]}
                            p={2}
                            key={substance.name}
                          >
                            <SubstanceCard substance={substance} />
                          </Box>
                        ))}
                    </Flex>
                  </Box>
                ) : (
                  <Box
                    width={[1, 1 / 2, 1 / 3]}
                    p={2}
                    key={`classList-${psychoactiveClass}`}
                  >
                    <Link scroll={false} href={`?class=${psychoactiveClass}`}>
                      <a>
                        <Card>
                          <Text color="purpleHeart" p={2} fontSize={2} mb={1}>
                            {psychoactiveClass} →
                          </Text>
                        </Card>
                      </a>
                    </Link>
                  </Box>
                )
              )}
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default Home;
