import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './App.scss';

// OpenAI API configuration
const OPENAI_API_KEY = "key"
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Udupi coordinates
const UDUPI_COORDINATES = [13.3409, 74.7421];

// Search Bar Component
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location or cultural site"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

// Map Component
const Map = ({ heritagePlaces, center, onSearch }) => {
  function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center]);
    return null;
  }

  return (
    <MapContainer center={UDUPI_COORDINATES} zoom={13} className="map-container">
      <ChangeView center={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {heritagePlaces.map((place, index) => (
        <Marker key={index} position={[place.lat, place.lon]}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
      <div className="search-overlay">
        <SearchBar onSearch={onSearch} />
      </div>
    </MapContainer>
  );
};

// Main App Component
const App = () => {
  const [heritagePlaces, setHeritagePlaces] = useState([]);
  const [center, setCenter] = useState(UDUPI_COORDINATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchHeritagePlaces = async (query) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that provides coordinates for heritage places and cultural sites."
            },
            {
              role: "user",
              content: `Provide the name, latitude, and longitude of the heritage site or cultural location related to this query: ${query}. Format the response as a JSON object with 'name', 'lat', and 'lon' properties. Ensure 'lat' and 'lon' are numeric values.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const textResponse = response.data.choices[0].message.content;
      console.log('Raw response:', textResponse);

      let place;
      try {
        place = JSON.parse(textResponse);
        console.log('Parsed place:', place);

        if (place && typeof place.lat === 'number' && typeof place.lon === 'number') {
          setCenter([place.lat, place.lon]);
          setHeritagePlaces([place]);
        } else {
          setError('Invalid location data received.');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        setError('Failed to parse location data. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching location data:', err);
      setError('Failed to fetch location data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Map heritagePlaces={heritagePlaces} center={center} onSearch={searchHeritagePlaces} />
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
      {error && <div className="error-overlay"><p>{error}</p></div>}
    </div>
  );
};

export default App;