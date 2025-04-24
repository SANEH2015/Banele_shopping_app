import React from 'react';

function CartView({ cartItems, updateQuantity, removeFromCart }) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.discountPrice || item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart to continue shopping.</p>
      </div>
    );
  }

  return (
    <div className="cart-view">
      <div className="section-header">
        <h2>My Cart</h2>
        <span className="cart-count">{cartItems.length} items</span>
      </div>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="item-brand">{item.brand}</p>
              <div className="item-price">
                {item.discountPrice ? 
                  <span>${formatPrice(item.discountPrice)}</span> : 
                  <span>${formatPrice(item.price)}</span>
                }
              </div>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button 
                className="remove-from-cart"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove from cart"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
        <button className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartView;