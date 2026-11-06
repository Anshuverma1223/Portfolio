 /* =========================================
   PREMIUM PORTFOLIO — JAVASCRIPT
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

document.querySelectorAll(".nav-link, .nav-contact").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        closeMenu();
    }
});


/* =========================================
   2. HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================================
   3. TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typing-text");

const titles = [
    "Web Developer",
    "Creative Thinker",
    "Tech Enthusiast",
    "Lifelong Learner"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (!deleting) {
        characterIndex++;

        typingText.textContent =
            currentTitle.substring(0, characterIndex);

        if (characterIndex === currentTitle.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

        setTimeout(typeEffect, 90);

    } else {
        characterIndex--;

        typingText.textContent =
            currentTitle.substring(0, characterIndex);

        if (characterIndex === 0) {
            deleting = false;

            titleIndex = (titleIndex + 1) % titles.length;

            setTimeout(typeEffect, 350);
            return;
        }

        setTimeout(typeEffect, 45);
    }
}

typeEffect();


/* =========================================
   4. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================
   5. ANIMATED SKILL BARS
========================================= */

const skillsGrid = document.querySelector(".skills-grid");

if (skillsGrid) {

    if ("IntersectionObserver" in window && !reducedMotion) {

        const skillsObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        skillsGrid.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        skillsObserver.observe(skillsGrid);

    } else {

        skillsGrid.classList.add("visible");

    }
}


/* =========================================
   6. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   7. SCROLL PROGRESS INDICATOR
========================================= */

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        scrollProgress.style.width = "0%";
        return;
    }

    const progress =
        (window.scrollY / scrollableHeight) * 100;

    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


/* =========================================
   8. BACKGROUND PARTICLES
========================================= */

const canvas = document.getElementById("particles");
const context = canvas.getContext("2d");

let particles = [];
let animationFrameId = null;
let canvasWidth = 0;
let canvasHeight = 0;

const pointer = {
    x: null,
    y: null
};

const particleCount = () => {
    return Math.min(
        65,
        Math.floor((window.innerWidth * window.innerHeight) / 18000)
    );
};

function resizeCanvas() {

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    createParticles();
}

function createParticles() {

    particles = [];

    const total = particleCount();

    for (let i = 0; i < total; i++) {

        particles.push({

            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,

            radius: Math.random() * 1.5 + 0.4,

            speedX: (Math.random() - 0.5) * 0.35,
            speedY: (Math.random() - 0.5) * 0.35,

            opacity: Math.random() * 0.45 + 0.12

        });

    }
}

function drawParticles() {

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle, index) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles around the screen.

        if (particle.x < 0) particle.x = canvasWidth;
        if (particle.x > canvasWidth) particle.x = 0;

        if (particle.y < 0) particle.y = canvasHeight;
        if (particle.y > canvasHeight) particle.y = 0;

        // Draw individual particles.

        context.beginPath();

        context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle =
            `rgba(180, 150, 255, ${particle.opacity})`;

        context.fill();

        // Connect nearby particles.

        for (let j = index + 1; j < particles.length; j++) {

            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) {

                const opacity = (1 - distance / 115) * 0.13;

                context.beginPath();

                context.moveTo(particle.x, particle.y);
                context.lineTo(other.x, other.y);

                context.strokeStyle =
                    `rgba(139, 92, 246, ${opacity})`;

                context.lineWidth = 0.7;

                context.stroke();

            }

        }

    });

    animationFrameId = requestAnimationFrame(drawParticles);
}

function startParticles() {

    if (reducedMotion) {
        canvas.style.display = "none";
        return;
    }

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(drawParticles);
    }
}

function stopParticles() {

    if (animationFrameId) {

        cancelAnimationFrame(animationFrameId);

        animationFrameId = null;
    }
}

resizeCanvas();
startParticles();

window.addEventListener("resize", resizeCanvas);

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        stopParticles();

    } else {

        startParticles();

    }

});


/* =========================================
   9. SUBTLE 3D PROJECT CARD EFFECT
========================================= */

const projectCards = document.querySelectorAll(".project-card");

const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (canHover && !reducedMotion) {

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((mouseX - centerX) / centerX) * 2.5;
            const rotateX = ((centerY - mouseY) / centerY) * 2.5;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================
   10. CONTACT FORM
========================================= */

 const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Your actual email address
const recipientEmail = "anshubca2025@gmail.com";

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const subject = encodeURIComponent(
        `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
    );

    const mailtoLink =
        `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    formStatus.textContent =
        "working update, Opening your email application. Please send the message there.";

    window.location.href = mailtoLink;

});

/* =========================================
   11. AUTOMATIC COPYRIGHT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   12. OPTIONAL CONSOLE MESSAGE
========================================= */

console.log(
    "%c Welcome to my portfolio! ",
    "background: #8b5cf6; color: white; padding: 8px; border-radius: 5px;"
);

/* =================================
   5 STAR FEEDBACK SYSTEM
================================= */

const feedbackStars = document.querySelectorAll(
    ".feedback-stars span"
);

const ratingText = document.getElementById("ratingText");

const feedbackForm = document.getElementById("feedbackForm");

let selectedRating = 0;

const ratingLabels = [
    "Poor",
    "Fair",
    
];

feedbackStars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating = Number(star.dataset.value);

        feedbackStars.forEach(item => {

            item.classList.toggle(
                "active",
                Number(item.dataset.value) <= selectedRating
            );

        });

        ratingText.textContent =
            ratingLabels[selectedRating - 1];

    });

});

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(e) {

        e.preventDefault();

        if (selectedRating === 0) {
            alert("Please select a star rating!");
            return;
        }

        const feedback = {
            name: document.getElementById("feedbackName").value,
            email: document.getElementById("feedbackEmail").value,
            rating: selectedRating,
            message: document.getElementById("feedbackMessage").value
        };

        console.log("Portfolio Feedback:", feedback);

        document.getElementById("feedbackStatus").textContent =
            "Thank you for your valuable feedback!";

        feedbackForm.reset();

        selectedRating = 0;

        feedbackStars.forEach(star => {
            star.classList.remove("active");
        });

        ratingText.textContent = "Select your rating";

    });

}

<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-586GDVDM"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
