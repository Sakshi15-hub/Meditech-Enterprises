/**
 * ============================================================================
 * MEDITECH ENTERPRISE — Official Product Catalogue & Business Website
 * Vanilla JavaScript: Responsive Navigation, Category Filters,
 * Live Search, Product Modal Lightbox, and Form Validation.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER ELEVATION ON SCROLL
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 3. MOBILE HAMBURGER MENU & DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    const toggleMenu = (shouldOpen) => {
      const isOpen = shouldOpen !== undefined ? shouldOpen : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. SMOOTH SCROLLING WITH FIXED HEADER OFFSET
  // --------------------------------------------------------------------------
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. SCROLL SPY ACTIVE NAV LINK HIGHLIGHT
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-list .nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    const headerHeight = 110;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        mainNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. ALL 11 PRODUCTS DATABASE (FROM BROCHURE PDF)
  // --------------------------------------------------------------------------
  const productsData = {
    'medi-cast': {
      name: 'MEDI CAST ORTHOPEDIC CASTING TAPE',
      category: 'Orthopedic Cast Care',
      badge: 'Page 1 Product',
      image: 'assets/images/products/medi-cast.png',
      description: 'High-performance synthetic orthopedic casting tape engineered for bone fracture immobilization. Sets rapidly, offering exceptional structural rigidity with superior moisture resistance.',
      features: [
        'Light Weight',
        'Strong & Rigid',
        'Moisture Resistance',
        'Easy To Dry',
        'Save Time & Effort',
        'Cost Effective'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width (inch)</th>
              <th>Width (cm)</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>2 inch</td><td>5.0 cm</td><td>4 yard (3.6 mtr)</td></tr>
            <tr><td>3 inch</td><td>7.5 cm</td><td>4 yard (3.6 mtr)</td></tr>
            <tr><td>4 inch</td><td>10.0 cm</td><td>4 yard (3.6 mtr)</td></tr>
            <tr><td>5 inch</td><td>12.5 cm</td><td>4 yard (3.6 mtr)</td></tr>
            <tr><td>6 inch</td><td>15.0 cm</td><td>4 yard (3.6 mtr)</td></tr>
          </tbody>
        </table>
      `
    },

    'cotton-wool': {
      name: 'ABSORBENT COTTON WOOL',
      category: 'Surgical Cotton',
      badge: 'Page 1 Product',
      image: 'assets/images/products/absorbent-cotton-wool.png',
      description: 'Pure, softest medical absorbent cotton wool processed from clean fibres with consistent layering. Ideal for high-absorbency wound care and surgical hygiene without loose fibers.',
      features: [
        'Consistent Layer',
        'Pure & Softest Cotton',
        'No Loose Fiber',
        'High Fluid Absorbency',
        'Free from Foreign Contaminants'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Specification</th>
              <th>Weight</th>
              <th>Quality Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Gross Weight</td><td>400 gm Gross</td><td>Pure Hospital Grade</td></tr>
            <tr><td>Net Weight</td><td>400 gm Net</td><td>Hygienic Surgical Standard</td></tr>
          </tbody>
        </table>
      `
    },

    'soft-roll': {
      name: 'MEDI SOFT ROLL CAST PADDING',
      category: 'Cast Padding',
      badge: 'Page 1 Product',
      image: 'assets/images/products/medi-soft-roll.png',
      description: 'Under-cast orthopedic padding crafted from 100% premium quality viscose fibre to provide soft cushioning and protect skin under plaster or synthetic casts.',
      features: [
        '100% Premium Quality',
        '100% Viscose Fibre',
        'Uniform Soft Cushioning',
        'Permits Skin Transpiration',
        'Tears Evenly Without Pulling'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width</th>
              <th>Length</th>
              <th>Composition</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>10 cm</td><td>3 mtr</td><td>100% Viscose Fibre</td></tr>
            <tr><td>15 cm</td><td>3 mtr</td><td>100% Viscose Fibre</td></tr>
          </tbody>
        </table>
      `
    },

    'crape-bandage': {
      name: 'CRAPE BANDAGE',
      category: 'Compression Bandages',
      badge: 'Page 1 Product',
      image: 'assets/images/products/crepe-bandage.png',
      description: 'Cotton, elastic crepe bandage with non-fraying fast edges. Provides sustained, controlled compression and muscle support across orthopedics and sprain care.',
      features: [
        'Cotton, Elastic Crepe Bandage',
        'Stretched Length Measurement',
        'Fast Finished Edges',
        'Durable Elastic Support',
        'Reusable & Hand Washable'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width</th>
              <th>Length (Stretched Length)</th>
              <th>Material</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>6 cm</td><td>4 mtr</td><td>Cotton Elastic Bandage</td></tr>
            <tr><td>8 cm</td><td>4 mtr</td><td>Cotton Elastic Bandage</td></tr>
            <tr><td>10 cm</td><td>4 mtr</td><td>Cotton Elastic Bandage</td></tr>
            <tr><td>15 cm</td><td>4 mtr</td><td>Cotton Elastic Bandage</td></tr>
          </tbody>
        </table>
      `
    },

    'medi-plast': {
      name: 'MEDI PLAST ELASTIC ADHESIVE BANDAGE',
      category: 'Adhesive Bandages',
      badge: 'Page 1 Product',
      image: 'assets/images/products/medi-plast.png',
      description: 'Heavy-duty elastic adhesive bandage formulated with porous zinc-oxide adhesive and fast edges for firm compression, sprain bandaging, and dressing stabilization.',
      features: [
        'Better Elasticity',
        'Thick Fabric Construction',
        'Fast Edges With Porous Adhesive',
        'Consistent Quality & Adhesion',
        'Allows Skin Perspiration'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width</th>
              <th>Length</th>
              <th>Edge Type</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>10 cm</td><td>1 mtr</td><td>Porous Fast Edges</td></tr>
            <tr><td>10 cm</td><td>4 mtr (Stretched)</td><td>Porous Fast Edges</td></tr>
          </tbody>
        </table>
      `
    },

    'absorbent-gauze': {
      name: 'ABSORBENT GAUZE',
      category: 'Pharmacopoeia Gauze',
      badge: 'Page 2 Product',
      image: 'assets/images/products/absorbent-gauze.png',
      description: '100% bleached cotton woven fabric conforming to British Pharmacopoeia (BP) and Schedule FII drug standard. Lightweight, soft, and completely free from contaminants.',
      features: [
        '100% Bleached Cotton Woven Fabric',
        'Conforming to BP / Sch. FII Standard',
        'Lightweight, Soft & Free from Contaminants',
        'High Capillarity and Rapid Absorbency',
        'Bleached to Pure Natural Whiteness'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width (cm)</th>
              <th>Length (mtr)</th>
              <th>Quality Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>22 cm</td><td>16 mtr</td><td>Regular</td></tr>
            <tr><td>45 cm</td><td>16 mtr</td><td>Regular</td></tr>
            <tr><td>90 cm</td><td>16 mtr</td><td>Regular</td></tr>
            <tr><td>100 cm</td><td>18 mtr</td><td>Dulex, Superfine</td></tr>
          </tbody>
        </table>
      `
    },

    'rolled-bandage': {
      name: 'ROLLED BANDAGE',
      category: 'Roller Bandages',
      badge: 'Page 2 Product',
      image: 'assets/images/products/rolled-bandage.png',
      description: 'Smooth-textured hospital roller gauze bandages crafted for dressing fixation, surgical bandaging, and post-operative protection with enhanced durability.',
      features: [
        'Smooth Texture, Enhanced Durability',
        'Perfect Finish & High Softness',
        'Clean Cut Straight Edges',
        'Convenient Multi-roll Hospital Pack (10 pcs)'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Size / Width</th>
              <th>Available Lengths</th>
              <th>Standard Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>5 cm</td><td>3, 4, 8, 9, 10 mtr</td><td>10 pcs / pack</td></tr>
            <tr><td>7.5 cm</td><td>3, 4, 8, 9, 10 mtr</td><td>10 pcs / pack</td></tr>
            <tr><td>10 cm</td><td>3, 4, 8, 9, 10 mtr</td><td>10 pcs / pack</td></tr>
            <tr><td>15 cm</td><td>3, 4, 8, 9, 10 mtr</td><td>10 pcs / pack</td></tr>
          </tbody>
        </table>
      `
    },

    'gauze-swab': {
      name: 'GAUZE SWAB',
      category: 'Sterile & Non-Sterile',
      badge: 'Page 2 Product',
      image: 'assets/images/products/gauze-swab.png',
      description: 'Highly absorbent bleached 100% cotton gauze fabric swabs conforming to BP / Sch. FII standard for wound cleansing, surgical preparation, and exudate absorption.',
      features: [
        'Highly Absorbent Bleached 100% Cotton Gauze Fabric',
        'Conforming to BP / Sch. FII',
        'Available in 8 Ply and 12 Ply Configurations',
        'Folded Edges to Prevent Fraying and Loose Threads',
        'Available in Sterile (Peel Pouch) & Non-Sterile (Bulk)'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Ply Count</th>
              <th>Packaging (Non-Sterile)</th>
              <th>Packaging (Sterile)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>5 cm × 5 cm</td><td>8 ply, 12 ply</td><td>100 pcs / packet</td><td>5 pcs / packet</td></tr>
            <tr><td>7.5 cm × 7.5 cm</td><td>8 ply, 12 ply</td><td>100 pcs / packet</td><td>5 pcs / packet</td></tr>
            <tr><td>10 cm × 10 cm</td><td>8 ply, 12 ply</td><td>100 pcs / packet</td><td>5 pcs / packet</td></tr>
          </tbody>
        </table>
      `
    },

    'leno-gauze': {
      name: 'LENO ABSORBENT GAUZE',
      category: 'Specialty Weave Gauze',
      badge: 'Page 2 Product',
      image: 'assets/images/products/weave-structure.png',
      description: 'Our Team Of Efficient Professionals Meticulously, Design & Fabricate A Wide Range Of Leno Gauze In Conformation To The International Standard. Engineered with interlocking weave to eliminate thread slippage.',
      features: [
        'Highly Absorbency',
        'Inter Locking Structure',
        'Soft Texture',
        'Available in Plain Weave & Leno Weave Structures'
      ],
      sizesHtml: `
        <div style="margin: 12px 0; background: var(--color-light-grey); padding: 12px; border-radius: 8px; border: 1px solid var(--color-border);">
          <strong style="display:block; margin-bottom:8px; color: var(--color-navy); font-size: 0.85rem; text-transform:uppercase;">Original Weave Structure Illustrations from Brochure:</strong>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: center;">
            <div style="background:#fff; padding:8px; border-radius:6px; border:1px solid #E2E8F0;">
              <img src="assets/images/products/plain-weave.png" alt="Plain Weave Structure" style="height:90px; width:100%; object-fit:contain;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--color-navy);">Plain Weave</span>
            </div>
            <div style="background:#fff; padding:8px; border-radius:6px; border:1px solid #E2E8F0;">
              <img src="assets/images/products/leno-weave.png" alt="Leno Weave Structure" style="height:90px; width:100%; object-fit:contain;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--color-navy);">Leno Weave</span>
            </div>
          </div>
        </div>
        <table class="spec-table">
          <thead>
            <tr>
              <th>Weave Width</th>
              <th>Roll Length</th>
              <th>Weave Structure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>60 cm</td><td>10 mtr</td><td>Plain / Leno Weave</td></tr>
            <tr><td>125 cm</td><td>5 mtr</td><td>Plain / Leno Weave</td></tr>
            <tr><td>125 cm</td><td>10 mtr</td><td>Plain / Leno Weave</td></tr>
          </tbody>
        </table>
      `
    },

    'medi-mop': {
      name: 'MEDI MOP / SPONGES WITH X-RAY STRIP',
      category: 'Surgical Sponges',
      badge: 'Page 2 Product',
      image: 'assets/images/products/medi-mop-sponges.png',
      description: 'Used in all major surgical procedures for absorbing heavy blood flow or for isolating organs or for compression. Fitted with a secure, radiopaque barium sulfate thread detectable by X-ray.',
      features: [
        'X-Ray Detectable Vulcanized Strip / Loop',
        'Used in All Major Surgical Procedures',
        'Heavy Blood Flow & Body Fluid Absorption',
        'Organ Isolation and Compression Support',
        'Bleached Pure Cotton with Secure Loop'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Dimensions</th>
              <th>Ply Options</th>
              <th>Sterile Pack</th>
              <th>Non-Sterile Pack</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>25 cm × 25 cm</td><td>8 ply, 12 ply</td><td>1 pc / packet</td><td>10 pcs / packet</td></tr>
            <tr><td>30 cm × 30 cm</td><td>8 ply, 12 ply</td><td>1 pc / packet</td><td>10 pcs / packet</td></tr>
            <tr><td>25 cm × 40 cm</td><td>8 ply, 10 ply, 12 ply</td><td>1 pc / packet</td><td>10 pcs / packet</td></tr>
          </tbody>
        </table>
      `
    },

    'gamjee-roll': {
      name: 'GAMJEE ROLL',
      category: 'Surgical Dressing',
      badge: 'Page 2 Product',
      image: 'assets/images/products/gamjee-roll.png',
      description: 'Soft & comforting, extra white surgical roll composed of a uniform thick layer of absorbent cotton wool enclosed in an absorbent gauze cover for high fluid retention and wound cushioning.',
      features: [
        'Soft & Comforting',
        'Extra White Clean Cotton',
        'Maximum Exudate Absorption',
        'Protective Gauze Cover Prevents Linting'
      ],
      sizesHtml: `
        <table class="spec-table">
          <thead>
            <tr>
              <th>Width</th>
              <th>Length</th>
              <th>Construction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>10 cm</td><td>2.7 mtr</td><td>Cotton Wool with Gauze Sheath</td></tr>
            <tr><td>15 cm</td><td>2.7 mtr</td><td>Cotton Wool with Gauze Sheath</td></tr>
            <tr><td>10 cm</td><td>3.0 mtr</td><td>Cotton Wool with Gauze Sheath</td></tr>
            <tr><td>15 cm</td><td>3.0 mtr</td><td>Cotton Wool with Gauze Sheath</td></tr>
          </tbody>
        </table>
      `
    }
  };

  // --------------------------------------------------------------------------
  // 8. CATEGORY FILTER & INSTANT LIVE SEARCH
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('productSearchInput');

  let activeCategory = 'all';
  let activeSearchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCat = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!activeSearchQuery || cardText.includes(activeSearchQuery));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    let noNotice = document.getElementById('noProductsNotice');
    const grid = document.getElementById('productsGrid');

    if (visibleCount === 0) {
      if (!noNotice) {
        noNotice = document.createElement('div');
        noNotice.id = 'noProductsNotice';
        noNotice.style.gridColumn = '1 / -1';
        noNotice.style.textAlign = 'center';
        noNotice.style.padding = '48px 16px';
        noNotice.innerHTML = `
          <h4 style="font-family: var(--font-heading); color: var(--color-navy); margin-bottom: 8px;">No Matching Products Found</h4>
          <p style="color: var(--text-secondary);">Please clear your search filter or select another category.</p>
        `;
        grid.appendChild(noNotice);
      }
    } else if (noNotice) {
      noNotice.remove();
    }
  };

  // Filter Pill Click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter');
      applyFilters();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // --------------------------------------------------------------------------
  // 9. PRODUCT DETAILS LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const modal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalImg = document.getElementById('modalProductImg');
  const modalCategoryBadge = document.getElementById('modalCategoryBadge');
  const modalFeatureList = document.getElementById('modalFeatureList');
  const modalSizesContainer = document.getElementById('modalSizesContainer');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  let activeModalProductId = null;

  const openModal = (productId) => {
    const data = productsData[productId];
    if (!data) return;

    activeModalProductId = productId;
    if (modalTitle) modalTitle.textContent = data.name;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.name;
    }
    if (modalCategoryBadge) modalCategoryBadge.textContent = `${data.badge} • ${data.category}`;

    if (modalFeatureList) {
      modalFeatureList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeatureList.appendChild(li);
      });
    }

    if (modalSizesContainer) {
      modalSizesContainer.innerHTML = data.sizesHtml;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModalProductId = null;
  };

  // Wire up "View Details" buttons
  const viewDetailButtons = document.querySelectorAll('.btn-view-details');
  viewDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodId = btn.getAttribute('data-id') || btn.getAttribute('data-product');
      openModal(prodId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Click outside modal to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 10. PRODUCT INQUIRY PRE-SELECTION
  // --------------------------------------------------------------------------
  const productSelect = document.getElementById('productSelect');
  const contactSection = document.getElementById('contact');

  const scrollToContactAndSelect = (productName) => {
    if (productSelect && productName) {
      for (let i = 0; i < productSelect.options.length; i++) {
        const optVal = productSelect.options[i].value;
        if (optVal.toLowerCase().includes(productName.toLowerCase()) || 
            productName.toLowerCase().includes(optVal.toLowerCase())) {
          productSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (contactSection) {
      const headerOffset = 90;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (productSelect) {
        setTimeout(() => {
          productSelect.focus();
          productSelect.style.borderColor = 'var(--color-orange)';
          productSelect.style.boxShadow = '0 0 0 4px rgba(245, 130, 32, 0.25)';
          setTimeout(() => {
            productSelect.style.borderColor = '';
            productSelect.style.boxShadow = '';
          }, 2000);
        }, 500);
      }
    }
  };

  // Modal Inquire button
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      if (activeModalProductId && productsData[activeModalProductId]) {
        const prodName = productsData[activeModalProductId].name;
        closeModal();
        scrollToContactAndSelect(prodName);
      }
    });
  }

  // Card Quick Inquire buttons
  const quickInquireButtons = document.querySelectorAll('.btn-quick-inquire');
  quickInquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodName = btn.getAttribute('data-product');
      scrollToContactAndSelect(prodName);
    });
  });

  // --------------------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & SIMULATED SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.elements['name'].value.trim();
      const phone = contactForm.elements['phone'].value.trim();
      const email = contactForm.elements['email'].value.trim();
      const message = contactForm.elements['message'].value.trim();
      const product = contactForm.elements['product'].value;

      // Validation
      if (!name) {
        showStatus('Please enter your full name.', 'error');
        contactForm.elements['name'].focus();
        return;
      }
      if (!phone || phone.length < 6) {
        showStatus('Please enter a valid telephone / mobile number.', 'error');
        contactForm.elements['phone'].focus();
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        contactForm.elements['email'].focus();
        return;
      }
      if (!message || message.length < 5) {
        showStatus('Please enter your inquiry details or requested product quantities.', 'error');
        contactForm.elements['message'].focus();
        return;
      }

      // Success feedback
      const submitBtn = document.getElementById('submitFormBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Inquiry...';
      }

      setTimeout(() => {
        showStatus(`Thank you, ${name}! Your inquiry for "${product}" has been received. Our sales desk at Ichalkaranji will contact you shortly at ${phone}.`, 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Inquiry';
        }
      }, 700);
    });

    const showStatus = (msg, type) => {
      formStatus.textContent = msg;
      formStatus.className = `form-status ${type}`;
    };
  }

});
