import React from 'react';
import SubstanceCard from '../../Substance/Card';
import { Box, Flex } from 'rebass';

const HomeSubstanceList = ({ substances, ...props }) => {
  return (
    <Flex flexWrap="wrap" width={1} {...props}>
      {substances?.map((substance) => (
        <Box width={[1, null, 1 / 2, 1 / 3, 1 / 4]} p={2} key={substance?.name}>
          <SubstanceCard substance={substance} />
        </Box>
      ))}
    </Flex>
  );
};

export default HomeSubstanceList;
