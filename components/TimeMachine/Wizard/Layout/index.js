import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import Text from '../../../Text';
import Button from '../../../Button';
import Container from '../../../Container';
import Link from 'next/link';
import TimeMachineStatistics from '../Statistics';
import Reset from '../Reset';
import { FormattedMessage } from 'react-intl';
import Moon from 'react-moon';
import TimeMachineLegend from '../Legend';

const TimeMachineWizardLayout = ({
  theme,
  substance,
  roa,
  start,
  isActive,
  phase,
  candidate,
  validRoas,
}) => {
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
      {isActive && (
        <Flex flexDirection="column" alignItems="center" py={3}>
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
              <Link href={`/substance?name=${substance.name}`}>
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
      )}
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
