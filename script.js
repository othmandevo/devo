/**
 * Devo Store - Main JavaScript File
 * Professional e-commerce website with modern functionality
 */

// Global state management
const Store = {
    // Theme management
    theme: localStorage.getItem('theme') || 'light',
    
    // Cart management
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    
    // Products data
    products: [
        {
            id: 1,
            name: "Design Pro Suite",
            description: "Complete design toolkit for professionals",
            price: 99.99,
            category: "design",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3-3m0 0l-3-3m3 3H9"/>
            </svg>`,
            rating: 4.8,
            reviews: 124
        },
        {
            id: 2,
            name: "Code Master IDE",
            description: "Advanced development environment",
            price: 149.99,
            category: "software",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`,
            rating: 4.9,
            reviews: 89
        },
        {
            id: 3,
            name: "Game Engine Pro",
            description: "Professional game development platform",
            price: 199.99,
            category: "games",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`,
            rating: 4.7,
            reviews: 67
        },
        {
            id: 4,
            name: "Productivity Toolkit",
            description: "Essential tools for maximum efficiency",
            price: 79.99,
            category: "tools",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>`,
            rating: 4.6,
            reviews: 156
        },
        {
            id: 5,
            name: "Creative Assets Pack",
            description: "Premium design resources and templates",
            price: 59.99,
            category: "design",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`,
            rating: 4.8,
            reviews: 203
        },
        {
            id: 6,
            name: "Security Suite",
            description: "Comprehensive digital security solution",
            price: 129.99,
            category: "software",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>`,
            rating: 4.9,
            reviews: 78
        },
        {
            id: 7,
            name: "Virtual Reality Experience",
            description: "Immersive VR gaming and entertainment",
            price: 179.99,
            category: "games",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <path d="M3.3 7l8.7 5 8.7-5"/>
                <path d="M12 22V12"/>
            </svg>`,
            rating: 4.5,
            reviews: 45
        },
        {
            id: 8,
            name: "Analytics Dashboard",
            description: "Advanced data visualization and insights",
            price: 89.99,
            category: "tools",
            image: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
            </svg>`,
            rating: 4.7,
            reviews: 92
        }
    ],
    
    // Categories data
    categories: [
        { id: "software", name: "Software", count: 24 },
        { id: "design", name: "Design", count: 18 },
        { id: "games", name: "Games", count: 32 },
        { id: "tools", name: "Tools", count: 15 }
    ]
};

