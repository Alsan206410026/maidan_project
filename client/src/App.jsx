import { Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import Venue from "./Frontend/Venue";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venue />} />
      </Routes>
    );
}

export default App;