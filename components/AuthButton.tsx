import { Button } from './ui/button';
import Link from 'next/link';
import { ROUTERS } from '@/constants/routers';
import { createClient } from '@/utils/supabase/client';
import useCustomRouter from '@/hooks/useCustomRouter';
import useStore from '@/state';

export default function AuthButton() {
  const { routerPush } = useCustomRouter();
  const supabase = createClient();
  const { currentUser: user, clearAuthState } = useStore((state) => state);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      clearAuthState();
      routerPush(ROUTERS.LOGIN);
    }
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!<Button onClick={signOut}>Logout</Button>
    </div>
  ) : (
    <Link
      href="/login"
      className="flex px-3 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
