import React from "react";
import Cards from "./components/Cards";
import Download from "./components/Download";
import Trello from "./components/Trello";

function App() {
  return (
    <div>
      <Cards/>
      <Trello/>
      <Download/>
    </div>
  )
}

export default App;
