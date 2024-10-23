import React, { useState, useEffect } from 'react';

const Timer = ({ start, onTimerEnd }) => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (start && time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (time === 0) {
      onTimerEnd();
    }
  }, [start, time]);

  return <div className="timer">Time: {time}s</div>;
};

export default Timer;
