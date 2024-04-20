import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Room from "@/pages/Room";
import Landing from "@/pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
