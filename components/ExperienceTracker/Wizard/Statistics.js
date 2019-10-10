import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useExperienceTracker } from '..';
import Accordion from '../../Accordion';
import Text from '../../Text';
import { FormattedMessage } from 'react-intl';

const ExperienceTrackerStatistics = props => {
  const { startedAt, endsAt } = useExperienceTracker();
  return (
    <FormattedMessage id="TimeMachine.statistics">
      {statistics => (
        <Accordion label={statistics} {...props}>
          <Text textAlign="center" variant="secondary">
            <FormattedMessage
              id="TimeMachine.statistics.started"
              values={{
                start: formatDistanceToNow(startedAt, { addSuffix: true }),
              }}
            />
          </Text>
          <Text
            textAlign="center"
            variant="secondary"
            title={endsAt.toISOString()}
          >
            <FormattedMessage
              id="TimeMachine.statistics.ends"
              values={{
                end: formatDistanceToNow(endsAt, { addSuffix: true }),
              }}
            />
          </Text>
        </Accordion>
      )}
    </FormattedMessage>
  );
};

export default ExperienceTrackerStatistics;
