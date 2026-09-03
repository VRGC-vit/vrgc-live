/**
 * VRGC.exe — Interactive Engine (Obsidian Pulse & INK Games Style)
 * 
 * Updates:
 * - Multi-Model Connected 3D Constellation (Central core + 8 satellite geometric models with dynamic connecting vector lines)
 * - Solid color design philosophy (pure flat shading, high contrast, zero fuzzy gradients)
 * - 3D Card Tilt Physics Perspective
 * - Live Event Countdown Clock
 * - Video Trailer Modal Controller
 * - Game Catalog Filter Tabs
 * - Terminal Auth Gateway Form
 * - Cyberwave Radio Player & Equalizer
 */

document.addEventListener('DOMContentLoaded', () => {
    initThreeJsConnectedConstellation();
    initCustomCursor();
    initAudioController();
    initCardTilt();
    initCountdownTimer();
    initVideoModal();
    initGameFilters();
    initRadioPlayer();
    initTerminalForm();
    initNavbarAndScroll();
    initRevealAnimations();
});

/* ==========================================================================
   1. Three.js Multi-Model Connected 3D Constellation
   ========================================================================== */
function initThreeJsConnectedConstellation() {
    const container = document.getElementById('threejs-hero-container');
    if (!container || typeof THREE === 'undefined') return;

    // Clear previous canvas if any
    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 9.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Solid Lighting (No mushy ambient lighting - crisp directional highlights)
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xA1FF4F, 0.8);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x8B5CF6, 1.0);
    dirLight3.position.set(0, -10, 10);
    scene.add(dirLight3);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    // Group containing all interconnected models
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Central Main Shard (Solid Electric Purple Icosahedron with sharp edges)
    const centralGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const centralMat = new THREE.MeshLambertMaterial({
        color: 0x8B5CF6,
        flatShading: true
    });
    const centralMesh = new THREE.Mesh(centralGeo, centralMat);
    constellationGroup.add(centralMesh);

    // Central Wireframe Edge Accent
    const centralWireGeo = new THREE.WireframeGeometry(centralGeo);
    const centralWireMat = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 1.5 });
    const centralWire = new THREE.LineSegments(centralWireGeo, centralWireMat);
    centralMesh.add(centralWire);

    // Satellite Connected Nodes definitions (Various geometric forms & solid colors)
    const nodeConfigs = [
        { geo: new THREE.OctahedronGeometry(0.7, 0), color: 0xA1FF4F, pos: [3.4, 1.6, 0.8], rotSpeed: [0.02, 0.01] },
        { geo: new THREE.BoxGeometry(0.9, 0.9, 0.9), color: 0xFFFFFF, pos: [-3.2, 1.8, -0.6], rotSpeed: [0.015, -0.02] },
        { geo: new THREE.TetrahedronGeometry(0.8, 0), color: 0xA1FF4F, pos: [2.5, -2.4, 1.2], rotSpeed: [-0.01, 0.02] },
        { geo: new THREE.DodecahedronGeometry(0.75, 0), color: 0x7C3AED, pos: [-2.8, -2.1, 0.5], rotSpeed: [0.02, 0.015] },
        { geo: new THREE.OctahedronGeometry(0.65, 0), color: 0x38BDF8, pos: [0.2, 3.2, -1.0], rotSpeed: [-0.015, -0.01] },
        { geo: new THREE.BoxGeometry(0.7, 0.7, 0.7), color: 0xA1FF4F, pos: [-0.3, -3.3, -0.8], rotSpeed: [0.02, -0.01] },
        { geo: new THREE.TetrahedronGeometry(0.7, 0), color: 0xFFFFFF, pos: [4.2, -0.5, -1.2], rotSpeed: [0.01, 0.02] },
        { geo: new THREE.OctahedronGeometry(0.6, 0), color: 0x8B5CF6, pos: [-4.0, -0.2, 1.4], rotSpeed: [-0.02, 0.01] }
    ];

    const satelliteNodes = [];

    nodeConfigs.forEach((cfg, idx) => {
        const mat = new THREE.MeshLambertMaterial({
            color: cfg.color,
            flatShading: true
        });
        const mesh = new THREE.Mesh(cfg.geo, mat);
        mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

        // Add wireframe edge to satellite node
        const wireGeo = new THREE.WireframeGeometry(cfg.geo);
        const wireMat = new THREE.LineBasicMaterial({ color: 0x111111 });
        const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
        mesh.add(wireMesh);

        constellationGroup.add(mesh);

        satelliteNodes.push({
            mesh: mesh,
            basePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
            rotSpeed: cfg.rotSpeed,
            phaseOffset: idx * 0.8
        });
    });

    // Connected Vector Lines Setup
    // Connecting each satellite node to the central core + to neighbors
    const linePairs = [
        // Connected to Central core (node 0 to 7 -> center)
        [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1], [6, -1], [7, -1],
        // Interconnected node-to-node links
        [0, 4], [4, 1], [1, 7], [7, 3], [3, 5], [5, 2], [2, 6], [6, 0],
        [0, 2], [1, 3]
    ];

    const maxLineVertices = linePairs.length * 2 * 3;
    const linePositions = new Float32Array(maxLineVertices);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xA1FF4F,
        transparent: true,
        opacity: 0.55
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(networkLines);

    // Secondary Solid Line Structure (Core to outer nodes in solid purple)
    const coreLineMaterial = new THREE.LineBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.45
    });
    const coreLineGeometry = new THREE.BufferGeometry();
    const coreLinePositions = new Float32Array(satelliteNodes.length * 2 * 3);
    coreLineGeometry.setAttribute('position', new THREE.BufferAttribute(coreLinePositions, 3));
    const coreLines = new THREE.LineSegments(coreLineGeometry, coreLineMaterial);
    constellationGroup.add(coreLines);

    // Floating Data Node Points
    const nodePointCount = 20;
    const nodePointGeo = new THREE.BufferGeometry();
    const nodePointPos = new Float32Array(nodePointCount * 3);
    for (let i = 0; i < nodePointCount * 3; i += 3) {
        nodePointPos[i] = (Math.random() - 0.5) * 11;
        nodePointPos[i + 1] = (Math.random() - 0.5) * 8;
        nodePointPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    nodePointGeo.setAttribute('position', new THREE.BufferAttribute(nodePointPos, 3));
    const nodePointMat = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.08
    });
    const nodePoints = new THREE.Points(nodePointGeo, nodePointMat);
    constellationGroup.add(nodePoints);

    // Mouse Tracking Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let clock = 0;

    function animate() {
        requestAnimationFrame(animate);
        clock += 0.015;

        // Smooth mouse follow
        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        // Constellation overall rotation and tilt (with scroll parallax)
        const scrollY = window.pageYOffset;
        constellationGroup.rotation.y = clock * 0.2 + currentMouseX * 0.6 + scrollY * 0.0012;
        constellationGroup.rotation.x = clock * 0.1 - currentMouseY * 0.4;
        constellationGroup.position.x = currentMouseX * 1.5;
        constellationGroup.position.y = currentMouseY * 0.8;
        constellationGroup.position.z = -Math.min(scrollY * 0.003, 3);

        // Central mesh local rotation
        centralMesh.rotation.y += 0.01;
        centralMesh.rotation.z += 0.005;

        // Update each satellite node with independent floating oscillation
        satelliteNodes.forEach((node) => {
            node.mesh.rotation.x += node.rotSpeed[0];
            node.mesh.rotation.y += node.rotSpeed[1];

            // Harmonic floating motion
            const floatOffset = Math.sin(clock + node.phaseOffset) * 0.15;
            node.mesh.position.x = node.basePos.x + floatOffset;
            node.mesh.position.y = node.basePos.y + floatOffset * 0.7;
            node.mesh.position.z = node.basePos.z + Math.cos(clock + node.phaseOffset) * 0.15;
        });

        // Update Dynamic Connecting Lines between models
        const posArray = lineGeometry.attributes.position.array;
        let pIdx = 0;

        linePairs.forEach(([idxA, idxB]) => {
            const posA = idxA === -1 ? centralMesh.position : satelliteNodes[idxA].mesh.position;
            const posB = idxB === -1 ? centralMesh.position : satelliteNodes[idxB].mesh.position;

            posArray[pIdx++] = posA.x;
            posArray[pIdx++] = posA.y;
            posArray[pIdx++] = posA.z;

            posArray[pIdx++] = posB.x;
            posArray[pIdx++] = posB.y;
            posArray[pIdx++] = posB.z;
        });
        lineGeometry.attributes.position.needsUpdate = true;

        // Update Core lines
        const corePosArray = coreLineGeometry.attributes.position.array;
        let cIdx = 0;
        satelliteNodes.forEach((node) => {
            corePosArray[cIdx++] = 0;
            corePosArray[cIdx++] = 0;
            corePosArray[cIdx++] = 0;

            corePosArray[cIdx++] = node.mesh.position.x;
            corePosArray[cIdx++] = node.mesh.position.y;
            corePosArray[cIdx++] = node.mesh.position.z;
        });
        coreLineGeometry.attributes.position.needsUpdate = true;

        if (isHeroInViewport) {
            renderer.render(scene, camera);
        }
    }

    let isHeroInViewport = true;
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            isHeroInViewport = entries[0].isIntersecting;
        }, { threshold: 0 });
        heroObserver.observe(heroSection);
    }

    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

