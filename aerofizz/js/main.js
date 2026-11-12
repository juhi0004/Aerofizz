/* ==========================================
   AEROFIZZ — Main JavaScript
   ========================================== */

// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    initBubbles();
    initNavbar();
    initScrollAnimations();
    initActiveNavHighlight();
    initFlavourSelector();
});

// ========== FLOATING BUBBLES ==========
function initBubbles() {
    const container = document.getElementById('bubbles');
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container);
    }

    // Continuously add new bubbles
    setInterval(() => {
        if (container.children.length < 20) {
            createBubble(container);
        }
    }, 3000);
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 20 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);

    // Remove bubble after animation ends to prevent DOM buildup
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, (duration + delay) * 1000);
}

// ========== NAVBAR ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ========== SCROLL ANIMATIONS (Intersection Observer) ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations slightly
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ========== ACTIVE NAV HIGHLIGHT ==========
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========== SCROLL TO TOP ==========
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== CART / TOAST ==========
function addToCart(drinkName) {
    const toast = document.getElementById('cartToast');
    const title = document.getElementById('toastTitle');
    const message = document.getElementById('toastMessage');

    title.textContent = 'Added to Cart!';
    message.textContent = `${drinkName} has been added to your cart.`;

    toast.classList.add('show');

    // Auto-hide after 3 seconds
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        closeToast();
    }, 3000);
}

function closeToast() {
    document.getElementById('cartToast').classList.remove('show');
}

// ========== PLAN SELECTION ==========
function selectPlan(planName) {
    const modal = document.getElementById('planModal');
    const title = document.getElementById('modalTitle');
    const message = document.getElementById('modalMessage');

    title.textContent = 'Great Choice!';
    message.textContent = `You've selected the ${planName}. Enter your details to proceed.`;

    modal.classList.add('show');
}

function handlePlanForm(e) {
    e.preventDefault();
    const modal = document.getElementById('planModal');

    // Show success in the modal
    modal.querySelector('.modal-icon').textContent = '✅';
    modal.querySelector('h3').textContent = 'Order Confirmed!';
    modal.querySelector('p').textContent = 'Thank you! Your order has been placed. We\'ll reach out soon.';
    modal.querySelector('form').style.display = 'none';

    setTimeout(() => {
        closeModal('planModal');
        // Reset modal content
        setTimeout(() => {
            modal.querySelector('.modal-icon').textContent = '🎉';
            modal.querySelector('form').style.display = 'block';
            modal.querySelector('form').reset();
        }, 500);
    }, 2500);
}

// ========== PARTNER MODAL ==========
function openPartnerModal() {
    document.getElementById('partnerModal').classList.add('show');
}

function handlePartnerForm(e) {
    e.preventDefault();
    const modal = document.getElementById('partnerModal');

    modal.querySelector('.modal-icon').textContent = '✅';
    modal.querySelector('h3').textContent = 'Request Submitted!';
    modal.querySelector('p').textContent = 'Thank you for your interest! Our team will contact you within 48 hours.';
    modal.querySelector('form').style.display = 'none';

    setTimeout(() => {
        closeModal('partnerModal');
        setTimeout(() => {
            modal.querySelector('.modal-icon').textContent = '🤝';
            modal.querySelector('h3').textContent = 'Become a Retail Partner';
            modal.querySelector('p').textContent = 'Join the AEROFIZZ family! Fill in your details and we\'ll get in touch.';
            modal.querySelector('form').style.display = 'block';
            modal.querySelector('form').reset();
        }, 500);
    }, 2500);
}

// ========== CLOSE MODAL ==========
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// ========== CONTACT FORM ==========
function handleContactForm(e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Validate Full Name
    if (fullName.value.trim().length < 2) {
        showError('nameError', 'Please enter your full name (at least 2 characters).');
        fullName.classList.add('invalid');
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        email.classList.add('invalid');
        isValid = false;
    }

    // Validate Subject
    if (subject.value.trim().length < 3) {
        showError('subjectError', 'Please enter a subject (at least 3 characters).');
        subject.classList.add('invalid');
        isValid = false;
    }

    // Validate Message
    if (message.value.trim().length < 10) {
        showError('messageError', 'Please enter a message (at least 10 characters).');
        message.classList.add('invalid');
        isValid = false;
    }

    if (isValid) {
        // Hide form, show success
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
    }
}

function showError(elementId, msg) {
    document.getElementById(elementId).textContent = msg;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.classList.remove('invalid');
    });
}

function resetForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
    clearErrors();
}

// Remove invalid state on input
document.addEventListener('input', (e) => {
    if (e.target.matches('.form-group input, .form-group textarea')) {
        e.target.classList.remove('invalid');
        const errorEl = e.target.parentElement.querySelector('.error-message');
        if (errorEl) errorEl.textContent = '';
    }
});

