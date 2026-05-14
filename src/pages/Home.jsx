import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiStar, FiTruck, FiRefreshCw,
  FiShield, FiHeadphones, FiChevronDown
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getHeroes } from '../services/heroService';
import { getProducts } from '../services/productService';
import { products as mockProducts, categories, reviews } from '../data/products';
import './Home.css';

// Features array - same rahega
const features = [
  { icon: <FiTruck />, title: 'Premium Fashion', desc: <>Curated collections for your <span className="vault-highlight">Elite Style</span></> },
  { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: <FiShield />, title: 'Secure Payment', desc: 'COD & digital payments' },
  { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Always here to help you' },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const FALLBACK_PRODUCT_IMAGES = [
    'https://images.pexels.com/photos/34965713/pexels-photo-34965713.jpeg',
    'https://images.pexels.com/photos/5357150/pexels-photo-5357150.jpeg',
    'https://images.pexels.com/photos/5466150/pexels-photo-5466150.jpeg',
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch heroes from backend
        const heroRes = await getHeroes();
        if (heroRes.success && heroRes.data.length > 0) {
          // Convert backend hero format to frontend format (design ke hisaab se)
          const formattedHeroes = heroRes.data.map((hero, index) => ({
            id: hero._id,
            tag: hero.subtitle || 'Featured',
            title: hero.title,
            subtitle: hero.description || 'Exquisite fashion for every style',
            cta: hero.buttonText || 'Shop Now',
            ctaPath: hero.buttonLink || '/collections/all-products',
            image: hero.imageUrl,
          }));
          setHeroSlides(formattedHeroes);
        } else {
          // Fallback to mock data if no heroes in DB
          setHeroSlides([
            {
              id: 1,
              tag: 'New Arrival',
              title: 'Modern\nElegance',
              subtitle: 'Step into the new season with our curated collection of sophisticated styles.',
              cta: 'Shop Now',
              ctaPath: '/collections/all-products',
              image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
            },
            {
              id: 2,
              tag: 'Limited Edition',
              title: 'Minimalist\nAesthetics',
              subtitle: 'Premium fabrics and timeless silhouettes for the modern wardrobe.',
              cta: 'Explore Collection',
              ctaPath: '/collections/all-products',
              image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
            },
            {
              id: 3,
              tag: 'Exclusive',
              title: 'Signature\nCollection',
              subtitle: 'Exquisite designs crafted for those who appreciate the finer things in life.',
              cta: 'Shop Collection',
              ctaPath: '/collections/all-products',
              image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
            },
          ]);
        }

        // Fetch featured products from backend
        const productsRes = await getProducts({ featured: 'true' });
        if (productsRes.success && productsRes.data.length > 0) {
          const formattedProducts = productsRes.data
            .filter(product => product.stock > 0) // Only show in-stock products
            .map(product => ({
              id: product._id,
              name: product.name,
              price: product.price,
              comparePrice: product.comparePrice,
              originalPrice: product.comparePrice, // for compatibility with ProductCard
              stock: product.stock,
              inStock: product.inStock,
              category: product.category?.name || 'Premium Collection',
              badge: product.isFeatured ? 'Featured' : '',
              image:
                product.images?.[0]?.url ||
                product.image ||
                FALLBACK_PRODUCT_IMAGES[0],
              images: product.images,
              slug: product.slug,
              rating: product.rating || 4.5, // fallback for UI
              reviewCount: product.numReviews || 12, // fallback for UI
              colors: product.colors || [],
              discount: product.comparePrice > product.price
                ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
                : 0
            }));
          setBestSellers(formattedProducts);
        } else {
          // Fallback to mock products
          setBestSellers(mockProducts.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
        // Fallback to mock data on error
        setHeroSlides([
          {
            id: 1,
            tag: 'New Arrival',
            title: 'Modern\nElegance',
            subtitle: 'Step into the new season with our curated collection of sophisticated styles.',
            cta: 'Shop Now',
            ctaPath: '/collections/all-products',
            image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
          },
          {
            id: 2,
            tag: 'Limited Edition',
            title: 'Minimalist\nAesthetics',
            subtitle: 'Premium fabrics and timeless silhouettes for the modern wardrobe.',
            cta: 'Explore Collection',
            ctaPath: '/collections/all-products',
            image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
          },
          {
            id: 3,
            tag: 'Exclusive',
            title: 'Signature\nCollection',
            subtitle: 'Exquisite designs crafted for those who appreciate the finer things in life.',
            cta: 'Shop Collection',
            ctaPath: '/collections/all-products',
            image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
          },
        ]);
        setBestSellers(mockProducts.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  if (loading) {
    return (
      <div className="home">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--steel)',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(25, 73, 51, 0.1)',
            borderTopColor: '#194933',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}></div>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.75rem'
          }}>Loading...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="home page-ready">

        {/* ── CINEMATIC HERO ── */}
        <section className="hero-wrap">
          <div
            className="hero-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
                data-index={idx + 1}
              >
                <img src={slide.image} alt={slide.title} className="hero-img" />
                <div className="hero-scrim" />
                <span className="hero-tag-badge">{slide.tag}</span>

                <div className="hero-body">
                  <h1 className="hero-title">
                    {slide.title.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </h1>
                  <p className="hero-sub">{slide.subtitle}</p>
                  <Link to={slide.ctaPath} className="hero-cta-btn">
                    {slide.cta} <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hdot${i === activeSlide ? ' active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="hero-bar">
            <Link to="/collections/all-products" className="hero-bar-btn">
              Best Selling Items
            </Link>
            <Link to="/collections/all-products" className="hero-bar-btn">
              Popular Items
            </Link>
          </div>
        </section>

        {/* ── FEATURES BAR ── */}
        <section className="feat-bar">
          <div className="container feat-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-item">
                <span className="feat-icon">{f.icon}</span>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHOP BY STYLE ── */}
        <section id="shop" className="section-pad">
          <div className="container">
            <p className="section-tag">Explore</p>
            <h2 className="section-title">Shop By Category</h2>
            <p className="section-subtitle">Your style, our passion — explore our curated collection of premium fashion.</p>
            <div className="categories-grid">
              {categories.slice(0, 4).map(cat => (
                <Link key={cat.id} to={`/collections/${cat.slug}`} className="cat-card">
                  <div className="cat-image">
                    <img src={cat.image || FALLBACK_PRODUCT_IMAGES[0]} alt={cat.name} />
                    <div className="cat-overlay" />
                  </div>
                  <div className="cat-info">
                    <h3>{cat.name}</h3>
                    <span>Shop Now <FiArrowRight /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEST SELLERS ── */}
        <section className="section-pad bg-cream-section">
          <div className="container">
            <p className="section-tag">Popular</p>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">Our most-loved pieces, loved by 5,000+ customers.</p>
            <div className="products-grid">
              {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/collections/all-products" className="btn-outline-large">
                View All Products <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROMO BANNER ── */}
        <section className="promo-banner">
          <div className="container promo-inner">
            <div className="promo-text">
              <span className="promo-tag">Limited Time Offer</span>
              <h2>Season End Sale — Up to 20% Off!</h2>
              <p>Grab your favourite styles before they're gone. Elevate your wardrobe with our premium collection of curated fashion pieces.</p>



              <Link to="/collections/all-products" className="hero-btn">Shop the Sale <FiArrowRight /></Link>
            </div>
            <div className="promo-image">
              <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg" alt="Season End Sale" />
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="section-pad reveal">
          <div className="container">
            <p className="section-tag">Testimonials</p>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real CarryMe customers across Pakistan.</p>
            <div className="reviews-marquee">
              <div className="reviews-track">
                {[...reviews, ...reviews].map((r, idx) => (
                  <div key={`${r.id}-${idx}`} className="review-card">
                    <div className="review-stars">
                      {[...Array(r.rating)].map((_, i) => (
                        <FiStar key={i} className="star filled" />
                      ))}
                    </div>
                    <p className="review-text">"{r.comment}"</p>
                    <div className="reviewer">
                      {r.image ? (
                        <img src={r.image} alt={r.name} className="reviewer-img" />
                      ) : (
                        <div className="reviewer-avatar">{r.name[0]}</div>
                      )}
                      <div>
                        <strong>{r.name}</strong>
                        <span>{r.location} · {r.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM ── */}
        {/* <section className="instagram-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <p className="section-tag">Follow Us</p>
            <h2 className="section-title">@AbstractVault.pk</h2>
            <p className="section-subtitle">Tag us in your photos for a chance to be featured!</p>
            <div className="instagram-grid">
              {[
                'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
                'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
                'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
                'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
                'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg',
                'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
              ].map((img, i) => (
                <div key={i} className="ig-item">
                  <img src={img} alt={`Instagram ${i + 1}`} />
                  <div className="ig-overlay"><FiArrowRight /></div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

      </div>
    </>
  );
}