import React from 'react';
import { Flex, Box } from 'rebass';
import styled, { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Moon from 'react-moon';
import Text from '../../Text';

const examplePhases = [0.16, 0.3, 0.5, 0.7, 0.84];

const Wrapper = styled(Flex)`
  opacity: 0.66;
  align-items: center;
  justify-content: space-between;
`;

const TimeMachineLegend = ({ theme, ...props }) => {
  return (
    <Wrapper {...props}>
      <Text variant="secondary" fontSize={0} m={2}>
        <FormattedMessage id="TimeMachine.legend.start" />
      </Text>
      {examplePhases.map(phaseExample => (
        <Box m={2} key={`legend-${phaseExample}`} style={{ opacity: 0.66 }}>
          <Moon
            m={2}
            lightColor={theme.colors.purpleHeart}
            darkColor={theme.greys['400']}
            size={24}
            phase={phaseExample}
          />
        </Box>
      ))}
      <Text variant="secondary" fontSize={0} m={2}>
        <FormattedMessage id="TimeMachine.legend.end" />
      </Text>
    </Wrapper>
  );
};

export default withTheme(TimeMachineLegend);
