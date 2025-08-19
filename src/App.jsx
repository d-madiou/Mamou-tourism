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
import Mairie from "./pages/Mairie";
import Administration from "./pages/Administration";
import ArticlesManager from "./components/managers/ArticlesManager";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // Fetch data (unchanged)
  const { loading: blogsLoading, data: blogsData, error: blogsError } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/blogs?populate=*&sort=publishedDate:desc');
  const { loading: schoolsLoading, data: schoolsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/schools?populate=*');
  const { data: aboutData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/abouts?populate=*');
  const { data: diweData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/diwals?populate=*');
  const { data: eventData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/events?populate=*');
  const { data: matchData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/matches?populate=*');
  const { data: newsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/sportnews?populate=*');

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
        {isAdminRoute }
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/article" element={<ArticlesManager />} />
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
