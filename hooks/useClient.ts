import { useEffect, useState } from 'react';

export default function useClient() {
  const [isClient, setIsClient] = useState<boolean>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    isClient
  };
}
