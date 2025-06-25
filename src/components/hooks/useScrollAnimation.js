import { useEffect, useRef, useState } from 'react';

// Custom hook for scroll animations
export const useScrollAnimation = (threshold = 0.05) => { // Lower threshold for faster trigger
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin: '100px 0px -30px 0px' // More generous margins for earlier trigger
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, hasAnimated]);

  return { elementRef, isVisible };
};

// Custom hook for active section tracking
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and pick the most visible one
          const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // Less restrictive margins
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeSection;
};