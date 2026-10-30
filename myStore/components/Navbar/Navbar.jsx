import "./Navbar.css"
function Navbar() {
    return (
        <>
        <nav>
        <div className="Logo">Hero</div>
        <div className="header-actions">
        <a href="/search" aria-label="Search">⌕</a>
        <a href="/account" aria-label="Account">♙</a>
        <a href="/cart" aria-label="Shopping cart">🛍</a>
      </div>
        </nav>
        
        </>
    )
}
export default Navbar;