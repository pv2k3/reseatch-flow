import React from 'react';
import { Clock, Zap, FileText, MousePointer, BookOpen, Users, Target } from 'lucide-react';

const AboutSection: React.FC = () => {
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-white/50">
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

export default AboutSection;