// ========== HERO FLAVOUR & SIZE SELECTOR (NIKE-STYLE CARD) ==========
const HERO_FLAVOURS = [
    {
        name: 'BERRY BLISS',
        subtitle: 'Strawberry & Raspberry Infusion',
        image: 'images/hero-can.png',
        desc: 'Sweet, fruity and bursting with berry-inspired refreshment. Crafted with natural fruit essences and fine carbonated bubbles for an extraordinary moment.',
        bg: 'linear-gradient(135deg, #70cfc5 0%, #99E1D9 45%, #5ebfb5 100%)',
        prices: { '250ml': '₹40.00', '330ml': '₹55.00', '500ml': '₹75.00', '4-pack': '₹149.00' }
    },
    {
        name: 'BLUE RUSH',
        subtitle: 'Blueberry & Citrus Zest',
        image: 'images/blue-can.png',
        desc: 'A vibrant combination of blueberry sweetness and crisp citrusy freshness, energized with fine effervescent sparkle.',
        bg: 'linear-gradient(135deg, #5bb4cf 0%, #99E1D9 50%, #4ea5cf 100%)',
        prices: { '250ml': '₹40.00', '330ml': '₹55.00', '500ml': '₹75.00', '4-pack': '₹149.00' }
    },
    {
        name: 'MANGO GLOW',
        subtitle: 'Sun-Drenched Tropical Mango',
        image: 'images/mango-glow.png',
        desc: 'A luscious tropical mango burst with sun-drenched sweetness and vibrant fizz for everyday joy.',
        bg: 'linear-gradient(135deg, #7ecebe 0%, #99E1D9 45%, #e0ab77 100%)',
        prices: { '250ml': '₹40.00', '330ml': '₹55.00', '500ml': '₹75.00', '4-pack': '₹149.00' }
    },
    {
        name: 'CITRUS WAVE',
        subtitle: 'Lemon & Lime Crisp',
        image: 'images/citrus-wave.png',
        desc: 'Zesty Italian lemon and chilled lime with an electric pop of bubbly coolness to quench any thirst.',
        bg: 'linear-gradient(135deg, #6ec6ba 0%, #99E1D9 45%, #62bd93 100%)',
        prices: { '250ml': '₹40.00', '330ml': '₹55.00', '500ml': '₹75.00', '4-pack': '₹149.00' }
    }
];

let currentFlavourIndex = 0;
let currentSize = '250ml';

function initFlavourSelector() {
    const dots = document.querySelectorAll('.flavour-dot');
    const sizePills = document.querySelectorAll('.size-pill');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');

    if (!dots.length) return;

    // Dot click listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            selectFlavour(index);
        });
    });

    // Arrow button listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIndex = (currentFlavourIndex - 1 + HERO_FLAVOURS.length) % HERO_FLAVOURS.length;
            selectFlavour(nextIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentFlavourIndex + 1) % HERO_FLAVOURS.length;
            selectFlavour(nextIndex);
        });
    }

    // Size pill click listeners
    sizePills.forEach(pill => {
        pill.addEventListener('click', () => {
            sizePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentSize = pill.getAttribute('data-size');
            updateHeroPrice();
        });
    });
}

function selectFlavour(index) {
    if (index === currentFlavourIndex && document.getElementById('heroCan').getAttribute('src')) {
        return;
    }
    currentFlavourIndex = index;
    const flavour = HERO_FLAVOURS[index];

    // Update active dot
    const dots = document.querySelectorAll('.flavour-dot');
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });

    // Update Counter
    const counter = document.getElementById('heroCounter');
    if (counter) {
        counter.textContent = `0${index + 1} / 04`;
    }

    // Update Text Elements
    const title = document.getElementById('heroFlavourName');
    const desc = document.getElementById('heroDesc');
    const card = document.getElementById('heroCard');
    const can = document.getElementById('heroCan');

    if (title) title.textContent = flavour.name;
    if (desc) desc.textContent = flavour.desc;

    // Smooth Section Background Update (full-bleed hero)
    const heroSection = document.querySelector('.hero');
    if (heroSection && flavour.bg) {
        heroSection.style.background = flavour.bg;
    }

    // Smooth Can Transition
    if (can) {
        can.style.opacity = '0';
        can.style.transform = 'rotate(-14deg) scale(0.92) translateY(12px)';

        setTimeout(() => {
            can.src = flavour.image;
            can.style.opacity = '1';
            can.style.transform = 'rotate(-14deg) scale(1) translateY(0)';
        }, 180);
    }

    updateHeroPrice();
}

function updateHeroPrice() {
    const priceEl = document.getElementById('heroPrice');
    if (priceEl && HERO_FLAVOURS[currentFlavourIndex]) {
        const prices = HERO_FLAVOURS[currentFlavourIndex].prices;
        priceEl.textContent = prices[currentSize] || prices['250ml'] || '₹40.00';
    }
}

function addCurrentHeroToCart() {
    const flavour = HERO_FLAVOURS[currentFlavourIndex];
    if (flavour) {
        addToCart(`${flavour.name} (${currentSize.toUpperCase()})`);
    }
}


