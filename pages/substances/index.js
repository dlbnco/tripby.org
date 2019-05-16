import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Box, Flex } from 'rebass';
import { useRouter } from 'next/router';
import Link from 'next/link';

import GET_SUBSTANCES from '../../queries/substances';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import SubstanceCard from '../../components/Substance/Card';
import Container from '../../components/Container';
import SubstancePage from '../../components/Substance/Page';

const AllSubstances = () => {
  const { query } = useRouter();
  if (query && query.name) {
    return <SubstancePage name={query.name} />;
  }
  const [filter, handleFilter] = useState('');
  const { data } = useQuery(GET_SUBSTANCES, { variables: { limit: 300 } });
  const filterSubstances = useCallback(
    substances => {
      return substances.filter(sub =>
        sub.name.toLowerCase().includes(filter.toLowerCase())
      );
    },
    [filter]
  );
  return (
    <>
      <Container>
        <Heading fontSize={[4, 5]} py={[3, 4]}>
          All substances
        </Heading>
        <Box mb={3}>
          <Input
            placeholder="Filter by name 🔍"
            value={filter}
            onChange={e => handleFilter(e.target.value)}
          />
        </Box>
        <Flex flexWrap="wrap" m={-2} py={3}>
          {data &&
            data.substances &&
            filterSubstances(data.substances).map(substance => (
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

export default AllSubstances;
