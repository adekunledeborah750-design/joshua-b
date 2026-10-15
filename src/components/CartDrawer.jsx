import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart, 
  onOpenCheckout,
  onOpenQuote 
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vatRate = 0.20; // 20% Standard UK VAT for building supplies
  const vatAmount = subtotal * vatRate;
  const total = subtotal + vatAmount;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-drawer-overlay" onClick={onClose} />

      {/* Slide-out Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div style={{
          padding: '2.8rem',
          borderBottom: '1px solid var(--brand-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0e0e0e'
        }}>
          <div>
            <h3 style={{
              fontSize: '2.0rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem'
            }}>
              <ShoppingBag size={20} color="var(--brand-bc4)" />
              <span>Project Cart</span>
              <span style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                backgroundColor: 'rgba(197, 160, 100, 0.1)',
                padding: '0.2rem 0.8rem',
                borderRadius: '2px'
              }}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--global-muted)', marginTop: '0.2rem' }}>
              {BRAND_CONFIG.name} — Commercial Dispatch
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Cart"
            style={{
              width: '3.6rem',
              height: '3.6rem',
              border: '1px solid var(--brand-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              color: 'var(--brand-bc5)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-bc4)';
              e.currentTarget.style.color = 'var(--brand-bc4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-border)';
              e.currentTarget.style.color = 'var(--brand-bc5)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.4rem'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              margin: 'auto 0',
              padding: '4rem 2rem'
            }}>
              <div style={{
                width: '6.4rem',
                height: '6.4rem',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2.0rem auto',
                color: 'var(--global-muted)'
              }}>
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--brand-bc5)', marginBottom: '0.8rem' }}>
                Your project cart is empty
              </h4>
              <p style={{ fontSize: '1.3rem', color: 'var(--global-muted)', maxWidth: '28rem', margin: '0 auto 2.4rem auto' }}>
                Add structural materials, cement, timber, rebar, or accessories to begin estimating.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ fontSize: '1.2rem', padding: '1.0rem 2.4rem' }}>
                Continue Browsing
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1.6rem',
                  padding: '1.6rem',
                  backgroundColor: 'var(--brand-bc2)',
                  border: '1px solid var(--brand-border)',
                  borderRadius: '2px'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '8.0rem',
                  height: '8.0rem',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#0c0c0c'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h4 style={{
                      fontSize: '1.4rem',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--brand-bc5)',
                      lineHeight: 1.3
                    }}>
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ color: 'var(--global-muted)', padding: '0.2rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <span style={{ fontSize: '1.1rem', color: 'var(--brand-bc4)', fontFamily: 'var(--font-mono)', marginBottom: '0.8rem' }}>
                    {item.sku} • {item.unit}
                  </span>

                  {/* Quantity and Price */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--brand-bc1)',
                      border: '1px solid var(--brand-border)'
                    }}>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        style={{ padding: '0.4rem 0.8rem', color: 'var(--brand-bc5)' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0 0.6rem'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        style={{ padding: '0.4rem 0.8rem', color: 'var(--brand-bc5)' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      color: 'var(--brand-bc4)'
                    }}>
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '2.8rem',
            borderTop: '1px solid var(--brand-border)',
            backgroundColor: '#0e0e0e'
          }}>
            {/* Calculation rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.0rem', marginBottom: '2.0rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', color: 'var(--global-muted)' }}>
                <span>Subtotal (Ex. VAT)</span>
                <span style={{ color: 'var(--brand-bc5)' }}>£{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', color: 'var(--global-muted)' }}>
                <span>Standard UK VAT (20%)</span>
                <span style={{ color: 'var(--brand-bc5)' }}>£{vatAmount.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.8rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: 'var(--brand-bc5)',
                borderTop: '1px solid var(--brand-border)',
                paddingTop: '1.2rem'
              }}>
                <span>Total Project Inc. VAT</span>
                <span style={{ color: 'var(--brand-bc4)' }}>£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <button
                onClick={() => { onClose(); onOpenCheckout(); }}
                className="btn-primary"
                style={{ width: '100%', padding: '1.6rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => { onClose(); onOpenQuote(); }}
                className="btn-secondary"
                style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}
              >
                <span>Convert Cart to Trade Quote</span>
              </button>

              <button
                onClick={onClearCart}
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--global-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '0.4rem',
                  textAlign: 'center'
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
