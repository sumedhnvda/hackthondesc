import { useState } from "react";
import { Link } from "react-router-dom";
import "./searchBar.scss";

function SearchBar() {
  const [query, setQuery] = useState({
    city: "",
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
          value={query.city}
        />
        <Link
          to={`/list?city=${query.city}`}
        >
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
