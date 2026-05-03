document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------
       Grab everything we need first
    --------------------------------*/

    const menuBtn = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav");

    const aboutText = document.querySelector(".about-text");
    const serviceCards = document.querySelectorAll(".service-card");
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const footerSections = document.querySelectorAll(".footer-section");

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");
    const heroContent = document.querySelector(".hero-content");

    const form = document.querySelector(".footer-form form");


    /* ------------------------------
       Mobile Hamburger Toggle
       Just opens and closes menu
    --------------------------------*/

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });


    /* ------------------------------
       Scroll Reveal Animations
       This gives that startup feel
    --------------------------------*/

    const revealOnScroll = () => {

        const triggerBottom = window.innerHeight * 0.85;

        // About section slides in from left
        if (
            aboutText &&
            aboutText.getBoundingClientRect().top < window.innerHeight - 100
        ) {
            aboutText.classList.add("reveal");
        }

        // Services stagger animation
        serviceCards.forEach((card, index) => {
            if (
                !card.classList.contains("reveal-up") &&
                card.getBoundingClientRect().top < triggerBottom
            ) {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add("reveal-up");
            }
        });

        // Testimonials stagger animation
        testimonialCards.forEach((card, index) => {
            if (
                !card.classList.contains("reveal-up") &&
                card.getBoundingClientRect().top < triggerBottom
            ) {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add("reveal-up");
            }
        });

        // Footer sections fade up one by one
        footerSections.forEach((section, index) => {
            if (
                section.getBoundingClientRect().top < window.innerHeight - 50
            ) {
                section.style.animationDelay = `${index * 0.2}s`;
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run once on load


    /* ------------------------------
       Smooth Scrolling
       Makes navigation feel premium
    --------------------------------*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId = this.getAttribute("href");
            let section;

            // Booking buttons always go to footer
            if (
                targetId === "#contact" ||
                targetId === "#book" ||
                targetId === "#appointment"
            ) {
                section = document.querySelector(".footer");
            } else {
                section = document.querySelector(targetId);
            }

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });

                // Close mobile menu if open
                if (navMenu.classList.contains("open")) {
                    menuBtn.classList.remove("open");
                    navMenu.classList.remove("open");
                }
            }
        });
    });


    /* ------------------------------
       Ripple Effect for Buttons
       Makes it feel like real product
    --------------------------------*/

    const allButtons = document.querySelectorAll(
        ".btn, .btn-primary, .btn-secondary, .btn-cta, .footer-form button"
    );

    allButtons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            const rect = button.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });


    /* ------------------------------
       Hero Parallax Effect
       Subtle depth = luxury feel
    --------------------------------*/

    if (hero) {
        hero.addEventListener("mousemove", (e) => {

            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;

            heroImage.style.transform = `translate(${x}px, ${y}px)`;
            heroContent.style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }


    /* ------------------------------
       Form Validation Animation
       Elegant shake instead of ugly popup
    --------------------------------*/

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = form.querySelectorAll("input, textarea");
            let isValid = true;

            inputs.forEach(input => {

                if (!input.value.trim()) {

                    input.classList.add("input-error");
                    isValid = false;

                    // Remove shake after animation
                    setTimeout(() => {
                        input.classList.remove("input-error");
                    }, 500);
                }
            });

            // If everything is filled properly
            if (isValid) {

                alert("Appointment request submitted successfully!");
                form.reset();
            }
        });
    }

});
/* =========================
   TESTIMONIAL CAROUSEL
========================= */

const slides = document.querySelectorAll('.testimonial-slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let interval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = index;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAutoSlide() {
    interval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Initialize
dots[0].classList.add('active');
startAutoSlide();