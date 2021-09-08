import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface Props {
  rootMargin?: string;
  threshold?: number;
  root?: HTMLElement;
}

const defaultOptions = {
  rootMargin: "50px",
  threshold: 0.4,
};

/**
 * https://github.com/jvidalv/josepvidal.dev/blob/a7a6ee486e/src/hooks/use-intersection-observer.ts
 * @param options
 */

export const useIntersectionObserver = <T>(
  options?: Props
): [
  setNode: Dispatch<SetStateAction<T>>,
  isIntersecting: boolean,
  hasIntersected: boolean
] => {
  const [node, setNode] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const memoizedOptions = useMemo(() => options ?? {}, [options]);

  useEffect(() => {
    if (node) {
      const handleObserve = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      };
      const observer: IntersectionObserver = new IntersectionObserver(
        handleObserve,
        {
          ...defaultOptions,
          ...memoizedOptions,
        }
      );
      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }
  }, [node, memoizedOptions]);

  useEffect(() => {
    if (!hasIntersected && isIntersecting) {
      setHasIntersected(true);
    }
  }, [isIntersecting, hasIntersected, setHasIntersected]);

  return [setNode, isIntersecting, hasIntersected];
};
