// src/components/Header.tsx
import React from 'react';
import SearchBar from './SearchBar';
import Notification from './Notification';
import Profile from './Profile';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className='header-content'>
        <SearchBar />
        <Notification />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
