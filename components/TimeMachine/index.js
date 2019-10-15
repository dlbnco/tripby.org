import React, { useContext } from 'react';
import TimeMachineContext from './context';
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

const TimeMachineProvider = ({ children }) => {
  const now = useRealTime();
  const [substance, setSubstance] = useLocalStorage('timeMachine.substance');
  const [roaName, setRoaName] = useLocalStorage('timeMachine.roaName');
  const [startedAt, setStartTime] = useLocalStorage('timeMachine.startedAt');
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
    <TimeMachineContext.Provider value={context}>
      {children}
    </TimeMachineContext.Provider>
  );
};

export const useTimeMachine = () => useContext(TimeMachineContext);

TimeMachineProvider.propTypes = {};

export default TimeMachineProvider;
