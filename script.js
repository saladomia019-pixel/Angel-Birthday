// ============================================================
// SHARED SCRIPTS — Birthday Website
// ============================================================

// ============ HEARTS RAIN (Canvas) ============
function initHearts() {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let hearts = [];
    const colors = [
        'rgba(255,105,180,0.7)', 'rgba(255,182,193,0.5)',
        'rgba(139,26,74,0.6)', 'rgba(212,73,125,0.6)',
        'rgba(255,192,203,0.4)', 'rgba(180,40,90,0.5)'
    ];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    class Heart {
        constructor(startAbove) {
            this.reset();
            if (startAbove) this.y = Math.random() * -canvas.height;
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 14 + 8;
            this.speed = Math.random() * 1.5 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rot = Math.random() * Math.PI * 2;
            this.rotSpd = (Math.random() - 0.5) * 0.02;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobSpd = Math.random() * 0.03 + 0.01;
        }
        update() {
            this.y += this.speed;
            this.wobble += this.wobSpd;
            this.x += this.wind + Math.sin(this.wobble) * 0.5;
            this.rot += this.rotSpd;
            if (this.y > canvas.height + 30) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.globalAlpha = this.opacity;
            const s = this.size;
            ctx.beginPath();
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
            ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.shadowColor = 'rgba(255,105,180,0.3)';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 50; i++) hearts.push(new Heart(true));

    (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => { h.update(); h.draw(); });
        requestAnimationFrame(animate);
    })();
}

// ============ PAGE TRANSITION ============
function goTo(url) {
    const fade = document.getElementById('page-fade');
    if (fade) { fade.classList.add('active'); setTimeout(() => window.location.href = url, 600); }
    else window.location.href = url;
}

// ============ SCROLL REVEAL ============
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
}

// ============ INIT ON LOAD ============
document.addEventListener('DOMContentLoaded', () => {
    initHearts();
    initReveal();
});
