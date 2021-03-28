import { useEffect, useState } from 'react';

export type DifferenceBetweenDates = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const calculateDifferenceBetweenTwoDates = (
  dateLeft: Date,
  dateRight: Date
): DifferenceBetweenDates => {
  const difference = dateRight.getTime() - dateLeft.getTime();
  return {
    days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0,
    hours:
      difference > 0 ? Math.floor((difference / (1000 * 60 * 60)) % 24) : 0,
    minutes: difference > 0 ? Math.floor((difference / 1000 / 60) % 60) : 0,
    seconds: difference > 0 ? Math.floor((difference / 1000) % 60) : 0,
  };
};

export const useCountdown = (dateRight: Date): DifferenceBetweenDates => {
  const [difference, setDifference] = useState<DifferenceBetweenDates>(
    calculateDifferenceBetweenTwoDates(new Date(), dateRight)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDifference(calculateDifferenceBetweenTwoDates(new Date(), dateRight));
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dateRight]);

  return difference;
};
