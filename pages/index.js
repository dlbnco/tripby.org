import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Card, StyledBody } from 'baseui/card';
import { Flex, Box } from 'rebass';
import Container from '../components/Container';

const GET_SUBSTANCES = gql`
  query getSubstances($limit: Int) {
    substances(limit: $limit) {
      name
      images {
        image
      }
      class {
        psychoactive
      }
    }
  }
`;

export default () => {
  const { data } = useQuery(GET_SUBSTANCES, { variables: { limit: 6 } });
  return (
    <Container>
      <Flex m={-2} flexWrap="wrap">
        {data.substances &&
          data.substances.map(sub => (
            <Box p={2} width={[1, 1 / 2, 1 / 3]} key={sub.name}>
              <Card title={sub.name}>
                <StyledBody>{sub.class.psychoactive}</StyledBody>
              </Card>
            </Box>
          ))}
      </Flex>
    </Container>
  );
};
