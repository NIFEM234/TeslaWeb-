const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.style.transform = `translateX(${100 * (i - index)}%)`;
		slide.classList.toggle('active', i === index);
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle('active', i === index);
	});

	currentSlide = index;
}

// Initialize
showSlide(currentSlide);

// Dot click
dots.forEach(dot => {
	dot.addEventListener('click', () => {
		const index = parseInt(dot.dataset.slide);
		showSlide(index);
	});
});
