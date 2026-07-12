import { Routes, Route } from "react-router-dom";
import Home from "./Frontend/Home";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
}

export default App;