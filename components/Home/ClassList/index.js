import React from 'react';
import Link from 'next/link';
import { Flex, Box } from 'rebass';
import Card from '../../Card';
import Text from '../../Text';

const HomeClassList = ({ classes, ...props }) => {
  return (
    <Flex flexWrap="wrap" m={-2} {...props}>
      {classes.map((substanceClass) => (
        <Box
          width={[1, 1 / 2, 1 / 3]}
          p={2}
          key={`classList-${substanceClass}`}
        >
          <Link scroll={false} href={`?class=${substanceClass}`}>
            <a>
              <Card>
                <Text color="purpleHeart" p={2} fontSize={2} mb={1}>
                  {substanceClass} →
                </Text>
              </Card>
            </a>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default HomeClassList;
