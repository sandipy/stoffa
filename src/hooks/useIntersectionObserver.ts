import { useState, useEffect, useRef } from 'react';

export interface UseIntersectionObserverOptions {
  /**
   * Percentage of target visibility before callback triggers (0.0 to 1.0)
   * Default: 0.12 (triggers when 12% is in view)
   */
  threshold?: number | number[];

  /**
   * Element used as the viewport for checking visibility.
   * Default: null (browser viewport)
   */
  root?: Element | null;

  /**
   * Margin around the root element (e.g. '0px 0px -50px 0px' to trigger slightly before bottom)
   */
  rootMargin?: string;

  /**
   * If true, keeps element marked visible once triggered (standard for scroll animations)
   * Default: true
   */
  triggerOnce?: boolean;

  /**
   * Initial state before observation begins.
   * Default: false
   */
  initialIsIntersecting?: boolean;

  /**
   * Optional delay in milliseconds before isVisible switches to true (useful for staggered elements)
   * Default: 0
   */
  delay?: number;
}

export interface UseIntersectionObserverReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
  isIntersecting: boolean;
  hasIntersected: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom React hook utilizing IntersectionObserver to track element visibility
 * for smooth scroll-triggered animations and luxury reveal effects.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0.12,
    root = null,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    initialIsIntersecting = false,
    delay = 0,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(initialIsIntersecting);
  const [hasIntersected, setHasIntersected] = useState<boolean>(initialIsIntersecting);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    // 1. Fallback for environments lacking IntersectionObserver (SSR or older browsers)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    // 2. Accessibility: Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    // If triggerOnce is enabled and we already intersected, skip observing
    if (triggerOnce && hasIntersected) return;

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [currentEntry] = entries;
        if (!currentEntry) return;

        setEntry(currentEntry);

        if (currentEntry.isIntersecting) {
          if (delay > 0) {
            timeoutId = window.setTimeout(() => {
              setIsIntersecting(true);
              setHasIntersected(true);
            }, delay);
          } else {
            setIsIntersecting(true);
            setHasIntersected(true);
          }

          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected, delay]);

  const isVisible = triggerOnce ? hasIntersected : isIntersecting;

  return {
    ref: elementRef,
    isVisible,
    isIntersecting,
    hasIntersected,
    entry,
  };
}
