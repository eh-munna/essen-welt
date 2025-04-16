import { useTitleContext } from '@/context/Title/TitleProvider';
import { useEffect } from 'react';

export default function useTitle(title) {
  const { setTitle } = useTitleContext();
  useEffect(() => {
    if (title) {
      setTitle(title);
    }
    return () => {
      setTitle('Essen Welt');
    };
  }, [title, setTitle]);
}
