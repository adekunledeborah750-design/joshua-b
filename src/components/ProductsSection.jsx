import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Minus, ShoppingBag, Eye, Check, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/constructionData';

export const ProductsSection = ({ 
  selectedCategory, 
  onSelectCategory, 
  onAddToCart, 
  onOpenProductDetail,
  onOpenQuote 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [quantities, setQuantities] = useState({});
  const [addedAnimationId, setAddedAnimationId] = useState(null);

  const handleQtyChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddWithQty = (product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1800);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section 
      id="products"
      style={{
        padding: '14rem 0',
        backgroundColor: 'var(--brand-bc1)',
        position: 'relative'
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
                [ 05 // DIGITAL STOREFRONT ]
              </span>
              <div style={{ width: '6rem', height: '1px', backgroundColor: 'var(--brand-border)' }} />
              <span style={{
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--global-muted)'
              }}>
                Demonstration Trade Catalog
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(3.4rem, 4.8vw, 6.0rem)',
              fontFamily: 'var(--font-serif)',
              color: 'var(--brand-bc5)',
              lineHeight: 1.15
            }}>
              ESSENTIAL MATERIALS.<br />
              <span style={{ color: 'var(--brand-bc4)', fontStyle: 'italic', fontWeight: 400 }}>
                READY FOR YOUR NEXT PROJECT.
              </span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '1.6rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenQuote} className="btn-secondary">
              <span>Bulk Order Pricing</span>
            </button>
          </div>
        </div>

        {/* Search, Filter Tabs & Sort Controls */}
        <div style={{
          backgroundColor: 'var(--brand-bc2)',
          border: '1px solid var(--brand-border)',
          padding: '2.4rem',
          marginBottom: '4.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.4rem'
        }}>
          {/* Top row: Search input + Sort dropdown */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2.0rem'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              backgroundColor: 'var(--brand-bc1)',
              border: '1px solid var(--brand-border)',
              padding: '1.2rem 2.0rem',
              width: '100%',
              maxWidth: '48rem',
              borderRadius: '2px'
            }}>
              <Search size={18} color="var(--brand-bc4)" />
              <input
                type="text"
                placeholder="Search materials (e.g. cement, timber, rebar, PIR, blocks)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--brand-bc5)',
                  fontSize: '1.4rem',
                  width: '100%'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--global-muted)', fontSize: '1.2rem' }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span style={{
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--global-muted)'
              }}>
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: 'var(--brand-bc1)',
                  border: '1px solid var(--brand-border)',
                  color: 'var(--brand-bc5)',
                  padding: '1.2rem 1.6rem',
                  fontSize: '1.3rem',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.0rem',
            overflowX: 'auto',
            paddingBottom: '0.8rem',
            whiteSpace: 'nowrap'
          }}>
            <button
              onClick={() => onSelectCategory('all')}
              style={{
                padding: '0.8rem 1.6rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: '2px',
                backgroundColor: (!selectedCategory || selectedCategory === 'all') ? 'var(--brand-bc4)' : 'transparent',
                color: (!selectedCategory || selectedCategory === 'all') ? 'var(--brand-bc1)' : 'var(--brand-bc5)',
                border: (!selectedCategory || selectedCategory === 'all') ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                transition: 'all 0.3s ease'
              }}
            >
              All Categories ({PRODUCTS.length})
            </button>

            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '0.8rem 1.6rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderRadius: '2px',
                  backgroundColor: selectedCategory === cat.id ? 'var(--brand-bc4)' : 'transparent',
                  color: selectedCategory === cat.id ? 'var(--brand-bc1)' : 'var(--brand-bc5)',
                  border: selectedCategory === cat.id ? '1px solid var(--brand-bc4)' : '1px solid var(--brand-border)',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '8rem 2rem',
            backgroundColor: 'var(--brand-bc2)',
            border: '1px solid var(--brand-border)'
          }}>
            <p style={{ fontSize: '1.8rem', color: 'var(--brand-bc5)', marginBottom: '1.2rem' }}>
              No construction materials match your search criteria.
            </p>
            <p style={{ fontSize: '1.4rem', color: 'var(--global-muted)', marginBottom: '2.4rem' }}>
              Try searching for general keywords or clear your active filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(34rem, 1fr))',
            gap: '3.6rem'
          }}>
            {filteredAndSortedProducts.map(product => {
              const qty = quantities[product.id] || 1;
              const isAdded = addedAnimationId === product.id;

              return (
                <div
                  key={product.id}
                  className="surface-dark"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '2px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'var(--brand-bc2)'
                  }}
                >
                  {/* Product Image & Badges */}
                  <div 
                    style={{
                      aspectRatio: '1 / 1',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#161616'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.9) contrast(1.05)',
                        transition: 'transform 0.6s var(--easing-bezzy2)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />

                    {/* Stock status indicator */}
                    <div style={{
                      position: 'absolute',
                      top: '1.6rem',
                      left: '1.6rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.4rem 1.0rem',
                      backgroundColor: 'rgba(12, 12, 12, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--brand-border)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: product.inStock ? '#3adb76' : '#face10'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: product.inStock ? '#3adb76' : '#face10'
                      }} />
                      <span>{product.inStock ? `In Stock (${product.stockQty})` : 'Order Upon Request'}</span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      style={{
                        position: 'absolute',
                        top: '1.6rem',
                        right: '1.6rem',
                        width: '3.6rem',
                        height: '3.6rem',
                        backgroundColor: 'rgba(12, 12, 12, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--brand-border)',
                        color: 'var(--brand-bc5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--brand-bc4)';
                        e.currentTarget.style.color = 'var(--brand-bc1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(12, 12, 12, 0.85)';
                        e.currentTarget.style.color = 'var(--brand-bc5)';
                      }}
                      title="Quick View Specifications"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Popular Tag */}
                    {product.isPopular && (
                      <div style={{
                        position: 'absolute',
                        bottom: '1.6rem',
                        left: '1.6rem',
                        padding: '0.4rem 1.0rem',
                        backgroundColor: 'var(--brand-accent)',
                        color: '#fff',
                        fontSize: '1.0rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}>
                        Core Contractor Essential
                      </div>
                    )}
                  </div>

                  {/* Product Details Content */}
                  <div style={{ padding: '2.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* SKU & Category */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--brand-bc4)',
                      marginBottom: '0.8rem'
                    }}>
                      <span>{product.categoryName}</span>
                      <span style={{ color: 'var(--global-muted)' }}>{product.sku}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onOpenProductDetail(product)}
                      style={{
                        fontSize: '2.0rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--brand-bc5)',
                        marginBottom: '1.2rem',
                        lineHeight: 1.3,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--brand-bc4)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--brand-bc5)'}
                    >
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: '1.3rem',
                      color: 'rgba(242, 241, 237, 0.75)',
                      lineHeight: 1.6,
                      marginBottom: '2.0rem',
                      flex: 1
                    }}>
                      {product.description}
                    </p>

                    {/* Pack size info */}
                    <div style={{
                      padding: '1.0rem 1.4rem',
                      backgroundColor: 'rgba(12, 12, 12, 0.5)',
                      border: '1px solid var(--brand-border)',
                      fontSize: '1.2rem',
                      color: 'var(--global-muted)',
                      marginBottom: '2.4rem'
                    }}>
                      Unit / Pack: <strong style={{ color: 'var(--brand-bc5)' }}>{product.packSize}</strong>
                    </div>

                    {/* Price & Cart Actions */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--brand-border)',
                      paddingTop: '2.0rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', color: 'var(--global-muted)', display: 'block' }}>
                          Ex. VAT / {product.unit}
                        </span>
                        <span style={{
                          fontSize: '2.4rem',
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 700,
                          color: 'var(--brand-bc4)'
                        }}>
                          £{product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--brand-bc1)',
                        border: '1px solid var(--brand-border)',
                        borderRadius: '2px'
                      }}>
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          style={{ padding: '0.8rem 1.0rem', color: 'var(--brand-bc5)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{
                          fontSize: '1.3rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0 0.8rem',
                          minWidth: '2.8rem',
                          textAlign: 'center'
                        }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          style={{ padding: '0.8rem 1.0rem', color: 'var(--brand-bc5)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart button */}
                    <div style={{ marginTop: '1.6rem' }}>
                      <button
                        onClick={() => handleAddWithQty(product)}
                        style={{
                          width: '100%',
                          padding: '1.4rem',
                          backgroundColor: isAdded ? '#3adb76' : 'var(--brand-bc4)',
                          color: isAdded ? '#000' : 'var(--brand-bc1)',
                          fontWeight: 600,
                          fontSize: '1.2rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '1.0rem',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} />
                            <span>Added to Site Order</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} />
                            <span>Add to Cart ({qty})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
