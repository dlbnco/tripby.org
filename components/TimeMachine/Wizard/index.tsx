import React, { useEffect } from 'react';
import { useTimeMachine } from '..';
import { useRouter } from 'next/router';

import validateSubstance from '../utils/validateSubstance';
import TimeMachineWizardLayout from './Layout';
import { FullSubstance } from '../../../lib/psy.is';

interface TimeMachineWizardProps {
  substance: FullSubstance;
}

const TimeMachineWizard: React.FC<TimeMachineWizardProps> = ({ substance }) => {
  const { isActive } = useTimeMachine();
  const { push } = useRouter();
  const candidate = substance;
  useEffect(() => {
    if (!isActive && !candidate) {
      push('/');
    }
  }, [isActive, candidate]);
  const validRoas = candidate && validateSubstance(candidate);
  return (
    <TimeMachineWizardLayout candidate={candidate} validRoas={validRoas} />
  );
};

export default TimeMachineWizard;
