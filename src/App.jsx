/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Loader from "./components/Loader";
import Card from "./components/Card";

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
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setError("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);
      if (!response.ok) {
        throw new error("Failed to fetch movies.");
      }

      const data = await response.json();
      if (data.Response === false) {
        setError(data.Error || "Failed to fetch movies.");
        setMovies([]);
        return;
      } else {
        setMovies(data.results || []);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

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
            <h2 className="mt-[20px]">All Movies</h2>
            {error && <p className="text-red-500">{error}</p>}
            {isLoading && <Loader />}
            <ul>
              {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
