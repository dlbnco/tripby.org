import { useState, useEffect } from 'react';

const useRealTime = (interval = 500) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const realtimer = setInterval(() => {
      setNow(new Date());
    }, interval);
    return () => {
      clearInterval(realtimer);
    };
  }, []);
  return now;
};

export default useRealTime;
