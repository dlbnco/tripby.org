import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import Text from '../../../Text';
import Button from '../../../Button';
import Container from '../../../Container';
import { FormattedMessage } from 'react-intl';
import { useTimeMachine } from '../..';
import ActiveState from './ActiveState';

const TimeMachineWizardLayout = ({ candidate, validRoas }) => {
  const { start, isActive } = useTimeMachine();
  return (
    <Container maxWidth={720}>
      <Text
        variant="secondary"
        textAlign="center"
        fontWeight="medium"
        fontSize={1}
        mb={1}
      >
        <FormattedMessage id="TimeMachine.title" />
      </Text>
      {isActive && <ActiveState data-test="time-machine-active-state" mb={3} />}
      {!isActive && candidate && (
        <Box py={3}>
          <Box as="ul" mb={3} fontSize={3}>
            <li>
              <FormattedMessage
                id="TimeMachine.guide.one"
                values={{ candidate: candidate.name }}
              />
            </li>
            <li>
              <FormattedMessage id="TimeMachine.guide.two" />
            </li>
          </Box>
          {validRoas ? (
            <Flex as="ul" m={-1}>
              {validRoas?.map(roa => (
                <li key={roa}>
                  <Button m={1} onClick={() => start(candidate, roa)}>
                    {roa}
                  </Button>
                </li>
              ))}
            </Flex>
          ) : (
            <Text>
              <FormattedMessage
                id="TimeMachine.notAvailableRoas"
                values={{ candidate: candidate.name }}
              />
            </Text>
          )}
        </Box>
      )}
      <Text variant="secondary" textAlign="center">
        <FormattedMessage id="TimeMachine.disclaimer" />
      </Text>
    </Container>
  );
};

TimeMachineWizardLayout.propTypes = {
  substance: PropTypes.object,
  candidate: PropTypes.object,
  roa: PropTypes.object,
  start: PropTypes.func,
  isActive: PropTypes.bool,
  phase: PropTypes.number,
  validRoas: PropTypes.array,
};

export default withTheme(TimeMachineWizardLayout);
