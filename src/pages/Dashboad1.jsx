import React, { useState, useEffect } from "react";
import Sidebar from "../components/common/SideBar";
import Header from "../components/common/Header";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import { getDashboardSummary } from "../services/apiService"; // Correctly import the API service function

// Import all your existing management components
import ArticlesManager from "../components/managers/ArticlesManager";
import EventsManager from "../components/managers/EventsManager";
import SportsManager from "../components/managers/SportsManager";
import PlacesManager from "../components/managers/PlacesManager";
import RestaurantsManager from "../components/managers/RestaurantsManager";
import HotelsManager from "../components/managers/HotelsManager";
import EducationManager from "../components/managers/EducationManager";
import MessagesManager from "../components/managers/MessagesManager";
import MairieManager from "../components/managers/MairieManager"; // Assuming you will add this component
import AboutManager from "../components/managers/AboutManager"; // Assuming you will add this component


function Dashboard() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // State to track the currently active section
  const [activeSection, setActiveSection] = useState("overview");
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // State for dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({});
  // State for loading status
  const [loading, setLoading] = useState(false);

  // Load dashboard data when the component mounts or the active section changes to "overview"
  useEffect(() => {
    if (activeSection === "overview") {
      loadDashboardData();
    }
  }, [activeSection]);

  // Function to fetch the dashboard summary data from the API
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Use the imported function directly
      const stats = await getDashboardSummary();
      setDashboardStats(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // You could set an error state here to show a message to the user
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  // A function to render the correct component based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview stats={dashboardStats} loading={loading} />;
      case "articles":
        return <ArticlesManager />;
      case "events":
        return <EventsManager />;
      case "sports":
        return <SportsManager />;
      case "places":
        return <PlacesManager />;
      case "restaurants":
        return <RestaurantsManager />;
      case "hotels":
        return <HotelsManager />;
      case "education":
        return <EducationManager />;
      case "messages":
        return <MessagesManager />;
      case "mairie_administration": // New case for Mairie & Administration
        return <MairieManager />;
      case "about": // New case for About
        return <AboutManager />;
      default:
        // Render a default message for sections not yet implemented
        return (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Section en développement</h2>
            <p className="text-gray-600">
              Cette section est en cours de développement et sera disponible prochainement.
            </p>
          </div>
        );
    }
  };

  // Display a login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Session expirée</h2>
          <p className="text-gray-600 mb-4">Veuillez vous reconnecter pour continuer.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg"
          >
            Se reconnecter
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <div className="min-h-screen bg-gray-100 flex font-inter">
      {/* Sidebar component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header component */}
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setActiveSection={setActiveSection}
          dashboardStats={dashboardStats}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
