import React, { useState } from 'react';

function Navbar({ cartCount }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search furniture" 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
        </form>
      </div>
      <div className="nav-icons">
        <button className="icon-button" aria-label="Notifications">
          <i className="notification-icon">🔔</i>
        </button>
        <button className="icon-button cart-button" aria-label={`Shopping cart with ${cartCount} items`}>
          <i className="cart-icon">🛒</i>
          {cartCount > 0 && (
            <span className="cart-badge" aria-hidden="true">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;