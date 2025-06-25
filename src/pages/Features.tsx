import React from 'react';
import { Clock, Zap, FileText, MousePointer, BookOpen, Users, Target } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Efficient Research Management",
      description: "ScholarSync provides a structured space to collect, organize, and manage research materials. Users can categorize their documents, notes, and references, making it easy to retrieve important information when needed."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Quick Summarization & Notes",
      description: "Convert lengthy research papers into concise summaries. ScholarSync enables users to highlight key points, create structured notes, and retain essential information for easy review."
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Effortless Document Formatting",
      description: "Format research papers easily with structured layouts, headings, spacing, and font styles based on academic standards like APA and MLA. ScholarSync ensures your documents meet professional and university guidelines without manual adjustments."
    },
    {
      icon: <MousePointer className="w-12 h-12" />,
      title: "Optimized User Experience",
      description: "Navigate research effortlessly with an intuitive and distraction-free interface. ScholarSync is designed for ease of use, allowing researchers to focus on their work without technical complexities."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50 hover:border-purple-200"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 group-hover:text-purple-600 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Where Scholars Unite, Ideas Ignite
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join a community of researchers, students, and academics who are transforming 
              the way knowledge is discovered, organized, and shared. Together, we're building 
              the future of academic research.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Collaborative</h3>
                <p className="text-blue-100 text-sm">Connect with fellow researchers and share insights</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Focused</h3>
                <p className="text-blue-100 text-sm">Stay organized and maintain research momentum</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Academic</h3>
                <p className="text-blue-100 text-sm">Built by researchers, for researchers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 shadow-xl border border-blue-100">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of successful researchers and take your academic work to the next level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 flex items-center gap-2 min-w-[250px]">
              <span>Start Your Research Journey</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 min-w-[200px]">
              Explore Features
            </button>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Free 14-day trial</span>
            <span className="text-gray-300">•</span>
            <span>No credit card required</span>
            <span className="text-gray-300">•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;