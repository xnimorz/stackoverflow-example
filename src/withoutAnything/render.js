import React, { useState, useEffect } from "react";
import Parent from "./parent";

function App({ length, time, title }) {
  return (
    <div className="App">
      <Parent title={title} executedTime={time} length={length || 100}></Parent>
    </div>
  );
}

export default App;
