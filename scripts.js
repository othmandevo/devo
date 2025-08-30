// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const productsGrid = document.getElementById('products-grid');
const viewButtons = document.querySelectorAll('.view-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const filterCheckboxes = document.querySelectorAll('input[name="category"]');
const sortSelect = document.querySelector('.sort-select');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    applyTheme(theme) {
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            icon.className = 'fas fa-sun';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            icon.className = 'fas fa-moon';
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
            this.addAnimation();
        });
    }

    addAnimation() {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.isOpen = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        mobileMenuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        navMenu.classList.toggle('active', this.isOpen);
        
        // Animate hamburger icon
        const icon = mobileMenuToggle.querySelector('i');
        if (this.isOpen) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }

    closeMenu() {
        this.isOpen = false;
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.className = 'fas fa-bars';
    }
}

// Price Range Management
class PriceRangeManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        priceRange.addEventListener('input', (e) => {
            this.updatePriceDisplay(e.target.value);
        });
    }

    updatePriceDisplay(value) {
        priceValue.textContent = `$${value}`;
    }
}

// Product View Management
class ProductViewManager {
    constructor() {
        this.currentView = 'grid';
        this.setupEventListeners();
    }

    setupEventListeners() {
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        
        // Update active button
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update grid layout
        if (view === 'list') {
            productsGrid.style.gridTemplateColumns = '1fr';
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
            productsGrid.classList.remove('list-view');
        }

        // Add animation
        this.addViewTransitionAnimation();
    }

