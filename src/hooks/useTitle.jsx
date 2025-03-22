import { useTitleContext } from '@/context/Title/TitleProvider';
import { useEffect } from 'react';

export default function useTitle(title) {
  const { setTitle } = useTitleContext();
  useEffect(() => {
    setTitle(title);
    document.title = title;
    return () => {
      document.title = 'Essen Welt';
    };
  }, [title, setTitle]);
}
