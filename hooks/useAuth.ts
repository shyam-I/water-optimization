import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth(redirectIfMissing = true) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }

    if (redirectIfMissing && !token) {
      router.push('/login');
    }
  }, [router, redirectIfMissing]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return { user, logout };
}
