// src/components/Search.tsx
import React from 'react';

const Search: React.FC = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for recipes, DIY, and more" />
      <button>Search</button>
    </div>
  );
};

export default Search;
