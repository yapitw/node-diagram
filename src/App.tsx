import React, { useState } from "react";
import "./App.css";
import NodeDiagram from "./Components/NodeDiagram";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NodeDiagram title="NODE DIAGRAM" />
    </div>
  );
}

export default App;
