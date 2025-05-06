import React, { useEffect, useState } from "react";
import Search from "./components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const fetchMovies = async () => {
    try {
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);
      return response;
    } catch (error) {
      console.error(error);
      setError("Error fetching movies. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        {/* <div className="pattern" /> */}
        <div className="wrapper">
          <header>
            {/* <img src="./logo.png" alt="Logo Image" className="h-20 w-20" /> */}
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without Hassle.
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {error && <p className="text-red-500">{error}</p>}
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
