import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSearch(searchQuery);
  };


  return (
    
    <form onSubmit={handleSubmit}>
    <div className="d-flex align-items-center gap-3" >
      <IoIosSearch className="search-icon text-black" />
      
      <input
        type="text"
        value={searchQuery} 
        onChange={handleInputChange}
        placeholder="Search for recipes, DIY, and more..."
        className="search-input form-control"
      />
      <Button  variant="dark" type='submit'>Search</Button>
      
    </div>
    </form>
    
  );
};

export default Search;
