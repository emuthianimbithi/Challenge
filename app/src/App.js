import { Routes, Route } from "react-router-dom";

import CategoryBar from "./components/CategoryBar";
import Navbar from "./components/Nav_bar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
