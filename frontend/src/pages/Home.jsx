import {
  Search,
  Calendar,
  Users,
  Shield,
  Star,
  ChevronRight,
  Heart,
  Clock,
  MapPin,
} from "lucide-react";

// Header Component

// Main Homepage Component
const DoctorBookingHomepage = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Scheduling",
      description:
        "Book appointments with your preferred doctors in just a few clicks",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Doctors",
      description:
        "Access to verified healthcare professionals across all specialties",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your health data is protected with enterprise-grade security",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Happy Patients" },
    { number: "500+", label: "Expert Doctors" },
    { number: "50+", label: "Specialties" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Tailwind animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Health,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Our Priority
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Book appointments with trusted doctors instantly. Get quality
                healthcare at your fingertips with our easy-to-use platform.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search doctors, specialties..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full sm:w-40 pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-200 flex items-center justify-center">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-lg hover:scale-105 transform transition-all duration-200 flex items-center justify-center">
                  Book Appointment
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 hover:scale-105 transform transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div className="relative">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                      <Heart className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-blue-700 font-semibold text-lg">
                      24/7 Healthcare Access
                    </p>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce hover:scale-110 transform transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Quick Booking</p>
                      <p className="text-xs text-gray-500">In 2 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-pulse hover:scale-110 transform transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Top Rated</p>
                      <p className="text-xs text-gray-500">4.9/5 Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transform transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare like never before with our comprehensive
              platform designed for your convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transform transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MediBook for their healthcare
            needs.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-200">
            Book Your First Appointment
          </button>
        </div>
      </section>
    </div>
  );
};

export default DoctorBookingHomepage;
