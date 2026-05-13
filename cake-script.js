// ============ SLIDESHOW LOGIC ============
const images = [
    'photo6.JPG',
    'photo5.JPG',
    'photo3.JPG',
    'photo4.JPG',
    'photo7.JPG',
    'photo8.JPG',
    'photo9.JPG',
    'photo10.JPG',
    'photo11.JPG',
    'photo12.JPG'
];
// If you have more photos, just add them to the list above!

let currentIndex = 0;
const slideImg = document.getElementById('slideshow-img');

function nextSlide() {
    if (!slideImg) return;

    // Fade out
    slideImg.style.opacity = '0';

    setTimeout(() => {
        // Change image
        currentIndex = (currentIndex + 1) % images.length;
        slideImg.src = images[currentIndex];

        // Wait for image to load before fading in
        slideImg.onload = () => {
            slideImg.style.opacity = '1';
        };
        // Fallback if image fails to load
        slideImg.onerror = () => {
            slideImg.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="%233d0f2b"/><text x="300" y="200" text-anchor="middle" fill="%23ffb6c1" font-size="60">📸</text></svg>`;
            slideImg.style.opacity = '1';
        };
    }, 1000);
}

// Start slideshow if element exists
if (slideImg) {
    setInterval(nextSlide, 4000);
}

// ============ SCROLL REVEAL ============
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// ============ HEARTS RAIN (Canvas) ============
const canvas = document.getElementById('hearts-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let hearts = [];
    const heartColors = [
        'rgba(255, 105, 180, 0.7)',
        'rgba(255, 182, 193, 0.5)',
        'rgba(139, 26, 74, 0.6)',
        'rgba(212, 73, 125, 0.6)',
        'rgba(255, 192, 203, 0.4)',
        'rgba(180, 40, 90, 0.5)',
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Heart {
        constructor() {
            this.reset();
            this.y = Math.random() * -canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 14 + 8;
            this.speed = Math.random() * 1.5 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
        }

        update() {
            this.y += this.speed;
            this.wobble += this.wobbleSpeed;
            this.x += this.wind + Math.sin(this.wobble) * 0.5;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 30) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            const s = this.size;
            ctx.beginPath();
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
            ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
            ctx.closePath();

            ctx.fillStyle = this.color;
            ctx.shadowColor = 'rgba(255, 105, 180, 0.3)';
            ctx.shadowBlur = 10;
            ctx.fill();

            ctx.restore();
        }
    }

    const HEART_COUNT = 60;
    for (let i = 0; i < HEART_COUNT; i++) {
        hearts.push(new Heart());
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animateHearts);
    }
    animateHearts();
}
