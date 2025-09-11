import React, { useEffect, useRef, useState } from 'react';

export const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use more efficient IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                if (triggerOnce) {
                  setHasAnimated(true);
                }
              }, delay);
            } else {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px', // Start animation slightly before element is fully visible
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, delay, hasAnimated]);

  // Remove will-change after animation completes for better performance
  useEffect(() => {
    if (isVisible && triggerOnce) {
      const timer = setTimeout(() => {
        const element = elementRef.current;
        if (element) {
          element.style.willChange = 'auto';
        }
      }, 400); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [isVisible, triggerOnce]);

  const getAnimationClasses = () => {
    const baseClasses = 'gpu-accelerated transition-all duration-300 ease-out';
    
    // Apply will-change only during animation
    const willChangeClass = isVisible && !hasAnimated ? 'will-change-transform' : '';
    
    switch (animation) {
      case 'fade-up':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`;
      case 'fade-down':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-6'
        }`;
      case 'fade-left':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-6'
        }`;
      case 'fade-right':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-6'
        }`;
      case 'fade-in':
        return `${baseClasses} will-change-opacity ${
          isVisible 
            ? 'opacity-100' 
            : 'opacity-0'
        }`;
      case 'scale-up':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`;
      case 'scale-down':
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-105'
        }`;
      default:
        return `${baseClasses} ${willChangeClass} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};