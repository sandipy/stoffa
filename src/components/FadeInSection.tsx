import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: React.ElementType;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable wrapper component that triggers smooth scroll-driven fade-in
 * and subtle directional reveals via the Intersection Observer hook.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 750,
  distance = 24,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  as: Component = 'div',
  id,
  style,
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  const getTransform = (): string => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component
      ref={ref}
      id={id}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
