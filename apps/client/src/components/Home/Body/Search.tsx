import React from 'react';
import { Button } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';

const Search: React.FC = () => {
  return (
    <div className="d-flex align-items-center gap-3">
      <IoIosSearch className="search-icon text-black" />
      <input
        type="text"
        placeholder="Search for recipes, DIY, and more"
        className="search-input form-control"
      />
      <Button  variant="primary">Search</Button>
    </div>
  );
};

export default Search;
