const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
  multiplier: 1,
  class: 'is-reveal'
});

gsap.registerPlugin(ScrollTrigger);

scroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#main', {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector('#main').style.transform ? 'transform' : 'fixed'
});

ScrollTrigger.addEventListener('refresh', () => scroll.update());
ScrollTrigger.refresh();

window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    scroll.update();
  }, 1500);
});

const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverElements = document.querySelectorAll('a, button, .product-card, .elem');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('expand');
    cursorFollower.classList.add('expand');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('expand');
    cursorFollower.classList.remove('expand');
  });
});

const nav = document.getElementById('nav');
scroll.on('scroll', (args) => {
  if (args.scroll.y > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

const menuBtn = document.querySelector('.menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.menu-link');

menuBtn.addEventListener('click', () => {
  fullscreenMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
  fullscreenMenu.classList.remove('active');
  document.body.style.overflow = '';
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

const playButton = document.getElementById('play');
const video = document.querySelector('#video-container video');

playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.style.opacity = '0';
    setTimeout(() => {
      playButton.style.display = 'none';
    }, 300);
  }
});

video.addEventListener('click', () => {
  if (!video.paused) {
    video.pause();
    playButton.style.display = 'flex';
    setTimeout(() => {
      playButton.style.opacity = '1';
    }, 10);
  }
});

const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.getElementById('stats-section');
let statsCounted = false;

const animateStats = () => {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
      }
    };

    updateCount();
    stat.parentElement.classList.add('animate');
  });
};

scroll.on('scroll', (args) => {
  if (!statsCounted) {
    const statsRect = statsSection.getBoundingClientRect();
    if (statsRect.top < window.innerHeight * 0.75) {
      animateStats();
      statsCounted = true;
    }
  }
});

const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentTestimonial = 0;

testimonials.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToTestimonial(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
}

function goToTestimonial(index) {
  currentTestimonial = index;
  showTestimonial(currentTestimonial);
}

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

let cartItems = 0;

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    cartItems++;
    cartCount.textContent = cartItems;


    btn.textContent = 'Added!';
    btn.style.background = '#4CAF50';

    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
    }, 2000);


    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartBtn.style.transform = '';
    }, 300);
  });
});

const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const submitBtn = newsletterForm.querySelector('button');

  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = 'Subscribed! ✓';
    submitBtn.style.background = '#4CAF50';
    emailInput.value = '';

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }, 1500);
});

const backToTopBtn = document.getElementById('back-to-top');

scroll.on('scroll', (args) => {
  if (args.scroll.y > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  scroll.scrollTo(0);
});

gsap.from('.hero-text h1', {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('#video-container', {
  scrollTrigger: {
    trigger: '#video-container',
    scroller: '#main',
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1
  },
  scale: 0.8,
  opacity: 0
});

gsap.utils.toArray('.elem').forEach((elem, i) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      scroller: '#main',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    },
    y: 100,
    opacity: 0,
    duration: 1,
    delay: i * 0.1
  });
});

gsap.from('.product-card', {
  scrollTrigger: {
    trigger: '#page3',
    scroller: '#main',
    start: 'top 60%'
  },
  y: 100,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('.about-text', {
  scrollTrigger: {
    trigger: '#about-section',
    scroller: '#main',
    start: 'top 60%'
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.about-image', {
  scrollTrigger: {
    trigger: '#about-section',
    scroller: '#main',
    start: 'top 60%'
  },
  x: 100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.newsletter-container', {
  scrollTrigger: {
    trigger: '#newsletter',
    scroller: '#main',
    start: 'top 70%'
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      scroll.scrollTo(target);
    }
  });
});

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

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

const handleResize = debounce(() => {
  scroll.update();
  ScrollTrigger.refresh();
}, 250);

window.addEventListener('resize', handleResize);

playButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    playButton.click();
  }
});

const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = fullscreenMenu;

function trapFocus(element) {
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusable = focusableContent[0];
  const lastFocusable = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
    if (e.key === 'Escape') {
      closeMenuBtn.click();
    }
  });
}

menuBtn.addEventListener('click', () => {
  trapFocus(modal);
});

const preloadVideo = () => {
  const video = document.querySelector('#video-container video');
  if (video) {
    video.load();
  }
};

window.addEventListener('load', preloadVideo);

console.log('%c Welcome to Two Good Co! ', 'background: #2e2e2e; color: #f7f7f7; font-size: 20px; padding: 10px;');
console.log('%c Making a difference, one meal at a time ', 'color: #d4a574; font-size: 14px;');

window.addEventListener('error', (e) => {
  console.error('An error occurred:', e.error);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    video.pause();
  }
});

function showCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    console.log('Cookie consent not given');
  }
}

function trackEvent(category, action, label) {
  console.log(`Track: ${category} - ${action} - ${label}`);
}

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('E-commerce', 'Add to Cart', btn.closest('.product-card').querySelector('h3').textContent);
  });
});

function init() {
  console.log('Two Good Co. website initialized successfully! 🎉');
  scroll.update();
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  }
});

if ('serviceWorker' in navigator) {
}