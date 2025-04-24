import React from 'react';
import { useState } from 'react';

function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');
  
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'discover', icon: '🔍', label: 'Discover' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist' },
    { id: 'orders', icon: '📋', label: 'Orders' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button 
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;