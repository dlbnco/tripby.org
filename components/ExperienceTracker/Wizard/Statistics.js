import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useExperienceTracker } from '..';
import Accordion from '../../Accordion';
import Text from '../../Text';

const ExperienceTrackerStatistics = props => {
  const { startedAt, endsAt } = useExperienceTracker();
  return (
    <Accordion label="View exact times" {...props}>
      <Text textAlign="center" variant="secondary">
        Started {formatDistanceToNow(startedAt, { addSuffix: true })}
      </Text>
      <Text textAlign="center" variant="secondary" title={endsAt.toISOString()}>
        Ends {formatDistanceToNow(endsAt, { addSuffix: true })}
      </Text>
    </Accordion>
  );
};

export default ExperienceTrackerStatistics;
