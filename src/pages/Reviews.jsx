import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import api from '../services/api';
import './Reviews.css';

export default function Reviews() {
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      try {
        const res = await api.get('/reviews/featured');
        setFeaturedReviews(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch featured reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedReviews();
  }, []);

  return (
    <div className="reviews-page page-content">
      <div className="reviews-hero">
        <div className="container">
          <p className="section-tag">Testimonials</p>
          <h1>Customer Reviews</h1>
          <p>Real feedback from our satisfied customers across Pakistan.</p>
          <div className="rating-summary">
            <span className="big-num">4.8</span>
            <div>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="star filled" />)}
              </div>
              <span>Based on customer feedback</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container reviews-grid-page">
        {loading ? (
          <div className="loading-state">Loading reviews...</div>
        ) : featuredReviews.length === 0 ? (
          <div className="empty-state">No featured reviews yet.</div>
        ) : (
          featuredReviews.map((r, i) => (
            <div key={r._id || i} className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} className={`star ${j < r.rating ? 'filled' : ''}`} />
                ))}
              </div>
              <p className="review-text">"{r.comment}"</p>
              <div className="reviewer">
                <div className="reviewer-avatar">
                  {r.user?.name ? r.user.name[0] : (r.guestName ? r.guestName[0] : '?')}
                </div>
                <div>
                  <strong>{r.user?.name || r.guestName || 'Anonymous'}</strong>
                  <span>
                    {r.product ? `Reviewed: ${r.product.name}` : 'General Feedback'} · {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
