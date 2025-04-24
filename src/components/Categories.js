// import React, { useState } from 'react';

// function Categories() {
//   const [activeCategory, setActiveCategory] = useState(null);
  
//   const categories = [
//     { id: 1, name: 'Tables', icon: '🪑' },
//     { id: 2, name: 'Beds', icon: '🛏️' },
//     { id: 3, name: 'Chairs', icon: '💺' },
//     { id: 4, name: 'Storage', icon: '🗄️' },
//     { id: 5, name: 'Sofas', icon: '🛋️' },
//   ];

//   return (
//     <section className="categories-section">
//       <div className="section-header">
//         <h2>Categories</h2>
//       </div>
//       <div className="categories">
//         {categories.map(category => (
//           <button 
//             key={category.id} 
//             className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
//             onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
//             aria-label={`Category: ${category.name}`}
//           >
//             <div className="category-icon">{category.icon}</div>
//             <span className="category-name">{category.name}</span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Categories;