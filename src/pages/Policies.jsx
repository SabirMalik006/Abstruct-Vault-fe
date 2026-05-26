import React from 'react';
import { FiShield, FiTruck, FiFileText } from 'react-icons/fi';
import './Policies.css';

export default function Policies() {
  return (
    <div className="policies-page">
      {/* Hero Section */}
      <section className="policies-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Policies</h1>
            <p className="hero-subtitle">Learn more about our terms of service and shipping guidelines.</p>
          </div>
        </div>
      </section>

      <section className="policies-content-section">
        <div className="container">
          <div className="policies-grid">
            {/* Terms & Conditions */}
            <div className="policy-card">
              <div className="policy-icon">
                <FiFileText />
              </div>
              <h2>Terms & Conditions</h2>
              <div className="policy-text">
                <p>
                  Welcome to <strong>The Abstract Vault</strong>. By using our services, you agree to follow our terms and policies. 
                  Please make sure all information provided by you is correct. We reserve the right to update products, prices, 
                  and policies at any time without prior notice.
                </p>
              </div>
            </div>

            {/* Shipping Policy */}
            <div className="policy-card">
              <div className="policy-icon">
                <FiTruck />
              </div>
              <h2>Shipping Policy</h2>
              <div className="policy-text">
                <p>
                  At <strong>The Abstract Vault</strong>, we process and ship orders as quickly as possible. Delivery times may vary 
                  depending on your location and courier service. Customers will receive order updates after confirmation. 
                  If you face any issue with shipping, feel free to contact our support team.
                </p>
              </div>
            </div>

            {/* General Policy Info */}
            <div className="policy-card">
              <div className="policy-icon">
                <FiShield />
              </div>
              <h2>Privacy & Security</h2>
              <div className="policy-text">
                <p>
                  Your privacy is important to us. <strong>The Abstract Vault</strong> ensures that your personal information 
                  is kept secure and only used for processing your orders and improving your shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