/* ==========================================================================
   2. Custom Cursor with Elastic Follower
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderRing);
    }
    renderRing();

    const interactiveElements = document.querySelectorAll('a, button, input, .tilt-card, .game-card, .filter-tab');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        });
    });
}

/* ==========================================================================
   3. Web Audio Micro-Synthesizer SFX
   ========================================================================== */
let audioCtx = null;
let sfxEnabled = true;

function initAudioController() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playHoverSfx() {
        if (!sfxEnabled) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.015, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {}
    }

    function playClickSfx() {
        if (!sfxEnabled) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) {}
    }

    document.querySelectorAll('.btn, .nav-link, .filter-tab, .card-footer, .play-preview-btn').forEach((btn) => {
        btn.addEventListener('mouseenter', playHoverSfx);
        btn.addEventListener('click', playClickSfx);
    });

    if (soundToggle && soundIcon) {
        soundToggle.addEventListener('click', () => {
            sfxEnabled = !sfxEnabled;
            soundIcon.textContent = sfxEnabled ? 'volume_up' : 'volume_off';
            soundToggle.style.color = sfxEnabled ? 'var(--accent-lime)' : 'var(--text-dim)';
            soundToggle.style.borderColor = sfxEnabled ? 'var(--accent-lime)' : 'var(--border-hairline)';
        });
    }
}

