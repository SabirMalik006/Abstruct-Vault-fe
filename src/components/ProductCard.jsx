import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { isAuthenticated } from '../services/authService';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const FALLBACK_IMAGES = [
    'https://images.pexels.com/photos/34965713/pexels-photo-34965713.jpeg',
    'https://images.pexels.com/photos/5357150/pexels-photo-5357150.jpeg',
    'https://images.pexels.com/photos/5466150/pexels-photo-5466150.jpeg',
    'https://images.pexels.com/photos/18510503/pexels-photo-18510503.jpeg',
    'https://images.pexels.com/photos/20844818/pexels-photo-20844818.jpeg',
  ];

  if (!product) return null;

  const colorMap = {
    'Black': '#1a1a1a', 'Brown': '#6B4226', 'Dark Brown': '#3E2C1C',
    'Green': '#2E5E3E', 'Beige': '#C8AD8F', 'Pink': '#E8A4B0',
    'White': '#F5F5F5', 'Off-White': '#EDE8E0', 'Natural': '#D4C4A0',
    'Navy': '#1B2A4A', 'Olive': '#6B6E3E'
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (product.inStock || product.stock > 0) {
      addToCart(product, 1, selectedColor);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    toggleWishlist(product);
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${product.slug}`);
    window.scrollTo(0, 0);
  };

  const productId = product._id || product.id;
  const inStock = product.inStock || product.stock > 0;
  const productName = product.name || 'Product';
  const productPrice = product.price || 0;
  
  const resolvedProductImage = typeof product.image === 'string' && product.image
    ? product.image
    : (product.images?.[0]?.url || product.images?.[0] || FALLBACK_IMAGES[0]);

  const productImage = resolvedProductImage === '/images/placeholder.jpg' ? FALLBACK_IMAGES[0] : resolvedProductImage;
  const hoverResolvedImage = product.images?.[1]?.url || product.images?.[1] || productImage;
  const hoverImage = hoverResolvedImage === '/images/placeholder.jpg' ? FALLBACK_IMAGES[1] : hoverResolvedImage;
  const productSlug = product.slug;
  const productColors = product.colors || [];
  const productDiscount = product.discount || 0;

  const mainImage = productImage;
  const secondaryImage = (hoverImage && hoverImage !== productImage) ? hoverImage : null;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Link to={`/products/${productSlug}`} className="product-image-wrap">
        <img
          src={mainImage}
          alt={productName}
          className={`product-img main-img ${hovering && secondaryImage ? 'hidden' : ''}`}
          loading="lazy"
        />
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${productName} hover`}
            className={`product-img hover-img ${hovering ? 'visible' : ''}`}
            loading="lazy"
          />
        )}
        {product.badge && <span className="badge-new">{product.badge}</span>}
        {productDiscount > 0 && <span className="badge-discount">-{productDiscount}%</span>}
        {!inStock && <span className="badge-out">Out of Stock</span>}

        <div className={`product-actions ${hovering ? 'visible' : ''}`}>
          <button className={`action-btn wishlist-btn ${isWishlisted(productId) ? 'active' : ''}`} onClick={handleWishlistClick} title="Add to Wishlist">
            <FiHeart />
          </button>
          <button className="action-btn cart-btn" onClick={handleAddToCart} title={inStock ? 'Add to Cart' : 'Out of Stock'} disabled={!inStock}>
            <FiShoppingCart />
          </button>
          <button className="action-btn view-btn" onClick={handleViewClick} title="Quick View">
            <FiEye />
          </button>
        </div>
      </Link>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">
            {typeof product.category === 'object' ? product.category?.name : product.category || 'Collection'}
          </span>
        </div>

        <h3 className="product-name">
          <Link to={`/products/${productSlug}`}>{productName}</Link>
        </h3>

        {productColors.length > 0 && (
          <div className="color-swatches">
            {productColors.slice(0, 5).map(color => (
              <button
                key={typeof color === 'string' ? color : color.name}
                className={`swatch ${selectedColor === (typeof color === 'string' ? color : color.name) ? 'active' : ''}`}
                style={{ background: colorMap[typeof color === 'string' ? color : color.name] || '#ccc' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(typeof color === 'string' ? color : color.name);
                }}
                title={typeof color === 'string' ? color : color.name}
              />
            ))}
            {productColors.length > 5 && <span className="swatch-more">+{productColors.length - 5}</span>}
          </div>
        )}

        <div className="product-footer">
          <div className="product-pricing">
            <span className="price-sale">Rs.{productPrice.toLocaleString()}</span>
            {product.originalPrice > productPrice && (
              <span className="price-original">Rs.{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button className={`btn-add-cart-icon ${!inStock ? 'disabled' : ''}`} onClick={handleAddToCart} disabled={!inStock} title={inStock ? 'Add to Cart' : 'Out of Stock'}>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}