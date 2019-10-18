import React, { useEffect } from 'react';
import { useTimeMachine } from '..';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import GET_SUBSTANCE from '../../Substance/Page/query';

import validateSubstance from '../utils/validateSubstance';
import TimeMachineWizardLayout from './Layout';

const TimeMachineWizard = () => {
  const { substance, roa, start, isActive, phase } = useTimeMachine();
  const { query, push } = useRouter();
  const { data, loading } = useQuery(GET_SUBSTANCE, {
    variables: { query: query.name },
  });
  const candidate = query.name && data?.substances[0];
  useEffect(() => {
    if (!loading && !isActive && !candidate) {
      push('/');
    }
  }, [isActive, candidate]);
  const validRoas = candidate && validateSubstance(candidate);
  return (
    <TimeMachineWizardLayout
      substance={substance}
      roa={roa}
      start={start}
      isActive={isActive}
      phase={phase}
      candidate={candidate}
      validRoas={validRoas}
    />
  );
};

export default TimeMachineWizard;
