// src/components/SearchBar.jsx
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
