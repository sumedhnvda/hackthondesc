import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState({
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
