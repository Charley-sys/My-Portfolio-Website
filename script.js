// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// Project Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Initialize card animations with delays
    projectCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.style.animationDelay = `${index * 0.1}s`;
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    // Trigger re-animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, 10);
                } else {
                    const cardTech = card.getAttribute('data-tech');
                    if (cardTech.includes(filterValue)) {
                        card.classList.remove('hidden');
                        // Trigger re-animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease forwards`;
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Add animation on scroll for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effects for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // MERN badges animation in hero section
    const mernBadges = document.querySelectorAll('.mern-badge');
    mernBadges.forEach((badge, index) => {
        badge.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
    });

    // Skills section animation
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
            }
        });
    }, { threshold: 0.2 });

    skillCategories.forEach(category => {
        skillsObserver.observe(category);
    });
});

// Add CSS animations dynamically
const additionalCSS = `
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

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.project-card {
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: calc(var(--card-index, 0) * 0.1s);
    opacity: 0;
}

.mern-badge {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

.skill-category {
    animation: fadeInUp 0.8s ease forwards;
    opacity: 0;
}

.project-card:hover {
    animation: pulse 0.3s ease;
}

/* Enhanced filter button animations */
.filter-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn:hover {
    transform: translateY(-2px);
}

.filter-btn.active {
    animation: pulse 0.3s ease;
}

/* Smooth transitions for project cards */
.project-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
}

.project-card.hidden {
    opacity: 0;
    transform: scale(0.8);
    display: none;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Enhanced scroll behavior for better UX
let scrollTimeout;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    
    // Clear the timeout if it's already set
    clearTimeout(scrollTimeout);
    
    // Add a background when scrolling
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        nav.style.backdropFilter = 'blur(5px)';
    }
    
    // Set a timeout to remove the blur effect when scrolling stops
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
            nav.style.backdropFilter = 'blur(5px)';
        }
    }, 150);
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeInUp 0.6s ease forwards';
        });
        
        // Add loading state
        if (!img.complete) {
            img.style.opacity = '0';
        }
    });
});

// Enhanced touch support for mobile devices
document.addEventListener('touchstart', function() {}, { passive: true });

// Add keyboard navigation support for filter buttons
document.addEventListener('keydown', function(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeFilter = document.querySelector('.filter-btn.active');
    let currentIndex = Array.from(filterButtons).indexOf(activeFilter);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % filterButtons.length;
        filterButtons[currentIndex].click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
        filterButtons[currentIndex].click();
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, .filter-btn, .project-links a');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4fc3f7';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});