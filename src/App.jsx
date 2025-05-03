import { Route, Routes } from "react-router-dom";
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



function App() {
  const {
    loading: blogsLoading,
    data: blogsData,
    error: blogsError
  } = useFetch('http://localhost:1337/api/blogs?populate=*&sort=publishedDate:desc');

  const {
    loading: schoolsLoading,
    data: schoolsData,
    error: schoolsError
  } = useFetch('http://localhost:1337/api/schools?populate=*');
const {
    loading: aboutLoading,
    data: aboutData,
    error: aboutError
  } = useFetch('http://localhost:1337/api/abouts?populate=*');
  const {
    loading: diweLoading,
    data: diweData,
    error: diweError
  } = useFetch('http://localhost:1337/api/diwals?populate=*');
  const {
    loading: eventLoading,
    data: eventData,
    error: eventError
  } = useFetch('http://localhost:1337/api/events?populate=*');

  const{
    loading: matchLoading,
    data: matchData,
    error: matchError
  } = useFetch('http://localhost:1337/api/matches?populate=*');

  const{
    loading: newsLoading,
    data: newsData,
    error: newsError
  } = useFetch('http://localhost:1337/api/sportnews?populate=*')
  
  // Log responses to check structure
  console.log("Raw Blogs API response:", blogsData);
  console.log("Schools API response:", schoolsData);
  console.log("About API response:", aboutData);
  console.log("Diwal API response:", diweData);
  console.log("Event API response:", eventData);
  console.log("Match API response:", matchData);
  console.log("nEWS sPORT API response:", newsData);

  const educationData = blogsData?.data || [];
  const schools = schoolsData?.data || [];
  const events = eventData?.data || [];
  const matchs = matchData?.data || [];
  const news = newsData?.data || [];

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<BlogPost />} />
      <Route path="/nouriture" element={<Nouriture  />} />
      <Route path="/sport" element={<Sport matchs = {matchs} news={news}/>} />
      <Route path="/hotel" element={<Hotels />} />
      <Route path="/place" element={<PlaceVisite />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/culture" element={<Culture events={events}/>} />
      <Route
        path="/education"
        element={
          <Education
            loading={blogsLoading}
            error={blogsError}
            data={educationData}
            schools={schools}
          />
        }
      />
      <Route path="/about" element={<About 
      abouts={aboutData?.data || []}
      diwals={diweData?.data || []}/>
    } 
    />
    <Route 
    path="/blog/education/:id" 
    element={<BlogPost contentTypes={['blogs']} blogsData={blogsData} />}
  />
  <Route 
    path="/blog/school/:id" 
    element={<BlogPost contentTypes={['schools']} schoolsData={schoolsData} />}
  />
  <Route 
    path="/blog/sport/:id" 
    element={<BlogPost contentTypes={['news']} newsData={newsData} />}
    />
    </Routes>
  );
}

export default App;
