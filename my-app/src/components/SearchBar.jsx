
import React from "react";
const SearchBar = ({ handleSearch, inputRef }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input
        placeholder="Enter location"
        className="search-input"
        onKeyDown={handleKeyPress} // Add keydown event listener
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

