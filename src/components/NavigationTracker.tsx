import React from 'react';
import { User } from 'lucide-react';
import { useActiveSection } from './hooks/useScrollAnimation';

const NavigationTracker = ({ sections = [] }) => {
  const activeSection = useActiveSection(sections.map(section => section.id));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 py-2 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300">
      <div className="text-white text-2xl font-semibold">
        ScholarSync
      </div>
      
      <div className="hidden md:flex space-x-8">
  {sections.map((section) => (
  <div key={section.id} className="relative">
    <button
      onClick={() => {
        if (section.href) {
          window.location.href = section.href; // Navigate to another page
        } else {
          scrollToSection(section.id); // Smooth scroll to in-page section
        }
      }}
      className={`text-white hover:text-gray-300 transition-colors duration-300 py-2 ${
        activeSection === section.id ? 'text-blue-300' : ''
      }`}
    >
      {section.name}
    </button>
    {/* Active section indicator */}
    {!section.href && (
      <div
        className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ${
          activeSection === section.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />
    )}
  </div>
))}

      </div>

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all duration-300">
        <User className="w-6 h-6 text-white" />
      </div>
    </nav>
  );
};

export default NavigationTracker;