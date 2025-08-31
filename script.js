// Devo Store - Clean & Simple JavaScript
class DevoStore {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentFilter = 'all';
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.applyTheme();
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

        // WhatsApp contact functionality
        const whatsappContact = document.querySelector('.contact-item:has(.whatsapp-icon)');
        if (whatsappContact) {
            whatsappContact.addEventListener('click', () => this.handleWhatsAppContact());
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
        // Sample product data
        this.products = [
            {
                id: 1,
                name: "Pro Design Suite",
                description: "Professional design software for creative professionals",
                price: 299.99,
                category: "design",
                icon: "design",
                rating: 4.8,
                downloads: 15420
            },
            {
                id: 2,
                name: "Code Editor Pro",
                description: "Advanced code editor with AI assistance",
                price: 149.99,
                category: "software",
                icon: "software",
                rating: 4.9,
                downloads: 23450
            },
            {
                id: 3,
                name: "Game Development Kit",
                description: "Complete toolkit for game developers",
                price: 199.99,
                category: "games",
                icon: "games",
                rating: 4.7,
                downloads: 8920
            },
            {
                id: 4,
                name: "Productivity Tools Pack",
                description: "Essential productivity applications",
                price: 89.99,
                category: "tools",
                icon: "tools",
                rating: 4.6,
                downloads: 18750
            },
            {
                id: 5,
                name: "Photo Editor Deluxe",
                description: "Professional photo editing software",
                price: 179.99,
                category: "design",
                icon: "design",
                rating: 4.8,
                downloads: 12340
            },
            {
                id: 6,
                name: "Database Manager",
                description: "Advanced database management system",
                price: 129.99,
                category: "software",
                icon: "software",
                rating: 4.5,
                downloads: 5670
            },
            {
                id: 7,
                name: "Puzzle Adventure",
                description: "Engaging puzzle game with stunning graphics",
                price: 24.99,
                category: "games",
                icon: "games",
                rating: 4.7,
                downloads: 45600
            },
            {
                id: 8,
                name: "System Optimizer",
                description: "Complete system optimization toolkit",
                price: 69.99,
                category: "tools",
                icon: "tools",
                rating: 4.4,
                downloads: 9870
            },
            {
                id: 9,
                name: "Vector Graphics Pro",
                description: "Professional vector graphics editor",
                price: 249.99,
                category: "design",
                icon: "design",
                rating: 4.9,
                downloads: 7890
            },
            {
                id: 10,
                name: "Cloud Backup Solution",
                description: "Secure cloud backup and sync service",
                price: 79.99,
                category: "software",
                icon: "software",
                rating: 4.6,
                downloads: 15680
            },
            {
                id: 11,
                name: "Strategy Conquest",
                description: "Epic strategy game with multiplayer",
                price: 39.99,
                category: "games",
                icon: "games",
                rating: 4.8,
                downloads: 23400
            },
            {
                id: 12,
                name: "Security Suite",
                description: "Comprehensive security and privacy tools",
                price: 99.99,
                category: "tools",
                icon: "tools",
                rating: 4.7,
                downloads: 11230
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
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    ${this.getProductIcon(product.icon)}
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
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
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="store.addToCart(${product.id})">
                        Add to Cart
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
        this.showToast('Product added to cart!', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
        this.showToast('Product removed from cart!', 'warning');
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
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
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
                        <button class="remove-btn" onclick="store.removeFromCart(${item.id})">Remove</button>
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
        if (cartSidebar) {
            cartSidebar.classList.toggle('open');
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showToast('Your cart is empty!', 'warning');
            return;
        }

        this.showLoading();
        
        // Simulate checkout process
        setTimeout(() => {
            this.hideLoading();
            this.showToast('Order placed successfully! Thank you for your purchase.', 'success');
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

    handleWhatsAppContact() {
        const phoneNumber = '+2001007078085';
        const message = 'Hello! I would like to inquire about your products.';
        const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        
        // Check if user is on mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, try to open WhatsApp app
            window.open(whatsappUrl, '_blank');
        } else {
            // On desktop, show a helpful message
            this.showToast(`To contact us via WhatsApp, please use this number: ${phoneNumber}`, 'info');
            
            // Also try to open WhatsApp Web as a fallback
            setTimeout(() => {
                if (confirm('Would you like to open WhatsApp Web to chat with us?')) {
                    window.open(whatsappUrl, '_blank');
                }
            }, 2000);
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
