import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Card, StyledBody } from 'baseui/card';
import { Flex, Box } from 'rebass';
import Container from '../components/Container';
import GET_SUBSTANCES from '../queries/substances';

const offset = Math.floor(Math.random() * Math.floor(200));

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
