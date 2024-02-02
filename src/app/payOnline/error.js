"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Error() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div>
      <h1>Custom Error Page</h1>
      <p>Something went wrong...</p>
      <p>Redirecting to homepage in {countdown} seconds...</p>
    </div>
  );
}

export default Error;