/* ==========================================================================
   4. 3D Card Tilt Physics Perspective
   ========================================================================== */
function initCardTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });
}

/* ==========================================================================
   5. Live 48-Hour Countdown Clock
   ========================================================================== */
function initCountdownTimer() {
    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-minutes');
    const secsEl = document.getElementById('timer-seconds');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const targetDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
        secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* ==========================================================================
   6. Video Trailer Modal Controller
   ========================================================================== */
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('modal-backdrop');
    const watchTrailerBtn = document.getElementById('watch-trailer-btn');
    const playPreviewBtns = document.querySelectorAll('.play-preview-btn');

    if (!modal || !modalVideo) return;

    function openModal(videoSrc) {
        if (videoSrc) {
            modalVideo.src = videoSrc;
        }
        modal.classList.add('active');
        modalVideo.play().catch(() => {});
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = '';
    }

    if (watchTrailerBtn) {
        watchTrailerBtn.addEventListener('click', () => {
            openModal('https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-at-night-41544-large.mp4');
        });
    }

    playPreviewBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoUrl = btn.getAttribute('data-video');
            openModal(videoUrl);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   7. Game Catalog Filter Tabs
   ========================================================================== */
function initGameFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const gameCards = document.querySelectorAll('.game-card');

    filterTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            filterTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            gameCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   8. Cyberwave Radio Stream Controller & Equalizer
   ========================================================================== */
function initRadioPlayer() {
    const radioBtn = document.getElementById('radio-play-btn');
    const radioIcon = document.getElementById('radio-icon');
    const radioText = document.getElementById('radio-btn-text');
    const visualizer = document.querySelector('.visualizer-container');
    const trackTitle = document.getElementById('track-title');

    let isPlaying = false;
    let radioOscillator = null;
    let radioGain = null;

    const tracks = [
        'Cyberwave Mix 04 — Obsidian Pulse',
        'Synth Drift // Zero Protocol',
        'Neon Firewall // Darksynth Overdrive',
        'Metaverse Resonance // 144Hz Chiptune'
    ];
    let currentTrackIdx = 0;

    if (!radioBtn || !visualizer) return;

    radioBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            visualizer.classList.add('playing');
            radioIcon.textContent = 'pause';
            radioText.textContent = 'PAUSE STREAM';
            radioBtn.style.background = 'var(--accent-lime)';
            radioBtn.style.color = '#000000';
            radioBtn.style.borderColor = 'var(--accent-lime)';

            currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
            if (trackTitle) trackTitle.textContent = tracks[currentTrackIdx];

            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const ctx = new AudioContext();
                radioOscillator = ctx.createOscillator();
                radioGain = ctx.createGain();

                radioOscillator.type = 'sawtooth';
                radioOscillator.frequency.setValueAtTime(110, ctx.currentTime);

                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(320, ctx.currentTime);

                radioGain.gain.setValueAtTime(0.02, ctx.currentTime);

                radioOscillator.connect(filter);
                filter.connect(radioGain);
                radioGain.connect(ctx.destination);

                radioOscillator.start();
            } catch (e) {}
        } else {
            visualizer.classList.remove('playing');
            radioIcon.textContent = 'play_arrow';
            radioText.textContent = 'PLAY STREAM';
            radioBtn.style.background = '';
            radioBtn.style.color = '';
            radioBtn.style.borderColor = '';

            if (radioOscillator) {
                try {
                    radioOscillator.stop();
                    radioOscillator.disconnect();
                } catch (e) {}
            }
        }
    });
}

