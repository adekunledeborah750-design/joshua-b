import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, ArrowRight, Building } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const CheckoutModal = ({ isOpen, onClose, cartItems, onOrderCompleted }) => {
  const [step, setStep] = useState(1); // 1: Delivery & Billing, 2: Payment & Review, 3: Order Placed
  const [formData, setFormData] = useState({
    recipientName: '',
    companyName: '',
    email: '',
    phone: '',
    siteAddress1: '',
    siteCity: '',
    sitePostcode: '',
    deliveryMethod: 'hiab-offload',
    paymentMethod: 'trade-account',
    siteAccessNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vatAmount = subtotal * 0.20;
  const deliveryCost = formData.deliveryMethod === 'express' ? 65.00 : 45.00;
  const total = subtotal + vatAmount + deliveryCost;

  const validateStep1 = () => {
    const errs = {};
    if (!formData.recipientName.trim()) errs.recipientName = 'Recipient name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.siteAddress1.trim()) errs.siteAddress1 = 'Site address is required';
    if (!formData.siteCity.trim()) errs.siteCity = 'City / Town is required';
    if (!formData.sitePostcode.trim()) errs.sitePostcode = 'UK Postcode is required';
    return errs;
  };

  const handleNextStep = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleCompleteOrder = () => {
    const ref = 'FCC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    setOrderRef(ref);
    setStep(3);
    if (onOrderCompleted) onOrderCompleted();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--brand-bc1)',
          border: '1px solid var(--brand-border)',
          maxWidth: '84rem',
          width: '100%',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.4rem 3.2rem',
          borderBottom: '1px solid var(--brand-border)',
          backgroundColor: '#0f0f0f'
        }}>
          <div>
            <span style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--brand-bc4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              Order Fulfillment Desk // {step === 1 ? 'Step 1: Site Delivery' : step === 2 ? 'Step 2: Payment & Review' : 'Order Confirmed'}
            </span>
            <h3 style={{
              fontSize: '2.2rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              marginTop: '0.2rem'
            }}>
              {step === 3 ? 'Order Scheduled for Delivery' : 'Construction Site Checkout'}
            </h3>
          </div>

          <button onClick={onClose} style={{ color: 'var(--brand-bc5)', padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '3.2rem', flex: 1 }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
              <div style={{
                padding: '1.6rem',
                backgroundColor: 'rgba(197, 160, 100, 0.08)',
                border: '1px solid var(--brand-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}>
                <Truck size={20} color="var(--brand-bc4)" />
                <span style={{ fontSize: '1.3rem', color: 'var(--brand-bc5)' }}>
                  Heavy structural materials are dispatched via crane offload (Hiab) or scheduled flatbed.
                </span>
              </div>

              {/* Form inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2.0rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Site Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    placeholder="e.g. John Henderson"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.recipientName ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.recipientName && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.recipientName}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Company / Contracting Trading Entity
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Henderson Developments Ltd"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Site Manager Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="j.henderson@site.co.uk"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.email ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.email && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Site Telephone (for Driver) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7700 900123"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.phone ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.phone}</span>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Site Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.siteAddress1}
                    onChange={(e) => setFormData({ ...formData, siteAddress1: e.target.value })}
                    placeholder="Building Plot 4, High Ridge Road"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.siteAddress1 ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.siteAddress1 && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.siteAddress1}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Town / City *
                  </label>
                  <input
                    type="text"
                    value={formData.siteCity}
                    onChange={(e) => setFormData({ ...formData, siteCity: e.target.value })}
                    placeholder="London or Manchester"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.siteCity ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.siteCity && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.siteCity}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Postcode *
                  </label>
                  <input
                    type="text"
                    value={formData.sitePostcode}
                    onChange={(e) => setFormData({ ...formData, sitePostcode: e.target.value.toUpperCase() })}
                    placeholder="E14 5AB"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.sitePostcode ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem'
                    }}
                  />
                  {errors.sitePostcode && <span style={{ color: '#cc4b37', fontSize: '1.1rem' }}>{errors.sitePostcode}</span>}
                </div>
              </div>

              {/* Delivery method options */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--brand-bc4)', marginBottom: '1.0rem', fontWeight: 600 }}>
                  Select Vehicle & Offload Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))', gap: '1.2rem' }}>
                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'hiab-offload' })}
                    style={{
                      padding: '1.6rem',
                      backgroundColor: formData.deliveryMethod === 'hiab-offload' ? 'rgba(197, 160, 100, 0.15)' : 'var(--brand-bc2)',
                      border: formData.deliveryMethod === 'hiab-offload' ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                      cursor: 'pointer'
                    }}
                  >
                    <h5 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)', marginBottom: '0.4rem' }}>
                      Standard Hiab Crane Offload (£45.00)
                    </h5>
                    <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>
                      Mechanical arm offload directly to curb or hardstanding (2-3 business days).
                    </p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    style={{
                      padding: '1.6rem',
                      backgroundColor: formData.deliveryMethod === 'express' ? 'rgba(197, 160, 100, 0.15)' : 'var(--brand-bc2)',
                      border: formData.deliveryMethod === 'express' ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                      cursor: 'pointer'
                    }}
                  >
                    <h5 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)', marginBottom: '0.4rem' }}>
                      Express Next-Day Timed Slot (£65.00)
                    </h5>
                    <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>
                      Pre-10:30 AM prioritized site offload for time-critical contractor phases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Site access notes */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                  Specific Site Access Constraints
                </label>
                <input
                  type="text"
                  value={formData.siteAccessNotes}
                  onChange={(e) => setFormData({ ...formData, siteAccessNotes: e.target.value })}
                  placeholder="e.g. Red route restrictions, narrow gate, overhead electrical cable clearance..."
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    backgroundColor: 'var(--brand-bc2)',
                    border: '1px solid var(--brand-border)',
                    color: 'var(--brand-bc5)',
                    fontSize: '1.4rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                <button onClick={handleNextStep} className="btn-primary" style={{ padding: '1.4rem 3.2rem' }}>
                  <span>Continue to Payment & Review</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.8rem' }}>
              {/* Order Summary Table */}
              <div style={{
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)',
                padding: '2.4rem'
              }}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-bc4)',
                  textTransform: 'uppercase',
                  marginBottom: '1.6rem'
                }}>
                  Material Package Items ({cartItems.length})
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.0rem' }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                      <span>
                        <strong style={{ color: 'var(--brand-bc5)' }}>{item.quantity}x</strong> {item.name}
                      </span>
                      <span style={{ color: 'var(--brand-bc4)', fontFamily: 'var(--font-mono)' }}>
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid var(--brand-border)',
                  paddingTop: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  fontSize: '1.3rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--global-muted)' }}>
                    <span>Materials Subtotal (Ex. VAT)</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--global-muted)' }}>
                    <span>Standard UK VAT (20%)</span>
                    <span>£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--global-muted)' }}>
                    <span>Site Transport & Hiab Offload</span>
                    <span>£{deliveryCost.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.8rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--brand-bc5)',
                    borderTop: '1px solid var(--brand-border)',
                    paddingTop: '1.2rem',
                    fontWeight: 700
                  }}>
                    <span>Grand Total Due</span>
                    <span style={{ color: 'var(--brand-bc4)' }}>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--brand-bc4)', marginBottom: '1.0rem', fontWeight: 600 }}>
                  Select Commercial Payment Option
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'trade-account' })}
                    style={{
                      padding: '1.6rem',
                      backgroundColor: formData.paymentMethod === 'trade-account' ? 'rgba(197, 160, 100, 0.15)' : 'var(--brand-bc2)',
                      border: formData.paymentMethod === 'trade-account' ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.4rem'
                    }}
                  >
                    <Building size={20} color="var(--brand-bc4)" />
                    <div>
                      <h5 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)' }}>
                        Trade Credit Account (30-Day Net)
                      </h5>
                      <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>
                        Invoiced against authorized company purchase order and delivery ticket.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'bacs' })}
                    style={{
                      padding: '1.6rem',
                      backgroundColor: formData.paymentMethod === 'bacs' ? 'rgba(197, 160, 100, 0.15)' : 'var(--brand-bc2)',
                      border: formData.paymentMethod === 'bacs' ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.4rem'
                    }}
                  >
                    <CreditCard size={20} color="var(--brand-bc4)" />
                    <div>
                      <h5 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)' }}>
                        BACS Corporate Bank Wire / Pro-Forma Invoice
                      </h5>
                      <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>
                        Instant automated payment instructions dispatched upon order creation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal & Integration Disclaimer matching prompt instructions */}
              <div style={{
                padding: '1.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--brand-border)',
                fontSize: '1.1rem',
                color: 'var(--global-muted)',
                lineHeight: 1.5
              }}>
                <strong style={{ color: 'var(--brand-bc5)' }}>Demonstration Environment Notice:</strong> This interactive storefront simulates front-end ordering. Ready for production API integration with Stripe, BACS gateway, SAP/ERP, or QuickBooks inventory systems.
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem' }}>
                <button onClick={() => setStep(1)} className="btn-secondary" style={{ padding: '1.2rem 2.4rem' }}>
                  Back to Site Address
                </button>
                <button onClick={handleCompleteOrder} className="btn-primary" style={{ padding: '1.4rem 3.6rem' }}>
                  <span>Confirm Order (£{total.toFixed(2)})</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '4.0rem 1.0rem' }}>
              <div style={{
                width: '7.6rem',
                height: '7.6rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(58, 219, 118, 0.1)',
                border: '1px solid #3adb76',
                color: '#3adb76',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2.4rem auto'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <span style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.8rem'
              }}>
                Order Received // {orderRef}
              </span>

              <h4 style={{
                fontSize: '3.0rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--brand-bc5)',
                marginBottom: '1.6rem'
              }}>
                Materials Dispatched to Site Schedule.
              </h4>

              <p style={{
                fontSize: '1.5rem',
                color: 'rgba(242, 241, 237, 0.85)',
                maxWidth: '56rem',
                margin: '0 auto 2.8rem auto',
                lineHeight: 1.6
              }}>
                Order confirmation and delivery manifesto have been sent to <strong style={{ color: 'var(--brand-bc4)' }}>{formData.email}</strong>. Our transport logistics team will confirm driver ETA prior to dispatch to <strong style={{ color: 'var(--brand-bc5)' }}>{formData.siteAddress1}, {formData.siteCity} ({formData.sitePostcode})</strong>.
              </p>

              <div style={{
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)',
                padding: '2.4rem',
                maxWidth: '52rem',
                margin: '0 auto 3.6rem auto',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>Order Reference:</span>
                  <span style={{ fontSize: '1.3rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-bc4)' }}>{orderRef}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>Offload Service:</span>
                  <span style={{ fontSize: '1.3rem', color: 'var(--brand-bc5)' }}>
                    {formData.deliveryMethod === 'express' ? 'Express Timed Next-Day' : 'Standard Hiab Crane Offload'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>Payment Terms:</span>
                  <span style={{ fontSize: '1.3rem', color: 'var(--brand-bc5)' }}>
                    {formData.paymentMethod === 'trade-account' ? '30-Day Trade Account Net' : 'BACS Wire Transfer'}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--brand-border)',
                  paddingTop: '1.2rem',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--brand-bc5)'
                }}>
                  <span>Total Invoiced:</span>
                  <span style={{ color: 'var(--brand-bc4)' }}>£{total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={onClose} className="btn-primary">
                <span>Continue Exploring Materials</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
