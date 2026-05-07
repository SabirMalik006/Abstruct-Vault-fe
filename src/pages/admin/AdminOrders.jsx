import { useState, useEffect } from 'react';
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiX, FiMapPin, FiUser, FiPhone, FiCreditCard, FiAlertTriangle, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { getAllOrders, updateOrderStatus, verifyPayment, rejectPayment } from '../../services/orderService';
import toast from 'react-hot-toast';
import './AdminOrders.css';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusIcons = {
  pending: <FiClock />,
  processing: <FiPackage />,
  shipped: <FiTruck />,
  delivered: <FiCheckCircle />,
  cancelled: <FiXCircle />
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  
  // Draft states for modal
  const [statusDraft, setStatusDraft] = useState('');
  const [trackingDraft, setTrackingDraft] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedOrder]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);
    try {
      await updateOrderStatus(selectedOrder._id, statusDraft, trackingDraft);
      toast.success(`Order status updated to ${statusDraft}`);
      fetchOrders();
      setSelectedOrder(null); // Close modal on success as requested
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update status, please try again');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (orderId) => {
    if (window.confirm('Verify this payment? Order will be moved to processing.')) {
      setSubmitting(true);
      try {
        await verifyPayment(orderId, 'Verified via Admin Panel');
        toast.success('Payment verified! Order is now processing.');
        fetchOrders();
        setSelectedOrder(null);
      } catch (error) {
        toast.error('Verification failed');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleReject = async (orderId) => {
    const reason = prompt('Please enter reason for rejection:');
    if (reason) {
      setSubmitting(true);
      try {
        await rejectPayment(orderId, reason, 'Rejected via Admin Panel');
        toast.success('Payment rejected. Order cancelled.');
        fetchOrders();
        setSelectedOrder(null);
      } catch (error) {
        toast.error('Rejection failed');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setStatusDraft(order.orderStatus);
    setTrackingDraft(order.trackingNumber || '');
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.orderStatus === filter);

  const getStatusCount = (status) => orders.filter(o => o.orderStatus === status).length;

  if (loading) return <div className="admin-loading">Loading orders...</div>;

  return (
    <div className="admin-orders">
      <div className="page-header">
        <div>
          <h1>Order Management</h1>
          <p>Track and fulfill customer orders — {orders.length} total</p>
        </div>
      </div>

      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All <span className="tab-count">{orders.length}</span>
        </button>
        {statusOptions.map(status => (
          <button key={status} className={`${filter === status ? 'active' : ''} tab-${status}`} onClick={() => setFilter(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {getStatusCount(status) > 0 && <span className="tab-count">{getStatusCount(status)}</span>}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="orders-empty">
          <FiPackage size={42} />
          <p>No orders found in this category.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map(order => (
            <div key={order._id} className={`order-card ${order.paymentStatus === 'pending_verification' ? 'needs-verify' : ''}`}>
              <div className="order-header">
                <div className="order-id">#{order._id?.slice(-8).toUpperCase()}</div>
                <div className={`order-status ${order.orderStatus}`}>
                  {statusIcons[order.orderStatus]} {order.orderStatus}
                </div>
              </div>
              <div className="order-body">
                <div className="order-info">
                  <div className="info-row">
                    <span>Customer</span>
                    <strong>{order.user?.name || 'Guest User'}</strong>
                  </div>
                  <div className="info-row">
                    <span>Amount</span>
                    <strong className="order-total">Rs.{order.totalPrice?.toLocaleString()}</strong>
                  </div>
                  <div className="info-row">
                    <span>Payment</span>
                    <span className={`payment-badge ${order.paymentStatus}`}>
                      {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                    </span>
                  </div>
                </div>
                <div className="order-actions">
                  <button onClick={() => openOrderModal(order)} className="view-btn">
                    <FiEye /> View & Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content large order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header premium-header">
              <div className="header-top">
                <div className="id-badge">
                  <FiPackage />
                  <span>Order #{selectedOrder._id?.slice(-8).toUpperCase()}</span>
                </div>
                <div className={`status-pill large ${selectedOrder.orderStatus}`}>
                  {statusIcons[selectedOrder.orderStatus]} {selectedOrder.orderStatus}
                </div>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}><FiX /></button>
            </div>

            <div className="order-details-body">
              <div className="details-layout">
                {/* Left Side: Information */}
                <div className="details-left">
                  <div className="info-card">
                    <div className="card-header">
                      <FiUser /> <h3>Customer Information</h3>
                    </div>
                    <div className="card-body">
                      <div className="data-row">
                        <span>Full Name</span>
                        <strong>{selectedOrder.user?.name || selectedOrder.shippingAddress?.fullName}</strong>
                      </div>
                      <div className="data-row">
                        <span>Email Address</span>
                        <strong>{selectedOrder.user?.email || 'N/A'}</strong>
                      </div>
                      <div className="data-row">
                        <span>Phone Number</span>
                        <strong>{selectedOrder.shippingAddress?.phone}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="card-header">
                      <FiMapPin /> <h3>Shipping Address</h3>
                    </div>
                    <div className="card-body">
                      <address className="shipping-address-box">
                        <p className="addr-name">{selectedOrder.shippingAddress?.fullName}</p>
                        <p>{selectedOrder.shippingAddress?.address}</p>
                        <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}</p>
                      </address>
                    </div>
                  </div>

                  {selectedOrder.paymentMethod !== 'cod' && (
                    <div className="info-card payment-verify-card">
                      <div className="card-header">
                        <FiCreditCard /> <h3>Payment Verification</h3>
                      </div>
                      <div className="card-body">
                        <div className="payment-meta">
                          <div className="data-row">
                            <span>Method</span>
                            <strong>{selectedOrder.paymentMethod.toUpperCase()}</strong>
                          </div>
                          <div className="data-row">
                            <span>Transaction ID</span>
                            <strong className="tx-id">{selectedOrder.paymentProof?.transactionId || 'N/A'}</strong>
                          </div>
                        </div>
                        
                        {selectedOrder.paymentProof?.screenshotUrl && (
                          <div className="proof-action">
                            <a href={selectedOrder.paymentProof.screenshotUrl} target="_blank" rel="noreferrer" className="btn-view-proof">
                              <FiEye /> View Payment Screenshot
                            </a>
                          </div>
                        )}

                        {selectedOrder.paymentStatus === 'pending_verification' && (
                          <div className="verify-controls">
                            <button className="btn-approve" onClick={() => handleVerify(selectedOrder._id)}>
                              <FiCheckCircle /> Verify Payment
                            </button>
                            <button className="btn-reject" onClick={() => handleReject(selectedOrder._id)}>
                              <FiXCircle /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Items & Fulfillment */}
                <div className="details-right">
                  <div className="info-card items-card">
                    <div className="card-header">
                      <FiPackage /> <h3>Order Items</h3>
                    </div>
                    <div className="card-body">
                      <div className="items-scroll-list">
                        {selectedOrder.orderItems?.map((item, idx) => (
                          <div key={idx} className="order-item-row">
                            <div className="item-main-info">
                              <span className="item-qty">{item.quantity}x</span>
                              <span className="item-name">{item.name}</span>
                            </div>
                            <span className="item-price">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-summary-box">
                        <div className="summary-row">
                          <span>Subtotal</span>
                          <span>Rs.{selectedOrder.itemsPrice?.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping Fee</span>
                          <span>Rs.{selectedOrder.shippingPrice?.toLocaleString()}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total Amount</span>
                          <span>Rs.{selectedOrder.totalPrice?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-card fulfillment-card">
                    <div className="card-header">
                      <FiTruck /> <h3>Order Fulfillment</h3>
                    </div>
                    <div className="card-body">
                      <div className="admin-form-group">
                        <label>Update Order Status</label>
                        <div className="select-wrapper">
                          <select
                            value={statusDraft}
                            onChange={(e) => setStatusDraft(e.target.value)}
                          >
                            {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                          <FiChevronDown className="select-icon" />
                        </div>
                      </div>
                      
                      <div className="admin-form-group">
                        <label>Tracking Number / Courier ID</label>
                        <div className="input-wrapper">
                          <FiTruck className="input-icon" />
                          <input 
                            type="text" 
                            placeholder="e.g. TCS-123456"
                            value={trackingDraft}
                            onChange={(e) => setTrackingDraft(e.target.value)}
                          />
                        </div>
                      </div>

                      <button 
                        className="btn-update-order" 
                        onClick={handleStatusUpdate}
                        disabled={submitting}
                      >
                        {submitting ? 'Processing...' : 'Save & Update Order'}
                        {!submitting && <FiArrowRight />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}