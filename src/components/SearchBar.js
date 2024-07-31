import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = ({ target }) => {
    setCity(target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity(city);
    }
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;