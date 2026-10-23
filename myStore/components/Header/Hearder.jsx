import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import {browserRouter ,Route, Routes} from "react-router-dom";
import { Men } from "../../src/pages/men.jsx";
import {Kids} from "../../src/pages/Kids.jsx"
import { Women } from '../../src/pages/Women.jsx';
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <a href="/">STYLE<span>HUB</span></a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Navigation */}
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/men">Men</Link>
          {/* <Link to="/boys">Boys</Link> */}
          <Link to="/kids">Kids</Link>
          <Link to="/women">Women</Link>
        </nav>
      </BrowserRouter>
        
        
            
          
       
        
        {/* Collection Dropdown */}
        <div
          className="nav-dropdown"
          onMouseEnter={() => setCollectionOpen(true)}
          onMouseLeave={() => setCollectionOpen(false)}
        >
          <button
            className="dropdown-btn"
            onClick={() => setCollectionOpen(!collectionOpen)}
            aria-expanded={collectionOpen}
          >
            New Collection <span>⌄</span>
          </button>
        <BrowserRouter>
          {collectionOpen && (
            <div className="dropdown-menu">
              <Link to="/collection">2026 Collection</Link>
              
            </div>
          )}
          </BrowserRouter>
            
        </div>
       
      

      {/* Header Actions */}
     
    </header>
  );
}

export default Header;
