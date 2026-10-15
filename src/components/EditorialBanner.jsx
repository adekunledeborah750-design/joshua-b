import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export const EditorialBanner = ({ onDiscoverClick }) => {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12rem 4rem',
        overflow: 'hidden',
        backgroundColor: 'var(--brand-bc1)'
      }}
    >
      {/* Full-width Dramatic Architectural Structural Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden'
      }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=90"
          alt="Architectural steel and glass tower construction"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.38) contrast(1.18) grayscale(15%)'
          }}
        />

        {/* Framing & Vignette Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, var(--brand-bc1) 0%, rgba(12, 12, 12, 0.4) 50%, var(--brand-bc1) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Centered Editorial Content */}
      <div 
        className="container-max" 
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '100rem'
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1.2rem',
          padding: '0.8rem 2.0rem',
          backgroundColor: 'rgba(22, 22, 22, 0.8)',
          border: '1px solid var(--brand-border)',
          backdropFilter: 'blur(12px)',
          marginBottom: '3.6rem'
        }}>
          <Compass size={16} color="var(--brand-bc4)" />
          <span style={{
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--brand-bc4)',
            fontWeight: 600
          }}>
            Architectural Excellence & Material Supply
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(3.8rem, 6vw, 7.2rem)',
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.12,
          color: 'var(--brand-bc5)',
          marginBottom: '2.8rem',
          letterSpacing: '0.02em'
        }}>
          GREAT PROJECTS START WITH THE RIGHT MATERIALS.
        </h2>

        <p style={{
          fontSize: 'clamp(1.6rem, 2vw, 2.2rem)',
          lineHeight: 1.6,
          color: 'rgba(242, 241, 237, 0.85)',
          maxWidth: '76rem',
          margin: '0 auto 4.8rem auto'
        }}>
          From the first stage of construction to the final details, discover the building materials and supplies you need to move your project forward.
        </p>

        <div>
          <button 
            onClick={onDiscoverClick} 
            className="btn-primary"
            style={{ padding: '1.8rem 4.0rem', fontSize: '1.4rem' }}
          >
            <span>Discover Our Products</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
