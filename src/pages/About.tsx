import React from 'react';
import { BookOpen } from 'lucide-react';
import AnimatedWrapper from '../components/AnimatedWrapper';

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedWrapper animation="fadeInUp" duration={0.8}>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              About ScholarSync
            </h1>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="fadeInUp" delay={0.3} duration={0.8}>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ScholarSync is a research companion that helps students and professionals organize, 
              manage, and access information effortlessly. It streamlines the research process, making 
              knowledge discovery more structured and efficient.
            </p>
          </AnimatedWrapper>
        </div>

        {/* Mission Section */}
        <AnimatedWrapper animation="scaleIn" delay={0.6} duration={1}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedWrapper animation="fadeInLeft" delay={0.8} duration={0.8}>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Our Mission
                  </h2>
                </AnimatedWrapper>
                
                <AnimatedWrapper animation="fadeInLeft" delay={1} duration={0.8}>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We believe that academic research should be accessible and organized for everyone. 
                    ScholarSync empowers researchers at all levels by providing intuitive tools that 
                    simplify the research process, from initial discovery to final documentation.
                  </p>
                </AnimatedWrapper>
                
                <div className="space-y-4">
                  {[
                    { color: 'from-blue-500 to-purple-500', text: 'Streamline research workflows' },
                    { color: 'from-purple-500 to-pink-500', text: 'Enhance knowledge organization' },
                    { color: 'from-indigo-500 to-blue-500', text: 'Support academic excellence' }
                  ].map((item, index) => (
                    <AnimatedWrapper 
                      key={index}
                      animation="fadeInLeft" 
                      delay={1.2 + index * 0.2}
                      duration={0.6}
                    >
                      <div className="flex items-center gap-3 group">
                        <div className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full group-hover:scale-110 transition-transform duration-200`}></div>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    </AnimatedWrapper>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <AnimatedWrapper animation="fadeInRight" delay={1.4} duration={1}>
                  <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-2xl p-8 shadow-lg border border-white/50">
                    <AnimatedWrapper animation="scaleIn" delay={1.6} duration={0.8}>
                      <div className="flex items-center justify-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                          <BookOpen className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </AnimatedWrapper>
                    
                    <div className="text-center">
                      <AnimatedWrapper animation="fadeInUp" delay={1.8} duration={0.8}>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                          "Write Smarter, Research Faster"
                        </h3>
                      </AnimatedWrapper>
                      
                      <AnimatedWrapper animation="fadeInUp" delay={2} duration={0.8}>
                        <p className="text-gray-600">
                          Empowering Researchers & Revolutionizing the Way You Research
                        </p>
                      </AnimatedWrapper>
                    </div>
                  </div>
                </AnimatedWrapper>
                
                {/* Floating elements for visual appeal */}
                <AnimatedWrapper animation="fadeIn" delay={2.2} duration={1}>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </AnimatedWrapper>
                
                <AnimatedWrapper animation="fadeIn" delay={2.4} duration={1}>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"></div>
                </AnimatedWrapper>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default About;