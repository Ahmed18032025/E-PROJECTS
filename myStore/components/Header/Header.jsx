// import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <Link to="/">STYLE<span>HUB</span></Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      {/* Navigation */}
      <nav className={`nav-menu ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
        <Link to="/">Home</Link>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
      </nav>

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
        {collectionOpen && (
          <div className="dropdown-menu">
            <Link to="/collection" onClick={() => setCollectionOpen(false)}>2026 Collection</Link>
          </div>
        )}
      </div>

      {/* Header Actions */}
     
    </header>
  );
}

export default Header;
