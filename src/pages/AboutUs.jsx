import { FiAward, FiHeart, FiUsers, FiTarget, FiTruck, FiShield, FiRefreshCw, FiStar, FiCheckCircle } from 'react-icons/fi';

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Mission</h1>
            <p className="hero-subtitle">Empowering every girl with exquisite fashion, confidence, and timeless style.</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="brand-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-wrapper">
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" 
                  alt="Our Story"
                />
              </div>
            </div>
            <div className="story-content">
              <span className="story-tag">Our Background</span>
              <h2>Your Destination for Fashion Excellence</h2>
              <p>Founded in 2020, The Abstruct Vault was established with a clear mission: to redefine the fashion landscape in Pakistan by providing premium, trendy, and high-quality girls' apparel. What began as a specialized boutique has evolved into a leading destination for modern fashionistas.</p>
              <p>Every piece in our collection is curated with attention to detail, fabric quality, and the latest global trends. We believe that fashion is more than just clothing—it's a way to express your unique personality and shine in every moment.</p>
              <div className="story-stats">
                <div className="stat">
                  <strong>50,000+</strong>
                  <span>Happy Customers</span>
                </div>
                <div className="stat">
                  <strong>1,000+</strong>
                  <span>Unique Designs</span>
                </div>
                <div className="stat">
                  <strong>4.9★</strong>
                  <span>Style Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - With Glow Effect */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon"><FiTarget /></div>
              <h3>Our Mission</h3>
              <p>To provide accessible, high-quality, and trendy fashion solutions that inspire confidence and creativity in girls across Pakistan.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><FiHeart /></div>
              <h3>Our Vision</h3>
              <p>To be the premier fashion hub in the region, recognized for our commitment to style, quality, and the empowerment of our community.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><FiUsers /></div>
              <h3>Our Promise</h3>
              <p>Premium fabrics, exclusive designs, and a shopping experience that celebrates your individuality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - With Hover Glow */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Believe</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon"><FiAward /></div>
              <h3>Quality Craft</h3>
              <p>We use premium fabrics and meticulous craftsmanship in every design.</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><FiHeart /></div>
              <h3>Empowerment</h3>
              <p>We believe fashion should make you feel powerful and confident.</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><FiTruck /></div>
              <h3>Fast Fashion</h3>
              <p>Quick delivery and the latest trends updated weekly.</p>
            </div>
            <div className="value-item">
              <div className="value-icon"><FiShield /></div>
              <h3>Customer Trust</h3>
              <p>Reliable service, easy returns, and a community that loves to grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="why-us">
        <div className="container">
          <div className="why-us-content">
            <h2>Why Choose The Abstruct Vault?</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon"><FiStar /></div>
                <div className="feature-text">
                  <strong>Premium Quality</strong>
                  <span>High-grade materials for lasting durability</span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon"><FiRefreshCw /></div>
                <div className="feature-text">
                  <strong>Easy Returns</strong>
                  <span>7-day hassle-free return policy</span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon"><FiTruck /></div>
                <div className="feature-text">
                  <strong>Fast Logistics</strong>
                  <span>Expedited shipping for critical site equipment</span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon"><FiShield /></div>
                <div className="feature-text">
                  <strong>Secure Shopping</strong>
                  <span>100% secure payment gateway</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          font-family: 'Inter', sans-serif;
        }



        /* Hero Section */
        .about-hero {
          background: #194933;
          padding: 100px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .about-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
        }
        
        .hero-title {
          font-size: 52px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
          animation: fadeInUp 0.8s ease;
        }
        
        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 0.8s ease 0.2s both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Brand Story */
        .brand-story {
          padding: 100px 0;
          background: #fff;
        }
        
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        
        .story-image-wrapper {
          position: relative;
        }
        
        .story-image {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }
        
        .story-image:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        
        .story-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }
        
        .story-image:hover img {
          transform: scale(1.05);
        }
        
        .story-tag {
          color: #194933;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 600;
          display: inline-block;
        }
        
        .story-content h2 {
          font-size: 38px;
          font-weight: 700;
          margin: 15px 0 20px;
          color: #1a1a1a;
          line-height: 1.2;
        }
        
        .story-content p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .story-stats {
          display: flex;
          gap: 40px;
          margin-top: 30px;
        }
        
        .stat strong {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #194933;
        }
        
        .stat span {
          font-size: 14px;
          color: #666;
        }

        /* Mission Section - With Glow Effect */
        .mission-section {
          padding: 80px 0;
          background: #f8f9fa;
        }
        
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .mission-card {
          text-align: center;
          padding: 45px 25px;
          background: white;
          border-radius: 24px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .mission-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(25,73,51,0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .mission-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(25,73,51,0.2), 0 0 20px rgba(25,73,51,0.3);
        }
        
        .mission-card:hover::before {
          opacity: 1;
        }
        
        .mission-icon {
          width: 80px;
          height: 80px;
          background: #194933;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 32px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .mission-card:hover .mission-icon {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(25,73,51,0.5);
        }
        
        .mission-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #1a1a1a;
        }
        
        .mission-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Values Section */
        .values-section {
          padding: 100px 0;
          background: #fff;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .section-tag {
          color: #194933;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 600;
          display: inline-block;
        }
        
        .section-header h2 {
          font-size: 40px;
          font-weight: 700;
          margin-top: 12px;
          color: #1a1a1a;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 35px;
        }
        
        .value-item {
          text-align: center;
          padding: 35px 25px;
          background: white;
          border-radius: 20px;
          transition: all 0.3s ease;
          border: 1px solid #eee;
        }
        
        .value-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(25,73,51,0.15), 0 0 0 2px rgba(25,73,51,0.2);
        }
        
        .value-icon {
          width: 70px;
          height: 70px;
          background: #f0ebe4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 28px;
          color: #194933;
          transition: all 0.3s ease;
        }
        
        .value-item:hover .value-icon {
          background: #194933;
          color: white;
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(25,73,51,0.4);
        }
        
        .value-item h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1a1a1a;
        }
        
        .value-item p {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }

        /* Why Us Section */
        .why-us {
          padding: 100px 0 120px; /* Increased bottom padding for better footer transition */
          background: #194933;
          position: relative;
          overflow: hidden;
        }
        
        .why-us::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          animation: slowRotate 30s linear infinite;
        }
        
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .why-us-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        
        .why-us-content h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 50px;
          color: white;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 18px;
          text-align: left;
          padding: 20px 25px;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .feature:hover {
          background: rgba(255,255,255,0.2);
          transform: translateX(8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(255,255,255,0.3);
        }
        
        .feature-icon {
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .feature-icon svg {
          font-size: 26px;
          color: white;
        }
        
        .feature-text strong {
          display: block;
          font-size: 16px;
          margin-bottom: 6px;
          color: white;
        }
        
        .feature-text span {
          font-size: 13px;
          opacity: 0.85;
          color: white;
        }

        @media (max-width: 992px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-title {
            font-size: 42px;
          }
          .story-content h2 {
            font-size: 32px;
          }
        }
        
        @media (max-width: 768px) {
          .about-hero {
            padding: 60px 0;
          }
          .hero-title {
            font-size: 32px;
          }
          .hero-subtitle {
            font-size: 16px;
          }
          .brand-story {
            padding: 60px 0;
          }
          .story-content h2 {
            font-size: 28px;
          }
          .story-stats {
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }
          .mission-card {
            padding: 30px 20px;
          }
          .section-header h2 {
            font-size: 32px;
          }
          .why-us-content h2 {
            font-size: 28px;
          }
          .features-grid {
            grid-template-columns: 1fr; /* Stack on mobile */
          }
          .feature {
            padding: 15px 20px;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          .hero-title {
            font-size: 28px;
          }
          .story-content h2 {
            font-size: 24px;
          }
          .mission-card h3 {
            font-size: 20px;
          }
          .value-item {
            padding: 25px 15px;
          }
        }
      `}</style>
    </div>
  );
}