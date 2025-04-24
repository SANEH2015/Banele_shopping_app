import React, { useState } from 'react';

function ProductList({ wishlist, addToWishlist, addToCart }) {
  const [loadingStates, setLoadingStates] = useState({});
  
  // Updated products data with real images
  const products = [
    {
      id: 1,
      name: 'Compact Folding Table',
      brand: 'Lifetime',
      price: 89,
      discountPrice: 69,
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/I/71YHhO2uVQL._AC_SL1500_.jpg'
    },
    {
      id: 2,
      name: 'Stainless Steel Kettle',
      brand: 'Cuisinart',
      price: 65,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/71+U6t7q9hL._AC_SL1500_.jpg'
    },
    {
      id: 3,
      name: 'Ceramic Mug Set',
      brand: 'Stone Lain',
      price: 32,
      discountPrice: 25,
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/71tGpYhE3sL._AC_SL1500_.jpg'
    },
    {
      id: 4,
      name: 'Adjustable Floor Lamp',
      brand: 'Brightech',
      price: 45,
      rating: 4.2,
      image: 'https://m.media-amazon.com/images/I/71v0v5GkXEL._AC_SL1500_.jpg'
    }
  ];

  const handleAddToCart = (product) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
    
    setTimeout(() => {
      addToCart(product);
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }, 300);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const renderRating = (rating) => {
    const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
    return <div className="product-rating" title={`${rating} out of 5 stars`}>{stars}</div>;
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} loading="lazy" />
            <button 
              className={`wishlist-button ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => addToWishlist(product.id)}
              aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlist.includes(product.id) ? '❤️' : '🤍'}
            </button>
            
            {product.discountPrice && (
              <div className="discount-badge">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
              </div>
            )}
          </div>
          
          <div className="product-info">
            <h3 title={product.name}>{product.name}</h3>
            <p className="product-brand">{product.brand}</p>
            {renderRating(product.rating)}
            
            <div className="product-footer">
              <div className="price-container">
                {product.discountPrice ? (
                  <>
                    <span className="product-price">R{formatPrice(product.discountPrice)}</span>
                    <span className="original-price">R{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="product-price">R{formatPrice(product.price)}</span>
                )}
              </div>
              
              <button 
                className={`add-to-cart ${loadingStates[product.id] ? 'loading' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={loadingStates[product.id]}
                aria-label="Add to cart"
              >
                {loadingStates[product.id] ? '•' : '+'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;