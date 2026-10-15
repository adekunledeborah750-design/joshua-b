import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/constructionData';

export const CategoriesSection = ({ onSelectCategory }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      id="categories"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc1)',
        position: 'relative',
        borderTop: '1px solid var(--brand-border)'
      }}
    >
      <div className="container-max">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '3.2rem',
          marginBottom: '8rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.6rem',
              marginBottom: '2.0rem'
            }}>
              <span style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                letterSpacing: '0.15em'
              }}>
                [ 03 // PRODUCT CATALOG ]
              </span>
              <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
              <span style={{
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--global-muted)'
              }}>
                10 Core Disciplines
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(3.6rem, 5.2vw, 6.4rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              lineHeight: 1.1
            }}>
              BUILDING MATERIALS &<br />
              <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
                PRODUCT CATEGORIES.
              </span>
            </h2>
          </div>

          <p style={{
            fontSize: '1.6rem',
            color: 'var(--global-muted)',
            maxWidth: '48rem',
            lineHeight: 1.6
          }}>
            Precision engineered building materials and site supplies curated for contractors, commercial developers, and high-performance architectural projects.
          </p>
        </div>

        {/* 10 Categories Editorial Grid with Luxury Hover Panels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(36rem, 1fr))',
          gap: '3.2rem'
        }}>
          {CATEGORIES.map((cat, index) => {
            const isHovered = hoveredId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="surface-dark"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '2px',
                  backgroundColor: 'var(--brand-bc2)'
                }}
              >
                {/* Category Image Container */}
                <div 
                  className="image-reveal-wrapper"
                  style={{
                    aspectRatio: '16 / 10',
                    width: '100%',
                    backgroundColor: '#1a1a1a',
                    position: 'relative'
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isHovered 
                        ? 'brightness(0.95) contrast(1.15) scale(1.06)' 
                        : 'brightness(0.7) contrast(1.05) scale(1.0)',
                      transition: 'all 0.6s var(--easing-bezzy2)'
                    }}
                  />

                  {/* Category Index Number */}
                  <div style={{
                    position: 'absolute',
                    top: '2.0rem',
                    left: '2.0rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    color: 'var(--brand-bc4)',
                    backgroundColor: 'rgba(12, 12, 12, 0.85)',
                    padding: '0.4rem 1.0rem',
                    border: '1px solid var(--brand-border)',
                    backdropFilter: 'blur(8px)'
                  }}>
                    CAT // {index < 9 ? `0${index + 1}` : index + 1}
                  </div>

                  {/* Technical Highlight Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '2.0rem',
                    right: '2.0rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--brand-bc5)',
                    backgroundColor: 'rgba(22, 22, 22, 0.85)',
                    padding: '0.4rem 1.0rem',
                    border: '1px solid var(--brand-border)'
                  }}>
                    {cat.highlight}
                  </div>
                </div>

                {/* Content Box */}
                <div style={{ padding: '3.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem' }}>
                    <h3 style={{
                      fontSize: '2.4rem',
                      fontFamily: 'var(--font-serif)',
                      color: isHovered ? 'var(--brand-bc4)' : 'var(--brand-bc5)',
                      transition: 'color 0.3s ease'
                    }}>
                      {cat.name}
                    </h3>

                    <ArrowUpRight 
                      size={20} 
                      color={isHovered ? 'var(--brand-bc4)' : 'var(--global-muted)'} 
                      style={{ 
                        transform: isHovered ? 'translate(2px, -2px)' : 'none',
                        transition: 'transform 0.3s ease, color 0.3s ease' 
                      }} 
                    />
                  </div>

                  <p style={{
                    fontSize: '1.4rem',
                    color: 'rgba(242, 241, 237, 0.8)',
                    lineHeight: 1.6,
                    marginBottom: '1.6rem'
                  }}>
                    {cat.tagline}
                  </p>

                  <p style={{
                    fontSize: '1.3rem',
                    color: 'var(--global-muted)',
                    lineHeight: 1.5,
                    marginBottom: '2.4rem',
                    flex: 1
                  }}>
                    {cat.description}
                  </p>

                  {/* Bottom Action Line */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '2.0rem',
                    borderTop: '1px solid var(--brand-border)',
                    marginTop: 'auto'
                  }}>
                    <span style={{ fontSize: '1.2rem', color: 'var(--global-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cat.itemCount}+ Line Items In Stock
                    </span>

                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--brand-bc4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem'
                    }}>
                      Browse Materials <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
