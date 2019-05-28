import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Box, Flex } from 'rebass';

import GET_SUBSTANCES from '../queries/substances';
import Input from '../components/Input';
import SubstanceCard from '../components/Substance/Card';
import Container from '../components/Container';
import { FormattedMessage } from 'react-intl';

const AllSubstances = () => {
  const [filter, handleFilter] = useState('');
  const { data } = useQuery(GET_SUBSTANCES, { variables: { limit: 300 } });
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
  return (
    <>
      <Container>
        <Box mb={3}>
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
        <Flex flexWrap="wrap" m={-2} py={3}>
          {data &&
            data.substances &&
            sortSubstances(filterSubstances(data.substances)).map(substance => (
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
