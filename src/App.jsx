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
import EmergencyAlertModal from "./components/EmergencyAlertModal";
import { STRAPI_API_URL } from "./config/api";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const withPopulate = (contentType) => `${STRAPI_API_URL}/${contentType}?populate=*`;

  // Fetch data
  const { loading: blogsLoading, data: blogsData, error: blogsError } =
    useFetch(withPopulate("blogs"));
  const { data: schoolsData } =
    useFetch(withPopulate("ecoles"));
  const { loading: educationLoading, data: educationData, error: educationError } =
    useFetch(withPopulate("ecoles"));
  const {
    loading: aboutLoading,
    data: aboutData,
    error: aboutError,
  } = useFetch(withPopulate("abouts"));
  const { data: eventData } =
    useFetch(withPopulate("events"));
  const { data: matchData } =
    useFetch(withPopulate("matchs-sportifs"));
  const { data: newsData } =
    useFetch(withPopulate("sportnews"));
  const {
    loading: sousPrefecturesLoading,
    data: spData,
    error: sousPrefecturesError,
  } = useFetch(withPopulate("sous-prefectures"))
  const { data: restaurant } =
    useFetch(withPopulate("restaurants"))
  const { data: officials} =
    useFetch(withPopulate("elus-officiels"))
  const { data: document } =
    useFetch(withPopulate("document-administratifs"))
  const { data: hotelData} =
    useFetch(withPopulate("hotels"))
  const { data: placeData} =
    useFetch(withPopulate("lieux-a-visiters"))
  const { data: activitePopularData} =
    useFetch(withPopulate("activite-populaires"))
  const { data: statistiqueEducationData} =
    useFetch(withPopulate("education-statatistiques"))
  const {data: police} =
    useFetch(withPopulate("postes-polices"))
  const {data: gallery} =
    useFetch(withPopulate("galleries"))



  // Simple console logging to see data structures
  useEffect(() => {
    // console.log("📝 Blogs Data:", blogsData);
    // console.log("🏫 Schools Data:", schoolsData);
    // console.log("🎓 Education Data:", educationData);
    // console.log("ℹ️ About Data:", aboutData);
    // console.log("🎉 Event Data:", eventData);
    // console.log("⚽ Match Data:", matchData);
    // console.log("📰 News Data:", newsData);
    // console.log("🏛️ Sous-Prefectures Data:", spData);
    // console.log("🍽️ Restaurant Data:", restaurant);
    // console.log("D Document Data:", document);
    // console.log("O officials Data:", officials);
    // console.log("🏨 Hotel Data:", hotelData)
    // console.log("📍 Place Data:", placeData);
    // console.log("⭐ Activite Popular Data:", activitePopularData);
    // console.log("📊 Statistique Education Data:", statistiqueEducationData);
    // console.log("👮 Police Data:", police);
    // console.log("🖼️ Gallery Data:", gallery);
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

  return (
    <>
      <ScrollToTop />
      <EmergencyAlertModal />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home activities={activities} galleryData={galleryData} policeData={policeData}/>} />
            <Route path="/tourism" element={<Home activities={activities} galleryData={galleryData} policeData={policeData}/>} />
            <Route path="/mairie" element={<Mairie />} />
            <Route path="/administration" element={<Administration documents={documents} officials={official} />} />
            <Route path="/articles" element={<Articles data={articles} loading={blogsLoading} error={blogsError} isStandalonePage/>} />
            <Route path="/nourriture" element={<Nouriture restaurant={restaurants}/>} />
            <Route path="/sport" element={<Sport matchs={matchs} news={news} />} />
            <Route path="/hotel" element={<Hotels hotels={hotels}  />} />
            <Route path="/place" element={<PlaceVisite places={places} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/activitepopulaire" element={<PopularActivity activities={activities} isStandalonePage />} />
            <Route path="/cultures" element={<Culture events={events} />} />
            <Route path="/galerie" element={<Gallery galleryData={galleryData} isStandalonePage />} />
            <Route path="/police" element={<Police policeData={policeData} isStandalonePage />} />
            <Route
              path="/education"
              element={<Education loading={educationLoading} error={educationError} data={educations} schools={schools} statistiqueEdu={statistiqueEdu} />}
            />
            <Route
              path="/about"
              element={
                <About
                  loading={aboutLoading || sousPrefecturesLoading}
                  error={aboutError || sousPrefecturesError}
                  abouts={aboutData?.data || []}
                  sousPrefectures={sousP}
                />
              }
            />
            <Route path="/blog/education/:id" element={<BlogPost contentTypes={['ecoles']} ecolesData={educationData} />} />
            <Route path="/blog/school/:id" element={<BlogPost contentTypes={['ecoles']} ecolesData={schoolsData} />} />
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
