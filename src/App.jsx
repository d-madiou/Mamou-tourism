import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
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
import useFetch from "./hooks/useFetch";
import SousPrefectures from "./components/SousPrefectures";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // Fetch data
  const { loading: blogsLoading, data: blogsData, error: blogsError } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/blogs?populate=*&sort=publishedDate:desc');
  const { loading: schoolsLoading, data: schoolsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/schools?populate=*');
  const { data: aboutData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/abouts?populate=*');
  // const { data: diweData } =
  //   useFetch('http://localhost:1337/api/diwals?populate=*');
  const { data: eventData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/events?populate=*');
  const { data: matchData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/matches?populate=*');
  const { data: newsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/sportnews?populate=*');
  const { data: spData } = 
    useFetch('http://localhost:1337/api/sous-prefectures?populate=*')

  // Debug console logs
  useEffect(() => {
    console.log("=== API DATA STRUCTURE DEBUG ===");
    
    if (blogsData) {
      console.log("📝 Blogs Data:", blogsData);
      console.log("📝 Blogs Data Structure:", JSON.stringify(blogsData, null, 2));
    }
    
    if (schoolsData) {
      console.log("🏫 Schools Data:", schoolsData);
      console.log("🏫 Schools Data Structure:", JSON.stringify(schoolsData, null, 2));
    }
    
    if (aboutData) {
      console.log("ℹ️ About Data:", aboutData);
      console.log("ℹ️ About Data Structure:", JSON.stringify(aboutData, null, 2));
    }
    
    if (eventData) {
      console.log("🎉 Event Data:", eventData);
      console.log("🎉 Event Data Structure:", JSON.stringify(eventData, null, 2));
    }
    
    if (matchData) {
      console.log("⚽ Match Data:", matchData);
      console.log("⚽ Match Data Structure:", JSON.stringify(matchData, null, 2));
    }
    
    if (newsData) {
      console.log("📰 News Data:", newsData);
      console.log("📰 News Data Structure:", JSON.stringify(newsData, null, 2));
    }
    
    if (spData) {
      console.log("🏛️ Sous-Prefectures Data:", spData);
      console.log("🏛️ Sous-Prefectures Data Structure:", JSON.stringify(spData, null, 2));
      
      // Log individual items for better understanding
      if (spData.data && spData.data.length > 0) {
        console.log("🏛️ First Sous-Prefecture Item:", spData.data[0]);
        console.log("🏛️ First Sous-Prefecture Attributes:", spData.data[0]?.attributes);
        
        if (spData.data[0]?.attributes?.image) {
          console.log("🖼️ Image Structure:", spData.data[0].attributes.image);
        }
      }
    }
    
    console.log("=== END DEBUG ===");
  }, [blogsData, schoolsData, aboutData, eventData, matchData, newsData, spData]);

  // Additional debug for specific data transformations
  useEffect(() => {
    console.log("=== PROCESSED DATA DEBUG ===");
    
    const educationData = blogsData?.data || [];
    const schools = schoolsData?.data || [];
    const events = eventData?.data || [];
    const matchs = matchData?.data || [];
    const news = newsData?.data || [];
    const sousP = spData?.data || [];
    
    console.log("📚 Processed Education Data:", educationData);
    console.log("🏫 Processed Schools:", schools);
    console.log("🎪 Processed Events:", events);
    console.log("⚽ Processed Matches:", matchs);
    console.log("📰 Processed News:", news);
    console.log("🏛️ Processed Sous-Prefectures:", sousP);
    
    // Check if data has the expected structure
    if (sousP.length > 0) {
      console.log("✅ Sous-Prefectures has data");
      console.log("🔍 Sample attributes:", Object.keys(sousP[0]?.attributes || {}));
    } else {
      console.log("❌ Sous-Prefectures is empty");
    }
    
    if (aboutData?.data && aboutData.data.length > 0) {
      console.log("✅ About Data has content");
      console.log("🔍 About attributes:", Object.keys(aboutData.data[0]?.attributes || {}));
    } else {
      console.log("❌ About Data is empty");
    }
    
    console.log("=== END PROCESSED DEBUG ===");
  }, [blogsData, schoolsData, aboutData, eventData, matchData, newsData, spData]);

  const educationData = blogsData?.data || [];
  const schools = schoolsData?.data || [];
  const events = eventData?.data || [];
  const matchs = matchData?.data || [];
  const news = newsData?.data || [];
  const sousP = spData?.data || [];

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
            <Route path="/culture" element={<Culture events={events} />} />
            <Route path="/spf" element={<SousPrefectures sousPrefectures={sousP} />} />
            <Route
              path="/education"
              element={<Education loading={blogsLoading} error={blogsError} data={educationData} schools={schools} />}
            />
            <Route
              path="/about"
              element={<About abouts={aboutData?.data || []} sousPrefectures={sousP} />}
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