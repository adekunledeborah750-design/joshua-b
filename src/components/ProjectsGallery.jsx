import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Calendar, Layers, Eye, X } from 'lucide-react';
import { PROJECTS_GALLERY } from '../data/constructionData';

export const ProjectsGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'Commercial Development', 'Modern Residential Architecture', 'Industrial Infrastructure', 'Brickwork & Masonry Restoration', 'Architectural Timber & Steel'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS_GALLERY
    : PROJECTS_GALLERY.filter(p => p.category === activeFilter);

  return (
    <section 
      id="projects"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc2)',
        position: 'relative',
        borderTop: '1px solid var(--brand-border)',
        borderBottom: '1px solid var(--brand-border)'
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
          marginBottom: '6.4rem'
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
                [ 04 // PROJECT ARCHIVE ]
              </span>
              <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
              <span style={{
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--global-muted)'
              }}>
                Architectural Supply Portfolio
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(3.6rem, 5vw, 6.4rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              lineHeight: 1.1
            }}>
              MATERIALS BEHIND<br />
              <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
                GREAT PROJECTS.
              </span>
            </h2>
          </div>

          <p style={{
            fontSize: '1.5rem',
            color: 'var(--global-muted)',
            maxWidth: '52rem',
            lineHeight: 1.6
          }}>
            Illustrative project profiles highlighting structural steel, masonry, concrete systems, and envelope materials supplied to landmark developments across the United Kingdom.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.2rem',
          marginBottom: '5.6rem'
        }}>
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.8rem 1.8rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: activeFilter === f ? 'var(--brand-bc4)' : 'rgba(255, 255, 255, 0.04)',
                color: activeFilter === f ? 'var(--brand-bc1)' : 'var(--brand-bc5)',
                border: activeFilter === f ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Large Editorial Gallery Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(42rem, 1fr))',
          gap: '4.8rem'
        }}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="surface-dark group"
              style={{
                cursor: 'pointer',
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                backgroundColor: 'var(--brand-bc1)'
              }}
            >
              {/* Project Image */}
              <div 
                className="image-reveal-wrapper"
                style={{
                  aspectRatio: '16 / 10',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) contrast(1.1)',
                    transition: 'transform 0.8s var(--easing-bezzy2), filter 0.8s var(--easing-bezzy2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(1.0) contrast(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1.0)';
                    e.currentTarget.style.filter = 'brightness(0.85) contrast(1.1)';
                  }}
                />

                {/* Top Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '2.0rem',
                  left: '2.0rem',
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'rgba(12, 12, 12, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--brand-border)',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-bc4)',
                  letterSpacing: '0.1em'
                }}>
                  {project.category}
                </div>

                {/* Year Pill */}
                <div style={{
                  position: 'absolute',
                  top: '2.0rem',
                  right: '2.0rem',
                  padding: '0.6rem 1.2rem',
                  backgroundColor: 'rgba(12, 12, 12, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--brand-border)',
                  fontSize: '1.1rem',
                  color: 'var(--global-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {project.year}
                </div>
              </div>

              {/* Information Panel */}
              <div style={{ padding: '3.2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '1.2rem'
                }}>
                  <h3 style={{
                    fontSize: '2.6rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--brand-bc5)'
                  }}>
                    {project.title}
                  </h3>
                  <div style={{
                    width: '3.6rem',
                    height: '3.6rem',
                    border: '1px solid var(--brand-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-bc4)'
                  }}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  fontSize: '1.3rem',
                  color: 'var(--global-muted)',
                  marginBottom: '1.6rem'
                }}>
                  <MapPin size={14} color="var(--brand-bc4)" />
                  <span>{project.location}</span>
                </div>

                <p style={{
                  fontSize: '1.4rem',
                  color: 'rgba(242, 241, 237, 0.8)',
                  lineHeight: 1.6,
                  marginBottom: '2.4rem'
                }}>
                  {project.description}
                </p>

                {/* Supplied Materials Tag Line */}
                <div style={{
                  padding: '1.6rem',
                  backgroundColor: 'var(--brand-bc2)',
                  border: '1px solid var(--brand-border)'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--brand-bc4)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <Layers size={14} /> Key Material Package Supplied:
                  </div>
                  <p style={{ fontSize: '1.3rem', color: 'var(--brand-bc5)', fontWeight: 500 }}>
                    {project.materialsSupplied}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Detail Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div 
            className="animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--brand-bc1)',
              border: '1px solid var(--brand-border)',
              maxWidth: '85rem',
              width: '100%',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.9)'
            }}
          >
            {/* Modal Image */}
            <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '2.0rem',
                  right: '2.0rem',
                  width: '4.0rem',
                  height: '4.0rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(12, 12, 12, 0.85)',
                  border: '1px solid var(--brand-border)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '4.0rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.4rem 1.2rem',
                backgroundColor: 'rgba(197, 160, 100, 0.1)',
                color: 'var(--brand-bc4)',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                marginBottom: '1.2rem'
              }}>
                {selectedProject.category} // {selectedProject.year}
              </div>

              <h3 style={{
                fontSize: '3.2rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--brand-bc5)',
                marginBottom: '1.2rem'
              }}>
                {selectedProject.title}
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.0rem',
                color: 'var(--global-muted)',
                fontSize: '1.4rem',
                marginBottom: '2.4rem'
              }}>
                <MapPin size={16} color="var(--brand-bc4)" />
                <span>{selectedProject.location}</span>
                <span>•</span>
                <span>Volume Metric: {selectedProject.metric}</span>
              </div>

              <p style={{
                fontSize: '1.6rem',
                lineHeight: 1.7,
                color: 'rgba(242, 241, 237, 0.9)',
                marginBottom: '3.2rem'
              }}>
                {selectedProject.description}
              </p>

              <div style={{
                padding: '2.4rem',
                backgroundColor: 'var(--brand-bc2)',
                border: '1px solid var(--brand-border)',
                marginBottom: '3.2rem'
              }}>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-bc4)',
                  textTransform: 'uppercase',
                  marginBottom: '0.8rem'
                }}>
                  Specified Materials
                </h4>
                <p style={{ fontSize: '1.5rem', color: 'var(--brand-bc5)', fontWeight: 500 }}>
                  {selectedProject.materialsSupplied}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="btn-primary"
                >
                  <span>Close Project Overview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
