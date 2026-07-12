import { Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import Register from "./Register";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
}

export default App;