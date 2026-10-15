import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, FileText, ArrowRight, Truck } from 'lucide-react';

export const ProductModal = ({ product, isOpen, onClose, onAddToCart, onOpenQuote }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--brand-bc1)',
          border: '1px solid var(--brand-border)',
          maxWidth: '96rem',
          width: '100%',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.0rem 3.2rem',
          borderBottom: '1px solid var(--brand-border)',
          backgroundColor: '#0f0f0f'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--brand-bc4)',
              textTransform: 'uppercase'
            }}>
              Material Specification Sheet
            </span>
            <span style={{ color: 'var(--brand-border)' }}>•</span>
            <span style={{ fontSize: '1.1rem', color: 'var(--global-muted)', fontFamily: 'var(--font-mono)' }}>
              {product.sku}
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--brand-bc5)', padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(36rem, 1fr))',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Image Column */}
          <div style={{
            position: 'relative',
            backgroundColor: '#141414',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '38rem'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.isPopular && (
              <div style={{
                position: 'absolute',
                top: '2.0rem',
                left: '2.0rem',
                backgroundColor: 'var(--brand-accent)',
                color: '#fff',
                padding: '0.4rem 1.0rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                Contractor Favorite
              </div>
            )}
          </div>

          {/* Specification Details Column */}
          <div style={{ padding: '3.6rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '1.2rem',
              color: 'var(--brand-bc4)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              marginBottom: '0.8rem'
            }}>
              {product.categoryName}
            </span>

            <h3 style={{
              fontSize: '2.6rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              marginBottom: '1.6rem',
              lineHeight: 1.25
            }}>
              {product.name}
            </h3>

            <p style={{
              fontSize: '1.4rem',
              color: 'rgba(242, 241, 237, 0.85)',
              lineHeight: 1.6,
              marginBottom: '2.4rem'
            }}>
              {product.description}
            </p>

            {/* Price Box */}
            <div style={{
              padding: '2.0rem',
              backgroundColor: 'var(--brand-bc2)',
              border: '1px solid var(--brand-border)',
              marginBottom: '2.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '1.1rem', color: 'var(--global-muted)', display: 'block' }}>
                    Unit Price (Ex. VAT)
                  </span>
                  <span style={{
                    fontSize: '3.2rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: 'var(--brand-bc4)'
                  }}>
                    £{product.price.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--global-muted)', marginLeft: '0.8rem' }}>
                    / {product.unit}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '1.1rem',
                    color: product.inStock ? '#3adb76' : '#face10',
                    fontWeight: 600
                  }}>
                    ● {product.inStock ? 'Available for Delivery' : 'Lead Time on Request'}
                  </span>
                  <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)', marginTop: '0.2rem' }}>
                    Standard pack: {product.packSize}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specs List */}
            <div style={{ marginBottom: '3.2rem' }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.2rem'
              }}>
                Technical Compliance & Properties
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {product.specs.map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1.0rem', fontSize: '1.3rem', color: 'var(--brand-bc5)' }}>
                    <ShieldCheck size={14} color="var(--brand-bc4)" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
              <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--brand-bc2)',
                  border: '1px solid var(--brand-border)',
                  height: '4.8rem',
                  padding: '0 0.8rem'
                }}>
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ padding: '0.8rem', color: 'var(--brand-bc5)' }}
                  >
                    -
                  </button>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.4rem',
                    minWidth: '4.0rem',
                    textAlign: 'center'
                  }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    style={{ padding: '0.8rem', color: 'var(--brand-bc5)' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    height: '4.8rem',
                    backgroundColor: added ? '#3adb76' : 'var(--brand-bc4)',
                    color: added ? '#000' : 'var(--brand-bc1)'
                  }}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Added to Project Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add {qty} to Cart (£{(product.price * qty).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => { onClose(); onOpenQuote(); }}
                className="btn-secondary"
                style={{ width: '100%', height: '4.4rem', fontSize: '1.2rem' }}
              >
                <span>Request Project Volume Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
