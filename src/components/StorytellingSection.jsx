import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles, ChevronRight, HardHat, Layers } from 'lucide-react';
import { STORY_STAGES } from '../data/constructionData';

export const StorytellingSection = ({ onSelectCategory, onQuoteClick }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance stages every 6 seconds if not paused by user
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STORY_STAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeStage = STORY_STAGES[activeStageIndex];

  return (
    <section 
      id="stages"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc2)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container-max">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '6.4rem'
        }}>
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
              [ 02 // SYNCHRONIZED PHASES ]
            </span>
            <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
            <span style={{
              fontSize: '1.2rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--global-muted)'
            }}>
              Full Lifecycle Supply
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(3.6rem, 5vw, 6.4rem)',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.1,
            color: 'var(--brand-bc5)',
            marginBottom: '2.0rem'
          }}>
            EVERY STAGE MATTERS.
          </h2>

          <p style={{
            fontSize: '1.8rem',
            color: 'var(--global-muted)',
            maxWidth: '64rem',
            lineHeight: 1.6
          }}>
            From breaking ground to the final architectural detailing, explore how our material ecosystem supports each critical phase of the build.
          </p>
        </div>

        {/* Synchronized Stage Navigation Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.4rem',
          marginBottom: '5.6rem',
          borderBottom: '1px solid var(--brand-border)',
          paddingBottom: '2.4rem'
        }}>
          {STORY_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageIndex(idx);
                  setIsAutoPlaying(false);
                }}
                style={{
                  textAlign: 'left',
                  padding: '2.0rem',
                  backgroundColor: isActive ? 'rgba(197, 160, 100, 0.08)' : 'transparent',
                  border: isActive ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                  borderRadius: '2px',
                  transition: 'all 0.4s var(--easing-bezzy2)',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.2rem'
                }}>
                  <span style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-mono)',
                    color: isActive ? 'var(--brand-bc4)' : 'var(--global-muted)',
                    letterSpacing: '0.1em'
                  }}>
                    {stage.stage}
                  </span>
                  <span style={{
                    fontSize: '1.1rem',
                    padding: '0.3rem 0.8rem',
                    backgroundColor: isActive ? 'var(--brand-bc4)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? 'var(--brand-bc1)' : 'var(--global-muted)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {stage.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(2.0rem, 2.5vw, 3.2rem)',
                  fontFamily: 'var(--font-serif)',
                  color: isActive ? 'var(--brand-bc5)' : 'rgba(242, 241, 237, 0.5)',
                  transition: 'color 0.3s ease'
                }}>
                  {stage.title}
                </h3>

                {/* Progress bar line for active item */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--brand-bc4)'
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Pinned Synchronized Interactive Canvas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
          gap: '6.4rem',
          alignItems: 'center',
          backgroundColor: 'var(--brand-bc1)',
          border: '1px solid var(--brand-border)',
          padding: '6.4rem',
          borderRadius: '2px'
        }}>
          {/* Synchronized Left Info Panel */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.0rem',
              padding: '0.6rem 1.4rem',
              backgroundColor: 'rgba(197, 160, 100, 0.1)',
              color: 'var(--brand-bc4)',
              fontSize: '1.2rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '2.4rem'
            }}>
              <span>{activeStage.stage}</span>
              <span>—</span>
              <span>{activeStage.title}</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(2.8rem, 3.5vw, 4.4rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              marginBottom: '1.6rem',
              lineHeight: 1.2
            }}>
              {activeStage.subtitle}
            </h3>

            <p style={{
              fontSize: '1.7rem',
              lineHeight: 1.7,
              color: 'rgba(242, 241, 237, 0.85)',
              marginBottom: '3.6rem'
            }}>
              {activeStage.description}
            </p>

            {/* Technical Specification Chips */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem',
              marginBottom: '4.8rem'
            }}>
              <span style={{
                fontSize: '1.1rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--brand-bc4)',
                fontWeight: 600
              }}>
                Technical Standards & Core Supplies
              </span>
              {activeStage.specs.map((spec, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{
                    width: '2.0rem',
                    height: '2.0rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 160, 100, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-bc4)',
                    flexShrink: 0
                  }}>
                    <Check size={12} />
                  </div>
                  <span style={{ fontSize: '1.4rem', color: 'var(--brand-bc5)' }}>
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '2.0rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onSelectCategory(
                  activeStageIndex === 0 ? 'cement-concrete' : 
                  activeStageIndex === 1 ? 'steel-reinforcement' : 'insulation-plasterboard'
                )}
                className="btn-primary"
              >
                <span>View {activeStage.title} Supplies</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={onQuoteClick} className="btn-secondary">
                <span>Phase Material Quote</span>
              </button>
            </div>
          </div>

          {/* Synchronized Right Stage Image Panel */}
          <div style={{ position: 'relative' }}>
            <div 
              className="image-reveal-wrapper"
              style={{
                aspectRatio: '16 / 11',
                border: '1px solid var(--brand-border)',
                backgroundColor: 'var(--brand-bc2)'
              }}
            >
              <img
                key={activeStage.id}
                src={activeStage.image}
                alt={activeStage.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) brightness(0.92)'
                }}
              />

              {/* Synchronized floating tag */}
              <div style={{
                position: 'absolute',
                top: '2.4rem',
                right: '2.4rem',
                padding: '0.8rem 1.6rem',
                backgroundColor: 'rgba(12, 12, 12, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--brand-border)',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-bc4)'
              }}>
                PHASE SPEC // {activeStage.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