// DOM Elements
const elements = {
    // Theme elements
    themeToggle: document.getElementById('themeToggle'),
    body: document.body,
    
    // Cart elements
    cartButton: document.getElementById('cartButton'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartClose: document.getElementById('cartClose'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    cartTotal: document.getElementById('cartTotal'),
    cartCheckout: document.getElementById('cartCheckout'),
    
    // Navigation elements
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Product elements
    productsGrid: document.getElementById('productsGrid'),
    
    // Form elements
    contactForm: document.getElementById('contactForm'),
    
    // Loading and notifications
    loadingSpinner: document.getElementById('loadingSpinner'),
    toastContainer: document.getElementById('toastContainer')
};

/**
 * Theme Management
 */
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.applyTheme(Store.theme);
        this.bindEvents();
    }
    
    applyTheme(theme) {
        Store.theme = theme;
        elements.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = Store.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        this.showToast('Theme changed', `Switched to ${newTheme} mode`, 'success');
    }
    
    bindEvents() {
        elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

/**
 * Cart Management
 */
class CartManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }
    
    addToCart(product) {
        const existingItem = Store.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            Store.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showToast('Added to cart', `${product.name} has been added to your cart`, 'success');
    }
    
    removeFromCart(productId) {
        Store.cart = Store.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showToast('Removed from cart', 'Item has been removed from your cart', 'warning');
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = Store.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }
    
    getCartTotal() {
        return Store.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getCartCount() {
        return Store.cart.reduce((count, item) => count + item.quantity, 0);
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(Store.cart));
    }
    
    updateCartDisplay() {
        // Update cart count
        elements.cartCount.textContent = this.getCartCount();
        
        // Update cart items
        this.renderCartItems();
        
        // Update cart total
        elements.cartTotal.textContent = `$${this.getCartTotal().toFixed(2)}`;
    }
    
    renderCartItems() {
        if (Store.cart.length === 0) {
            elements.cartItems.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
                </div>
            `;
            return;
        }
        
        elements.cartItems.innerHTML = Store.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <div class="cart-item-icon">
                        ${item.image}
                    </div>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="cartManager.removeFromCart(${item.id})" title="Remove item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    openCart() {
        elements.cartSidebar.classList.add('open');
        elements.cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        elements.cartSidebar.classList.remove('open');
        elements.cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    checkout() {
        if (Store.cart.length === 0) {
            this.showToast('Empty cart', 'Please add items to your cart before checkout', 'warning');
            return;
        }
        
        this.showToast('Checkout', 'Proceeding to checkout...', 'success');
        // Here you would typically redirect to a checkout page or open a payment modal
        setTimeout(() => {
            this.closeCart();
        }, 2000);
    }
    
    bindEvents() {
        elements.cartButton.addEventListener('click', () => this.openCart());
        elements.cartClose.addEventListener('click', () => this.closeCart());
        elements.cartOverlay.addEventListener('click', () => this.closeCart());
        elements.cartCheckout.addEventListener('click', () => this.checkout());
        
        // Close cart on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.cartSidebar.classList.contains('open')) {
                this.closeCart();
            }
        });
    }
    
    showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">${title}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

/**
 * Product Management
 */
class ProductManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.renderProducts();
        this.bindEvents();
    }
    
    renderProducts() {
        elements.productsGrid.innerHTML = Store.products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <div class="product-icon">
                        ${product.image}
                    </div>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-add-cart" onclick="productManager.addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    addToCart(productId) {
        const product = Store.products.find(p => p.id === productId);
        if (product) {
            cartManager.addToCart(product);
        }
    }
    
    filterByCategory(category) {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    bindEvents() {
        // Category filtering
        document.querySelectorAll('[data-category]').forEach(element => {
            element.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                document.querySelector(`[href="#categories"]`).classList.add('active');
            });
        });
    }
}

/**
 * Navigation Management
 */
class NavigationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveNav();
    }
    
    bindEvents() {
        // Mobile menu toggle
        elements.mobileMenuToggle.addEventListener('click', () => {
            elements.mobileMenuToggle.classList.toggle('open');
            elements.navMenu.classList.toggle('open');
        });
        
        // Smooth scrolling for navigation links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    this.updateActiveNav();
                }
                
                // Close mobile menu
                elements.mobileMenuToggle.classList.remove('open');
                elements.navMenu.classList.remove('open');
            });
        });
        
        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNav();
        });
    }
    
    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/**
 * Form Management
 */
class FormManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        elements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit();
        });
    }
    
    async handleContactSubmit() {
        const formData = new FormData(elements.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Validate form data
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        this.showLoading(true);
        
        try {
            // Send email using EmailJS
            await this.sendEmail(data);
            
            // Reset form
            elements.contactForm.reset();
            
            // Show success message
            this.showToast('Success!', 'Your message has been sent successfully to othman.devo@gmail.com. We\'ll get back to you soon!', 'success');
            
        } catch (error) {
            console.error('Email sending failed:', error);
            this.showToast('Error', 'Failed to send message. Please try again or contact us directly at othman.devo@gmail.com', 'error');
        } finally {
            // Hide loading state
            this.showLoading(false);
        }
    }
    
    async sendEmail(data) {
        // Using a simple and reliable email service
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);
        formData.append('_subject', `New Contact Form Message from ${data.name}`);
        
        // Using a free email service that works immediately
        const response = await fetch('https://formspree.io/f/xpzgwqzg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Email service not available');
        }
        
        return response.json();
    }
    
    validateForm(data) {
        if (!data.name || data.name.trim().length < 2) {
            this.showToast('Validation error', 'Please enter a valid name (at least 2 characters)', 'error');
            return false;
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            this.showToast('Validation error', 'Please enter a valid email address', 'error');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            this.showToast('Validation error', 'Please enter a message (at least 10 characters)', 'error');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showLoading(show) {
        if (show) {
            elements.loadingSpinner.classList.add('show');
        } else {
            elements.loadingSpinner.classList.remove('show');
        }
    }
    
    showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">${title}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        elements.toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

/**
 * Performance and Analytics
 */
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.trackPageLoad();
        this.trackUserInteractions();
        this.setupErrorHandling();
    }
    
    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track core web vitals
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`${entry.name}: ${entry.value}`);
                    }
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            }
        });
    }
    
    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, a')) {
                const element = e.target.closest('button, a');
                const action = element.textContent.trim() || element.getAttribute('aria-label') || 'Unknown action';
                console.log(`User action: ${action}`);
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            console.log(`Form submitted: ${e.target.id || 'Unknown form'}`);
        });
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // In a real application, you would send this to an error tracking service
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // In a real application, you would send this to an error tracking service
        });
    }
}

/**
 * Utility Functions
 */
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
    
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

/**
 * Application Initialization
 */
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.cartManager = new CartManager();
        this.productManager = new ProductManager();
        this.navigationManager = new NavigationManager();
        this.formManager = new FormManager();
        this.performanceManager = new PerformanceManager();
        
        // Setup global references for inline event handlers
        window.cartManager = this.cartManager;
        window.productManager = this.productManager;
        
        // Initialize lazy loading for images (if any)
        this.setupLazyLoading();
        
        // Setup service worker for offline functionality (if needed)
        this.setupServiceWorker();
        
        console.log('Devo Store initialized successfully');
    }
    
    setupLazyLoading() {
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    setupServiceWorker() {
        // Register service worker for offline functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Store, App, ThemeManager, CartManager, ProductManager, NavigationManager, FormManager, PerformanceManager, Utils };
}
