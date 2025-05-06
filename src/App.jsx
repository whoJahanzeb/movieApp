import React from "react";

const App = () => {
  return (
    <>
      <main>
        <div className="pattern" />
        <header className="wrapper">
          <img src="./logo.png" alt="Logo Image" className="h-20 w-20" />
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without Hassle.
          </h1>
          <p>search</p>
        </header>
      </main>
    </>
  );
};

export default App;
