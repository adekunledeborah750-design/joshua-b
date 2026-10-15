import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, FileText, Send, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { BRAND_CONFIG, CATEGORIES } from '../data/constructionData';

export const QuoteModal = ({ isOpen, onClose, initialCategories = [] }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectLocation: '',
    projectType: 'Commercial',
    selectedCategories: initialCategories.length > 0 ? initialCategories : ['cement-concrete', 'steel-reinforcement'],
    estimatedTimescale: '1-3 Months',
    projectNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid corporate or personal email is required';
    if (!formData.phone.trim()) errs.phone = 'Contact telephone is required';
    if (!formData.projectLocation.trim()) errs.projectLocation = 'Delivery site town or postcode is required';
    if (formData.selectedCategories.length === 0) errs.categories = 'Please select at least one material category';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const randomRef = 'FCC-Q-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteRef(randomRef);
    setIsSubmitted(true);
  };

  const toggleCategory = (catId) => {
    setFormData(prev => {
      const exists = prev.selectedCategories.includes(catId);
      const next = exists 
        ? prev.selectedCategories.filter(c => c !== catId)
        : [...prev.selectedCategories, catId];
      return { ...prev, selectedCategories: next };
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--brand-bc1)',
          border: '1px solid var(--brand-border)',
          maxWidth: '78rem',
          width: '100%',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.4rem 3.2rem',
          borderBottom: '1px solid var(--brand-border)',
          backgroundColor: '#0f0f0f'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.0rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontSize: '1.1rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                Trade & Contracting Desk
              </span>
            </div>
            <h3 style={{
              fontSize: '2.2rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)'
            }}>
              Request Project Material Quotation
            </h3>
          </div>

          <button onClick={onClose} style={{ color: 'var(--brand-bc5)', padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ overflowY: 'auto', padding: '3.2rem', flex: 1 }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{
                width: '7.2rem',
                height: '7.2rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(58, 219, 118, 0.1)',
                border: '1px solid #3adb76',
                color: '#3adb76',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2.4rem auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <span style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.8rem'
              }}>
                Quotation Request Dispatched // {quoteRef}
              </span>

              <h4 style={{
                fontSize: '2.8rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--brand-bc5)',
                marginBottom: '1.6rem'
              }}>
                Thank you, {formData.fullName}.
              </h4>

              <p style={{
                fontSize: '1.5rem',
                color: 'rgba(242, 241, 237, 0.85)',
                maxWidth: '54rem',
                margin: '0 auto 2.8rem auto',
                lineHeight: 1.6
              }}>
                Our technical material estimating team has received your project inquiry for delivery to <strong style={{ color: 'var(--brand-bc4)' }}>{formData.projectLocation}</strong>. A dedicated estimator will contact you within 2 working hours.
              </p>

              <div style={{
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)',
                padding: '2.0rem',
                maxWidth: '48rem',
                margin: '0 auto 3.2rem auto',
                textAlign: 'left'
              }}>
                <p style={{ fontSize: '1.3rem', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                  Confirmation Copy Sent To: <strong style={{ color: 'var(--brand-bc5)' }}>{formData.email}</strong>
                </p>
                <p style={{ fontSize: '1.3rem', color: 'var(--global-muted)' }}>
                  Selected Material Packages: <strong style={{ color: 'var(--brand-bc5)' }}>{formData.selectedCategories.length} Categories</strong>
                </p>
              </div>

              <button onClick={onClose} className="btn-primary">
                <span>Return to Materials Catalog</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
              <p style={{ fontSize: '1.4rem', color: 'rgba(242, 241, 237, 0.8)', lineHeight: 1.6 }}>
                Submit your material schedules or site bill of quantities. We provide fixed-price tier estimates, delivery scheduling, and dedicated contractor account support.
              </p>

              {/* Form Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2.0rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Vance"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.fullName ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  />
                  {errors.fullName && <span style={{ color: '#cc4b37', fontSize: '1.1rem', marginTop: '0.4rem', display: 'block' }}>{errors.fullName}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Company / Contractor Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Vance Construction Ltd (or Private)"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="d.vance@example.co.uk"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.email ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  />
                  {errors.email && <span style={{ color: '#cc4b37', fontSize: '1.1rem', marginTop: '0.4rem', display: 'block' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7911 123456"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.phone ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#cc4b37', fontSize: '1.1rem', marginTop: '0.4rem', display: 'block' }}>{errors.phone}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Site Location / Postcode *
                  </label>
                  <input
                    type="text"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    placeholder="e.g. Manchester M1 or SW1A"
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: errors.projectLocation ? '1px solid #cc4b37' : '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  />
                  {errors.projectLocation && <span style={{ color: '#cc4b37', fontSize: '1.1rem', marginTop: '0.4rem', display: 'block' }}>{errors.projectLocation}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      backgroundColor: 'var(--brand-bc2)',
                      border: '1px solid var(--brand-border)',
                      color: 'var(--brand-bc5)',
                      fontSize: '1.4rem',
                      borderRadius: '2px'
                    }}
                  >
                    <option value="Commercial">Commercial Structural</option>
                    <option value="Residential-NewBuild">Residential New Build</option>
                    <option value="Refurbishment">Renovation & Refurbishment</option>
                    <option value="Civil-Infrastructure">Civil Engineering & Groundworks</option>
                    <option value="Self-Build">Self-Build Homeowner</option>
                  </select>
                </div>
              </div>

              {/* Material Categories Checklist */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--brand-bc4)', marginBottom: '1.0rem', fontWeight: 600 }}>
                  Select Materials Required in Quotation *
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))',
                  gap: '0.8rem'
                }}>
                  {CATEGORIES.map(cat => {
                    const selected = formData.selectedCategories.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        style={{
                          textAlign: 'left',
                          padding: '1.0rem',
                          fontSize: '1.2rem',
                          backgroundColor: selected ? 'rgba(197, 160, 100, 0.15)' : 'var(--brand-bc2)',
                          border: selected ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                          color: selected ? 'var(--brand-bc4)' : 'var(--brand-bc5)',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem'
                        }}
                      >
                        <div style={{
                          width: '1.4rem',
                          height: '1.4rem',
                          border: '1px solid var(--brand-border)',
                          backgroundColor: selected ? 'var(--brand-bc4)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          fontSize: '1.0rem',
                          flexShrink: 0
                        }}>
                          {selected ? '✓' : ''}
                        </div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.categories && <span style={{ color: '#cc4b37', fontSize: '1.1rem', marginTop: '0.4rem', display: 'block' }}>{errors.categories}</span>}
              </div>

              {/* Additional notes / schedules */}
              <div>
                <label style={{ display: 'block', fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--global-muted)', marginBottom: '0.6rem' }}>
                  Project Material Specifications / Estimated Volumes
                </label>
                <textarea
                  rows={4}
                  value={formData.projectNotes}
                  onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                  placeholder="Include approximate quantities (e.g. 20 pallets cement, 4,000m² insulation, 15 tonnes rebar) and any specific delivery restrictions (Hiab required, narrow lane access, timed delivery slots)..."
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    backgroundColor: 'var(--brand-bc2)',
                    border: '1px solid var(--brand-border)',
                    color: 'var(--brand-bc5)',
                    fontSize: '1.4rem',
                    borderRadius: '2px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.6rem', marginTop: '1.2rem' }}>
                <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '1.2rem 2.4rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '1.2rem 3.2rem' }}>
                  <Send size={16} />
                  <span>Submit Request for Estimate</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
