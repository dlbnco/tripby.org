import React, { useContext } from 'react';
import ExperienceTrackerContext from './context';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  addHours,
  subHours,
  addMinutes,
  subMinutes,
  addSeconds,
  subSeconds,
  differenceInSeconds,
  isWithinInterval,
  isValid,
} from 'date-fns';
import useRealTime from '../../hooks/useRealTime';

const getDateFnFromTimeUnit = (unit = 'hour', operation = 'add') => {
  switch (unit) {
    case 'hours':
      switch (operation) {
        case 'add':
          return addHours;
        case 'sub':
          return subHours;
      }
      break;
    case 'minutes':
      switch (operation) {
        case 'add':
          return addMinutes;
        case 'sub':
          return subMinutes;
      }
      break;
    case 'seconds':
      switch (operation) {
        case 'add':
          return addSeconds;
        case 'sub':
          return subSeconds;
      }
      break;
    default:
      return addHours;
  }
};

const ExperienceTrackerProvider = ({ children }) => {
  const now = useRealTime();
  const [substance, setSubstance] = useLocalStorage(
    'experienceTracker.substance'
  );
  const [roaName, setRoaName] = useLocalStorage('experienceTracker.roaName');
  const [startedAt, setStartTime] = useLocalStorage(
    'experienceTracker.startedAt'
  );
  const start = (substance, roa) => {
    setSubstance(substance);
    setRoaName(roa);
    setStartTime(new Date());
  };

  const stop = () => {
    setSubstance(null);
    setStartTime(null);
  };

  const roa = substance?.roas?.find(roa => roa.name === roaName);
  const startedAtDate = new Date(startedAt);

  const endsAt = getDateFnFromTimeUnit(roa?.duration?.onset?.units, 'add')(
    getDateFnFromTimeUnit(roa?.duration?.total?.units, 'add')(
      startedAtDate,
      roa?.duration?.total?.max
    ),
    roa?.duration?.onset?.max
  );

  const phase =
    differenceInSeconds(startedAtDate, now) /
    differenceInSeconds(startedAtDate, endsAt);

  const isActive = () => {
    if (isValid(now) && isValid(startedAtDate) && isValid(endsAt)) {
      return isWithinInterval(now, {
        start: startedAtDate,
        end: endsAt,
      });
    }
    return false;
  };

  const context = {
    isActive: isActive(),
    start,
    stop,
    substance,
    startedAt: startedAt ? startedAtDate : null,
    endsAt,
    phase,
    roa,
  };
  return (
    <ExperienceTrackerContext.Provider value={context}>
      {children}
    </ExperienceTrackerContext.Provider>
  );
};

export const useExperienceTracker = () => useContext(ExperienceTrackerContext);

ExperienceTrackerProvider.propTypes = {};

export default ExperienceTrackerProvider;
