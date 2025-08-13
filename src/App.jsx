import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import useFetch from "./hooks/useFetch";
import About from "./pages/About";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Culture from "./pages/Culture";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Nouriture from "./pages/Nouriture";
import PlaceVisite from "./pages/PlaceVisite";
import Sport from "./pages/Sport";
import Dashboard from "./pages/Dashboard"
import Mairie from "./pages/Mairie";
import Administration from "./pages/Administration";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import Sidebar from "./components/common/SideBar";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // Fetch data (unchanged)
  const { loading: blogsLoading, data: blogsData, error: blogsError } =
    useFetch('http://localhost:1337/api/blogs?populate=*&sort=publishedDate:desc');
  const { loading: schoolsLoading, data: schoolsData } =
    useFetch('http://localhost:1337/api/schools?populate=*');
  const { data: aboutData } =
    useFetch('http://localhost:1337/api/abouts?populate=*');
  const { data: diweData } =
    useFetch('http://localhost:1337/api/diwals?populate=*');
  const { data: eventData } =
    useFetch('http://localhost:1337/api/events?populate=*');
  const { data: matchData } =
    useFetch('http://localhost:1337/api/matches?populate=*');
  const { data: newsData } =
    useFetch('http://localhost:1337/api/sportnews?populate=*');

  const educationData = blogsData?.data || [];
  const schools = schoolsData?.data || [];
  const events = eventData?.data || [];
  const matchs = matchData?.data || [];
  const news = newsData?.data || [];

  // Check if we're in admin section
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/minda");

  return (
    <>
      <ScrollToTop />
      <div style={{ display: "flex" }}>
        {isAdminRoute && <Sidebar />} {/* Only show sidebar in admin */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mairie" element={<Mairie />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/articles" element={<BlogPost />} />
            <Route path="/nourriture" element={<Nouriture />} />
            <Route path="/sport" element={<Sport matchs={matchs} news={news} />} />
            <Route path="/hotel" element={<Hotels />} />
            <Route path="/place" element={<PlaceVisite />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/minda" element={<DashboardOverview />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/culture" element={<Culture events={events} />} />
            <Route
              path="/education"
              element={<Education loading={blogsLoading} error={blogsError} data={educationData} schools={schools} />}
            />
            <Route
              path="/about"
              element={<About abouts={aboutData?.data || []} diwals={diweData?.data || []} />}
            />
            <Route path="/blog/education/:id" element={<BlogPost contentTypes={['blogs']} blogsData={blogsData} />} />
            <Route path="/blog/school/:id" element={<BlogPost contentTypes={['schools']} schoolsData={schoolsData} />} />
            <Route path="/blog/sport/:id" element={<BlogPost contentTypes={['news']} newsData={newsData} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