/* ==========================================================================
   9. Terminal Auth Gateway Form
   ========================================================================== */
function initTerminalForm() {
    const form = document.getElementById('join-form');
    const input = document.getElementById('join-email');
    const feedback = document.getElementById('form-feedback');
    const registerCrewBtn = document.getElementById('register-crew-btn');

    if (registerCrewBtn) {
        registerCrewBtn.addEventListener('click', () => {
            const joinSection = document.getElementById('join');
            if (joinSection) {
                joinSection.scrollIntoView({ behavior: 'smooth' });
                if (input) input.focus();
            }
        });
    }

    if (!form || !input || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = input.value.trim();

        if (!email || !email.includes('@')) {
            feedback.className = 'form-feedback error';
            feedback.textContent = '[ERR_401]: INVALID METAVERSE KEY IDENTIFIER.';
            return;
        }

        feedback.className = 'form-feedback success';
        feedback.textContent = '[SYS_AUTH]: VERIFYING CREDENTIALS...';

        setTimeout(() => {
            feedback.textContent = `[SUCCESS]: ASYLUM PASS GRANTED TO ${email.toUpperCase()} // WHITELIST CONFIRMED.`;
            input.value = '';
        }, 800);
    });
}

/* ==========================================================================
   10. Navbar Scroll & Mobile Navigation Drawer
   ========================================================================== */
