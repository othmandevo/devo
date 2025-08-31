// Devo Store - Clean & Simple JavaScript
class DevoStore {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentFilter = 'all';
        this.theme = localStorage.getItem('theme') || 'light';
        this.language = localStorage.getItem('language') || 'en';
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.applyTheme();
        this.applyLanguage();
        this.updateLanguageUI();
        this.updateCartCount();
        this.setupSmoothScrolling();
        this.loadCartFromStorage();
        this.updateActiveNavigation(); // Set initial active navigation
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
        document.addEventListener('click', (e) => {
            if (cartSidebar && !cartSidebar.contains(e.target) && 
                !cartToggle.contains(e.target) && cartSidebar.classList.contains('open')) {
                this.closeCart();
            }
        });

        // Mobile menu
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('open');
                mobileMenuToggle.classList.toggle('active');
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Product filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterProducts(filter);
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Language dropdown functionality
        const languageToggle = document.getElementById('languageToggle');
        const languageDropdown = document.getElementById('languageDropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('open');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageDropdown.contains(e.target)) {
                    languageDropdown.classList.remove('open');
                }
            });

            // Language option selection
            languageOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.changeLanguage(lang);
                    languageDropdown.classList.remove('open');
                });
            });
        }

                            // Telegram contact functionality
                    const telegramContact = document.querySelector('.contact-item:has(.telegram-icon)');
                    if (telegramContact) {
                        telegramContact.addEventListener('click', () => this.handleTelegramContact());
                    }

        // Footer filter links
        const footerFilterLinks = document.querySelectorAll('.footer-section a[data-filter]');
        footerFilterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = link.dataset.filter;
                this.filterProducts(filter);
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                const activeFilterBtn = document.querySelector(`[data-filter="${filter}"]`);
                if (activeFilterBtn) {
                    activeFilterBtn.classList.add('active');
                }
                
                // Scroll to products section
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterProducts(category);
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                const activeFilterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (activeFilterBtn) {
                    activeFilterBtn.classList.add('active');
                }
                
                // Scroll to products section
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Hero cards
        const heroCards = document.querySelectorAll('.hero-card');
        heroCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterProducts(category);
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                const activeFilterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (activeFilterBtn) {
                    activeFilterBtn.classList.add('active');
                }
                
                // Scroll to products section
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Scroll-based navigation highlighting
        window.addEventListener('scroll', () => this.updateActiveNavigation());
    }

    loadProducts() {
        // Enhanced product data with better UX
        this.products = [
            {
                id: 1,
                name: "Adobe Photoshop CC 2024",
                description: "Professional image editing and digital art creation software with AI-powered tools",
                price: 599.99,
                category: "design",
                icon: "design",
                rating: 4.9,
                downloads: 15420,
                productCode: "ADB-PS-2024",
                status: "available",
                features: ["AI-powered editing", "Cloud sync", "Mobile app"]
            },
            {
                id: 2,
                name: "Visual Studio Code Pro",
                description: "Advanced code editor with intelligent features and extensive extension marketplace",
                price: 199.99,
                category: "software",
                icon: "software",
                rating: 4.8,
                downloads: 23450,
                productCode: "MS-VSC-PRO",
                status: "available",
                features: ["IntelliSense", "Git integration", "Live Share"]
            },
            {
                id: 3,
                name: "Unity Game Engine Pro",
                description: "Complete game development platform for 2D and 3D games with advanced rendering",
                price: 399.99,
                category: "games",
                icon: "games",
                rating: 4.7,
                downloads: 8920,
                productCode: "UNITY-PRO-2024",
                status: "available",
                features: ["2D/3D support", "Asset Store", "Cloud Build"]
            },
            {
                id: 4,
                name: "Microsoft Office 365",
                description: "Complete productivity suite with cloud integration and real-time collaboration",
                price: 149.99,
                category: "tools",
                icon: "tools",
                rating: 4.6,
                downloads: 18750,
                productCode: "MS-OFF-365",
                status: "available",
                features: ["Word, Excel, PowerPoint", "OneDrive", "Teams"]
            },
            {
                id: 5,
                name: "Figma Design System",
                description: "Collaborative design platform for UI/UX professionals with prototyping tools",
                price: 299.99,
                category: "design",
                icon: "design",
                rating: 4.8,
                downloads: 12340,
                productCode: "FIGMA-PRO",
                status: "available",
                features: ["Real-time collaboration", "Prototyping", "Design systems"]
            },
            {
                id: 6,
                name: "MySQL Workbench Enterprise",
                description: "Advanced database design and administration tool with performance optimization",
                price: 129.99,
                category: "software",
                icon: "software",
                rating: 4.5,
                downloads: 5670,
                productCode: "ORACLE-MYSQL-ENT",
                status: "available",
                features: ["Database modeling", "Performance tuning", "Migration tools"]
            },
            {
                id: 7,
                name: "Cyberpunk 2077",
                description: "Open-world action RPG with stunning graphics and immersive storytelling",
                price: 59.99,
                category: "games",
                icon: "games",
                rating: 4.7,
                downloads: 45600,
                productCode: "CDPR-CP2077",
                status: "available",
                features: ["Ray tracing", "Open world", "Multiple endings"]
            },
            {
                id: 8,
                name: "CCleaner Professional",
                description: "System optimization and privacy protection software with advanced cleaning",
                price: 49.99,
                category: "tools",
                icon: "tools",
                rating: 4.4,
                downloads: 9870,
                productCode: "PIRIFORM-CC-PRO",
                status: "available",
                features: ["System cleaning", "Privacy protection", "Registry optimization"]
            },
            {
                id: 9,
                name: "Sketch App Pro",
                description: "Professional vector graphics and UI design tool for macOS",
                price: 249.99,
                category: "design",
                icon: "design",
                rating: 4.9,
                downloads: 7890,
                productCode: "SKETCH-PRO-2024",
                status: "available",
                features: ["Vector editing", "Symbols", "Export options"]
            },
            {
                id: 10,
                name: "Blender 3D Studio",
                description: "Free and open-source 3D creation suite for modeling and animation",
                price: 0.00,
                category: "software",
                icon: "software",
                rating: 4.6,
                downloads: 32100,
                productCode: "BLENDER-FREE",
                status: "available",
                features: ["3D modeling", "Animation", "Rendering"]
            },
            {
                id: 11,
                name: "The Witcher 3: Wild Hunt",
                description: "Award-winning RPG with massive open world and compelling story",
                price: 39.99,
                category: "games",
                icon: "games",
                rating: 4.9,
                downloads: 67800,
                productCode: "CDPR-WITCHER3",
                status: "available",
                features: ["Open world", "Multiple quests", "Enhanced graphics"]
            },
            {
                id: 12,
                name: "Notion Premium",
                description: "All-in-one workspace for notes, docs, and project management",
                price: 99.99,
                category: "tools",
                icon: "tools",
                rating: 4.7,
                downloads: 15600,
                productCode: "NOTION-PREMIUM",
                status: "available",
                features: ["Note taking", "Database", "Collaboration"]
            }
        ];

        this.renderProducts();
    }

    renderProducts(filter = 'all') {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = filter === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === filter);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}" onclick="store.showProductDetail(${product.id})">
                <div class="product-image">
                    ${this.getProductIcon(product.icon)}
                    ${product.status === 'available' ? '<div class="product-status available">Available</div>' : 
                      product.status === 'out-of-stock' ? '<div class="product-status out-of-stock">Out of Stock</div>' : 
                      '<div class="product-status coming-soon">Coming Soon</div>'}
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <span class="product-code">${product.productCode}</span>
                        <div class="product-stats">
                            <span class="product-rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0">
                                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                                </svg>
                                ${product.rating}
                            </span>
                            <span class="product-downloads">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7,10 12,15 17,10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                ${this.formatNumber(product.downloads)}
                            </span>
                        </div>
                    </div>
                    <div class="product-price">
                        ${product.price === 0 ? '<span class="free-tag">FREE</span>' : `$${product.price.toFixed(2)}`}
                    </div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); store.addToCart(${product.id})">
                        ${this.translations[this.language]?.addToCart || 'Add to Cart'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterProducts(category) {
        this.currentFilter = category;
        this.renderProducts(category);
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.updateCart();
        this.showToast(this.translations[this.language]?.productAddedToCart || 'Product added to cart!', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
        this.showToast(this.translations[this.language]?.productRemovedFromCart || 'Product removed from cart!', 'warning');
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.updateCart();
            }
        }
    }

    updateCart() {
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartTotal();
        this.saveCartToStorage();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.cart.length === 0) {
            const t = this.translations[this.language];
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <p>${t?.cartEmpty || 'Your cart is empty'}</p>
                    <p>${t?.cartEmptyDesc || 'Add some products to get started!'}</p>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${this.getProductIcon(item.icon || item.category)}
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="store.removeFromCart(${item.id})">${this.translations[this.language]?.remove || 'Remove'}</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const mainContent = document.querySelector('.main-content');
        if (cartSidebar) {
            const isOpen = cartSidebar.classList.contains('open');
            if (isOpen) {
                cartSidebar.classList.remove('open');
                mainContent.classList.remove('cart-open');
            } else {
                cartSidebar.classList.add('open');
                mainContent.classList.add('cart-open');
            }
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const mainContent = document.querySelector('.main-content');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
            mainContent.classList.remove('cart-open');
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showToast(this.translations[this.language]?.cartEmptyWarning || 'Your cart is empty!', 'warning');
            return;
        }

        this.showLoading();
        
        // Simulate checkout process
        setTimeout(() => {
            this.hideLoading();
            this.showToast(this.translations[this.language]?.orderPlacedSuccess || 'Order placed successfully! Thank you for your purchase.', 'success');
            this.cart = [];
            this.updateCart();
            this.closeCart();
        }, 2000);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    async handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            this.showToast('Please fill in all fields!', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showToast('Please enter a valid email address!', 'error');
            return;
        }

        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        this.showLoading();

        try {
            // Use Formspree to send the email
            const response = await fetch('https://formspree.io/f/xpzgwqzg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Contact Form Message from ${name}`,
                    _replyto: email
                })
            });

            if (response.ok) {
                this.showToast('Message sent successfully! We will get back to you soon.', 'success');
                e.target.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showToast('Failed to send message. Please try again or contact us directly via email/WhatsApp.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.hideLoading();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleTelegramContact() {
        const channelUrl = 'https://t.me/devo_mart';
        
        // Check if user is on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, try to open Telegram app
            window.open(channelUrl, '_blank');
        } else {
            // On desktop, show a helpful message and open channel
            this.showToast(this.translations[this.language]?.openingTelegram || 'Opening Devo Store Telegram channel...', 'info');
            setTimeout(() => {
                window.open(channelUrl, '_blank');
            }, 1000);
        }
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('show');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; margin-left: auto;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 5000);
    }

    getProductIcon(iconType) {
        const icons = {
            software: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>`,
            design: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
            </svg>`,
            games: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="14" y1="10" x2="14" y2="14"></line>
                <line x1="16" y1="12" x2="18" y2="12"></line>
            </svg>`,
            tools: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>`
        };
        return icons[iconType] || icons.software;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('devoStoreCart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('devoStoreCart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                this.updateCart();
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            this.cart = [];
        }
    }

    updateActiveNavigation() {
        const sections = ['home', 'categories', 'products', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        let activeSection = 'home';

        // Find which section is currently in view
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = sectionId;
                }
            }
        });

        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Language System
    getTranslations() {
        return {
            en: {
                // Navigation
                home: 'Home',
                categories: 'Categories',
                products: 'Products',
                contact: 'Contact',
                
                // Hero Section
                heroTitle: 'Welcome to Your Digital Marketplace',
                heroDescription: 'Discover premium software, design tools, games, and digital solutions for every need. Quality products, instant delivery, and exceptional support.',
                browseCategories: 'Browse Categories',
                viewAllProducts: 'View All Products',
                
                // Categories
                featuredCategories: 'Featured Categories',
                categoriesSubtitle: 'Discover our most popular product categories',
                software: 'Software',
                design: 'Design',
                games: 'Games',
                tools: 'Tools',
                softwareDesc: 'Professional applications and utilities',
                designDesc: 'Creative tools and design resources',
                gamesDesc: 'Entertainment and gaming experiences',
                toolsDesc: 'Productivity and utility applications',
                productsCount: 'products',
                
                // Products
                allProducts: 'All Products',
                productsSubtitle: 'Browse our complete collection of digital products',
                addToCart: 'Add to Cart',
                price: 'Price',
                all: 'All',
                
                // Cart
                shoppingCart: 'Shopping Cart',
                total: 'Total',
                checkout: 'Checkout',
                cartEmpty: 'Your cart is empty',
                cartEmptyDesc: 'Add some products to get started',
                remove: 'Remove',
                
                // Contact
                contactUs: 'Contact Us',
                contactSubtitle: 'Get in touch with our support team',
                telegram: 'Telegram',
                
                // Footer
                devoStore: 'Devo Store',
                footerDesc: 'Your trusted digital marketplace for quality software, design tools, games, and utilities.',
                quickLinks: 'Quick Links',
                support: 'Support',
                helpCenter: 'Help Center',
                termsOfService: 'Terms of Service',
                privacyPolicy: 'Privacy Policy',
                allRightsReserved: 'All rights reserved.',

                // Toast Messages
                productAddedToCart: 'Product added to cart!',
                productRemovedFromCart: 'Product removed from cart!',
                cartEmptyWarning: 'Your cart is empty!',
                orderPlacedSuccess: 'Order placed successfully! Thank you for your purchase.',
                fillAllFields: 'Please fill in all fields!',
                validEmail: 'Please enter a valid email address!',
                messageSentSuccess: 'Message sent successfully! We will get back to you soon.',
                messageSendError: 'Failed to send message. Please try again or contact us directly.',
                openingTelegram: 'Opening Devo Store Telegram channel...',
                errorOccurred: 'An error occurred. Please try again.',
                somethingWentWrong: 'Something went wrong. Please refresh the page.'
            },
            ar: {
                // Navigation
                home: 'الرئيسية',
                categories: 'الفئات',
                products: 'المنتجات',
                contact: 'اتصل بنا',
                
                // Hero Section
                heroTitle: 'مرحباً بك في سوقك الرقمي',
                heroDescription: 'اكتشف البرامج المتميزة وأدوات التصميم والألعاب والحلول الرقمية لكل احتياج. منتجات عالية الجودة، توصيل فوري، ودعم استثنائي.',
                browseCategories: 'تصفح الفئات',
                viewAllProducts: 'عرض جميع المنتجات',
                
                // Categories
                featuredCategories: 'الفئات المميزة',
                categoriesSubtitle: 'اكتشف فئات المنتجات الأكثر شعبية',
                software: 'البرامج',
                design: 'التصميم',
                games: 'الألعاب',
                tools: 'الأدوات',
                softwareDesc: 'التطبيقات والبرامج الاحترافية',
                designDesc: 'أدوات التصميم والموارد الإبداعية',
                gamesDesc: 'تجارب الترفيه والألعاب',
                toolsDesc: 'تطبيقات الإنتاجية والأدوات المساعدة',
                productsCount: 'منتج',
                
                // Products
                allProducts: 'جميع المنتجات',
                productsSubtitle: 'تصفح مجموعتنا الكاملة من المنتجات الرقمية',
                addToCart: 'أضف إلى السلة',
                price: 'السعر',
                all: 'الكل',
                
                // Cart
                shoppingCart: 'سلة التسوق',
                total: 'المجموع',
                checkout: 'إتمام الشراء',
                cartEmpty: 'سلة التسوق فارغة',
                cartEmptyDesc: 'أضف بعض المنتجات للبدء',
                remove: 'إزالة',
                
                // Contact
                contactUs: 'اتصل بنا',
                contactSubtitle: 'تواصل مع فريق الدعم',
                telegram: 'تليجرام',
                
                // Footer
                devoStore: 'متجر ديفو',
                footerDesc: 'سوقك الرقمي الموثوق للبرامج عالية الجودة وأدوات التصميم والألعاب والمرافق.',
                quickLinks: 'روابط سريعة',
                support: 'الدعم',
                helpCenter: 'مركز المساعدة',
                termsOfService: 'شروط الخدمة',
                privacyPolicy: 'سياسة الخصوصية',
                allRightsReserved: 'جميع الحقوق محفوظة.'
            },
            de: {
                // Navigation
                home: 'Startseite',
                categories: 'Kategorien',
                products: 'Produkte',
                contact: 'Kontakt',
                
                // Hero Section
                heroTitle: 'Willkommen in Ihrem digitalen Marktplatz',
                heroDescription: 'Entdecken Sie Premium-Software, Design-Tools, Spiele und digitale Lösungen für jeden Bedarf. Qualitätsprodukte, sofortige Lieferung und außergewöhnlicher Support.',
                browseCategories: 'Kategorien durchsuchen',
                viewAllProducts: 'Alle Produkte anzeigen',
                
                // Categories
                featuredCategories: 'Beliebte Kategorien',
                categoriesSubtitle: 'Entdecken Sie unsere beliebtesten Produktkategorien',
                software: 'Software',
                design: 'Design',
                games: 'Spiele',
                tools: 'Tools',
                softwareDesc: 'Professionelle Anwendungen und Utilities',
                designDesc: 'Kreative Tools und Design-Ressourcen',
                gamesDesc: 'Unterhaltung und Gaming-Erlebnisse',
                toolsDesc: 'Produktivitäts- und Utility-Anwendungen',
                productsCount: 'Produkte',
                
                // Products
                allProducts: 'Alle Produkte',
                productsSubtitle: 'Durchsuchen Sie unsere vollständige Sammlung digitaler Produkte',
                addToCart: 'In den Warenkorb',
                price: 'Preis',
                all: 'Alle',
                
                // Cart
                shoppingCart: 'Warenkorb',
                total: 'Gesamt',
                checkout: 'Zur Kasse',
                cartEmpty: 'Ihr Warenkorb ist leer',
                cartEmptyDesc: 'Fügen Sie einige Produkte hinzu, um zu beginnen',
                remove: 'Entfernen',
                
                // Contact
                contactUs: 'Kontakt',
                contactSubtitle: 'Kontaktieren Sie unser Support-Team',
                telegram: 'Telegram',
                
                // Footer
                devoStore: 'Devo Store',
                footerDesc: 'Ihr vertrauenswürdiger digitaler Marktplatz für hochwertige Software, Design-Tools, Spiele und Utilities.',
                quickLinks: 'Schnelllinks',
                support: 'Support',
                helpCenter: 'Hilfecenter',
                termsOfService: 'Nutzungsbedingungen',
                privacyPolicy: 'Datenschutzrichtlinie',
                allRightsReserved: 'Alle Rechte vorbehalten.'
            },
            fr: {
                // Navigation
                home: 'Accueil',
                categories: 'Catégories',
                products: 'Produits',
                contact: 'Contact',
                
                // Hero Section
                heroTitle: 'Bienvenue sur votre marché numérique',
                heroDescription: 'Découvrez des logiciels premium, des outils de design, des jeux et des solutions numériques pour tous les besoins. Produits de qualité, livraison instantanée et support exceptionnel.',
                browseCategories: 'Parcourir les catégories',
                viewAllProducts: 'Voir tous les produits',
                
                // Categories
                featuredCategories: 'Catégories populaires',
                categoriesSubtitle: 'Découvrez nos catégories de produits les plus populaires',
                software: 'Logiciels',
                design: 'Design',
                games: 'Jeux',
                tools: 'Outils',
                softwareDesc: 'Applications et utilitaires professionnels',
                designDesc: 'Outils créatifs et ressources de design',
                gamesDesc: 'Expériences de divertissement et de jeu',
                toolsDesc: 'Applications de productivité et utilitaires',
                productsCount: 'produits',
                
                // Products
                allProducts: 'Tous les produits',
                productsSubtitle: 'Parcourez notre collection complète de produits numériques',
                addToCart: 'Ajouter au panier',
                price: 'Prix',
                all: 'Tous',
                
                // Cart
                shoppingCart: 'Panier d\'achat',
                total: 'Total',
                checkout: 'Commander',
                cartEmpty: 'Votre panier est vide',
                cartEmptyDesc: 'Ajoutez quelques produits pour commencer',
                remove: 'Supprimer',
                
                // Contact
                contactUs: 'Contactez-nous',
                contactSubtitle: 'Contactez notre équipe de support',
                telegram: 'Telegram',
                
                // Footer
                devoStore: 'Devo Store',
                footerDesc: 'Votre marché numérique de confiance pour des logiciels, outils de design, jeux et utilitaires de qualité.',
                quickLinks: 'Liens rapides',
                support: 'Support',
                helpCenter: 'Centre d\'aide',
                termsOfService: 'Conditions de service',
                privacyPolicy: 'Politique de confidentialité',
                allRightsReserved: 'Tous droits réservés.'
            },
            ja: {
                // Navigation
                home: 'ホーム',
                categories: 'カテゴリー',
                products: '商品',
                contact: 'お問い合わせ',
                
                // Hero Section
                heroTitle: 'デジタルマーケットプレイスへようこそ',
                heroDescription: 'プレミアムソフトウェア、デザインツール、ゲーム、あらゆるニーズに対応するデジタルソリューションをご覧ください。高品質な製品、即座の配信、そして卓越したサポートを提供します。',
                browseCategories: 'カテゴリーを閲覧',
                viewAllProducts: 'すべての商品を見る',
                
                // Categories
                featuredCategories: '注目のカテゴリー',
                categoriesSubtitle: '最も人気のある商品カテゴリーをご覧ください',
                software: 'ソフトウェア',
                design: 'デザイン',
                games: 'ゲーム',
                tools: 'ツール',
                softwareDesc: 'プロフェッショナルなアプリケーションとユーティリティ',
                designDesc: 'クリエイティブツールとデザインリソース',
                gamesDesc: 'エンターテイメントとゲーミング体験',
                toolsDesc: '生産性とユーティリティアプリケーション',
                productsCount: '商品',
                
                // Products
                allProducts: 'すべての商品',
                productsSubtitle: 'デジタル商品の完全なコレクションをご覧ください',
                addToCart: 'カートに追加',
                price: '価格',
                all: 'すべて',
                
                // Cart
                shoppingCart: 'ショッピングカート',
                total: '合計',
                checkout: 'チェックアウト',
                cartEmpty: 'カートは空です',
                cartEmptyDesc: '商品を追加して始めましょう',
                remove: '削除',
                
                // Contact
                contactUs: 'お問い合わせ',
                contactSubtitle: 'サポートチームにお問い合わせください',
                telegram: 'Telegram',
                
                // Footer
                devoStore: 'Devo Store',
                footerDesc: '高品質なソフトウェア、デザインツール、ゲーム、ユーティリティの信頼できるデジタルマーケットプレイスです。',
                quickLinks: 'クイックリンク',
                support: 'サポート',
                helpCenter: 'ヘルプセンター',
                termsOfService: '利用規約',
                privacyPolicy: 'プライバシーポリシー',
                allRightsReserved: '全著作権所有.'
            },
            zh: {
                // Navigation
                home: '首页',
                categories: '分类',
                products: '产品',
                contact: '联系我们',
                
                // Hero Section
                heroTitle: '欢迎来到您的数字市场',
                heroDescription: '发现优质软件、设计工具、游戏和满足各种需求的数字解决方案。优质产品、即时交付和卓越支持。',
                browseCategories: '浏览分类',
                viewAllProducts: '查看所有产品',
                
                // Categories
                featuredCategories: '特色分类',
                categoriesSubtitle: '发现我们最受欢迎的产品分类',
                software: '软件',
                design: '设计',
                games: '游戏',
                tools: '工具',
                softwareDesc: '专业应用程序和实用工具',
                designDesc: '创意工具和设计资源',
                gamesDesc: '娱乐和游戏体验',
                toolsDesc: '生产力和实用工具应用程序',
                productsCount: '产品',
                
                // Products
                allProducts: '所有产品',
                productsSubtitle: '浏览我们完整的数字产品系列',
                addToCart: '添加到购物车',
                price: '价格',
                all: '全部',
                
                // Cart
                shoppingCart: '购物车',
                total: '总计',
                checkout: '结账',
                cartEmpty: '您的购物车是空的',
                cartEmptyDesc: '添加一些产品开始购物',
                remove: '删除',
                
                // Contact
                contactUs: '联系我们',
                contactSubtitle: '联系我们的支持团队',
                telegram: 'Telegram',
                
                // Footer
                devoStore: 'Devo Store',
                footerDesc: '您值得信赖的数字市场，提供优质软件、设计工具、游戏和实用工具。',
                quickLinks: '快速链接',
                support: '支持',
                helpCenter: '帮助中心',
                termsOfService: '服务条款',
                privacyPolicy: '隐私政策',
                allRightsReserved: '版权所有.'
            }
        };
    }

    changeLanguage(lang) {
        this.language = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage();
        this.updateLanguageUI();
    }

    applyLanguage() {
        const t = this.translations[this.language];
        if (!t) return;

        // Update navigation titles
        this.updateTextContent('.nav-link[href="#home"]', t.home);
        this.updateTextContent('.nav-link[href="#categories"]', t.categories);
        this.updateTextContent('.nav-link[href="#products"]', t.products);
        this.updateTextContent('.nav-link[href="#contact"]', t.contact);

        // Update hero section
        this.updateTextContent('.hero-title', t.heroTitle);
        this.updateTextContent('.hero-description', t.heroDescription);
        this.updateTextContent('.hero-actions .btn-primary', t.browseCategories);
        this.updateTextContent('.hero-actions .btn-secondary', t.viewAllProducts);

        // Update section headers
        this.updateTextContent('.section-header h2', t.featuredCategories, '#categories');
        this.updateTextContent('.section-header p', t.categoriesSubtitle, '#categories');
        this.updateTextContent('.section-header h2', t.allProducts, '#products');
        this.updateTextContent('.section-header p', t.productsSubtitle, '#products');
        this.updateTextContent('.section-header h2', t.contactUs, '#contact');
        this.updateTextContent('.section-header p', t.contactSubtitle, '#contact');

        // Update category cards
        this.updateCategoryCards(t);

        // Update products filter buttons
        this.updateProductsFilter(t);

        // Update products grid
        this.updateProductsGrid(t);

        // Update cart
        this.updateCart(t);

        // Update contact section
        this.updateContactSection(t);

        // Update footer
        this.updateFooter(t);

        // Update document direction for RTL languages
        if (this.language === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
        } else {
            document.documentElement.removeAttribute('dir');
            document.body.classList.remove('rtl');
        }
    }

    updateLanguageUI() {
        const currentLanguageEl = document.getElementById('currentLanguage');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (currentLanguageEl) {
            const langCodes = { en: 'EN', ar: 'AR', de: 'DE', fr: 'FR', ja: 'JA', zh: 'ZH' };
            currentLanguageEl.textContent = langCodes[this.language] || 'EN';
        }

        // Update active language option
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.lang === this.language) {
                option.classList.add('active');
            }
        });
    }

    updateTextContent(selector, text, context = null) {
        let elements;
        if (context) {
            const contextEl = document.querySelector(context);
            if (contextEl) {
                elements = contextEl.querySelectorAll(selector);
            } else {
                elements = [];
            }
        } else {
            elements = document.querySelectorAll(selector);
        }
        
        elements.forEach(element => {
            if (element && element.textContent !== text) {
                element.textContent = text;
            }
        });
    }

    updateCategoryCards(t) {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const category = card.dataset.category;
            const titleEl = card.querySelector('h3');
            const descEl = card.querySelector('p');
            const countEl = card.querySelector('.category-count');

            if (titleEl) {
                switch (category) {
                    case 'software':
                        titleEl.textContent = t.software;
                        if (descEl) descEl.textContent = t.softwareDesc;
                        if (countEl) countEl.textContent = `24 ${t.productsCount}`;
                        break;
                    case 'design':
                        titleEl.textContent = t.design;
                        if (descEl) descEl.textContent = t.designDesc;
                        if (countEl) countEl.textContent = `18 ${t.productsCount}`;
                        break;
                    case 'games':
                        titleEl.textContent = t.games;
                        if (descEl) descEl.textContent = t.gamesDesc;
                        if (countEl) countEl.textContent = `32 ${t.productsCount}`;
                        break;
                    case 'tools':
                        titleEl.textContent = t.tools;
                        if (descEl) descEl.textContent = t.toolsDesc;
                        if (countEl) countEl.textContent = `15 ${t.productsCount}`;
                        break;
                }
            }
        });
    }

    updateProductsFilter(t) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            switch (filter) {
                case 'all':
                    btn.textContent = t.all;
                    break;
                case 'software':
                    btn.textContent = t.software;
                    break;
                case 'design':
                    btn.textContent = t.design;
                    break;
                case 'games':
                    btn.textContent = t.games;
                    break;
                case 'tools':
                    btn.textContent = t.tools;
                    break;
            }
        });
    }

    updateProductsGrid(t) {
        // Update product cards that are already rendered
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const titleEl = card.querySelector('.product-title');
            const descEl = card.querySelector('.product-description');
            const priceEl = card.querySelector('.product-price');
            const addToCartBtn = card.querySelector('.add-to-cart-btn');

            if (titleEl && this.products) {
                const productId = card.dataset.productId;
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    titleEl.textContent = product.title;
                    descEl.textContent = product.description;
                    priceEl.textContent = product.price;
                }
            }

            if (addToCartBtn) {
                addToCartBtn.textContent = t.addToCart;
            }
        });
    }

    updateCart(t) {
        this.updateTextContent('.cart-header h2', t.shoppingCart);
        this.updateTextContent('.cart-total span:first-child', t.total);
        this.updateTextContent('.checkout-btn', t.checkout);
        
        // Update cart items if they exist
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const titleEl = item.querySelector('.cart-item-title');
            const priceEl = item.querySelector('.cart-item-price');
            const quantityEl = item.querySelector('.cart-item-quantity');
            
            if (titleEl && this.products) {
                const productId = item.dataset.productId;
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    titleEl.textContent = product.title;
                    priceEl.textContent = product.price;
                }
            }
        });

        // Update empty cart message
        const emptyCartEl = document.querySelector('.cart-empty');
        if (emptyCartEl) {
            emptyCartEl.textContent = t.cartEmpty;
        }
    }

    updateContactSection(t) {
        this.updateTextContent('.telegram-contact h3', t.telegram);
    }

    updateFooter(t) {
        // Update footer sections
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach((section, index) => {
            const h3El = section.querySelector('h3');
            const h4El = section.querySelector('h4');
            const pEl = section.querySelector('p');
            const links = section.querySelectorAll('a');

            if (index === 0) {
                // First section - Devo Store (keep "Devo" constant)
                if (pEl) pEl.textContent = t.footerDesc;
            } else if (index === 1) {
                // Quick Links section
                if (h4El) h4El.textContent = t.quickLinks;
                links.forEach((link, linkIndex) => {
                    switch (linkIndex) {
                        case 0: link.textContent = t.home; break;
                        case 1: link.textContent = t.categories; break;
                        case 2: link.textContent = t.products; break;
                        case 3: link.textContent = t.contact; break;
                    }
                });
            } else if (index === 2) {
                // Categories section
                if (h4El) h4El.textContent = t.categories;
                links.forEach((link, linkIndex) => {
                    switch (linkIndex) {
                        case 0: link.textContent = t.software; break;
                        case 1: link.textContent = t.design; break;
                        case 2: link.textContent = t.games; break;
                        case 3: link.textContent = t.tools; break;
                    }
                });
            } else if (index === 3) {
                // Support section
                if (h4El) h4El.textContent = t.support;
                links.forEach((link, linkIndex) => {
                    switch (linkIndex) {
                        case 0: link.textContent = t.contact; break;
                        case 1: link.textContent = t.helpCenter; break;
                        case 2: link.textContent = t.termsOfService; break;
                        case 3: link.textContent = t.privacyPolicy; break;
                    }
                });
            }
        });

        // Update footer bottom
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom) {
            footerBottom.textContent = `© 2025 Devo Store. ${t.allRightsReserved}`;
        }
    }

    // Product Detail Functionality
    showProductDetail(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'product-detail-modal';
        modal.innerHTML = this.generateProductDetailHTML(product);
        
        document.body.appendChild(modal);
        
        // Add event listeners
        this.setupProductDetailEvents(modal, product);
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    generateProductDetailHTML(product) {
        return `
            <div class="product-detail-overlay">
                <div class="product-detail-container">
                    <button class="product-detail-close" onclick="store.closeProductDetail()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="product-detail-content">
                        <div class="product-detail-images">
                            <div class="main-product-image">
                                ${this.getProductIcon(product.icon)}
                            </div>
                            <div class="product-image-gallery">
                                ${this.generateProductGallery(product)}
                            </div>
                        </div>
                        
                        <div class="product-detail-info">
                            <div class="product-detail-header">
                                <h1 class="product-detail-title">${product.name}</h1>
                                <div class="product-detail-meta">
                                    <span class="product-detail-code">${product.productCode}</span>
                                    <div class="product-detail-rating">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0">
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                                        </svg>
                                        <span>${product.rating}</span>
                                        <span class="product-detail-downloads">${this.formatNumber(product.downloads)} downloads</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-detail-description">
                                <p>${product.description}</p>
                            </div>
                            
                            <div class="product-detail-features">
                                <h3>Key Features</h3>
                                <ul>
                                    ${product.features ? product.features.map(feature => `<li>${feature}</li>`).join('') : ''}
                                </ul>
                            </div>
                            
                            <div class="product-detail-price">
                                <span class="price-amount">${product.price === 0 ? 'FREE' : `$${product.price.toFixed(2)}`}</span>
                            </div>
                            
                            <div class="product-detail-actions">
                                <div class="quantity-selector">
                                    <button class="quantity-btn" onclick="store.updateProductQuantity(-1)">-</button>
                                    <span class="quantity-display">1</span>
                                    <button class="quantity-btn" onclick="store.updateProductQuantity(1)">+</button>
                                </div>
                                <button class="add-to-cart-detail-btn" onclick="store.addToCartFromDetail(${product.id})">
                                    ${this.translations[this.language]?.addToCart || 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateProductGallery(product) {
        const icons = ['design', 'software', 'games', 'tools'];
        return icons.map((icon, index) => `
            <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" onclick="store.changeProductImage(${index})">
                ${this.getProductIcon(icon)}
            </div>
        `).join('');
    }

    setupProductDetailEvents(modal, product) {
        this.currentProductDetail = product;
        this.currentProductQuantity = 1;
        this.currentImageIndex = 0;
    }

    closeProductDetail() {
        const modal = document.querySelector('.product-detail-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }

    updateProductQuantity(change) {
        const newQuantity = this.currentProductQuantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            this.currentProductQuantity = newQuantity;
            const quantityDisplay = document.querySelector('.quantity-display');
            if (quantityDisplay) {
                quantityDisplay.textContent = newQuantity;
            }
        }
    }

    addToCartFromDetail(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Add multiple quantities
        for (let i = 0; i < this.currentProductQuantity; i++) {
            this.addToCart(productId);
        }

        this.closeProductDetail();
        this.showToast(`${this.currentProductQuantity} ${this.currentProductQuantity === 1 ? 'item' : 'items'} added to cart!`, 'success');
    }

    changeProductImage(index) {
        this.currentImageIndex = index;
        
        // Update active thumbnail
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update main image (in a real app, this would show different product images)
        const mainImage = document.querySelector('.main-product-image');
        if (mainImage) {
            const icons = ['design', 'software', 'games', 'tools'];
            mainImage.innerHTML = this.getProductIcon(icons[index]);
        }
    }
}

// Font loading optimization
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('300 1em Inter'),
        document.fonts.load('400 1em Inter'),
        document.fonts.load('500 1em Inter'),
        document.fonts.load('600 1em Inter'),
        document.fonts.load('700 1em Inter')
    ]).then(() => {
        document.body.classList.remove('fonts-loading');
        document.body.classList.add('fonts-loaded');
    }).catch(() => {
        // Fallback if font loading fails
        document.body.classList.remove('fonts-loading');
        document.body.classList.add('fonts-loaded');
    });
} else {
    // Fallback for browsers that don't support Font Loading API
    setTimeout(() => {
        document.body.classList.remove('fonts-loading');
        document.body.classList.add('fonts-loaded');
    }, 100);
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new DevoStore();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.store) {
        window.store.showToast('An error occurred. Please try again.', 'error');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (window.store) {
        window.store.showToast('Something went wrong. Please refresh the page.', 'error');
    }
});
