import React from 'react';
import { BookOpen } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            About ScholarSync
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ScholarSync is a research companion that helps students and professionals organize, 
            manage, and access information effortlessly. It streamlines the research process, making 
            knowledge discovery more structured and efficient.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that academic research should be accessible and organized for everyone. 
                ScholarSync empowers researchers at all levels by providing intuitive tools that 
                simplify the research process, from initial discovery to final documentation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700">Streamline research workflows</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700">Enhance knowledge organization</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                  <span className="text-gray-700">Support academic excellence</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    "Write Smarter, Research Faster"
                  </h3>
                  <p className="text-gray-600">
                    Empowering Researchers & Revolutionizing the Way You Research
                  </p>
                </div>
              </div>
              
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;