import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <select className="availability-filter">
        <option value="">Availability</option>
        <option value="weekends">Weekends</option>
        <option value="weekdays">Weekdays</option>
      </select>
      <input className="search-input" type="text" placeholder="Search..." />
      <button className="search-btn">Search</button>
    </div>
  );
};

export default SearchBar; 