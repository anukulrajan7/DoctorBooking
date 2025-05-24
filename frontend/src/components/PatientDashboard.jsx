import { useEffect, useState } from "react";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("available");
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    reason: "",
  });

  // Mock data - replace with actual API calls
  const mockDoctors = [
    {
      _id: "1",
      userId: {
        name: "Sarah Johnson",
        profileImage:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      },
      specialization: "Cardiologist",
      location: "New York, NY",
      isOnline: true,
      rating: 4.8,
      experience: 12,
      consultationFee: 150,
      availability: ["09:00", "10:00", "14:00", "15:00"],
    },
    {
      _id: "2",
      userId: {
        name: "Michael Chen",
        profileImage:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      },
      specialization: "Dermatologist",
      location: "Los Angeles, CA",
      isOnline: false,
      rating: 4.9,
      experience: 8,
      consultationFee: 120,
      availability: ["11:00", "13:00", "16:00"],
    },
    {
      _id: "3",
      userId: {
        name: "Emily Rodriguez",
        profileImage:
          "https://images.unsplash.com/photo-1594824475510-d8bdc3d7cf3b?w=150&h=150&fit=crop&crop=face",
      },
      specialization: "Pediatrician",
      location: "Chicago, IL",
      isOnline: true,
      rating: 4.7,
      experience: 15,
      consultationFee: 100,
      availability: ["08:00", "12:00", "17:00"],
    },
  ];

  const mockBookings = [
    {
      _id: "b1",
      doctor: {
        name: "Dr. Sarah Johnson",
        specialization: "Cardiologist",
        profileImage:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      },
      date: "2025-05-28",
      time: "10:00",
      status: "confirmed",
      reason: "Regular checkup",
    },
    {
      _id: "b2",
      doctor: {
        name: "Dr. Emily Rodriguez",
        specialization: "Pediatrician",
        profileImage:
          "https://images.unsplash.com/photo-1594824475510-d8bdc3d7cf3b?w=150&h=150&fit=crop&crop=face",
      },
      date: "2025-05-30",
      time: "14:00",
      status: "pending",
      reason: "Consultation",
    },
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setDoctors(mockDoctors);
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDoctors((prev) =>
        prev.map((doc) => ({
          ...doc,
          isOnline: Math.random() > 0.3, // Random online status
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const submitBooking = () => {
    // Simulate booking submission
    const newBooking = {
      _id: Date.now().toString(),
      doctor: {
        name: `Dr. ${selectedDoctor.userId.name}`,
        specialization: selectedDoctor.specialization,
        profileImage: selectedDoctor.userId.profileImage,
      },
      date: bookingForm.date,
      time: bookingForm.time,
      status: "pending",
      reason: bookingForm.reason,
    };

    setBookings((prev) => [...prev, newBooking]);
    setShowBookingModal(false);
    setBookingForm({ date: "", time: "", reason: "" });
    setSelectedDoctor(null);
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={doctor.userId.profileImage}
            alt={doctor.userId.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${
              doctor.isOnline ? "bg-green-500" : "bg-gray-400"
            } flex items-center justify-center`}
          >
            <div
              className={`w-3 h-3 rounded-full ${doctor.isOnline ? "bg-green-400 animate-pulse" : "bg-gray-300"}`}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Dr. {doctor.userId.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                doctor.isOnline
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {doctor.isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <p className="text-blue-600 font-medium text-sm mt-1">
            {doctor.specialization}
          </p>

          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{doctor.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{doctor.experience} years exp</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-800">
              ${doctor.consultationFee}
            </span>
            <button
              onClick={() => handleBooking(doctor)}
              disabled={!doctor.isOnline}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                doctor.isOnline
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {doctor.isOnline ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-start space-x-4">
        <img
          src={booking.doctor.profileImage}
          alt={booking.doctor.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {booking.doctor.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-blue-600 text-sm">
            {booking.doctor.specialization}
          </p>

          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{booking.time}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-2">{booking.reason}</p>

          <div className="flex space-x-2 mt-4">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
              Modify
            </button>
            <button
              onClick={() => cancelBooking(booking._id)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Patient Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your appointments and find available doctors
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-lg mb-8">
          <div className="flex space-x-2">
            {[
              { id: "available", label: "Available Doctors", icon: "👨‍⚕️" },
              { id: "bookings", label: "My Bookings", icon: "📅" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Doctors Tab */}
        {activeTab === "available" && (
          <div>
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors by name, specialization, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
                <svg
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No doctors found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}

            {bookings.length === 0 && (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a1 1 0 012 0v4a1 1 0 01-2 0zM16 7V3a1 1 0 012 0v4a1 1 0 01-2 0zM6 11h12v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8zM6 7h12a2 2 0 012 2v2H4V9a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-600">
                  Book your first appointment from the Available Doctors tab
                </p>
              </div>
            )}
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Book Appointment
              </h3>

              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedDoctor?.userId.profileImage}
                  alt={selectedDoctor?.userId.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">
                    Dr. {selectedDoctor?.userId.name}
                  </h4>
                  <p className="text-blue-600 text-sm">
                    {selectedDoctor?.specialization}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, date: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, time: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select time</option>
                    {selectedDoctor?.availability.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for visit
                  </label>
                  <textarea
                    value={bookingForm.reason}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, reason: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                    rows="3"
                    placeholder="Brief description of your concern..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBooking}
                  disabled={!bookingForm.date || !bookingForm.time}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
