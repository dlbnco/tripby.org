import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Flex, Box } from 'rebass';
import Link from 'next/link';

import Container from '../components/Container';
import Hero from '../components/Hero';
import { FormattedMessage } from 'react-intl';
import Text from '../components/Text';
import GET_SUBSTANCES from '../queries/substances';
import SubstanceCard from '../components/Substance/Card';

const offset = Math.floor(Math.random() * Math.floor(200));

export default () => {
  const { data } = useQuery(GET_SUBSTANCES, {
    variables: {
      limit: 12,
      offset,
    },
  });
  return (
    <>
      <Hero mb={[3, 4]} />
      <Container>
        <Flex m={-2} flexWrap="wrap" mb={3}>
          {data.substances &&
            data.substances.map(sub => (
              <Box p={2} width={[1, null, 1 / 2, 1 / 3, 1 / 4]} key={sub.name}>
                <SubstanceCard substance={sub} />
              </Box>
            ))}
        </Flex>
        <Link href="/substances">
          <a>
            <Text variant="secondary">
              <FormattedMessage id="Home.viewAll" />
            </Text>
          </a>
        </Link>
      </Container>
    </>
  );
};
