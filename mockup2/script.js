// Luxury Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initFAQAccordions();
    initScrollAnimations();
    initNavbarScroll();
    initWhatsAppTracking();
    initLuxuryEffects();
    initActivityTabs();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
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

// FAQ Accordion functionality
function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item.luxury');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Scroll animations and effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for stats
                if (entry.target.classList.contains('stat-card')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-card, .stat-card, .faq-item, .property-card, .testimonial-card, .activity-card, .blog-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate stat numbers
function animateStatNumber(statCard) {
    const statNumber = statCard.querySelector('.stat-number');
    const finalNumber = parseInt(statNumber.textContent.replace(/\D/g, ''));
    const suffix = statNumber.textContent.replace(/\d/g, '');
    
    if (isNaN(finalNumber)) return;
    
    let currentNumber = 0;
    const increment = finalNumber / 50; // 50 steps for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        statNumber.textContent = Math.floor(currentNumber) + suffix;
    }, stepTime);
}

// Navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// WhatsApp button tracking and effects
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn.luxury');
    
    whatsappButtons.forEach(button => {
        // Add click tracking
        button.addEventListener('click', function(e) {
            // Track WhatsApp clicks (integrate with analytics)
            console.log('WhatsApp button clicked:', this.textContent.trim());
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Luxury effects and interactions
function initLuxuryEffects() {
    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Add luxury hover effects to cards
    const luxuryCards = document.querySelectorAll('.problem-card.luxury, .stat-card.luxury');
    
    luxuryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent, 100);
    }
    
    // Add floating animation to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.transform = 'translateX(-50%) translateY(-5px)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }, 1000);
        }, 2000);
    }
}

// Typewriter effect
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Activity tabs functionality
function initActivityTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn.luxury');
    const tabContents = document.querySelectorAll('.tab-content.luxury');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar.scrolled {
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(20px);
    }
    
    .problem-card.luxury,
    .stat-card.luxury,
    .faq-item.luxury,
    .property-card.luxury,
    .testimonial-card.luxury,
    .activity-card.luxury,
    .blog-card.luxury {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .problem-card.luxury.animate-in,
    .stat-card.luxury.animate-in,
    .faq-item.luxury.animate-in,
    .property-card.luxury.animate-in,
    .testimonial-card.luxury.animate-in,
    .activity-card.luxury.animate-in,
    .blog-card.luxury.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-indicator {
        transition: transform 1s ease-in-out;
    }
    
    .whatsapp-btn.luxury {
        transition: all 0.3s ease;
    }
    
    .problem-card.luxury,
    .stat-card.luxury {
        transition: all 0.4s ease;
    }
    
    .contact-item.luxury {
        transition: all 0.3s ease;
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    /* Loading animation for hero */
    .hero-title {
        animation: fadeInUp 1s ease-out 0.5s both;
    }
    
    .hero-subtitle {
        animation: fadeInUp 1s ease-out 1s both;
    }
    
    .hero-cta {
        animation: fadeInUp 1s ease-out 1.5s both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Luxury glow effect */
    .problem-card.luxury:hover,
    .stat-card.luxury:hover {
        box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2), 0 0 0 1px rgba(212, 175, 55, 0.3);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add loading screen effect
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes FAQ items
    if (e.key === 'Escape') {
        const activeFAQ = document.querySelector('.faq-item.luxury.active');
        if (activeFAQ) {
            activeFAQ.classList.remove('active');
        }
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .whatsapp-btn.luxury:active {
            transform: scale(0.95);
        }
        
        .problem-card.luxury:active,
        .stat-card.luxury:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(touchStyle);
}
