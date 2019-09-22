import React from 'react';
import { useExperienceTracker } from '..';
import { useRouter } from 'next/router';
import { Flex, Box } from 'rebass';
import Modal from '../../Modal';
import Card from '../../Card';
import Text from '../../Text';
import { useQuery } from '@apollo/react-hooks';
import GET_SUBSTANCE from '../../Substance/Page/query';
import Button from '../../Button';
import {
  formatDistanceToNow,
  formatRelative,
  differenceInSeconds,
} from 'date-fns';
import MoonCircle from './Moon';
import useRealTime from '../../../hooks/useRealTime';

const Content = () => {
  const {
    substance,
    roa,
    start,
    startedAt,
    endsAt,
    stop,
    phase,
  } = useExperienceTracker();
  const isRunning = startedAt !== null;
  const { query } = useRouter();
  const { data } = useQuery(GET_SUBSTANCE, {
    variables: { query: query.name },
  });
  const candidate = data?.substances[0];
  const now = useRealTime();
  return (
    <div>
      <Text variant="secondary" fontWeight="medium" fontSize={2} mb={3}>
        🌚 Experience tracker
      </Text>
      {isRunning && (
        <Box py={3}>
          <Text color="purpleHeart" mb={3} fontSize={3} fontWeight="bold">
            You are taking {substance?.name} ({roa?.name})
          </Text>
          <MoonCircle my={3} size={256} phase={Math.max(0.05, phase)} />
          <Text mb={2} variant="secondary" textAlign="center">
            legend
          </Text>
          <Flex
            alignItems="center"
            m={-2}
            mb={4}
            justifyContent="space-between"
          >
            <Text variant="secondary" fontSize={0} m={2}>
              start
            </Text>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map(phaseExample => (
              <MoonCircle
                key={`legend-${phaseExample}`}
                m={2}
                size={32}
                phase={phaseExample}
              />
            ))}
            <Text variant="secondary" fontSize={0} m={2}>
              end
            </Text>
          </Flex>
          <Text>
            Started {formatDistanceToNow(startedAt, { addSuffix: true })}
          </Text>
          <Text title={endsAt.toISOString()}>
            Ends {formatDistanceToNow(endsAt, { addSuffix: true })}
          </Text>
          <Button onClick={stop} mt={3}>
            stop
          </Button>
        </Box>
      )}
      {!isRunning && candidate && (
        <Box py={3}>
          <Box as="ul" mb={3} fontSize={3}>
            <li>1. Take your dose</li>
            <li>
              2. Select your chosen route of administration below (or the
              closest one)
            </li>
          </Box>
          <Flex as="ul" m={-1}>
            {candidate.roas.map(roa => (
              <li key={roa.name}>
                <Button m={1} onClick={() => start(candidate, roa.name)}>
                  {roa.name}
                </Button>
              </li>
            ))}
          </Flex>
        </Box>
      )}
      <Text variant="secondary">
        This is an experimental feature! Use for fun.
      </Text>
    </div>
  );
};

const ExperienceTrackerWizard = () => {
  const { wizard } = useExperienceTracker();
  return (
    <Modal
      maxWidth={640}
      isOpen={wizard.isOpen}
      onClose={() => wizard.toggle(false)}
      content={<Content />}
    >
      {}
    </Modal>
  );
};

export default ExperienceTrackerWizard;
