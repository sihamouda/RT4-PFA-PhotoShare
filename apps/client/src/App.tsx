// import HomePage from "./components/HomePage"

// function App() {
//   return <div> <HomePage/> </div>
// }

// export default App ; 
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import CardPost from './components/Home/Body/Card/cardPost';
import Header from './components/Home/Header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div>
      <Header title={'PhotoShare'} />  
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/card/:imageUrl/:title/:author/:date/:description" element={<CardPost />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
