import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import SubstanceCard from '../Card';
import Text from '../../Text';
import { FormattedMessage } from 'react-intl';

const SubstanceInteractions = ({ substance }) => {
  const { uncertainInteractions, unsafeInteractions, dangerousInteractions } =
    substance;
  const interactions = [
    {
      id: 'dangerous',
      value: dangerousInteractions,
    },
    {
      id: 'unsafe',
      value: unsafeInteractions,
    },
    {
      id: 'uncertain',
      value: uncertainInteractions,
    },
  ];
  return (
    <Flex flexDirection="column" m={-3}>
      {interactions.map((type) => {
        if (type.value != null) {
          return (
            <Box p={3} key={type.id}>
              <Text fontSize={2} mb={3}>
                <FormattedMessage id={`Substance.interactions.${type.id}`} />
              </Text>
              <Flex flexWrap="wrap" m={-1}>
                {type.value.map((interaction) => (
                  <Box
                    width={[1, 1 / 2, 1 / 3]}
                    p={1}
                    key={`interaction-${interaction.name}`}
                  >
                    <SubstanceCard substance={interaction} />
                  </Box>
                ))}
              </Flex>
            </Box>
          );
        }
      })}
    </Flex>
  );
};

SubstanceInteractions.propTypes = {};

export default SubstanceInteractions;
