import React from 'react';
import styled from 'styled-components';
import { useExperienceTracker } from '..';
import { useRouter } from 'next/router';
import { Flex, Box } from 'rebass';
import Text from '../../Text';
import { useQuery } from '@apollo/react-hooks';
import GET_SUBSTANCE from '../../Substance/Page/query';
import Button from '../../Button';
import { formatDistanceToNow } from 'date-fns';
import MoonCircle from './Moon';
import Container from '../../Container';
import { space } from 'styled-system';
import Accordion from '../../Accordion';
import Link from 'next/link';
import ExperienceTrackerStatistics from './Statistics';
import Reset from './Reset';

const ExperienceTrackerWizard = () => {
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
  return (
    <Container maxWidth={720}>
      <Text
        variant="secondary"
        textAlign="center"
        fontWeight="medium"
        fontSize={1}
        mb={1}
      >
        Experience tracker
      </Text>
      {isRunning && (
        <Flex flexDirection="column" alignItems="center" py={3}>
          <Text
            color="heliotrope"
            textAlign="center"
            mb={3}
            fontSize={3}
            fontWeight="500"
          >
            You are taking{' '}
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
          <MoonCircle my={4} size={256} phase={Math.max(0.05, phase)} />
          <Text mb={3} variant="secondary" textAlign="center">
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
          <ExperienceTrackerStatistics
            mb={4}
            width={1}
            style={{ maxWidth: 320 }}
          />

          <Reset />
        </Flex>
      )}
      {!isRunning && candidate && (
        <Box py={3}>
          <Box as="ul" mb={3} fontSize={3}>
            <li>1. Take your dose of {candidate.name}</li>
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
      <Text variant="secondary" textAlign="center">
        This is an experimental feature! Use for fun.
      </Text>
    </Container>
  );
};

export default ExperienceTrackerWizard;
