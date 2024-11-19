import React, { useState } from "react";

const SearchBar = ({ setLocation }) => {
  const [input, setInput] = useState("");  // Store the input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setLocation(input);
      setInput("");  // Clear the input after submitting
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={input}
          onChange={(e) => setInput(e.target.value)}  // Update input value
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
