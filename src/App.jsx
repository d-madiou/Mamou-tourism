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
import PopularActivity from "./components/PopularActivity";
import Articles from "./pages/Articles";
import Gallery from "./components/Galley";
import Police from "./components/Guide";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // Fetch data
  const { loading: blogsLoading, data: blogsData, error: blogsError } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/blogs?populate=*');
  const { loading: schoolsLoading, data: schoolsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/ecoles?populate=*');
  const { loading: educationLoading, data: educationData, error: educationError } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/ecoles?populate=*');
  const { data: aboutData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/abouts?populate=*');
  const { data: eventData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/events?populate=*');
  const { data: matchData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/matchs-sportifs?populate=*');
  const { data: newsData } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/sportnews?populate=*');
  const { data: spData } = 
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/sous-prefectures?populate=*')
  const { data: restaurant } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/restaurants?populate=*')
  const { data: officials} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/elus-officiels?populate=*')
  const { data: document } =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/document-administratifs?populate=*')
  const { data: hotelData} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/hotels?populate=*')
  const { data: placeData} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/lieux-a-visiters?populate=*')
  const { data: activitePopularData} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/activite-populaires?populate=*')
  const { data: statistiqueEducationData} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/education-statatistiques?populate=*')
  const {data: police} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/postes-polices?populate=*')
  const {data: gallery} =
    useFetch('https://cozy-sparkle-24ced58ec1.strapiapp.com/api/galleries?populate=*')



  // Simple console logging to see data structures
  useEffect(() => {
    console.log("📝 Blogs Data:", blogsData);
    console.log("🏫 Schools Data:", schoolsData);
    console.log("🎓 Education Data:", educationData);
    console.log("ℹ️ About Data:", aboutData);
    console.log("🎉 Event Data:", eventData);
    console.log("⚽ Match Data:", matchData);
    console.log("📰 News Data:", newsData);
    console.log("🏛️ Sous-Prefectures Data:", spData);
    console.log("🍽️ Restaurant Data:", restaurant);
    console.log("D Document Data:", document);
    console.log("O officials Data:", officials);
    console.log("🏨 Hotel Data:", hotelData)
    console.log("📍 Place Data:", placeData);
    console.log("⭐ Activite Popular Data:", activitePopularData);
    console.log("📊 Statistique Education Data:", statistiqueEducationData);
    console.log("👮 Police Data:", police);
    console.log("🖼️ Gallery Data:", gallery);
  }, [blogsData, schoolsData, educationData, aboutData, eventData, matchData, newsData, spData, 
    restaurant, document, officials, hotelData, placeData, activitePopularData, statistiqueEducationData,
    police, gallery]);

  // Process data for components
  const articles = blogsData?.data || [];
  const educations = educationData?.data || [];
  const schools = schoolsData?.data || [];
  const events = eventData?.data || [];
  const matchs = matchData?.data || [];
  const news = newsData?.data || [];
  const sousP = spData?.data || [];
  const restaurants = restaurant?.data || [];
  const documents = document?.data || [];
  const official = officials?.data || [];
  const hotels = hotelData?.data || [];
  const places = placeData?.data || [];
  const activities = activitePopularData?.data || [];
  const statistiqueEdu = statistiqueEducationData?.data || [];
  const galleryData = gallery?.data || [];
  const policeData = police?.data || [];

  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/minda");

  return (
    <>
      <ScrollToTop />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home activities={activities} galleryData={galleryData} policeData={policeData}/>} />
            <Route path="/mairie" element={<Mairie />} />
            <Route path="/administration" element={<Administration documents={documents} officials={official} />} />
            <Route path="/articles" element={<Articles data={articles} loading={blogsLoading} error={blogsError} />} />
            <Route path="/nourriture" element={<Nouriture restaurant={restaurants}/>} />
            <Route path="/sport" element={<Sport matchs={matchs} news={news} />} />
            <Route path="/hotel" element={<Hotels hotels={hotels}  />} />
            <Route path="/place" element={<PlaceVisite places={places} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/activitepopulaire" element={<PopularActivity activities={activities} />} />
            <Route path="/cultures" element={<Culture events={events} />} />
            <Route path="/galerie" element={<Gallery galleryData={galleryData} />} />
            <Route path="/police" element={<Police policeData={policeData} />} />
            <Route
              path="/education"
              element={<Education loading={educationLoading} error={educationError} data={educations} schools={schools} statistiqueEdu={statistiqueEdu} />}
            />
            <Route
              path="/about"
              element={<About abouts={aboutData?.data || []} sousPrefectures={sousP} />}
            />
            <Route path="/blog/education/:id" element={<BlogPost contentTypes={['educations']} educationData={educationData} />} />
            <Route path="/blog/school/:id" element={<BlogPost contentTypes={['schools']} schoolsData={schoolsData} />} />
            <Route path="/blog/sport/:id" element={<BlogPost contentTypes={['news']} newsData={newsData} />} />
            <Route path="/blog/article/:id" element={<BlogPost contentTypes={['blogs']} blogsData={blogsData} />} />
            <Route path="/blog/:type/:id" element={<BlogPost contentTypes={['activite-populaires']} activitePopularData={activitePopularData} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;