document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('menuBtn');
	let open = false;

	// Hamburger menu button toggle
	if (btn) {
		btn.addEventListener('click', () => {
			open = !open;
			btn.classList.toggle('open', open);
			btn.querySelectorAll('span').forEach(s =>
				s.style.background = open ? '#fff' : '#dcdcdc'
			);
		});
	}

	// Sign-in button
	document.getElementById("signinBtn").addEventListener("click", () => {
		window.location.href = "signin.html";
	});

	// --- ✅ FIXED NAVIGATION ---
	// Let <a href="..."> links work naturally (no preventDefault)
	// Handle buttons with data-href
	document.querySelectorAll('button[data-href]').forEach(btn => {
		btn.addEventListener('click', () => {
			const target = btn.getAttribute('data-href');
			if (target) window.location.href = target;
		});
	});

	// Dropdown menu toggle
	const menuBtn = document.getElementById("menuBtn");
	const menuDropdown = document.getElementById("menuDropdown");
	menuBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		menuDropdown.classList.toggle("show");
	});
	document.addEventListener("click", (e) => {
		if (!menuDropdown.contains(e.target)) {
			menuDropdown.classList.remove("show");
		}
	});

	// --- SLIDER ---
	const dots = Array.from(document.querySelectorAll('.slider-indicators .dot'));
	const slides = Array.from(document.querySelectorAll('.hero-media .slide'));
	const header = document.querySelector('.site-header');

	let idx = 0;
	function setSlide(n) {
		slides.forEach(s => s.classList.remove('active'));
		dots.forEach(d => d.classList.remove('active'));
		idx = n % slides.length;
		slides[idx].classList.add('active');
		if (dots[idx]) dots[idx].classList.add('active');
		// toggle header background
		header.classList.remove('slide-0', 'slide-1', 'slide-2', 'slide-3');
		header.classList.add('slide-' + idx);
	}

	setSlide(0);

	let timer = setInterval(() => setSlide((idx + 1) % slides.length), 3000);

	// Pause/resume slider on hover
	const hero = document.querySelector('.hero');
	if (hero) {
		hero.addEventListener('mouseenter', () => clearInterval(timer));
		hero.addEventListener('mouseleave', () => {
			clearInterval(timer);
			timer = setInterval(() => setSlide((idx + 1) % slides.length), 3000);
		});

		// --- Touch swipe support ---
		let touchStartX = 0;
		let touchEndX = 0;

		hero.addEventListener('touchstart', (e) => {
			touchStartX = e.changedTouches[0].screenX;
			clearInterval(timer);
		});
		hero.addEventListener('touchmove', (e) => {
			touchEndX = e.changedTouches[0].screenX;
		});
		hero.addEventListener('touchend', () => {
			const dx = touchEndX - touchStartX;
			const threshold = 30;
			if (Math.abs(dx) > threshold) {
				if (dx < 0) setSlide((idx + 1) % slides.length);
				else setSlide((idx - 1 + slides.length) % slides.length);
			}
			clearInterval(timer);
			timer = setInterval(() => setSlide((idx + 1) % slides.length), 3000);
		});

		// --- Pointer drag (desktop) ---
		let pointerDown = false;
		let lastX = 0;

		hero.addEventListener('pointerdown', (e) => {
			pointerDown = true;
			lastX = e.clientX;
			hero.classList.add('clicking', 'dragging');
			clearInterval(timer);
			e.preventDefault();
		});
		hero.addEventListener('pointermove', (e) => {
			if (!pointerDown) return;
			const dx = e.clientX - lastX;
			const activeImg = slides[idx].querySelector('.device-img');
			if (activeImg) activeImg.style.transform = `translateX(${dx}px)`;
		});
		hero.addEventListener('pointerup', (e) => {
			if (!pointerDown) return;
			pointerDown = false;
			hero.classList.remove('clicking', 'dragging');
			const dx = e.clientX - lastX;
			const threshold = 60;
			const activeImg = slides[idx].querySelector('.device-img');
			if (activeImg) activeImg.style.transform = '';
			if (Math.abs(dx) > threshold) {
				if (dx < 0) setSlide((idx + 1) % slides.length);
				else setSlide((idx - 1 + slides.length) % slides.length);
			}
			clearInterval(timer);
			timer = setInterval(() => setSlide((idx + 1) % slides.length), 3000);
		});
	}
});
