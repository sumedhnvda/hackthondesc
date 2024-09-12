import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city") || "any location"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
          />
        </div>

        <div className="item">
          <label htmlFor="property">Type</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            value={query.property}
          >
            <option value="">Any</option>
            <option value="Events">Events</option>
            <option value="Classes">Classes</option>
          </select>
        </div>

        <button className="searchbutton" onClick={handleFilter}>
          <img src="/search.png" alt="Search" width="24px" height="24px" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
