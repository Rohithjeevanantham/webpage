// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    init: function() {
        // Check if elements exist before initializing
        if (!this.dot || !this.outline) return;

        document.addEventListener('mousemove', (e) => {
            gsap.to(this.dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(this.outline, {
                x: e.clientX - 16,
                y: e.clientY - 16,
                duration: 0.3
            });
        });

        // Hover effects
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(this.outline, {
                    scale: 1.5,
                    duration: 0.3
                });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(this.outline, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }
};

// Loading Animation
const loading = {
    screen: document.querySelector('.loading-screen'),
    init: function() {
        if (!this.screen) return;

        // Remove loading screen after 2 seconds
        setTimeout(() => {
            this.screen.style.opacity = '0';
            setTimeout(() => {
                this.screen.style.display = 'none';
                this.animateHero();
            }, 1000);
        }, 2000);
    },
    animateHero: function() {
        const tl = gsap.timeline();
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');

        if (heroTitle) {
            tl.to(heroTitle, {
                opacity: 1,
                y: 0,
                duration: 1
            });
        }

        if (heroSubtitle) {
            tl.to(heroSubtitle, {
                opacity: 1,
                y: 0,
                duration: 1
            }, '-=0.5');
        }
    }
};

// Scroll Animations
const scrollAnimations = {
    init: function() {
        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 1
            });
        });

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach(item => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                x: 0,
                duration: 1
            });
        });

        // Project cards
        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 1
            });
        });
    }
};

// Three.js Background
const threeBackground = {
    init: function() {
        const container = document.getElementById('hero-canvas');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Create particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true
        });
        
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        
        camera.position.z = 1000;

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.x += 0.0005;
            points.rotation.y += 0.0005;
            renderer.render(scene, camera);
        }
        
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
};

// Mobile Menu
const mobileMenu = {
    button: document.querySelector('.menu-button'),
    menu: document.querySelector('.mobile-menu'),
    links: document.querySelectorAll('.mobile-link'),
    init: function() {
        if (!this.button || !this.menu) return;

        this.button.addEventListener('click', () => {
            this.toggle();
        });
        
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.toggle();
            });
        });
    },
    toggle: function() {
        this.menu.classList.toggle('active');
        this.button.classList.toggle('active');
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    cursor.init();
    loading.init();
    scrollAnimations.init();
    threeBackground.init();
    mobileMenu.init();
});

// Fallback for loading screen in case something goes wrong
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 1000);
    }
});
