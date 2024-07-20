/* eslint-disable multiline-ternary */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import AuthButton from '@/components/AuthButton';
import { useCallback } from 'react';
import useStore from '@/state';

const Home = () => {
  const { currentUser } = useStore((state) => state);
  console.log('currentUser', currentUser);
  const renderAvatar = useCallback(() => {
    if (!currentUser) {
      return null;
    }

    return (
      <Avatar>
        <AvatarImage
          src={currentUser?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'}
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-end w-full max-w-4xl p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {renderAvatar()}
      {currentUser ? (
        <h1 className="text-2xl font-bold text-center">Welcome, {currentUser.email}!</h1>
      ) : (
        <h1>Welcome, Paramount</h1>
      )}
      <footer className="flex justify-end w-full p-8 text-xs text-center border-t border-t-foreground/10">
        <p>
          <a href="#" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            Paramount
          </a>
        </p>
      </footer>
    </div>
  );
};

export const runtime = 'edge';
export default Home;
