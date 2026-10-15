import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyIntro } from './components/CompanyIntro';
import { StorytellingSection } from './components/StorytellingSection';
import { EditorialBanner } from './components/EditorialBanner';
import { CategoriesSection } from './components/CategoriesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { QuoteModal } from './components/QuoteModal';
import { CheckoutModal } from './components/CheckoutModal';
import { BRAND_CONFIG } from './data/constructionData';

export function App() {
  // E-commerce Cart State
  const [cart, setCart] = useState(() => {
    // Demo starting items to showcase live cart features immediately
    return [
      {
        id: "prod-cem-01",
        name: "Blue Circle Mastercrete Premium Cement 25kg",
        price: 9.85,
        unit: "25kg Bag",
        packSize: "Single 25kg Paper Bag (Pallet: 56 Bags)",
        quantity: 10,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=85",
        sku: "FCC-CEM-001"
      },
      {
        id: "prod-stl-01",
        name: "High-Yield B500B Deformed Reinforcing Rebar (T16 x 6.0m)",
        price: 28.50,
        unit: "6.0m Length",
        packSize: "Single 6m Bar (Bundle: 50 Bars)",
        quantity: 4,
        image: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&w=800&q=85",
        sku: "FCC-STL-401"
      }
    ];
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll Progress Calculation (faithful to reference site's scroll-progress-fill)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }

      // Check active section
      const sections = ['hero', 'intro', 'stages', 'categories', 'projects', 'products', 'why-us', 'closing'];
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          packSize: product.packSize,
          quantity: quantity,
          image: product.image,
          sku: product.sku
        }];
      }
    });
  };

  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Smooth Section Navigation
  const handleNavigateSection = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryAndScroll = (catId) => {
    setSelectedCategory(catId);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="site-wrapper" style={{ position: 'relative' }}>
      {/* Top Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Global Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main id="page">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => handleNavigateSection('products')}
          onQuoteClick={() => setIsQuoteOpen(true)}
        />

        {/* 2. Construction Company Introduction */}
        <CompanyIntro
          onExploreClick={() => handleNavigateSection('categories')}
          onQuoteClick={() => setIsQuoteOpen(true)}
        />

        {/* 3. Animated Construction Storytelling Section (Foundation, Structure, Finishing) */}
        <StorytellingSection
          onSelectCategory={handleSelectCategoryAndScroll}
          onQuoteClick={() => setIsQuoteOpen(true)}
        />

        {/* 4. Large Editorial Visual Banner */}
        <EditorialBanner
          onDiscoverClick={() => handleNavigateSection('products')}
        />

        {/* 5. 10 Building Materials Product Categories */}
        <CategoriesSection
          onSelectCategory={handleSelectCategoryAndScroll}
        />

        {/* 6. Construction Projects Gallery */}
        <ProjectsGallery />

        {/* 7. Featured Building Materials & Full E-Commerce Storefront */}
        <ProductsSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={(prod) => setActiveProductDetail(prod)}
          onOpenQuote={() => setIsQuoteOpen(true)}
        />

        {/* 8. Why Choose Forge Construction Company */}
        <WhyChooseUs
          onQuoteClick={() => setIsQuoteOpen(true)}
        />

        {/* 9. Closing Call-To-Action */}
        <ClosingCTA
          onShopClick={() => handleNavigateSection('products')}
          onQuoteClick={() => setIsQuoteOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenQuote={() => setIsQuoteOpen(true)}
        onSelectCategory={handleSelectCategoryAndScroll}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Product Specification Detail Modal */}
      <ProductModal
        product={activeProductDetail}
        isOpen={Boolean(activeProductDetail)}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={handleAddToCart}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Request a Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialCategories={selectedCategory && selectedCategory !== 'all' ? [selectedCategory] : []}
      />

      {/* Functional Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderCompleted={() => setCart([])}
      />
    </div>
  );
}

export default App;
