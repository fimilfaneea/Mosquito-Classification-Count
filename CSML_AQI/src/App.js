import React from 'react';
import Layout from './Layout';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Map from './pages/Map';
import Readings from './pages/Readings';
import Graph from './components/Graph';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Images from './pages/Images';
import Audio from './pages/Audio';



const App = () => {
  return (
    <div className='App'>
      
    <BrowserRouter>
    <Layout>
    <Navbar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/map" element={<Map />} />
       <Route path="/readings" element={<Readings />} />
       <Route path="/images" element={<Images />} />
       <Route path="/audio" element={< Audio/>} />
       {/* <Route path="/graph" element={<Graph />} /> */}
    
     </Routes>
    </Layout>
    </BrowserRouter>
    </div>
    
  );
};

export default App;