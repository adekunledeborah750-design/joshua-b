import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, Phone, Mail, FileText } from 'lucide-react';
import { BRAND_CONFIG } from '../data/constructionData';

export const Header = ({ 
  cartCount, 
  onOpenCart, 
  onOpenQuote, 
  onNavigateSection,
  activeSection 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Construction', target: 'intro' },
    { label: 'Building Materials', target: 'stages' },
    { label: 'Categories', target: 'categories' },
    { label: 'Products', target: 'products' },
    { label: 'Our Projects', target: 'projects' },
    { label: 'Why Us', target: 'why-us' },
    { label: 'Contact', target: 'closing' }
  ];

  const handleLinkClick = (target) => {
    setIsMenuOpen(false);
    onNavigateSection(target);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('hero')}
          className="cursor-pointer flex items-center gap-4 group"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.2rem' }}
        >
          {/* Architectural Emblem Icon */}
          <div style={{
            width: '3.6rem',
            height: '3.6rem',
            border: '1.5px solid var(--brand-bc4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(197, 160, 100, 0.08)',
            position: 'relative'
          }}>
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontWeight: 700, 
              fontSize: '1.8rem', 
              color: 'var(--brand-bc4)',
              letterSpacing: '0' 
            }}>F</span>
            <div style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--brand-accent)'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <span style={{
              fontSize: '1.0rem',
              letterSpacing: '0.2em',
              color: 'var(--brand-bc4)',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginTop: '0.1rem'
            }}>
              Building Materials & Contracting
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '3.2rem' }} className="desktop-nav">
          {navLinks.slice(0, 6).map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              style={{
                fontSize: '1.3rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: activeSection === link.target ? 'var(--brand-bc4)' : 'rgba(242, 241, 237, 0.75)',
                transition: 'color 0.3s ease',
                padding: '0.6rem 0',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--brand-bc4)'}
              onMouseLeave={(e) => e.target.style.color = activeSection === link.target ? 'var(--brand-bc4)' : 'rgba(242, 241, 237, 0.75)'}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Header Controls: Request Quote + Cart + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
          {/* Request a Quote CTA */}
          <button
            onClick={onOpenQuote}
            className="btn-secondary"
            style={{ 
              padding: '1.0rem 2.0rem', 
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            <FileText size={14} color="var(--brand-bc4)" />
            <span>Request Quote</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4.4rem',
              height: '4.4rem',
              background: 'var(--brand-bc2)',
              border: '1px solid var(--brand-border)',
              borderRadius: '2px',
              position: 'relative',
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
            <ShoppingBag size={18} color="var(--brand-bc5)" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '2.0rem',
                height: '2.0rem',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-accent)',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(224, 109, 40, 0.5)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Fullscreen Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4.4rem',
              height: '4.4rem',
              background: isMenuOpen ? 'var(--brand-bc4)' : 'var(--brand-bc2)',
              color: isMenuOpen ? 'var(--brand-bc1)' : 'var(--brand-bc5)',
              border: '1px solid var(--brand-border)',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Animated Navigation Overlay */}
      <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}>
        {/* Top bar inside menu */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--brand-bc5)'
            }}>
              {BRAND_CONFIG.name}
            </span>
            <p style={{ fontSize: '1.2rem', color: 'var(--brand-bc4)', letterSpacing: '0.15em', marginTop: '0.4rem' }}>
              {BRAND_CONFIG.tagline}
            </p>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              padding: '1.2rem',
              border: '1px solid var(--brand-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}
          >
            <X size={18} />
            <span>Close</span>
          </button>
        </div>

        {/* Navigation list */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
          gap: '4rem',
          margin: 'auto 0'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.0rem' }}>
            <span style={{
              fontSize: '1.2rem',
              color: 'var(--global-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}>
              Navigation Index
            </span>
            {navLinks.map((link, idx) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '2.4rem',
                  fontSize: 'clamp(2.4rem, 4vw, 4.4rem)',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--brand-bc5)',
                  textAlign: 'left',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  padding: '0.4rem 0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(12px)';
                  e.currentTarget.style.color = 'var(--brand-bc4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.color = 'var(--brand-bc5)';
                }}
              >
                <span style={{
                  fontSize: '1.4rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-bc4)',
                  letterSpacing: '0.1em'
                }}>
                  0{idx + 1}
                </span>
                <span>{link.label}</span>
                <ArrowUpRight size={24} style={{ opacity: 0.4 }} />
              </button>
            ))}
          </div>

          {/* Quick Contact & Credentials inside menu */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '3.2rem',
            borderLeft: '1px solid var(--brand-border)',
            paddingLeft: '4rem'
          }}>
            <div>
              <span style={{
                fontSize: '1.2rem',
                color: 'var(--brand-bc4)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                display: 'block',
                marginBottom: '1.2rem'
              }}>
                Commercial Enquiries & Orders
              </span>
              <p style={{ fontSize: '2.0rem', fontFamily: 'var(--font-serif)', marginBottom: '0.8rem' }}>
                {BRAND_CONFIG.phone}
              </p>
              <p style={{ fontSize: '1.5rem', color: 'var(--global-muted)' }}>
                {BRAND_CONFIG.email}
              </p>
            </div>

            <div>
              <span style={{
                fontSize: '1.2rem',
                color: 'var(--brand-bc4)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                display: 'block',
                marginBottom: '1.2rem'
              }}>
                Operating Hours
              </span>
              <p style={{ fontSize: '1.4rem', color: 'var(--brand-bc5)' }}>
                {BRAND_CONFIG.openingHours}
              </p>
              <p style={{ fontSize: '1.3rem', color: 'var(--global-muted)', marginTop: '0.4rem' }}>
                Nationwide Delivery & Trade Counter Service
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.6rem', marginTop: '1.6rem' }}>
              <button 
                onClick={() => { setIsMenuOpen(false); onOpenQuote(); }}
                className="btn-primary" 
                style={{ width: '100%' }}
              >
                <span>Request Project Quote</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info inside menu */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--brand-border)',
          paddingTop: '2.4rem',
          fontSize: '1.2rem',
          color: 'var(--global-muted)'
        }}>
          <span>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All Rights Reserved.</span>
          <span style={{ color: 'var(--brand-bc4)' }}>{BRAND_CONFIG.tagline}</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
