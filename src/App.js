import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // stop form from refreshing
    if (!city.trim()) return; // if input is empty, do nothing

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid='your-api-key'f&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError("City not found!");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      <center>
        <h1>🌤️ Weather App</h1>
        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>

        {/* Loading message */}
        {loading && <p>Loading...</p>}

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Weather display */}
        {weatherData && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              display: "inline-block",
            }}
          >
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}
      </center>
    </div>
  );
}
