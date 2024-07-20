import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useCustomRouter() {
  const pathname = usePathname();
  const router = useRouter();

  const routerPush = useCallback(
    (path: string) => {
      if (path !== pathname) {
        router.push(path);
      }
    },
    [pathname, router]
  );

  const routerReplace = useCallback(
    (path: string) => {
      if (path !== pathname) {
        router.replace(path);
      }
    },
    [pathname, router]
  );

  const routerBack = useCallback(() => {
    router.back();
  }, [router]);

  const routerRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return {
    routerReplace,
    routerPush,
    routerBack,
    routerRefresh
  };
}
