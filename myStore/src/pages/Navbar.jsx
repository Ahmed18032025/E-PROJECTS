import { Route, Routes } from "react-router-dom";
import { Home } from "./Home.jsx";
import { Men } from "./Men.jsx";
import { Women } from "./Women.jsx";
import { Kids } from "./Kids.jsx";
import Collection from "./collection.jsx";

function Navbar() {
  return (
    <>
    <Home />

    <Routes>
      {/* <Route path="/" element={< />} /> */}
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/" element={<Collection />} />
    </Routes>
    
    </>  );
}

export default Navbar;