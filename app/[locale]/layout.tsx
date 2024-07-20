'use client';

import { createClient } from '@/utils/supabase/client';
import useClient from '@/hooks/useClient';
import { useEffect } from 'react';
import useStore from '@/state';
import { AppProvider } from '@/providers/app-provider';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isClient } = useClient();
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser, setUser } = useStore((state) => state);

  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }

    return user;
  };

  useEffect(() => {
    void getUser();
  }, []);

  if (!isClient) {
    return null;
  }

  return <AppProvider>{children}</AppProvider>;
};

export default MainLayout;
