// Modern Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileNavigation();
    initAnimatedCounters();
    initPropertySearch();
    initPropertyFilters();
    initScrollAnimations();
    initFormHandling();
    initFloatingWhatsApp();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Property Search Functionality
function initPropertySearch() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchForm = document.querySelector('.search-form');
    
    // Tab switching
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search form submission
    const searchBtn = document.querySelector('.search-btn.primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const location = document.getElementById('location').value;
            const propertyType = document.getElementById('property-type').value;
            const minPrice = document.getElementById('min-price').value;
            const maxPrice = document.getElementById('max-price').value;
            const bedrooms = document.getElementById('bedrooms').value;
            
            // Simulate search
            console.log('Searching for:', { location, propertyType, minPrice, maxPrice, bedrooms });
            
            // Scroll to property listings
            const propertySection = document.querySelector('#properties');
            if (propertySection) {
                propertySection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Mencari...</span>';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-search"></i><span>Cari Hartanah</span>';
            }, 2000);
        });
    }
}

// Property Filters Functionality
function initPropertyFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    const sortSelect = document.querySelector('.sort-select');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter properties
            propertyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-type') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const cardsArray = Array.from(propertyCards);
            
            cardsArray.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                
                switch(sortValue) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'newest':
                        return 0; // Keep original order for newest
                    case 'popular':
                        return 0; // Keep original order for popular
                    default:
                        return 0;
                }
            });
            
            // Reorder cards
            const grid = document.querySelector('.property-grid');
            cardsArray.forEach(card => {
                grid.appendChild(card);
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-search, .section-header, .property-card, .service-card, .testimonial-card, .about-content, .contact-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Menghantar...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Berjaya Dihantar!</span>';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
}

// Floating WhatsApp Button
function initFloatingWhatsApp() {
    const floatingBtn = document.querySelector('.floating-whatsapp');
    
    if (floatingBtn) {
        // Show/hide based on scroll position
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 500) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Add click tracking
        floatingBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Property card interactions
document.addEventListener('DOMContentLoaded', function() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        // Add hover effect for action buttons
        const actionBtns = card.querySelectorAll('.action-btn');
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (this.querySelector('.fa-eye')) {
                    // View image functionality
                    console.log('View image clicked');
                } else if (this.querySelector('.fa-heart')) {
                    // Save property functionality
                    this.style.background = '#ef4444';
                    this.style.color = '#ffffff';
                    this.querySelector('i').className = 'fas fa-heart';
                }
            });
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Load more functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Memuatkan...</span>';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-plus"></i><span>Muat Lebih Banyak</span>';
            // Here you would typically load more properties from an API
            console.log('Loading more properties...');
        }, 2000);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .hero-text,
    .hero-search,
    .section-header,
    .property-card,
    .service-card,
    .testimonial-card,
    .about-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .hero-text.animate-in,
    .hero-search.animate-in,
    .section-header.animate-in,
    .property-card.animate-in,
    .service-card.animate-in,
    .testimonial-card.animate-in,
    .about-content.animate-in,
    .contact-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating-whatsapp {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .floating-whatsapp.show {
        opacity: 1;
        visibility: visible;
    }
`;

document.head.appendChild(style);

// Utility functions
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);