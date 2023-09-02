import React, { useEffect, useState } from "react";

import Draggable from "./components/Draggable";

import "./App.css";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBackgroundImage(data.urls.full);
      });
  }, []);

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="App">
      <div style={style}>
        <Draggable />
      </div>
    </div>
  );
}

export default App;
