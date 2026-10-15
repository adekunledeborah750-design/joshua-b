import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const ClosingCTA = ({ onShopClick, onQuoteClick }) => {
  return (
    <section 
      id="closing"
      style={{
        position: 'relative',
        padding: '16rem 0',
        backgroundColor: 'var(--brand-bc1)',
        overflow: 'hidden',
        borderTop: '1px solid var(--brand-border)'
      }}
    >
      {/* Subtle architectural background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        opacity: 0.18,
        backgroundImage: 'radial-gradient(var(--brand-border) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div 
        className="container-max" 
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '96rem'
        }}
      >
        <span style={{
          fontSize: '1.2rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--brand-bc4)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '2.4rem'
        }}>
          Ready to Start Your Project?
        </span>

        <h2 style={{
          fontSize: 'clamp(3.8rem, 6.2vw, 7.6rem)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.1,
          color: 'var(--brand-bc5)',
          marginBottom: '2.8rem',
          letterSpacing: '0.02em'
        }}>
          LET'S BUILD<br />
          <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
            SOMETHING GREAT.
          </span>
        </h2>

        <p style={{
          fontSize: 'clamp(1.6rem, 2vw, 2.0rem)',
          color: 'rgba(242, 241, 237, 0.85)',
          lineHeight: 1.6,
          maxWidth: '68rem',
          margin: '0 auto 4.8rem auto'
        }}>
          Find the materials for your next project or contact {BRAND_CONFIG.name} to discuss your requirements.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.4rem',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={onShopClick} 
            className="btn-primary"
            style={{ padding: '1.8rem 4.0rem', fontSize: '1.3rem' }}
          >
            <span>Shop Building Materials</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={onQuoteClick} 
            className="btn-secondary"
            style={{ padding: '1.8rem 4.0rem', fontSize: '1.3rem' }}
          >
            <FileText size={16} />
            <span>Request A Quote</span>
          </button>
        </div>
      </div>
    </section>
  );
};
