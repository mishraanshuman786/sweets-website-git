import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Redirect to the home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Change this to the actual path of your home page
    }, 5000);

    // Update the countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the timer and interval if the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 100 }}>
      <h1 style={{ textAlign: "center" }}>Your payment has been done successfully.</h1>
      <p style={{ marginTop: 20, fontSize: 18 }}>
        Redirecting to home page in {countdown} seconds...
      </p>
    </div>
  );
};

export default Success;
