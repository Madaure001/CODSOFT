import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Countdown = ({ initialSeconds = 10 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const navigate = useNavigate()

  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        navigate("/login") 
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  return (
    <div className='items-center'>
      <div className='flex justify-center'>
        <p className='text-basefont-medium'>redirecting in 
            <span className='text-blue font-medium text-lg'>
                {`0${seconds}`}
            </span>
        </p>        
      </div>
    </div>
  );
};

export default Countdown;