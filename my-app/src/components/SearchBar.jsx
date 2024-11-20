import React, { useState } from "react";

const SearchBar = ({ setLocation }) => {
  const [input, setInput] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setLocation(input);
      setInput("");  
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={input}
          onChange={(e) => setInput(e.target.value)}  
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
