import { useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {}

export default function useIntersectionObserver(options?: Options) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEntries([entry]),
      options
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, entries] as const;
}
