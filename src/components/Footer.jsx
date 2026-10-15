import React, { useState } from 'react';
import { ArrowUp, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Check } from 'lucide-react';
import { BRAND_CONFIG, CATEGORIES } from '../data/constructionData';

export const Footer = ({ onNavigateSection, onOpenQuote, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer 
      style={{
        backgroundColor: '#070707',
        borderTop: '1px solid var(--brand-border)',
        padding: '12rem 0 6rem 0',
        position: 'relative'
      }}
    >
      <div className="container-max">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))',
          gap: '6.4rem',
          marginBottom: '8.8rem'
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div 
              onClick={() => onNavigateSection('hero')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.0rem' }}
            >
              <div style={{
                width: '3.6rem',
                height: '3.6rem',
                border: '1.5px solid var(--brand-bc4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(197, 160, 100, 0.08)'
              }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.8rem', color: 'var(--brand-bc4)' }}>F</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--brand-bc5)',
                textTransform: 'uppercase'
              }}>
                {BRAND_CONFIG.name}
              </span>
            </div>

            <p style={{
              fontSize: '1.3rem',
              color: 'var(--brand-bc4)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.6rem'
            }}>
              {BRAND_CONFIG.tagline}
            </p>

            <p style={{
              fontSize: '1.4rem',
              color: 'var(--global-muted)',
              lineHeight: 1.6,
              marginBottom: '2.4rem',
              maxWidth: '32rem'
            }}>
              Providing certified structural materials, engineering bricks, structural timber, and architectural supplies to builders and contractors nationwide.
            </p>

            {/* Newsletter Subscription */}
            <div>
              <span style={{ fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brand-bc5)', display: 'block', marginBottom: '0.8rem' }}>
                Trade Supply Bulletin
              </span>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', maxWidth: '32rem' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter contractor email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    backgroundColor: 'var(--brand-bc2)',
                    border: '1px solid var(--brand-border)',
                    padding: '1.0rem 1.4rem',
                    fontSize: '1.3rem',
                    color: 'var(--brand-bc5)',
                    flex: 1,
                    borderRadius: '2px 0 0 2px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: subscribed ? '#3adb76' : 'var(--brand-bc4)',
                    color: subscribed ? '#000' : 'var(--brand-bc1)',
                    padding: '0 1.6rem',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    borderRadius: '0 2px 2px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--brand-bc4)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '2.4rem'
            }}>
              Main Navigation
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {[
                { label: 'Home', target: 'hero' },
                { label: 'Building Materials', target: 'stages' },
                { label: 'Product Categories', target: 'categories' },
                { label: 'Our Projects', target: 'projects' },
                { label: 'About Us', target: 'intro' },
                { label: 'Contact', target: 'closing' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigateSection(link.target)}
                    style={{
                      fontSize: '1.4rem',
                      color: 'rgba(242, 241, 237, 0.75)',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--brand-bc4)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(242, 241, 237, 0.75)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Categories Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--brand-bc4)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '2.4rem'
            }}>
              Product Categories
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    style={{
                      fontSize: '1.3rem',
                      color: 'rgba(242, 241, 237, 0.7)',
                      transition: 'color 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-bc4)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(242, 241, 237, 0.7)'}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--brand-bc4)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '2.4rem'
            }}>
              Governance & Logistics
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {[
                'Delivery Information (Hiab & Site Offload)',
                'Returns & Material Quality Policy',
                'Privacy Policy',
                'Terms and Conditions',
                'Trade Credit Terms & Conditions',
                'Health & Safety Compliance Sheet'
              ].map((policy) => (
                <li key={policy}>
                  <span style={{
                    fontSize: '1.3rem',
                    color: 'rgba(242, 241, 237, 0.6)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-bc4)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(242, 241, 237, 0.6)'}
                  >
                    {policy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2.0rem',
          borderTop: '1px solid var(--brand-border)',
          paddingTop: '3.6rem',
          fontSize: '1.2rem',
          color: 'var(--global-muted)'
        }}>
          <div>
            <span>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved.</span>
            <p style={{ marginTop: '0.4rem', fontSize: '1.1rem' }}>
              All brand and company references strictly Forge Construction Company.
            </p>
          </div>

          {/* Back to Top Smooth Button */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'var(--brand-bc4)',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '0.8rem 1.6rem',
              border: '1px solid var(--brand-border)',
              backgroundColor: 'var(--brand-bc2)',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-bc4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--brand-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
