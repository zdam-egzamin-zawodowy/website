import { useEffect, useState } from 'react';

export type DifferenceBetweenDates = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateDifference = (
  dateLeft: Date,
  dateRight: Date
): DifferenceBetweenDates => {
  const difference = dateRight.getTime() - dateLeft.getTime();
  return {
    days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0,
    hours:
      difference > 0 ? Math.floor((difference / (1000 * 60 * 60)) % 24) : 0,
    minutes: difference ? Math.floor((difference / 1000 / 60) % 60) : 0,
    seconds: difference ? Math.floor((difference / 1000) % 60) : 0,
  };
};

export const useCountdown = (dateRight: Date): DifferenceBetweenDates => {
  const [difference, setDifference] = useState<DifferenceBetweenDates>(
    calculateDifference(new Date(), dateRight)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDifference(calculateDifference(new Date(), dateRight));
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dateRight]);

  return difference;
};
