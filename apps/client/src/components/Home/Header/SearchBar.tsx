import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = () => {
  return (
    <div className="bg-[#e9e9e9] rounded-full flex items-center px-3 relative">
      <input
        type="text"
        placeholder="Search"
        className="search-input form-control bg-transparent outline-none w-full text-[25px] pl-10"
      />
      <div className="search-icon2 absolute left-3 top-1/2 transform -translate-y-1/2">
        <IoIosSearch className="search-icon2 text-gray-500 text-[34px]" />
      </div>
    </div>
  );
};

export default SearchBar;
