import { useScrollAnimation } from './hooks/useScrollAnimation';

const AnimatedWrapper = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 0.1,
  threshold = 0.1,
  className = '' 
}) => {
  const { elementRef, isVisible } = useScrollAnimation(threshold);

  const animationClasses = {
    fadeInUp: {
      initial: 'opacity-0 transform translate-y-8',
      animate: 'opacity-100 transform translate-y-0'
    },
    fadeInLeft: {
      initial: 'opacity-0 transform -translate-x-8',
      animate: 'opacity-100 transform translate-x-0'
    },
    fadeInRight: {
      initial: 'opacity-0 transform translate-x-8',
      animate: 'opacity-100 transform translate-x-0'
    },
    fadeIn: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    scaleIn: {
      initial: 'opacity-0 transform scale-95',
      animate: 'opacity-100 transform scale-100'
    },
    slideInUp: {
      initial: 'opacity-0 transform translate-y-16',
      animate: 'opacity-100 transform translate-y-0'
    }
  };

  const selectedAnimation = animationClasses[animation] || animationClasses.fadeInUp;

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${className} ${
        isVisible ? selectedAnimation.animate : selectedAnimation.initial
      }`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;