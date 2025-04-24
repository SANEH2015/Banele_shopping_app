import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Categories from './components/Categories';
import ProductList from './components/ProductList';
import BottomNav from './components/BottomNav';
import WishlistView from './components/WishlistView';
import CartView from './components/CartView';

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showCartNotification, setShowCartNotification] = useState(false);
  
  // Sample product data (would normally come from an API)
  const products = [
    {
      id: 1,
      name: 'Small Living Table',
      brand: 'Walter Knoll',
      price: 750,
      discountPrice: 695,
      rating: 4.5,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Pole Brown Chair',
      brand: 'Rolf Benz',
      price: 1000,
      rating: 4.8,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Modern Sofa',
      brand: 'Walter Knoll',
      price: 2500,
      discountPrice: 2100,
      rating: 4.7,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'Storage Cabinet',
      brand: 'IKEA',
      price: 450,
      rating: 4.2,
      image: 'https://via.placeholder.com/150'
    }
  ];
 
  // Memoized cart count
  const cartCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0), 
    [cart]
  );

  // Get wishlist items with full product details
  const wishlistItems = useMemo(() => 
    products.filter(product => wishlist.includes(product.id)),
    [wishlist, products]
  );

  // Toggle product in wishlist
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.includes(productId)
        ? prevWishlist.filter(id => id !== productId)
        : [...prevWishlist, productId]
    );
  }, []);
  
  // Add product to cart
  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        return updatedCart;
      } 
      
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Show notification
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 2000);
  }, []);

  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  // Update product quantity in cart
  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  }, [removeFromCart]);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'wishlist':
        return <WishlistView 
          wishlistItems={wishlistItems} 
          removeFromWishlist={toggleWishlist} 
          addToCart={addToCart}
        />;
      case 'cart':
        return <CartView 
          cartItems={cart} 
          updateQuantity={updateCartQuantity} 
          removeFromCart={removeFromCart}
        />;
      case 'home':
      default:
        return (
          <>
            <Hero 
              title="Tamas Living" 
              subtitle="New Collection from Walter Knoll that's perfect for your living room" 
              buttonText="Shop Now"
              imageSrc="https://via.placeholder.com/480x200"
            />
            
            {/* <Categories /> */}
            
            <section className="recommendations">
              <div className="section-header">
                <h2>Recommended for you</h2>
                <button className="see-all">See All</button>
              </div>
              
              <ProductList 
                products={products}
                wishlist={wishlist} 
                addToWishlist={toggleWishlist} 
                addToCart={addToCart} 
              />
            </section>
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />
      
      <main className="main-content">
        {renderContent()}
      </main>
      
      {showCartNotification && (
        <div className="cart-notification">
          Item added to cart successfully!
        </div>
      )}
      
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      />
    </div>
  );
}

export default App;