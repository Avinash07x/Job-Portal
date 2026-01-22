import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const [node, setNode] = useState<Element | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      setEntries(entries);
    }, options);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entries] as const;
};
