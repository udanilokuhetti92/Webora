// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const testimonialTrack = document.querySelector('.testimonials-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.getElementById('form');

contactForm.addEventListener('submit', handleFormSubmit);

// Sticky Header
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Animation on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementHeight = el.getBoundingClientRect().height;
    const windowHeight = window.innerHeight;
    
    // If element is in viewport
    if (elementTop < windowHeight - elementHeight / 4) {
      el.classList.add('is-visible');
    }
  });
}

// Mobile Menu Toggle
function toggleMenu() {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Close menu when clicking on a link
function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// Smooth scroll to section
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const headerHeight = header.getBoundingClientRect().height;
    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    closeMenu();
  }
}

// Testimonial Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const slideWidth = 100; // 100%

function showSlide(index) {
  if (index < 0) {
    currentSlide = testimonials.length - 1;
  } else if (index >= testimonials.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Auto slide testimonials
let testimonialInterval;

function startTestimonialInterval() {
  testimonialInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopTestimonialInterval() {
  clearInterval(testimonialInterval);
}

// Form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const projectInput = document.getElementById('project');
    const successCard = document.querySelector('.card'); 
    const messageText = document.querySelector('.message-text'); 
    
    // Simple validation
    if (!nameInput.value || !emailInput.value || !projectInput.value) {
      successCard.style.display = 'block';
      messageText.textContent = 'Please fill in all fields';
      
      // Hide after 3 seconds
      setTimeout(() => {
        successCard.style.display = 'none';
      }, 3000);
      
      return;
    }
    
    // Set success message dynamically
    messageText.textContent = `Thank you, we'll contact you soon!`;
    
    // Show the success card
    successCard.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
      successCard.style.display = 'none';
    }, 3000);
    
    // Reset form
    contactForm.reset();
}
  
  // Function to show popup
  function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    
    popupMessage.textContent = message;
    popup.classList.add('show');
    
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000); // popup disappears after 3 seconds
  }
  

// Add a class to active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - header.clientHeight - 50) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === currentSection) {
      item.classList.add('active');
    }
  });
}

// Init Animations
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(el => {
    // Add delay classes for sequential animations
    if (el.classList.contains('delay-100')) {
      el.style.transitionDelay = '100ms';
    } else if (el.classList.contains('delay-200')) {
      el.style.transitionDelay = '200ms';
    } else if (el.classList.contains('delay-300')) {
      el.style.transitionDelay = '300ms';
    } else if (el.classList.contains('delay-400')) {
      el.style.transitionDelay = '400ms';
    } else if (el.classList.contains('delay-500')) {
      el.style.transitionDelay = '500ms';
    }
  });
  
  // Trigger initial animation check
  handleScroll();
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', initAnimations);
window.addEventListener('resize', handleScroll);

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', smoothScroll);
});

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopTestimonialInterval();
    startTestimonialInterval();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopTestimonialInterval();
    startTestimonialInterval();
  });
}

if (testimonialTrack) {
  testimonialTrack.addEventListener('mouseenter', stopTestimonialInterval);
  testimonialTrack.addEventListener('mouseleave', startTestimonialInterval);
  startTestimonialInterval();
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Mobile menu functionality
document.addEventListener('click', (e) => {
  const isClickInsideNav = navLinks.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);
  
  if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
    closeMenu();
  }
});

// Add active class to hamburger when menu is open
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
});

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  setActiveNavLink();
});