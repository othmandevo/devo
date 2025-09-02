// Devo Store - Professional E-commerce Platform with Backend Integration
class DevoStore {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentFilter = 'all';
        this.theme = localStorage.getItem('theme') || 'light';
        this.language = localStorage.getItem('language') || 'en';
        this.translations = this.getTranslations();
        this.resizeTimeout = null;
        this.searchTimeout = null;
        this.user = null;
        this.isLoggedIn = false;
        this.apiBaseUrl = 'http://localhost:3000/api'; // Backend API URL
        this.token = localStorage.getItem('auth_token');
        // Currency state
        this.currency = localStorage.getItem('currency') || 'USD';
        this.currencyRates = {
            USD: 1,
            EUR: 0.92,
            EGP: 49.0,
            GBP: 0.78,
            SAR: 3.75,
            AED: 3.67
        };
        this.currencySymbols = {
            USD: '$',
            EUR: '€',
            EGP: 'E£',
            GBP: '£',
            SAR: '﷼',
            AED: 'د.إ'
        };
        this.init();
    }

    openProduct(productId) {
        window.location.href = `product.html?id=${productId}`;
    }

    init() {
        const startTime = performance.now();
        
        this.setupEventListeners();
        this.checkAuthStatus();
        this.loadProducts();
        this.loadCartFromStorage();
        this.updateThemeUI();
        this.applyLanguage();
        this.updateLanguageUI();
        this.updateCurrencyUI?.();
        this.updateActiveNavigation();
        this.setupResizeHandler();
        this.setupLazyLoading();
        this.updateAuthUI();
        
        this.logPerformance('Store initialization', startTime);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Cart functionality
        const cartToggle = document.getElementById('cartToggle');
        const cartClose = document.getElementById('cartClose');
        const cartSidebar = document.getElementById('cartSidebar');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Close cart when clicking outside
        if (cartSidebar) {
            cartSidebar.addEventListener('click', (e) => {
                if (e.target === cartSidebar) {
                    this.closeCart();
                }
            });
        }

        // Mobile menu
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('open');
                mobileMenuToggle.classList.toggle('active');
                
                if (navMenu.classList.contains('open')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Language dropdown
        const languageToggle = document.getElementById('languageToggle');
        const languageMenu = document.getElementById('languageMenu');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageToggle && languageMenu) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageMenu.classList.toggle('open');
            });

            languageOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    this.changeLanguage(lang);
                    languageMenu.classList.remove('open');
                });
            });

            document.addEventListener('click', () => {
                languageMenu.classList.remove('open');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);
                this.updateActiveNavigation();
            });
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProducts(filter);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Search functionality
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchProducts(e.target.value);
                }, 300);
            });
        }

        // Smooth scrolling for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Footer filter links
        document.querySelectorAll('.footer-section a[data-filter]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = link.getAttribute('data-filter');
                this.filterProducts(filter);
                
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const activeButton = document.querySelector(`[data-filter="${filter}"]`);
                if (activeButton) activeButton.classList.add('active');
                
                this.scrollToSection('products');
            });
        });
    }

    loadProducts() {
        try {
            const savedProducts = localStorage.getItem('devo_products');
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            } else {
                this.loadDefaultProducts();
            }
        } catch (error) {
            console.warn('Error loading products from storage:', error);
            localStorage.removeItem('devo_products');
            this.loadDefaultProducts();
        }
        this.removeUnityGame();
        this.ensureBattleRoyaleGames();
        this.renderProducts();
    }

    loadDefaultProducts() {
		this.products = [
			{
				id: 1,
				name: "Adobe Photoshop CC 2024",
				description: "Professional image editing and digital art creation software with AI-powered tools",
				price: 599.99,
				category: "design",
				icon: "design",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "ADB-PS-2024",
				status: "available",
				features: ["AI-powered editing", "Cloud sync", "Mobile app"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=Photoshop"
			},
			{
				id: 2,
				name: "Visual Studio Code Pro",
				description: "Advanced code editor with intelligent features and extensive extension marketplace",
				price: 199.99,
				category: "software",
				icon: "software",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "MS-VSC-PRO",
				status: "available",
				features: ["IntelliSense", "Git integration", "Live Share"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=VSCode"
			},
			{
				id: 4,
				name: "Microsoft Office 365",
				description: "Complete productivity suite with cloud integration and real-time collaboration",
				price: 149.99,
				category: "tools",
				icon: "tools",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "MS-OFF-365",
				status: "available",
				features: ["Word, Excel, PowerPoint", "OneDrive", "Teams"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=Office"
			},
			{
				id: 5,
				name: "Figma Design System",
				description: "Collaborative design platform for UI/UX professionals with prototyping tools",
				price: 299.99,
				category: "design",
				icon: "design",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "FIGMA-PRO",
				status: "available",
				features: ["Real-time collaboration", "Prototyping", "Design systems"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=Figma"
			},
			{
				id: 6,
				name: "MySQL Workbench Enterprise",
				description: "Advanced database design and administration tool with performance optimization",
				price: 129.99,
				category: "software",
				icon: "software",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "ORACLE-MYSQL-ENT",
				status: "available",
				features: ["Database modeling", "Performance tuning", "Migration tools"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=MySQL"
			},
			{
				id: 7,
				name: "Blender 3D Studio",
				description: "Free and open-source 3D creation suite for modeling, animation, and rendering",
				price: 0,
				category: "design",
				icon: "design",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "BLENDER-3D",
				status: "available",
				features: ["3D modeling", "Animation", "Rendering"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=Blender"
			},
			{
				id: 8,
				name: "Notion Premium",
				description: "All-in-one workspace for notes, docs, projects, and team collaboration",
				price: 99.99,
				category: "tools",
				icon: "tools",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "NOTION-PREMIUM",
				status: "available",
				features: ["Notes & docs", "Project management", "Team collaboration"],
				image: "https://via.placeholder.com/300x200/007aff/ffffff?text=Notion"
			},
			{
				id: 9,
				name: "PUBG Mobile",
				description: "Epic battle royale game with 100 players fighting for survival in intense combat",
				price: 0,
				category: "games",
				icon: "games",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "PUBG-MOBILE",
				status: "available",
				features: ["Battle Royale", "100 players", "Multiple maps", "Squad mode"],
				image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=PUBG+Mobile"
			},
			{
				id: 10,
				name: "Free Fire",
				description: "Fast-paced battle royale action with 50 players in 10-minute matches",
				price: 0,
				category: "games",
				icon: "games",
				rating: 0,
				ratingCount: 0,
				cartAdditions: 0,
				productCode: "FREE-FIRE",
				status: "available",
				features: ["10-minute matches", "50 players", "Character abilities", "Squad battles"],
				image: "https://via.placeholder.com/300x200/ff4757/ffffff?text=Free+Fire"
			}
		];
        
        localStorage.setItem('devo_products', JSON.stringify(this.products));
    }

    // Ensure PUBG Mobile and Free Fire exist under Games
    ensureBattleRoyaleGames() {
        try {
            const productsByCode = new Map(this.products.map(p => [p.productCode, p]));
            const required = [
                {
                    id: 9,
                    name: "PUBG Mobile",
                    description: "Epic battle royale game with 100 players fighting for survival in intense combat",
                    price: 0,
                    category: "games",
                    icon: "games",
                    rating: 0,
                    ratingCount: 0,
                    cartAdditions: 0,
                    productCode: "PUBG-MOBILE",
                    status: "available",
                    features: ["Battle Royale", "100 players", "Multiple maps", "Squad mode"],
                    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=PUBG+Mobile"
                },
                {
                    id: 10,
                    name: "Free Fire",
                    description: "Fast-paced battle royale action with 50 players in 10-minute matches",
                    price: 0,
                    category: "games",
                    icon: "games",
                    rating: 0,
                    ratingCount: 0,
                    cartAdditions: 0,
                    productCode: "FREE-FIRE",
                    status: "available",
                    features: ["10-minute matches", "50 players", "Character abilities", "Squad battles"],
                    image: "https://via.placeholder.com/300x200/ff4757/ffffff?text=Free+Fire"
                }
            ];

            let updated = false;
            for (const game of required) {
                if (!productsByCode.has(game.productCode)) {
                    this.products.push(game);
                    updated = true;
                }
            }

            if (updated) {
                localStorage.setItem('devo_products', JSON.stringify(this.products));
            }
        } catch (e) {
            console.warn('Failed ensuring games exist:', e);
        }
    }

    // Remove legacy Unity game from Games category if present in saved data
    removeUnityGame() {
        try {
            const beforeLength = this.products.length;
            this.products = this.products.filter(p => {
                const isUnity = p.productCode === 'UNITY-PRO-2024' || p.name === 'Unity Game Engine Pro';
                return !isUnity;
            });
            if (this.products.length !== beforeLength) {
                localStorage.setItem('devo_products', JSON.stringify(this.products));
            }
        } catch (e) {
            console.warn('Failed removing Unity game:', e);
        }
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === this.currentFilter);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}" onclick="devoStore.openProduct(${product.id})">
                <div class="product-icon">
                    <div class="icon-container ${product.category}">
                        ${this.getProductIcon(product.category)}
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        ${this.renderPrice(product.price)}
                    </div>
                    ${product.productCode === 'PUBG-MOBILE' || product.productCode === 'FREE-FIRE' 
                        ? `<button class=\"btn btn-primary\" onclick=\"event.stopPropagation(); devoStore.goToTopUp(${product.id})\">Top Up</button>`
                        : `<button class=\"btn btn-primary add-to-cart-btn\" onclick=\"event.stopPropagation(); devoStore.addToCart(${product.id})\">${this.getTranslation('products.addToCart')}</button>`}
                </div>
            </div>
        `).join('');

        // Animate product cards
        const productCards = productsGrid.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            setTimeout(() => {
                this.animateProductCard(card);
            }, index * 100);
        });
    }

    getProductIcon(category) {
        const icons = {
            'software': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
            'design': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
            'games': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><circle cx="8" cy="10" r="1"></circle><circle cx="16" cy="10" r="1"></circle><circle cx="12" cy="12" r="1"></circle></svg>',
            'tools': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>'
        };
        return icons[category] || icons['software'];
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star filled">★</span>';
        }
        if (hasHalfStar) {
            stars += '<span class="star half">★</span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star">☆</span>';
        }
        return stars;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        if (!this.isLoggedIn) {
            this.showNotification('Please log in to add items to cart', 'warning');
            return;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        product.cartAdditions += 1;
        localStorage.setItem('devo_products', JSON.stringify(this.products));

        this.saveCartToStorage();
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartTotal();
        this.renderProducts();
        
        this.showNotification(`${product.name} ${this.getTranslation('notification.addedToCart')}`, 'success');
        this.animateCartIcon();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartTotal();
        this.showNotification('Item removed from cart', 'info');
    }

    updateCartQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCartToStorage();
            this.updateCartCount();
            this.renderCartItems();
            this.updateCartTotal();
        }
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>${this.getTranslation('cart.empty')}</p>
                    <button class="btn btn-primary" onclick="devoStore.closeCart()">${this.getTranslation('cart.continue')}</button>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${this.renderPrice(item.price)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="devoStore.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="devoStore.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <p class="cart-item-subtotal">${this.getTranslation('cart.subtotal')}: ${this.renderPriceText(item.price * item.quantity)}</p>
                </div>
                <button class="remove-btn" onclick="devoStore.removeFromCart(${item.id})" aria-label="${this.getTranslation('cart.remove')}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `${this.getTranslation('cart.total')}: ${this.renderPriceText(total)}`;
        }
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('devo_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.warn('Error saving cart to storage:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('devo_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                this.updateCartCount();
                this.renderCartItems();
                this.updateCartTotal();
            }
        } catch (error) {
            console.warn('Error loading cart from storage:', error);
            localStorage.removeItem('devo_cart');
            this.cart = [];
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
            if (cartSidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    animateCartIcon() {
        const cartToggle = document.getElementById('cartToggle');
        if (cartToggle) {
            cartToggle.classList.add('bounce');
            setTimeout(() => {
                cartToggle.classList.remove('bounce');
            }, 300);
        }
    }

    // Enhanced animation methods
    animateElement(element, animationClass, duration = 300) {
        if (!element) return;
        
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }

    animateProductCard(card) {
        if (!card) return;
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    animateModal(modal, show = true) {
        if (!modal) return;
        
        if (show) {
            modal.style.display = 'flex';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.transition = 'all 0.3s ease';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
        } else {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    animateNotification(toast) {
        if (!toast) return;
        
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
    }

    animateButton(button) {
        if (!button) return;
        
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // Add error boundary for better error handling
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`An error occurred. Please try again.`, 'error');
    }

    // Add input validation
    validateInput(input, type = 'text') {
        if (!input || !input.trim()) return false;
        
        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(input.trim());
            case 'username':
                return input.trim().length >= 3;
            case 'password':
                return input.trim().length >= 6;
            default:
                return input.trim().length > 0;
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'warning');
            return;
        }
        this.showCheckoutModal();
    }

    showCheckoutModal() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content checkout-modal">
                <div class="modal-header">
                    <h2>Checkout</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="checkout-summary">
                        <h3>Order Summary</h3>
                        <div class="checkout-items">
                            ${this.cart.map(item => `
                                <div class=\"checkout-item\"> 
                                    <span>${item.name} × ${item.quantity}</span>
                                    <span>${this.renderPriceText(item.price * item.quantity)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="checkout-total">
                            <strong>Total: ${this.renderPriceText(total)}</strong>
                        </div>
                    </div>
                    
                    <div class="payment-methods">
                        <h3>Payment Methods</h3>
                        <div class="payment-options">
                            <div class="payment-option">
                                <input type="radio" id="vodafone" name="payment" value="vodafone">
                                <label for="vodafone">Vodafone Cash</label>
                            </div>
                            <div class="payment-option">
                                <input type="radio" id="orange" name="payment" value="orange">
                                <label for="orange">Orange Cash</label>
                            </div>
                            <div class="payment-option">
                                <input type="radio" id="etisalat" name="payment" value="etisalat">
                                <label for="etisalat">Etisalat Cash</label>
                            </div>
                            <div class="payment-option">
                                <input type="radio" id="visa" name="payment" value="visa">
                                <label for="visa">Visa Card</label>
                            </div>
                            <div class="payment-option">
                                <input type="radio" id="paypal" name="payment" value="paypal">
                                <label for="paypal">PayPal</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="checkout-form">
                        <h3>Contact Information</h3>
                        <div class="form-group">
                            <label for="checkout-email">Email</label>
                            <input type="email" id="checkout-email" required>
                        </div>
                        <div class="form-group">
                            <label for="checkout-phone">Phone</label>
                            <input type="tel" id="checkout-phone" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary" onclick="devoStore.processCheckout()">Complete Order</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.closeCart();
    }

    processCheckout() {
        this.showNotification('Order placed successfully! You will receive a confirmation email shortly.', 'success');
        
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartTotal();
        
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
    }

    showRatingModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content rating-modal">
                <div class="modal-header">
                    <h2>Rate ${product.name}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="rating-stars">
                        <span class="star" data-rating="1">☆</span>
                        <span class="star" data-rating="2">☆</span>
                        <span class="star" data-rating="3">☆</span>
                        <span class="star" data-rating="4">☆</span>
                        <span class="star" data-rating="5">☆</span>
                    </div>
                    <div class="rating-text">Select your rating</div>
                    <textarea placeholder="Write your review (optional)" class="review-text"></textarea>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary" onclick="devoStore.submitRating(${productId})">Submit Rating</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const stars = modal.querySelectorAll('.star');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                selectedRating = rating;
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.textContent = '★';
                        s.classList.add('filled');
                    } else {
                        s.textContent = '☆';
                        s.classList.remove('filled');
                    }
                });
                
                const ratingText = modal.querySelector('.rating-text');
                const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                ratingText.textContent = texts[rating] || 'Select your rating';
            });
        });
    }

    submitRating(productId) {
        if (!this.isLoggedIn) {
            this.showNotification('Please log in to rate products', 'warning');
            return;
        }

        const modal = document.querySelector('.modal-overlay');
        const stars = modal.querySelectorAll('.star.filled');
        const rating = stars.length;
        const reviewText = modal.querySelector('.review-text').value;

        if (rating === 0) {
            this.showNotification('Please select a rating', 'warning');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (product) {
            const newRatingCount = product.ratingCount + 1;
            const newAverageRating = ((product.rating * product.ratingCount) + rating) / newRatingCount;
            
            product.rating = Math.round(newAverageRating * 10) / 10;
            product.ratingCount = newRatingCount;
            
            try {
                localStorage.setItem('devo_products', JSON.stringify(this.products));
                this.renderProducts();
                this.showNotification('Rating submitted successfully!', 'success');
            } catch (error) {
                console.warn('Error saving rating:', error);
                this.showNotification('Error saving rating. Please try again.', 'error');
            }
        }
        
        modal.remove();
    }

    filterProducts(filter) {
        this.currentFilter = filter;
        this.renderProducts();
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }

        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="search-no-results">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>${this.getTranslation('products.noResults')}</h3>
                    <p>${this.getTranslation('products.tryAdjusting')}</p>
                </div>
            `;
        } else {
            productsGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card" data-product-id="${product.id}" onclick="devoStore.openProduct(${product.id})">
                    <div class="product-icon">
                        <div class="icon-container ${product.category}">
                            ${this.getProductIcon(product.category)}
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">
                            ${this.renderPrice(product.price)}
                        </div>
                        ${product.productCode === 'PUBG-MOBILE' || product.productCode === 'FREE-FIRE' 
                            ? `<button class=\"btn btn-primary\" onclick=\"event.stopPropagation(); devoStore.goToTopUp(${product.id})\">Top Up</button>`
                            : `<button class=\"btn btn-primary add-to-cart-btn\" onclick=\"event.stopPropagation(); devoStore.addToCart(${product.id})\">${this.getTranslation('products.addToCart')}</button>`}
                    </div>
                </div>
            `).join('');
        }
    }

    goToTopUp(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        const params = new URLSearchParams({ game: product.productCode });
        window.location.href = `topup.html?${params.toString()}`;
    }

    loadUserFromStorage() {
        try {
            const savedUser = localStorage.getItem('devo_user');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
                this.isLoggedIn = true;
            }
        } catch (error) {
            console.warn('Error loading user from storage:', error);
            localStorage.removeItem('devo_user');
        }
    }

    saveUserToStorage() {
        try {
            if (this.user) {
                localStorage.setItem('devo_user', JSON.stringify(this.user));
            }
        } catch (error) {
            console.warn('Error saving user to storage:', error);
        }
    }

    updateAuthUI() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        const existingAuth = navActions.querySelector('.auth-buttons');
        if (existingAuth) existingAuth.remove();

        const authButtons = document.createElement('div');
        authButtons.className = 'auth-buttons';

        if (this.isLoggedIn) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-secondary profile-btn" onclick="devoStore.showProfileModal()">
                        <img src="${this.user.avatar || 'https://via.placeholder.com/32x32/007aff/ffffff?text=U'}" alt="Profile" class="user-avatar">
                        <span>${this.user.displayName}</span>
                    </button>
                    <button class="btn btn-secondary logout-btn" onclick="devoStore.logout()">Logout</button>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn btn-primary login-btn" onclick="devoStore.showLoginModal()">Login</button>
                <button class="btn btn-secondary register-btn" onclick="devoStore.showRegisterModal()">Register</button>
            `;
        }

        navActions.appendChild(authButtons);
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content auth-modal">
                <div class="modal-header">
                    <h2>Login</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="auth-options">
                        <button class="btn btn-google" onclick="devoStore.loginWithGoogle()">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        <div class="auth-divider">
                            <span>or</span>
                        </div>
                    </div>
                    <form id="loginForm" onsubmit="devoStore.handleLogin(event)">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    showRegisterModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content auth-modal">
                <div class="modal-header">
                    <h2>Register</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="auth-options">
                        <button class="btn btn-google" onclick="devoStore.loginWithGoogle()">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        <div class="auth-divider">
                            <span>or</span>
                        </div>
                    </div>
                    <form id="registerForm" onsubmit="devoStore.handleRegister(event)">
                        <div class="form-group">
                            <label for="register-displayName">Display Name</label>
                            <input type="text" id="register-displayName" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">Email</label>
                            <input type="email" id="register-email" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Password</label>
                            <input type="password" id="register-password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    login(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!this.validateInput(username, 'username')) {
            this.showNotification('Username must be at least 3 characters long', 'error');
            return;
        }

        if (!this.validateInput(password, 'password')) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            this.user = { username, email: username + '@example.com' };
            this.isLoggedIn = true;
            this.saveUserToStorage();
            this.updateAuthUI();
            
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
            
            this.showNotification('Login successful!', 'success');
        } catch (error) {
            this.handleError(error, 'login');
        }
    }

    register(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (!this.validateInput(username, 'username')) {
            this.showNotification('Username must be at least 3 characters long', 'error');
            return;
        }

        if (!this.validateInput(email, 'email')) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!this.validateInput(password, 'password')) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            this.user = { username, email };
            this.isLoggedIn = true;
            this.saveUserToStorage();
            this.updateAuthUI();
            
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
            
            this.showNotification('Registration successful!', 'success');
        } catch (error) {
            this.handleError(error, 'register');
        }
    }

    logout() {
        this.user = null;
        this.isLoggedIn = false;
        localStorage.removeItem('devo_user');
        this.updateAuthUI();
        this.showNotification('Logged out successfully', 'info');
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.updateThemeUI();
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    updateThemeUI() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            
            if (this.theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    }

    changeLanguage(lang) {
        this.language = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage();
        this.promptCurrencySelection();
        this.updateLanguageUI();
    }

    applyLanguage() {
        document.documentElement.setAttribute('data-lang', this.language);
        this.translatePage();
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getTranslation(key) {
        const currentTranslations = this.translations[this.language];
        return currentTranslations ? currentTranslations[key] : this.translations.en[key] || key;
    }

    updateLanguageUI() {
        const currentLanguage = document.getElementById('currentLanguage');
        if (currentLanguage) {
            currentLanguage.textContent = this.language.toUpperCase();
        }
    }

    updateCurrencyUI() {
        // Could add a small badge in navbar in future
    }

    renderPrice(amount) {
        if (amount === 0) {
            return `<span class="price-free">${this.getTranslation('products.free')}</span>`;
        }
        const symbol = this.currencySymbols[this.currency] || '$';
        const rate = this.currencyRates[this.currency] || 1;
        const converted = amount * rate;
        return `<span class="price-amount">${symbol}${converted.toFixed(2)}</span>`;
    }

    renderPriceText(amount) {
        if (amount === 0) return this.getTranslation('products.free');
        const symbol = this.currencySymbols[this.currency] || '$';
        const rate = this.currencyRates[this.currency] || 1;
        const converted = amount * rate;
        return `${symbol}${converted.toFixed(2)}`;
    }

    promptCurrencySelection() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.getTranslation('currency.select')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <select id="currencySelect">
                            <option value="USD">${this.getTranslation('currency.usd')}</option>
                            <option value="EUR">${this.getTranslation('currency.eur')}</option>
                            <option value="EGP">${this.getTranslation('currency.egp')}</option>
                            <option value="GBP">${this.getTranslation('currency.gbp')}</option>
                            <option value="SAR">${this.getTranslation('currency.sar')}</option>
                            <option value="AED">${this.getTranslation('currency.aed')}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                    <button class="btn btn-primary" id="currencySaveBtn">Save</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const currencySelect = modal.querySelector('#currencySelect');
        currencySelect.value = this.currency;
        modal.querySelector('#currencySaveBtn').addEventListener('click', async () => {
            const selected = currencySelect.value;
            this.setCurrency(selected);
            modal.remove();
        });
    }

    async setCurrency(code) {
        this.currency = code;
        localStorage.setItem('currency', code);
        this.renderProducts();
        this.renderCartItems();
        this.updateCartTotal();
        if (this.isLoggedIn) {
            try { await this.updateProfile({ currency: code }); } catch {}
        }
    }

    getTranslations() {
        return {
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.categories': 'Categories',
                'nav.products': 'Products',
                'nav.contact': 'Contact',
                
                // Cart
                'cart.title': 'Shopping Cart',
                'cart.empty': 'Your cart is empty',
                'cart.continue': 'Continue Shopping',
                'cart.checkout': 'Checkout',
                'cart.total': 'Total',
                'cart.subtotal': 'Subtotal',
                'cart.remove': 'Remove',
                
                // Products
                'products.addToCart': 'Add to Cart',
                'products.search': 'Search products...',
                'products.noResults': 'No products found',
                'products.tryAdjusting': 'Try adjusting your search terms',
                'products.free': 'Free',
                'currency.select': 'Select your currency',
                'currency.usd': 'US Dollar (USD)',
                'currency.eur': 'Euro (EUR)',
                'currency.egp': 'Egyptian Pound (EGP)',
                'currency.gbp': 'British Pound (GBP)',
                'currency.sar': 'Saudi Riyal (SAR)',
                'currency.aed': 'UAE Dirham (AED)',
                
                // Categories
                'category.all': 'All',
                'category.software': 'Software',
                'category.design': 'Design',
                'category.games': 'Games',
                'category.tools': 'Tools',
                
                // Auth
                'auth.login': 'Login',
                'auth.register': 'Register',
                'auth.logout': 'Logout',
                'auth.email': 'Email',
                'auth.password': 'Password',
                'auth.displayName': 'Display Name',
                'auth.loginSuccess': 'Login successful!',
                'auth.registerSuccess': 'Registration successful!',
                'auth.logoutSuccess': 'Logged out successfully',
                'auth.loginRequired': 'Please log in to add items to cart',
                'auth.loginToRate': 'Please log in to rate products',
                
                // Profile
                'profile.title': 'My Profile',
                'profile.update': 'Update Profile',
                'profile.bio': 'Bio',
                'profile.avatar': 'Change Avatar',
                'profile.stats': 'Account Statistics',
                'profile.totalPurchases': 'Total Purchases',
                'profile.totalSpent': 'Total Spent',
                
                // Checkout
                'checkout.title': 'Checkout',
                'checkout.orderSummary': 'Order Summary',
                'checkout.paymentMethods': 'Payment Methods',
                'checkout.contactInfo': 'Contact Information',
                'checkout.phone': 'Phone',
                'checkout.completeOrder': 'Complete Order',
                'checkout.cancel': 'Cancel',
                'checkout.orderSuccess': 'Order placed successfully! You will receive a confirmation email shortly.',
                
                // Notifications
                'notification.addedToCart': 'added to cart',
                'notification.itemRemoved': 'Item removed from cart',
                'notification.ratingSubmitted': 'Rating submitted successfully!',
                'notification.profileUpdated': 'Profile updated successfully',
                'notification.avatarUpdated': 'Avatar updated successfully!',
                'notification.selectRating': 'Please select a rating',
                'notification.cartEmpty': 'Your cart is empty',
                
                // Footer
                'footer.copyright': '© 2025 Devo Store. All rights reserved.',
                'footer.quickLinks': 'Quick Links',
                'footer.categories': 'Categories',
                'footer.support': 'Support',
                'footer.contact': 'Contact',
                'footer.about': 'About',
                'footer.privacy': 'Privacy Policy',
                'footer.terms': 'Terms of Service'
            },
            ar: {
                // Navigation
                'nav.home': 'الرئيسية',
                'nav.categories': 'الفئات',
                'nav.products': 'المنتجات',
                'nav.contact': 'اتصل بنا',
                
                // Cart
                'cart.title': 'سلة التسوق',
                'cart.empty': 'سلة التسوق فارغة',
                'cart.continue': 'استمر في التسوق',
                'cart.checkout': 'إتمام الطلب',
                'cart.total': 'المجموع',
                'cart.subtotal': 'المجموع الفرعي',
                'cart.remove': 'إزالة',
                
                // Products
                'products.addToCart': 'أضف إلى السلة',
                'products.search': 'البحث في المنتجات...',
                'products.noResults': 'لم يتم العثور على منتجات',
                'products.tryAdjusting': 'حاول تعديل مصطلحات البحث',
                'products.free': 'مجاني',
                'currency.select': 'اختر عملتك',
                'currency.usd': 'الدولار الأمريكي (USD)',
                'currency.eur': 'اليورو (EUR)',
                'currency.egp': 'الجنيه المصري (EGP)',
                'currency.gbp': 'الجنيه الإسترليني (GBP)',
                'currency.sar': 'الريال السعودي (SAR)',
                'currency.aed': 'الدرهم الإماراتي (AED)',
                
                // Categories
                'category.all': 'الكل',
                'category.software': 'البرمجيات',
                'category.design': 'التصميم',
                'category.games': 'الألعاب',
                'category.tools': 'الأدوات',
                
                // Auth
                'auth.login': 'تسجيل الدخول',
                'auth.register': 'التسجيل',
                'auth.logout': 'تسجيل الخروج',
                'auth.email': 'البريد الإلكتروني',
                'auth.password': 'كلمة المرور',
                'auth.displayName': 'اسم العرض',
                'auth.loginSuccess': 'تم تسجيل الدخول بنجاح!',
                'auth.registerSuccess': 'تم التسجيل بنجاح!',
                'auth.logoutSuccess': 'تم تسجيل الخروج بنجاح',
                'auth.loginRequired': 'يرجى تسجيل الدخول لإضافة العناصر إلى السلة',
                'auth.loginToRate': 'يرجى تسجيل الدخول لتقييم المنتجات',
                
                // Profile
                'profile.title': 'ملفي الشخصي',
                'profile.update': 'تحديث الملف الشخصي',
                'profile.bio': 'السيرة الذاتية',
                'profile.avatar': 'تغيير الصورة الشخصية',
                'profile.stats': 'إحصائيات الحساب',
                'profile.totalPurchases': 'إجمالي المشتريات',
                'profile.totalSpent': 'إجمالي الإنفاق',
                
                // Checkout
                'checkout.title': 'إتمام الطلب',
                'checkout.orderSummary': 'ملخص الطلب',
                'checkout.paymentMethods': 'طرق الدفع',
                'checkout.contactInfo': 'معلومات الاتصال',
                'checkout.phone': 'الهاتف',
                'checkout.completeOrder': 'إتمام الطلب',
                'checkout.cancel': 'إلغاء',
                'checkout.orderSuccess': 'تم تقديم الطلب بنجاح! ستتلقى رسالة تأكيد بالبريد الإلكتروني قريباً.',
                
                // Notifications
                'notification.addedToCart': 'تمت الإضافة إلى السلة',
                'notification.itemRemoved': 'تم إزالة العنصر من السلة',
                'notification.ratingSubmitted': 'تم تقديم التقييم بنجاح!',
                'notification.profileUpdated': 'تم تحديث الملف الشخصي بنجاح',
                'notification.avatarUpdated': 'تم تحديث الصورة الشخصية بنجاح!',
                'notification.selectRating': 'يرجى اختيار تقييم',
                'notification.cartEmpty': 'سلة التسوق فارغة',
                
                // Footer
                'footer.copyright': '© 2025 متجر ديفو. جميع الحقوق محفوظة.',
                'footer.quickLinks': 'روابط سريعة',
                'footer.categories': 'الفئات',
                'footer.support': 'الدعم',
                'footer.contact': 'اتصل بنا',
                'footer.about': 'حول',
                'footer.privacy': 'سياسة الخصوصية',
                'footer.terms': 'شروط الخدمة'
            },
            de: {
                'nav.home': 'Startseite',
                'nav.categories': 'Kategorien',
                'nav.products': 'Produkte',
                'nav.contact': 'Kontakt',
                'cart.title': 'Warenkorb',
                'products.addToCart': 'In den Warenkorb',
                'auth.login': 'Anmelden',
                'auth.register': 'Registrieren'
            },
            fr: {
                'nav.home': 'Accueil',
                'nav.categories': 'Catégories',
                'nav.products': 'Produits',
                'nav.contact': 'Contact',
                'cart.title': 'Panier',
                'products.addToCart': 'Ajouter au panier',
                'auth.login': 'Connexion',
                'auth.register': 'S\'inscrire'
            },
            ja: {
                'nav.home': 'ホーム',
                'nav.categories': 'カテゴリー',
                'nav.products': '商品',
                'nav.contact': 'お問い合わせ',
                'cart.title': 'ショッピングカート',
                'products.addToCart': 'カートに追加',
                'auth.login': 'ログイン',
                'auth.register': '登録'
            },
            zh: {
                'nav.home': '首页',
                'nav.categories': '分类',
                'nav.products': '产品',
                'nav.contact': '联系我们',
                'cart.title': '购物车',
                'products.addToCart': '添加到购物车',
                'auth.login': '登录',
                'auth.register': '注册'
            }
        };
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateActiveNavigation() {
        const sections = ['home', 'categories', 'products', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                // Handle responsive adjustments
                this.updateActiveNavigation();
            }, 250);
        });
    }

    // Add performance monitoring
    logPerformance(label, startTime) {
        const endTime = performance.now();
        console.log(`${label}: ${(endTime - startTime).toFixed(2)}ms`);
    }

    // Add lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }

    showNotification(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        toastContainer.appendChild(toast);
        this.animateNotification(toast);

        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.transition = 'all 0.3s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // API Helper Methods
    async apiRequest(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Authentication Methods
    async checkAuthStatus() {
        if (!this.token) {
            this.user = null;
            this.isLoggedIn = false;
            return;
        }

        try {
            const response = await this.apiRequest('/auth/me');
            this.user = response.data.user;
            this.isLoggedIn = true;
            this.updateAuthUI();
        } catch (error) {
            // Token is invalid, clear it
            this.logout();
        }
    }

    async loginWithGoogle() {
        try {
            // Redirect to Google OAuth
            window.location.href = `${this.apiBaseUrl}/auth/google`;
        } catch (error) {
            this.showNotification('Google login failed', 'error');
        }
    }

    async login(email, password) {
        try {
            const response = await this.apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            this.token = response.data.token;
            this.user = response.data.user;
            this.isLoggedIn = true;
            
            localStorage.setItem('auth_token', this.token);
            this.updateAuthUI();
            
            this.showNotification('Login successful!', 'success');
            return true;
        } catch (error) {
            this.showNotification(error.message || 'Login failed', 'error');
            return false;
        }
    }

    async register(displayName, email, password) {
        try {
            const response = await this.apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ displayName, email, password }),
            });

            this.token = response.data.token;
            this.user = response.data.user;
            this.isLoggedIn = true;
            
            localStorage.setItem('auth_token', this.token);
            this.updateAuthUI();
            
            this.showNotification('Registration successful!', 'success');
            return true;
        } catch (error) {
            this.showNotification(error.message || 'Registration failed', 'error');
            return false;
        }
    }

    async logout() {
        try {
            if (this.token) {
                await this.apiRequest('/auth/logout', { method: 'POST' });
            }
        } catch (error) {
            console.error('Logout error:', error);
        }

        this.token = null;
        this.user = null;
        this.isLoggedIn = false;
        localStorage.removeItem('auth_token');
        this.updateAuthUI();
        
        this.showNotification('Logged out successfully', 'info');
    }

    // Profile Methods
    async updateProfile(profileData) {
        try {
            const response = await this.apiRequest('/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData),
            });

            this.user = response.data.user;
            this.updateAuthUI();
            this.showNotification('Profile updated successfully', 'success');
            return true;
        } catch (error) {
            this.showNotification(error.message || 'Failed to update profile', 'error');
            return false;
        }
    }

    async getPurchaseHistory(page = 1) {
        try {
            const response = await this.apiRequest(`/profile/purchases?page=${page}`);
            return response.data;
        } catch (error) {
            this.showNotification('Failed to load purchase history', 'error');
            return null;
        }
    }

    // Order Methods
    async createOrder(orderData) {
        try {
            const response = await this.apiRequest('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            this.showNotification('Order created successfully!', 'success');
            return response.data.order;
        } catch (error) {
            this.showNotification(error.message || 'Failed to create order', 'error');
            return null;
        }
    }

    async getOrders(page = 1) {
        try {
            const response = await this.apiRequest(`/orders?page=${page}`);
            return response.data;
        } catch (error) {
            this.showNotification('Failed to load orders', 'error');
            return null;
        }
    }

    // Product Methods
    async loadProductsFromAPI() {
        try {
            const response = await this.apiRequest('/products');
            this.products = response.data.products;
            this.renderProducts();
        } catch (error) {
            console.error('Failed to load products from API:', error);
            // Fallback to local products
            this.loadDefaultProducts();
        }
    }

    async rateProduct(productId, rating, review = '') {
        try {
            const response = await this.apiRequest(`/products/${productId}/rate`, {
                method: 'POST',
                body: JSON.stringify({ rating, review }),
            });

            this.showNotification('Rating submitted successfully!', 'success');
            return response.data;
        } catch (error) {
            this.showNotification(error.message || 'Failed to submit rating', 'error');
            return null;
        }
    }

    // Form Handlers
    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const success = await this.login(email, password);
        if (success) {
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const displayName = document.getElementById('register-displayName').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const success = await this.register(displayName, email, password);
        if (success) {
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        }
    }

    // Profile Modal
    showProfileModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content profile-modal">
                <div class="modal-header">
                    <h2>My Profile</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="profile-info">
                        <div class="profile-avatar">
                            <img src="${this.user.avatar || 'https://via.placeholder.com/100x100/007aff/ffffff?text=U'}" alt="Profile Avatar">
                            <button class="btn btn-secondary btn-sm" onclick="devoStore.uploadAvatar()">Change Avatar</button>
                        </div>
                        <div class="profile-details">
                            <form id="profileForm" onsubmit="devoStore.handleProfileUpdate(event)">
                                <div class="form-group">
                                    <label for="profile-displayName">Display Name</label>
                                    <input type="text" id="profile-displayName" value="${this.user.displayName}" required>
                                </div>
                                <div class="form-group">
                                    <label for="profile-bio">Bio</label>
                                    <textarea id="profile-bio" rows="3">${this.user.bio || ''}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="profile-email">Email</label>
                                    <input type="email" id="profile-email" value="${this.user.email}" disabled>
                                    <small>Email cannot be changed</small>
                                </div>
                                <button type="submit" class="btn btn-primary">Update Profile</button>
                            </form>
                        </div>
                    </div>
                    <div class="profile-stats">
                        <h3>Account Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-value">${this.user.stats?.totalPurchases || 0}</span>
                                <span class="stat-label">Total Purchases</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">$${this.user.stats?.totalSpent?.toFixed(2) || '0.00'}</span>
                                <span class="stat-label">Total Spent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    async handleProfileUpdate(event) {
        event.preventDefault();
        const displayName = document.getElementById('profile-displayName').value;
        const bio = document.getElementById('profile-bio').value;

        const success = await this.updateProfile({ displayName, bio });
        if (success) {
            const modal = document.querySelector('.modal-overlay');
            if (modal) modal.remove();
        }
    }

    async uploadAvatar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('avatar', file);

                try {
                    const response = await fetch(`${this.apiBaseUrl}/profile/avatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                        },
                        body: formData,
                    });

                    const data = await response.json();
                    if (data.success) {
                        this.user = data.data.user;
                        this.updateAuthUI();
                        this.showNotification('Avatar updated successfully!', 'success');
                        // Refresh the profile modal
                        const modal = document.querySelector('.modal-overlay');
                        if (modal) {
                            modal.remove();
                            this.showProfileModal();
                        }
                    } else {
                        this.showNotification(data.error || 'Failed to upload avatar', 'error');
                    }
                } catch (error) {
                    this.showNotification('Failed to upload avatar', 'error');
                }
            }
        };
        input.click();
    }
}

// Initialize the store when DOM is loaded
let devoStore;
document.addEventListener('DOMContentLoaded', () => {
    devoStore = new DevoStore();
    try {
        document.dispatchEvent(new Event('devoStoreReady'));
    } catch (e) {
        // no-op
    }
});