    addViewTransitionAnimation() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeIn 0.3s ease-in ${index * 0.1}s`;
            }, 10);
        });
    }
}

// Cart Management
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.addToCart(e);
            });
        });
    }

    addToCart(event) {
        const button = event.target;
        const card = button.closest('.product-card');
        const product = {
            id: Date.now(), // Simple ID generation
            title: card.querySelector('.product-title').textContent,
            price: card.querySelector('.product-price').textContent,
            image: card.querySelector('.placeholder-image').innerHTML
        };

        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        
        this.showAddToCartAnimation(button);
        this.showNotification('Product added to cart!');
    }

    showAddToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1500);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Filter Management
class FilterManager {
    constructor() {
        this.activeFilters = new Set();
        this.setupEventListeners();
    }

    setupEventListeners() {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFilters();
            });
        });

        sortSelect.addEventListener('change', () => {
            this.sortProducts();
        });
    }

    updateFilters() {
        this.activeFilters.clear();
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                this.activeFilters.add(checkbox.value);
            }
        });

        this.applyFilters();
    }

    applyFilters() {
        const cards = document.querySelectorAll('.product-card');
        
        cards.forEach(card => {
            // For demo purposes, we'll show/hide based on a simple logic
            // In a real app, you'd filter based on actual product data
            const shouldShow = this.activeFilters.size === 0 || 
                             Math.random() > 0.3; // Random filter for demo
            
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    sortProducts() {
        const sortBy = sortSelect.value;
        const cards = Array.from(document.querySelectorAll('.product-card'));
        const grid = productsGrid;

        // Remove cards from DOM
        cards.forEach(card => grid.removeChild(card));

        // Sort cards based on criteria
        cards.sort((a, b) => {
            const priceA = this.extractPrice(a);
            const priceB = this.extractPrice(b);

            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return Math.random() - 0.5; // Random for demo
                default:
                    return 0;
            }
        });

        // Add cards back to DOM
        cards.forEach(card => {
            grid.appendChild(card);
            card.classList.add('fade-in');
        });
    }

    extractPrice(card) {
        const priceText = card.querySelector('.product-price').textContent;
        return parseFloat(priceText.replace(/[^0-9.]/g, ''));
    }
}

// Enhanced Smooth Scrolling with Cool Effects
class SmoothScrollManager {
    constructor() {
        this.currentScrollY = 0;
        this.targetScrollY = 0;
        this.easing = 0.1;
        this.isScrolling = false;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        this.setupEventListeners();
        this.initParallax();
    }

    setupEventListeners() {
        // Enhanced smooth scrolling for navigation links
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });

        // Add scroll-based animations
        this.setupScrollAnimations();
        
        // Add scroll progress indicator
        this.setupScrollProgress();
        
        // Add scroll-triggered effects
        this.setupScrollEffects();
    }

    smoothScrollTo(targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    setupScrollAnimations() {
        // Create scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for product cards
                    if (entry.target.classList.contains('product-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        entry.target.style.animationDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.product-card, .sidebar, .hero-content, .footer-section');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 10001;
            transition: width 0.1s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(progressBar);

        // Update progress bar on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupScrollEffects() {
        // Add scroll-triggered visual effects
        window.addEventListener('scroll', () => {
            this.currentScrollY = window.pageYOffset;
            this.scrollDirection = this.currentScrollY > this.lastScrollY ? 'down' : 'up';
            
            // Parallax effect for hero section
            this.updateParallax();
            
            // Dynamic navbar effects
            this.updateNavbar();
            
            // Scroll-triggered color changes
            this.updateScrollColors();
            
            // Floating elements effect
            this.updateFloatingElements();
            
            this.lastScrollY = this.currentScrollY;
        });
    }

    updateParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Parallax for product cards
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * (0.1 + index * 0.02);
            card.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        });
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.backgroundColor = 'var(--bg-primary)';
            }

            // Hide/show navbar on scroll
            if (this.scrollDirection === 'down' && scrolled > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
    }

    updateScrollColors() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;

        // Dynamic color changes based on scroll position
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
        
        // Change primary color based on scroll
        if (scrollPercent > 0.5) {
            document.documentElement.style.setProperty('--primary-color', '#8b5cf6');
        } else {
            document.documentElement.style.setProperty('--primary-color', '#6366f1');
        }
    }

    updateFloatingElements() {
        const scrolled = window.pageYOffset;
        
        // Floating animation for sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const floatRate = Math.sin(scrolled * 0.01) * 5;
            sidebar.style.transform = `translateY(${floatRate}px)`;
        }

        // Floating animation for buttons
        const buttons = document.querySelectorAll('.add-to-cart, .cta-button');
        buttons.forEach((button, index) => {
            const floatRate = Math.sin(scrolled * 0.01 + index * 0.5) * 3;
            button.style.transform = `translateY(${floatRate}px)`;
        });
    }

    initParallax() {
        // Initialize parallax containers
        const parallaxContainers = document.querySelectorAll('.hero, .product-card');
        parallaxContainers.forEach(container => {
            container.style.willChange = 'transform';
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all product cards
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => observer.observe(card));
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.setupLazyLoading();
        this.setupDebouncedResize();
        this.setupTouchOptimizations();
        this.setupViewportOptimizations();
    }

    setupLazyLoading() {
        // Simple lazy loading for images (when real images are added)
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Apply to future images
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => imageObserver.observe(img));
        });
    }

    setupDebouncedResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize events efficiently
                this.handleResize();
            }, 250);
        });
    }

    setupTouchOptimizations() {
        // Add touch-friendly interactions
        const touchElements = document.querySelectorAll('.product-card, .nav-link, .add-to-cart, .view-btn');
        
        touchElements.forEach(element => {
            // Add touch feedback
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
            
            // Prevent zoom on double tap
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
            }, { passive: false });
        });

        // Optimize scroll performance on mobile
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupViewportOptimizations() {
        // Set viewport meta tag for better mobile experience
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }

    handleResize() {
        // Handle responsive behavior
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }

        // Handle very small screens
        if (width <= 360) {
            document.body.classList.add('extra-small');
        } else {
            document.body.classList.remove('extra-small');
        }

        // Handle landscape mode on phones
        if (width > height && width <= 768) {
            document.body.classList.add('landscape');
        } else {
            document.body.classList.remove('landscape');
        }
    }

    handleScroll() {
        // Optimize scroll performance
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    handleOrientationChange() {
        // Recalculate layouts after orientation change
        this.handleResize();
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('nav-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            document.getElementById('mobile-menu-toggle').click();
        }
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const mobileMenuManager = new MobileMenuManager();
    const priceRangeManager = new PriceRangeManager();
    const productViewManager = new ProductViewManager();
    const cartManager = new CartManager();
    const filterManager = new FilterManager();
    const smoothScrollManager = new SmoothScrollManager();
    const animationManager = new AnimationManager();
    const performanceManager = new PerformanceManager();

    // Add some interactive features
    addHoverEffects();
    addKeyboardNavigation();
    addLoadingStates();
});

// Additional Interactive Features
function addHoverEffects() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl+T
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            document.getElementById('theme-toggle').click();
        }
        
        // Toggle mobile menu with Escape
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('nav-menu');
            if (mobileMenu.classList.contains('active')) {
                document.getElementById('mobile-menu-toggle').click();
            }
        }
    });
}

function addLoadingStates() {
    // Simulate loading states for better UX
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('theme-toggle') && 
                !button.classList.contains('mobile-menu-toggle')) {
                button.classList.add('loading');
                setTimeout(() => {
                    button.classList.remove('loading');
                }, 1000);
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
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

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        MobileMenuManager,
        PriceRangeManager,
        ProductViewManager,
        CartManager,
        FilterManager,
        SmoothScrollManager,
        AnimationManager,
        PerformanceManager
    };
}

