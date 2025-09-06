// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll for stats
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe stat cards for animation
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe property cards for animation
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe testimonial cards for animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe activity and blog cards for animation
    const activityCards = document.querySelectorAll('.activity-card');
    const blogCards = document.querySelectorAll('.blog-card');
    [...activityCards, ...blogCards].forEach(card => {
        observer.observe(card);
    });
    
    // Initialize activity tabs
    initActivityTabs();
    
    // Add click tracking for WhatsApp buttons (for analytics)
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp clicks (you can integrate with Google Analytics here)
            console.log('WhatsApp button clicked:', this.textContent.trim());
        });
    });
    
    // Add hover effects for problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Activity tabs functionality
function initActivityTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
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

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .stat-card,
    .property-card,
    .testimonial-card,
    .activity-card,
    .blog-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .stat-card.animate-in,
    .property-card.animate-in,
    .testimonial-card.animate-in,
    .activity-card.animate-in,
    .blog-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .problem-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
