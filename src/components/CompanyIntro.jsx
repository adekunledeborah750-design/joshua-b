import React from 'react';
import { ArrowRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const CompanyIntro = ({ onExploreClick, onQuoteClick }) => {
  return (
    <section 
      id="intro"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc1)',
        position: 'relative',
        borderTop: '1px solid var(--brand-border)',
        borderBottom: '1px solid var(--brand-border)'
      }}
    >
      <div className="container-max">
        {/* Pretitle matching reference structure */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.6rem',
          marginBottom: '3.2rem'
        }}>
          <span style={{
            fontSize: '1.2rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--brand-bc4)',
            letterSpacing: '0.15em'
          }}>
            [ 01 // OVERVIEW ]
          </span>
          <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
          <span style={{
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--global-muted)'
          }}>
            Company Introduction
          </span>
        </div>

        {/* Two-column Editorial Composition */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(36rem, 1fr))',
          gap: '8rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Heading, Copy, and Service Highlights */}
          <div>
            <h2 style={{
              fontSize: 'clamp(3.2rem, 4.6vw, 5.6rem)',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.15,
              color: 'var(--brand-bc5)',
              marginBottom: '3.6rem'
            }}>
              BUILT AROUND QUALITY.<br />
              <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
                BUILT FOR WHAT'S NEXT.
              </span>
            </h2>

            <p style={{
              fontSize: '1.8rem',
              lineHeight: 1.7,
              color: 'rgba(242, 241, 237, 0.85)',
              marginBottom: '4.0rem',
              fontWeight: 400
            }}>
              At {BRAND_CONFIG.name}, we believe every successful project starts with the right materials, thoughtful planning, and a commitment to quality. We help builders, contractors, and property owners source construction essentials for projects of different sizes and requirements.
            </p>

            {/* Value Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
              gap: '2.4rem',
              marginBottom: '4.8rem'
            }}>
              <div style={{
                padding: '2.0rem',
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)'
              }}>
                <div style={{ color: 'var(--brand-bc4)', marginBottom: '1.0rem' }}>
                  <ShieldCheck size={24} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)', marginBottom: '0.6rem' }}>
                  Tested Compliance
                </h4>
                <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)', lineHeight: 1.5 }}>
                  Materials rigorously checked to comply with UK & European building codes.
                </p>
              </div>

              <div style={{
                padding: '2.0rem',
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)'
              }}>
                <div style={{ color: 'var(--brand-bc4)', marginBottom: '1.0rem' }}>
                  <Layers size={24} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)', marginBottom: '0.6rem' }}>
                  End-to-End Supply
                </h4>
                <p style={{ fontSize: '1.2rem', color: 'var(--global-muted)', lineHeight: 1.5 }}>
                  From deep concrete foundations to final exterior and interior finishes.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '2.0rem', alignItems: 'center' }}>
              <button onClick={onExploreClick} className="btn-primary">
                <span>View Product Range</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={onQuoteClick} className="btn-ghost">
                <span>Speak With An Estimator</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Image with Frame & Caption */}
          <div style={{ position: 'relative' }}>
            <div 
              className="image-reveal-wrapper"
              style={{
                aspectRatio: '4 / 5',
                border: '1px solid var(--brand-border)',
                backgroundColor: 'var(--brand-bc2)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85"
                alt="Contemporary architectural development under construction"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.08) brightness(0.9)'
                }}
              />

              {/* Floating Architectural Badge */}
              <div style={{
                position: 'absolute',
                bottom: '2.4rem',
                left: '2.4rem',
                right: '2.4rem',
                padding: '1.8rem 2.4rem',
                backgroundColor: 'rgba(12, 12, 12, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--brand-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--brand-bc4)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}>
                    Specification Grade
                  </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--brand-bc5)' }}>
                    Commercial & Civil Distribution
                  </span>
                </div>
                <div style={{
                  width: '1.0rem',
                  height: '1.0rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-accent)'
                }} />
              </div>
            </div>

            {/* Architectural Grid Decals */}
            <div style={{
              position: 'absolute',
              top: '-1.5rem',
              right: '-1.5rem',
              width: '8rem',
              height: '8rem',
              borderTop: '2px solid var(--brand-bc4)',
              borderRight: '2px solid var(--brand-bc4)',
              pointerEvents: 'none',
              opacity: 0.6
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};
