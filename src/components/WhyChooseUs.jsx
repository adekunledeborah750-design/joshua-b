import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/constructionData';

export const WhyChooseUs = ({ onQuoteClick }) => {
  return (
    <section 
      id="why-us"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc1)',
        position: 'relative',
        borderTop: '1px solid var(--brand-border)'
      }}
    >
      <div className="container-max">
        {/* Pretitle */}
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
            [ 06 // PRINCIPLES & CAPABILITIES ]
          </span>
          <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
          <span style={{
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--global-muted)'
          }}>
            Contractor Partnership
          </span>
        </div>

        {/* Section Heading */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '3.2rem',
          marginBottom: '8.0rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(3.6rem, 5vw, 6.4rem)',
            fontFamily: 'var(--font-serif)',
            color: 'var(--brand-bc5)',
            lineHeight: 1.12
          }}>
            THE RIGHT PARTNER FOR<br />
            <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
              YOUR NEXT PROJECT.
            </span>
          </h2>

          <p style={{
            fontSize: '1.6rem',
            color: 'var(--global-muted)',
            maxWidth: '48rem',
            lineHeight: 1.6
          }}>
            Built around structural discipline and reliable supply chains, discover how Forge Construction Company powers residential and commercial developments from the ground up.
          </p>
        </div>

        {/* 6 Selling Points Minimalist Editorial Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(34rem, 1fr))',
          gap: '3.2rem'
        }}>
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.number}
              className="surface-dark"
              style={{
                padding: '4.0rem 3.6rem',
                backgroundColor: 'var(--brand-bc2)',
                borderRadius: '2px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '2.4rem'
              }}>
                <span style={{
                  fontSize: '1.6rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-bc4)',
                  letterSpacing: '0.1em'
                }}>
                  {item.number}
                </span>

                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--brand-border)',
                  borderRadius: '50%'
                }} />
              </div>

              <h3 style={{
                fontSize: '2.2rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--brand-bc5)',
                marginBottom: '1.6rem',
                lineHeight: 1.3
              }}>
                {item.title}
              </h3>

              <p style={{
                fontSize: '1.4rem',
                color: 'rgba(242, 241, 237, 0.75)',
                lineHeight: 1.6,
                flex: 1
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
