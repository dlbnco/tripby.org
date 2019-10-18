import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { FormattedMessage } from 'react-intl';
import Moon from 'react-moon';
import Link from 'next/link';
import Text from '../../../../Text';
import TimeMachineLegend from './Legend';
import TimeMachineStatistics from './Statistics';
import Reset from './Reset';
import { useTimeMachine } from '../../..';

const TimeMachineActiveState = ({ theme, ...props }) => {
  const { roa, substance, phase } = useTimeMachine();
  return (
    <Flex flexDirection="column" alignItems="center" {...props}>
      <Text
        color="heliotrope"
        textAlign="center"
        mb={3}
        fontSize={3}
        fontWeight="500"
      >
        <FormattedMessage id="TimeMachine.status" />{' '}
        <Text
          fontWeight="bold"
          style={{ display: 'inline' }}
          color="purpleHeart"
        >
          <Link href={`/substance?name=${substance?.name}`}>
            <a>{substance?.name}</a>
          </Link>
        </Text>{' '}
        ({roa?.name})
      </Text>
      <Box my={4}>
        <Moon
          size={256}
          lightColor={theme.colors.purpleHeart}
          darkColor={theme.greys['400']}
          phase={Math.max(0.033, phase)}
          border="0"
        />
      </Box>
      <TimeMachineLegend mb={4} />
      <TimeMachineStatistics mb={4} width={1} style={{ maxWidth: 320 }} />
      <Reset />
    </Flex>
  );
};

TimeMachineActiveState.propTypes = {
  theme: PropTypes.object,
  roa: PropTypes.object,
  substance: PropTypes.object,
  phase: PropTypes.object,
};

export default withTheme(TimeMachineActiveState);
