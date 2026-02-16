// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .product-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(0.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navigation Scroll Effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const closeMenu = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            numberElement.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add scroll animation to elements
document.querySelectorAll('.about-text, .about-images, .product-card, .gallery-item, .impact-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    scrollObserver.observe(el);
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelector('.testimonial-dots');

// Create dots
testimonialItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');

function updateTestimonials() {
    testimonialItems.forEach((item, index) => {
        item.classList.remove('active');
        dots[index].classList.remove('active');
    });
    
    testimonialItems[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

document.querySelector('.next-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    updateTestimonials();
});

document.querySelector('.prev-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    updateTestimonials();
}, 6000);

// Add to Cart Animation
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update cart count
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Animation feedback
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = 'var(--accent-gold)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
        
        // Cart icon animation
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input').value;
    const button = newsletterForm.querySelector('button');
    
    if (email) {
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = 'var(--accent-earth)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            newsletterForm.reset();
        }, 2000);
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Effect for Hero Image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`;
    }
});

// Gallery Hover Effect Enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Product Card Tilt Effect (3D)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Lazy Loading Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Add stagger animation to gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
});

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});

// Add animation to products on scroll
const productCards = document.querySelectorAll('.product-card');
productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    card.style.transitionDelay = `${index * 0.15}s`;
});

const productsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

productCards.forEach(card => {
    productsObserver.observe(card);
});

// Search button functionality (placeholder)
document.querySelector('.search-btn').addEventListener('click', () => {
    alert('Search functionality coming soon!');
});

// Console Easter Egg
console.log('%c✨ Two Good Co. ✨', 'font-size: 24px; color: #c9a961; font-weight: bold;');
console.log('%cChanging lives through beautiful food and design', 'font-size: 14px; color: #8b7355;');
console.log('%cInterested in our mission? Visit us at twogood.com.au', 'font-size: 12px; color: #6a6a6a;');
