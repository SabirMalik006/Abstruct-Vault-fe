import { useState } from 'react';
import { FiChevronRight, FiFilter, FiX } from 'react-icons/fi';
import './CategorySidebar.css';

const CategorySidebar = ({ categories, activeCategory, onCategoryChange, isOpen, onClose }) => {
  return (
    <aside className={`category-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3><FiFilter /> Filters</h3>
        <button className="close-sidebar" onClick={onClose}><FiX /></button>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <ul className="category-list">
          <li 
            className={activeCategory === 'all' ? 'active' : ''} 
            onClick={() => { onCategoryChange('all'); onClose(); }}
          >
            All Products
          </li>
          {categories.map(cat => (
            <li 
              key={cat._id} 
              className={activeCategory === cat._id ? 'active' : ''}
              onClick={() => { onCategoryChange(cat._id); onClose(); }}
            >
              {cat.name}
              {/* <span className="cat-count">{cat.productCount || 0}</span> */}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;
