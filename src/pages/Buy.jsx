import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const paymentMethods = [
  { key: 'card', label: 'Credit/Debit Card' },
  { key: 'upi', label: 'UPI' },
  { key: 'other', label: 'Other' },
];

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [step, setStep] = useState('details'); // 'details', 'payment', 'success'
  const [success, setSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState('card');
  const [isSubscription, setIsSubscription] = useState(false);

  if (!data) {
    return <div style={{ textAlign: 'center', marginTop: 80 }}>No package/activity selected.<br /><button onClick={() => navigate(-1)} style={{ marginTop: 16, background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>Go Back</button></div>;
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setStep('success');
      setSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background-color)' }}>
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px rgba(20,58,82,0.10)', padding: 36, minWidth: 320, maxWidth: 420, width: '100%' }}>
        <img src={data.img} alt={data.title} style={{ width: '100%', borderRadius: 12, marginBottom: 18, objectFit: 'cover', maxHeight: 180 }} />
        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--primary-color)', marginBottom: 8 }}>{data.title}</div>
        <div style={{ color: 'var(--text-light)', marginBottom: 10 }}>{data.desc}</div>
        <div style={{ color: 'var(--accent-color)', fontWeight: 700, fontSize: 18, marginBottom: 18 }}>{data.price}</div>
        <div style={{ marginBottom: 18 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{ background: isSubscription ? 'var(--primary-color)' : 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, marginRight: 8, cursor: 'pointer' }}
            onClick={() => setIsSubscription(false)}
          >
            One-Time Purchase
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{ background: isSubscription ? 'var(--accent-color)' : 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setIsSubscription(true)}
          >
            Subscribe & Save
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.form key="details" onSubmit={handleDetailsSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1', marginBottom: 12 }} />
              <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1', marginBottom: 12 }} />
              <motion.button type="submit" whileHover={{ scale: 1.05 }} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', width: '100%', fontSize: 16, marginTop: 8 }}>{isSubscription ? 'Subscribe' : 'Buy Now'}</motion.button>
            </motion.form>
          )}
          {step === 'payment' && (
            <motion.form key="payment" onSubmit={handlePayment} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
                {paymentMethods.map(pm => (
                  <motion.button
                    key={pm.key}
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    style={{
                      background: paymentType === pm.key ? 'var(--accent-color)' : '#e3e9f1',
                      color: paymentType === pm.key ? '#fff' : 'var(--primary-color)',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 15,
                      transition: 'var(--transition)'
                    }}
                    onClick={() => setPaymentType(pm.key)}
                  >
                    {pm.label}
                  </motion.button>
                ))}
              </div>
              {paymentType === 'card' && (
                <div style={{ marginBottom: 12 }}>
                  <input type="text" placeholder="Card Number" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1', marginBottom: 8 }} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" placeholder="MM/YY" required style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #e3e9f1' }} />
                    <input type="text" placeholder="CVV" required style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #e3e9f1' }} />
                  </div>
                </div>
              )}
              {paymentType === 'upi' && (
                <div style={{ marginBottom: 12 }}>
                  <input type="text" placeholder="Your UPI ID" required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e3e9f1' }} />
                </div>
              )}
              {paymentType === 'other' && (
                <div style={{ marginBottom: 12, color: 'var(--text-light)', fontSize: 15 }}>
                  PayPal, NetBanking, or other methods coming soon!
                </div>
              )}
              <motion.button type="submit" whileHover={{ scale: 1.05 }} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', width: '100%', fontSize: 16, marginTop: 8 }}>{isSubscription ? 'Subscribe & Pay' : 'Pay Now'}</motion.button>
            </motion.form>
          )}
          {step === 'success' && (
            <motion.div key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ textAlign: 'center', color: 'var(--primary-color)', fontWeight: 700, fontSize: 20, padding: 24 }}>
              {isSubscription ? 'Subscription Successful! 🎉' : 'Purchase Successful! 🎉'}<br />
              You’ll receive a confirmation email soon.
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => navigate(-1)} style={{ marginTop: 18, background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Back</button>
      </motion.div>
    </div>
  );
};

export default Buy; 