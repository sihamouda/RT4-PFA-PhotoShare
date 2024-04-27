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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<CardPost />} />
      </Routes>
    </Router>
  );
};

export default App;
