import React from 'react';

function WishlistView({ wishlistItems, removeFromWishlist, addToCart }) {
  if (wishlistItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Save items you like to your wishlist so you can easily find them later.</p>
      </div>
    );
  }

  return (
    <div className="wishlist-view">
      <div className="section-header">
        <h2>My Wishlist</h2>
        <span className="wishlist-count">{wishlistItems.length} items</span>
      </div>
      
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="wishlist-item-info">
              <h3>{item.name}</h3>
              <p className="item-brand">{item.brand}</p>
              <div className="item-price">
                {item.discountPrice ? 
                  <span>${item.discountPrice}</span> : 
                  <span>${item.price}</span>
                }
              </div>
            </div>
            <div className="wishlist-item-actions">
              <button 
                className="move-to-cart"
                onClick={() => addToCart(item)}
                aria-label="Add to cart"
              >
                🛒
              </button>
              <button 
                className="remove-from-wishlist"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistView;