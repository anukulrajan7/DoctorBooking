import { useState, useEffect } from "react";
import { getTokenFromCookie } from "../lib/cookie.js";

export default function DoctorDashboard() {
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [appointments, setAppointments] = useState([]);
  const token = getTokenFromCookie();

  // Dummy doctor profile data (replace with API call in production)
  const doctorProfile = {
    name: "Dr. John Smith",
    specialization: "Cardiologist",
    address: "123 Health St, Medical City, MC 12345",
    fees: 100,
    availability: "Mon-Fri, 9 AM - 5 PM",
    image: "https://via.placeholder.com/150",
    bio: "Experienced cardiologist with 10+ years in patient care.",
  };

  // Dummy appointments data (replace with API call in production)
  const dummyAppointments = [
    {
      id: 1,
      patientName: "Alice Johnson",
      time: "2025-05-26 10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Bob Williams",
      time: "2025-05-26 11:30 AM",
      status: "Pending",
    },
  ];

  useEffect(() => {
    // Simulate fetching appointments
    setAppointments(dummyAppointments);
  }, []);

  const updateStatus = async (online) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/doctor/update-status",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isOnline: online }),
        },
      );
      const data = await res.json();
      if (data.success) setStatus(online ? "Online" : "Offline");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAppointmentAction = (id, action) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === id ? { ...appt, status: action } : appt,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={doctorProfile.image}
              alt="Doctor Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {doctorProfile.name}
              </h1>
              <p className="text-lg text-blue-100">
                {doctorProfile.specialization}
              </p>
              <p className="text-blue-200">{doctorProfile.address}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "appointments"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === "profile" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Doctor Details</h2>
                <div className="space-y-4">
                  <p>
                    <span className="font-medium">Specialization:</span>{" "}
                    {doctorProfile.specialization}
                  </p>
                  <p>
                    <span className="font-medium">Fees:</span> $
                    {doctorProfile.fees} per session
                  </p>
                  <p>
                    <span className="font-medium">Availability:</span>{" "}
                    {doctorProfile.availability}
                  </p>
                  <p>
                    <span className="font-medium">Bio:</span>{" "}
                    {doctorProfile.bio}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Status</h2>
                <p className="text-lg mb-4">
                  Current Status:{" "}
                  <span
                    className={`font-bold ${
                      status === "Online" ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {status || "Unknown"}
                  </span>
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateStatus(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
                  >
                    Go Online
                  </button>
                  <button
                    onClick={() => updateStatus(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                  >
                    Go Offline
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Booked Appointments
              </h2>
              {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments booked.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{appt.patientName}</p>
                        <p className="text-gray-600">{appt.time}</p>
                        <p
                          className={`text-sm ${
                            appt.status === "Confirmed"
                              ? "text-green-600"
                              : appt.status === "Rejected"
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        >
                          Status: {appt.status}
                        </p>
                      </div>
                      {appt.status === "Pending" && (
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          <button
                            onClick={() =>
                              handleAppointmentAction(appt.id, "Confirmed")
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleAppointmentAction(appt.id, "Rejected")
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
