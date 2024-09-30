import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div>
        <input
          type="text"
          name="query"
          onChange={e => onChange(e.currentTarget.value)}
          className="form-control my-3"
          value={value}
          placeholder="Search..."
        />
    </div>
  );
};

export default SearchBar;
