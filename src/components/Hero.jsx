import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ShieldCheck, HardHat, Truck, Award } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const Hero = ({ onExploreClick, onQuoteClick }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '12rem 0 6rem 0',
        overflow: 'hidden',
        backgroundColor: 'var(--brand-bc1)'
      }}
    >
      {/* Background Architectural Visual with Subtle Cinematic Zoom & Gradient Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=2560&q=90"
          alt="Contemporary commercial structural construction"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: 'brightness(0.42) contrast(1.12) grayscale(20%)',
            transform: loaded ? 'scale(1.02)' : 'scale(1.12)',
            transition: 'transform 2.2s cubic-bezier(0.2, 0.7, 0.2, 1)',
            willChange: 'transform'
          }}
        />

        {/* Dual Luxury Gradients matching reference site's deep dark bottom and edge masking */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12, 12, 12, 0.75) 0%, rgba(12, 12, 12, 0.3) 40%, rgba(12, 12, 12, 0.95) 100%)',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 80% 20%, rgba(197, 160, 100, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="container-max" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Subtle Category Pretitle */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.2rem',
            padding: '0.6rem 1.6rem',
            background: 'rgba(22, 22, 22, 0.75)',
            border: '1px solid rgba(197, 160, 100, 0.3)',
            backdropFilter: 'blur(8px)',
            marginBottom: '2.8rem',
            borderRadius: '2px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.0s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-accent)',
            boxShadow: '0 0 10px var(--brand-accent)'
          }} />
          <span style={{
            fontSize: '1.1rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--brand-bc4)',
            fontWeight: 600
          }}>
            {BRAND_CONFIG.tagline}
          </span>
        </div>

        {/* Main Headline */}
        <h1 
          style={{
            fontSize: 'clamp(3.8rem, 6.8vw, 8.4rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            lineHeight: 1.08,
            color: 'var(--brand-bc5)',
            maxWidth: '120rem',
            letterSpacing: '0.02em',
            marginBottom: '2.8rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(35px)',
            transition: 'all 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) 0.35s'
          }}
        >
          BUILDING BETTER.<br />
          <span style={{ 
            color: 'var(--brand-bc4)',
            fontStyle: 'italic',
            fontWeight: 400 
          }}>
            BUILDING WITH CONFIDENCE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(32rem, 1fr))',
          gap: '4rem',
          alignItems: 'flex-end',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s'
        }}>
          <div>
            <p style={{
              fontSize: 'clamp(1.6rem, 1.8vw, 2.0rem)',
              lineHeight: 1.6,
              color: 'rgba(242, 241, 237, 0.85)',
              maxWidth: '68rem',
              fontWeight: 400,
              marginBottom: '3.6rem'
            }}>
              {BRAND_CONFIG.name} provides quality construction solutions and building materials to help bring projects to life, from essential building supplies to the finishing details.
            </p>

            {/* CTAs matching prompt requirements */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.0rem', alignItems: 'center' }}>
              <button onClick={onExploreClick} className="btn-primary">
                <span>Explore Our Materials</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={onQuoteClick} className="btn-secondary">
                <span>Request a Quote</span>
              </button>
            </div>
          </div>

          {/* Quick Specifications Pill Badge Array */}
          <div style={{
            background: 'rgba(22, 22, 22, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--brand-border)',
            padding: '2.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.6rem',
            borderRadius: '2px',
            maxWidth: '44rem',
            marginLeft: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
              <div style={{ padding: '0.8rem', background: 'rgba(197, 160, 100, 0.1)', color: 'var(--brand-bc4)' }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)' }}>Certified Structural Grade</h4>
                <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>BS EN 197-1, CE & CARES Approved Rebar</p>
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--brand-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
              <div style={{ padding: '0.8rem', background: 'rgba(197, 160, 100, 0.1)', color: 'var(--brand-bc4)' }}>
                <Truck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)' }}>Contractor Logistics & Hiab</h4>
                <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)' }}>Timed offload delivery direct to site</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          marginTop: '6.4rem',
          opacity: 0.6
        }}>
          <div style={{
            width: '2.4rem',
            height: '4.0rem',
            border: '1.5px solid var(--brand-bc4)',
            borderRadius: '1.2rem',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.6rem'
          }}>
            <div style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--brand-bc4)',
              borderRadius: '2px',
              animation: 'bounce 2s infinite'
            }} />
          </div>
          <span style={{
            fontSize: '1.1rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--brand-bc5)'
          }}>
            Scroll to Explore
          </span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(10px);
          }
          60% {
            transform: translateY(5px);
          }
        }
      `}</style>
    </section>
  );
};
