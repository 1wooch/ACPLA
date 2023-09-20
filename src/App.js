import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"; //for router purpose

import Main from './pages/Main';
import GPAcalculator from './pages/GPAcalculator';
import StudyPlanner from './pages/StudyPlanner';
import Layout from './pages/Layout';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Review from './pages/Review'; //for the rating
//for the tailwind?
import 'tailwindcss/tailwind.css';


function App() {
  return (
    <BrowserRouter>
    <div>
     <Navbar/>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="GPAcalculator" element={<GPAcalculator />} />
          <Route path="StudyPlanner" element={<StudyPlanner />} />
          <Route path="Review" element={<Review />} />

        </Route>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
