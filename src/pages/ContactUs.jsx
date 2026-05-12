import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiPhoneCall, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { submitContact } from '../services/contactService';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>We're here 24/7 to assist you with any questions about our safety equipment.</p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - With Glow Effect */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-icon"><FiMapPin /></div>
              <h3>Visit Us</h3>
              <p>Icon 2, Business Square</p>
              <p>Gulberg Greens, Islamabad</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FiPhoneCall /></div>
              <h3>Call Us</h3>
              <p>+92 3215366666</p>
              <p>📞 24/7 Available</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FiMail /></div>
              <h3>Email Us</h3>
              <p>info@horizonintegratedsolutions@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            {/* Map - Updated Location */}
            <div className="contact-map-wrapper">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.123456789012!2d73.029876!3d33.714567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df954b7b8f8b9d%3A0x7e8f9a2b3c4d5e6f!2sBusiness%20Square%2C%20Gulberg%20Greens%2C%20Islamabad!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="The Abstruct Vault - Islamabad Location"
                ></iframe>
              </div>
              <div className="map-badge">
                <FiMapPin />
                <span>Icon 2, Business Square, Gulberg Greens, Islamabad</span>
              </div>
            </div>

            {/* Contact Form - With Glow Effect */}
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <p>Have a question? Fill out the form and we'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'} <FiSend />
                </button>
                {isSubmitted && (
                  <div className="success-message">
                    <FiCheckCircle />
                    Inquiry sent successfully! Our team will contact you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section - Updated to 24/7 */}
      <section className="hours-section">
        <div className="container">
          <div className="hours-content">
            <div className="hours-icon"><FiClock /></div>
            <h2>Business Hours</h2>
            <div className="hours-grid">
              <div className="hour-item">
                <span>Monday - Friday</span>
                <strong>24/7 Available</strong>
                <small>Support & Emergency</small>
              </div>
              <div className="hour-item">
                <span>Saturday - Sunday</span>
                <strong>24/7 Available</strong>
                <small>Online Support</small>
              </div>
            </div>
            <div className="support-badge">
              <FiMessageCircle />
              <span>Emergency Support Available 24/7 - Call Anytime!</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          font-family: 'Inter', sans-serif;
        }



        /* Hero Section */
        .contact-hero {
          background: #194933;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .contact-hero::before {
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
        
        .contact-hero h1 {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
          animation: fadeInUp 0.8s ease;
        }
        
        .contact-hero p {
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

        /* Contact Cards - With Glow Effect */
        .contact-info-section {
          padding: 70px 0;
          background: #fff;
        }
        
        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 35px;
        }
        
        .contact-card {
          text-align: center;
          padding: 45px 25px;
          background: #ffffff;
          border-radius: 24px;
          transition: all 0.3s ease;
          border: 1px solid #eef2f0;
          position: relative;
          overflow: hidden;
        }
        
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(25,73,51,0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(25,73,51,0.15), 0 0 20px rgba(25,73,51,0.2);
          border-color: rgba(25,73,51,0.3);
        }
        
        .contact-card:hover::before {
          opacity: 1;
        }
        
        .contact-icon {
          width: 75px;
          height: 75px;
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
        
        .contact-card:hover .contact-icon {
          transform: scale(1.1);
          box-shadow: 0 0 25px rgba(25,73,51,0.5);
        }
        
        .contact-card h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #1a1a1a;
        }
        
        .contact-card p {
          color: #666;
          line-height: 1.7;
          margin: 8px 0;
        }

        /* Map Section */
        .contact-form-section {
          padding: 70px 0;
          background: #f8f9fa;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }
        
        .contact-map-wrapper {
          position: relative;
        }
        
        .contact-map {
          height: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .contact-map:hover {
          box-shadow: 0 20px 45px rgba(25,73,51,0.15);
          transform: scale(1.01);
        }
        
        .map-badge {
          position: absolute;
          bottom: -15px;
          left: 20px;
          right: 20px;
          background: #194933;
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }
        
        .map-badge svg {
          font-size: 18px;
          flex-shrink: 0;
        }

        /* Contact Form - With Glow Effect */
        .contact-form {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        
        .contact-form:hover {
          box-shadow: 0 20px 45px rgba(25,73,51,0.12), 0 0 0 1px rgba(25,73,51,0.1);
        }
        
        .contact-form h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
        }
        
        .contact-form > p {
          color: #666;
          margin-bottom: 30px;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 1.5px solid #e8ecea;
          border-radius: 14px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
          background: white;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #194933;
          box-shadow: 0 0 0 4px rgba(25,73,51,0.1);
        }
        
        .form-group input:hover,
        .form-group textarea:hover {
          border-color: #194933;
        }
        
        .submit-btn {
          width: 100%;
          background: #194933;
          color: white;
          border: none;
          padding: 16px 30px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-btn:hover:not(:disabled) {
          background: #0f3525;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(25,73,51,0.3);
        }
        
        .success-message {
          margin-top: 20px;
          padding: 12px 16px;
          background: #e8f5e9;
          color: #2e7d32;
          border-radius: 12px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeIn 0.3s ease;
        }
        
        .success-message svg {
          font-size: 18px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hours Section - 24/7 Updated */
        .hours-section {
          padding: 70px 0;
          background: #fff;
        }
        
        .hours-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .hours-icon {
          width: 80px;
          height: 80px;
          background: #194933;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 36px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .hours-icon:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(25,73,51,0.4);
        }
        
        .hours-content h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 35px;
          color: #1a1a1a;
        }
        
        .hours-grid {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        
        .hour-item {
          text-align: center;
          padding: 20px 30px;
          background: #f8f9fa;
          border-radius: 20px;
          transition: all 0.3s ease;
          min-width: 200px;
        }
        
        .hour-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(25,73,51,0.1), 0 0 0 2px rgba(25,73,51,0.2);
        }
        
        .hour-item span {
          display: block;
          color: #666;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .hour-item strong {
          font-size: 22px;
          color: #194933;
          display: block;
          margin-bottom: 5px;
        }
        
        .hour-item small {
          font-size: 12px;
          color: #888;
        }
        
        .support-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #194933 0%, #1f5a3e 100%);
          color: white;
          padding: 14px 28px;
          border-radius: 50px;
          margin-top: 20px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 5px 20px rgba(25,73,51,0.3);
          transition: all 0.3s ease;
        }
        
        .support-badge:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(25,73,51,0.4);
        }
        
        .support-badge svg {
          font-size: 20px;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact-hero h1 {
            font-size: 42px;
          }
        }
        
        @media (max-width: 768px) {
          .contact-hero {
            padding: 60px 0;
          }
          .contact-hero h1 {
            font-size: 32px;
          }
          .contact-hero p {
            font-size: 16px;
          }
          .contact-info-section {
            padding: 50px 0;
          }
          .contact-card {
            padding: 35px 20px;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .contact-form {
            padding: 30px 25px;
          }
          .hours-grid {
            gap: 20px;
          }
          .hour-item {
            min-width: auto;
            width: 100%;
            padding: 15px 20px;
          }
          .hour-item strong {
            font-size: 18px;
          }
          .support-badge {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          .contact-card h3 {
            font-size: 20px;
          }
          .contact-card p {
            font-size: 14px;
          }
          .map-badge {
            font-size: 11px;
            padding: 10px 15px;
          }
          .hours-content h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}