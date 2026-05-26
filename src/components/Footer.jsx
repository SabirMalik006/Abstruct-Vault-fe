import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiStar, FiX, FiMessageSquare } from 'react-icons/fi';
import { getCurrentUser } from '../services/authService';
import api from '../services/api';
import toast from 'react-hot-toast';
import './Footer.css';

export default function Footer() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    if (user && showFeedbackModal) {
      setGuestName(user.name);
    }
  }, [showFeedbackModal, user]);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error('Please enter your feedback');
    if (!user && !guestName) return toast.error('Please enter your name');

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        rating,
        comment,
        guestName: user ? undefined : guestName,
        // product is undefined for general feedback
      });
      toast.success('Thank you for your feedback!');
      setShowFeedbackModal(false);
      setComment('');
      setRating(5);
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top container">
        {/* Column 1: Brand Info */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">The Abstract <span>Vault</span></Link>
          <p>Pakistan's premier destination for exquisite fashion and trendy apparel. Curating elegance, style, and confidence for every occasion.</p>
          <button className="footer-feedback-btn" onClick={() => setShowFeedbackModal(true)}>
            <FiMessageSquare /> Leave a Review
          </button>
        </div>

        {/* Column 2: Our Collection */}
        <div className="footer-col">
          <h4>Our Collection</h4>
          <ul>
            <li><Link to="/collections/apparel" onClick={() => window.scrollTo(0, 0)}>Apparel</Link></li>
            <li><Link to="/collections/accessories" onClick={() => window.scrollTo(0, 0)}>Accessories</Link></li>
            <li><Link to="/collections/footwears" onClick={() => window.scrollTo(0, 0)}>Footwears</Link></li>
            <li><Link to="/collections/jewellery" onClick={() => window.scrollTo(0, 0)}>Jewellery</Link></li>
            <li><Link to="/collections/bags" onClick={() => window.scrollTo(0, 0)}>Bags</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Social */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About Our Story</Link></li>
            <li><Link to="/policies" onClick={() => window.scrollTo(0, 0)}>Our Policies</Link></li>
            <li><Link to="/pages/reviews" onClick={() => window.scrollTo(0, 0)}>Customer Testimonials</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Get in Touch</Link></li>
          </ul>

          <div className="social-links" style={{ marginTop: '2rem' }}>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} The Abstract Vault. All rights reserved.</p>
        {/* <div className="payment-badges">
          <span>COD</span>
          <span>JazzCash</span>
        </div> */}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="feedback-modal-overlay" onClick={() => setShowFeedbackModal(false)}>
          <div className="feedback-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowFeedbackModal(false)}>
              <FiX />
            </button>
            <div className="modal-header">
              <FiStar className="header-icon" />
              <h3>Share Your Feedback</h3>
              <p>We'd love to hear your thoughts on our products and service.</p>
            </div>

            <form onSubmit={handleSubmitFeedback}>
              <div className="star-rating">
                <div className="star-btns-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
                <span className="rating-text">
                  {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                </span>
              </div>

              {!user && (
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  placeholder="How was your experience with us?"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn btn-green" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
