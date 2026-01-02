// Particle Background Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offset = 80;
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.navbar ul li');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    observer.observe(card);
});

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    observer.observe(card);
});

document.querySelectorAll('.scholarship-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    observer.observe(card);
});

document.querySelectorAll('.certificate-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    observer.observe(card);
});

document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Contact Form Handling


function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Download CV Button with Toast Notification
const downloadCvBtn = document.getElementById('download-cv');

downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #8b5cf6, #c084fc);
        color: white;
        padding: 18px 30px;
        border-radius: 15px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    toast.innerHTML = '<i class="fas fa-check-circle"></i> CV download started!';
    document.body.appendChild(toast);

    // 2. Create temporary download link
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1AyBDgHYYrszJtKSQ_sU6kTOfU3ZgbjRL';   // path inside your repo
    link.download = 'Resume.pdf';        // filename for user

    // 3. Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 4. Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);

    console.log('CV download initiated');
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-img');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 10, 30, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(139, 92, 246, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 10, 30, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Project Card Interaction
document.querySelectorAll('.certificate-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // stop instant navigation

        // get the actual <a> element
        const anchor = e.target.closest('.certificate-link');
        const url = anchor.getAttribute('href');

        const certificateName = anchor
            .closest('.certificate-card')
            .querySelector('h3')
            .textContent;

        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #8b5cf6, #c084fc);
            color: white;
            padding: 18px 30px;
            border-radius: 15px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
            animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
            max-width: 350px;
        `;

        toast.innerHTML = `<i class="fas fa-external-link-alt"></i> Opening ${certificateName} certificate...`;
        document.body.appendChild(toast);

        // wait for toast to finish, then open link
        setTimeout(() => {
            toast.remove();
            window.open(url, '_blank'); // open AFTER toast
        }, 3000);
    });
});


// Skill card hover effect with tilt
document.querySelectorAll('.skill-card').forEach(card => {
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in elements
    setTimeout(() => {
        document.querySelectorAll('.home-info > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Typing cursor effect
setInterval(() => {
    const typingSpans = document.querySelectorAll('.home-info h2 span::before');
    typingSpans.forEach(span => {
        span.style.borderColor = span.style.borderColor === 'transparent' ? '#8b5cf6' : 'transparent';
    });
}, 500);

// Mouse trail effect (optional - can be disabled)
let mouseTrail = [];
const maxTrail = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > maxTrail) {
        mouseTrail.shift();
    }
});

// Scroll reveal animation for section titles
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Enhanced form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.querySelector('i').style.color = '#c084fc';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
        if (!this.value) {
            this.parentElement.querySelector('i').style.color = '#8b5cf6';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value) {
            this.parentElement.querySelector('i').style.color = '#c084fc';
        } else {
            this.parentElement.querySelector('i').style.color = '#8b5cf6';
        }
    });
});

// Console welcome message
console.log('%c👋 Welcome to my portfolio!', 'font-size: 24px; color: #8b5cf6; font-weight: bold;');
console.log('%cFeel free to explore the code!', 'font-size: 16px; color: #c084fc;');
console.log('%cBuilt with 💜 by Arpita Tripathi', 'font-size: 14px; color: #e0e0e0;');

// Easter egg: Type 'magic' in console to trigger special effect
window.magic = function() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const magicStyle = document.createElement('style');
    magicStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(magicStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
        magicStyle.remove();
    }, 6000);
    
    console.log('%c✨ Magic activated! ✨', 'font-size: 20px; color: #c084fc; font-weight: bold;');
};

console.log('%cTip: Type magic() to see something special! ✨', 'font-size: 12px; color: #a78bfa; font-style: italic;');

console.log('Portfolio loaded successfully! ✨');


// ==========================
// EMAILJS INIT
// ==========================
(function () {
  emailjs.init("y7sKUupA_E9DdTGGh"); // your public key
})();

// ==========================
// TOAST FUNCTION
// ==========================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    loading: "⏳"
  };

  toast.innerHTML = `
    <span>${icons[type]}</span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// ==========================
// CONTACT FORM HANDLER
// ==========================
document.getElementById("send-btn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    showToast("Please fill all fields.", "error");
    return;
  }

  showToast("Sending your message...", "loading");

  emailjs
    .send(
      "service_qj3fpog",      // your service ID
      "template_60n7yej",     // your template ID
      {
        name: name,
        email: email,
        subject: subject, // OR title: subject if your template uses {{title}}
        message: message
      }
    )
    .then(
      function () {
        showToast("Message sent successfully! 🎉", "success");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
      },
      function (error) {
        showToast("Failed to send message. Try again.", "error");
        console.error("EmailJS Error:", error);
      }
    );
});
