import React from "react";
import "./styles.css";
function Search({ search, handleSearch ,handleSelect}) {
  return (
    <div className="container">
      <div className="search-flex">
        <input
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="select">
        <select name="month" id="month" defaultValue={'3'} onChange={handleSelect}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
      </div>

    </div>
  );
}

export default Search;