// Moor Investor Presentation - JavaScript

// Smooth scroll enhancement
document.addEventListener('DOMContentLoaded', function() {
    
    // Add scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // First section should be visible immediately
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .timeline-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers to phone mockups for demo
    const phoneMockups = document.querySelectorAll('.phone-mockup');
    phoneMockups.forEach(phone => {
        phone.style.cursor = 'pointer';
        phone.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Progress indicator on scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #9333ea, #ec4899);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            scrollToNextSection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollToPreviousSection();
        }
    });

    function scrollToNextSection() {
        const currentScroll = window.scrollY;
        const sections = Array.from(document.querySelectorAll('section'));
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            if (sectionTop > currentScroll + 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    function scrollToPreviousSection() {
        const currentScroll = window.scrollY;
        const sections = Array.from(document.querySelectorAll('section')).reverse();
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            if (sectionTop < currentScroll - 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('section:first-child');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // Log for debugging
    console.log('Moor Presentation initialized');
    console.log('Total sections:', sections.length);
    console.log('Keyboard shortcuts:');
    console.log('  ↓ or Space: Next section');
    console.log('  ↑: Previous section');
});

// Add visibility tracking
let visibilityStartTime = Date.now();

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Presentation hidden at:', new Date().toLocaleTimeString());
    } else {
        console.log('Presentation visible at:', new Date().toLocaleTimeString());
    }
});

// Track presentation duration
window.addEventListener('beforeunload', function() {
    const duration = Math.round((Date.now() - visibilityStartTime) / 1000);
    console.log('Presentation viewed for:', duration, 'seconds');
});