function initNavbarAndScroll() {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-join-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.contains('open');
            if (isOpen) {
                mobileDrawer.classList.remove('open');
            } else {
                mobileDrawer.classList.add('open');
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   11. Optimized Storyboard Scroll Engine (Zero-Thrash Observer)
   ========================================================================== */
function initRevealAnimations() {
    // 1. Base reveal observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Optimized 3D Storyboard Observer (Runs on Compositor, Zero Reflows)
    const storyboardTargets = document.querySelectorAll(
        '.storyboard-card, .event-banner-card, .game-card, .radio-bar-card, .crew-card, .terminal-card'
    );

    const storyboardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('exit-view');
                    entry.target.classList.add('in-view');
                } else {
                    const rect = entry.boundingClientRect;
                    if (rect.top < 0) {
                        // Scrolled past section top -> trigger exit animation
                        entry.target.classList.remove('in-view');
                        entry.target.classList.add('exit-view');
                    } else {
                        // Scrolled back above -> reset to start state
                        entry.target.classList.remove('in-view', 'exit-view');
                    }
                }
            });
        },
        { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );
    storyboardTargets.forEach((target) => storyboardObserver.observe(target));

    // 3. Lightweight rAF Throttled Chapter HUD Tracker
    const chapterIdEl = document.getElementById('storyboard-chap-id');
    const chapterTitleEl = document.getElementById('storyboard-chap-title');

    const chapters = [
        { id: 'hero', act: 'ACT 01', title: 'THE ASYLUM' },
        { id: 'core-loop', act: 'ACT 02', title: 'ARCHITECTURE' },
        { id: 'featured-event', act: 'ACT 03', title: 'SURVIVAL GAUNTLET' },
        { id: 'games', act: 'ACT 04', title: 'GAME TITLES' },
        { id: 'radio', act: 'ACT 05', title: 'CYBERWAVE FM' },
        { id: 'crew', act: 'ACT 06', title: 'THE CREW' },
        { id: 'join', act: 'ACT 07', title: 'AUTH GATEWAY' }
    ];

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset + 220;
                for (let i = chapters.length - 1; i >= 0; i--) {
                    const sec = document.getElementById(chapters[i].id);
                    if (sec && scrollY >= sec.offsetTop) {
                        if (chapterIdEl && chapterTitleEl && chapterIdEl.textContent !== chapters[i].act) {
                            chapterIdEl.textContent = chapters[i].act;
                            chapterTitleEl.textContent = chapters[i].title;

                            const pill = chapterIdEl.parentElement;
                            if (pill) {
                                pill.style.borderColor = 'var(--solid-lime)';
                                setTimeout(() => {
                                    pill.style.borderColor = 'var(--border-medium)';
                                }, 350);
                            }
                        }
                        break;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ==========================================================================
   12. 3D Card Gyroscopic Tilt & Dynamic Depth Physics Engine
   ========================================================================== */
function initCardTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card, .gaming-widget-card, .game-card');

    tiltCards.forEach((card) => {
        let isHovered = false;
        let reqId = null;
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        function updateTiltPhysics() {
            if (!isHovered) return;

            // Damped spring interpolation for liquid-smooth 3D feel
            currentRotX += (targetRotX - currentRotX) * 0.16;
            currentRotY += (targetRotY - currentRotY) * 0.16;

            card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, -12px, 30px)`;

            reqId = requestAnimationFrame(updateTiltPhysics);
        }

        card.addEventListener('mouseenter', () => {
            isHovered = true;
            if (reqId) cancelAnimationFrame(reqId);
            reqId = requestAnimationFrame(updateTiltPhysics);
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const normX = (x / rect.width) * 2 - 1; // -1 to 1
            const normY = (y / rect.height) * 2 - 1; // -1 to 1

            const maxTilt = 15;
            targetRotX = -normY * maxTilt;
            targetRotY = normX * maxTilt;
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            if (reqId) cancelAnimationFrame(reqId);
            targetRotX = 0;
            targetRotY = 0;
            currentRotX = 0;
            currentRotY = 0;
            card.style.transform = '';
        });
    });
}