const arrow_btn_left = document.querySelector('.left');
const arrow_btn_right = document.querySelector('.right');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function changeSlides() {
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    slides[currentSlide].style.display = 'flex';
    slides[currentSlide].style.transform = 'scale(1)';
}
changeSlides();
slides[currentSlide].style.display = 'flex';

arrow_btn_left.addEventListener('click', () => {
    changeSlides();
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
});

arrow_btn_right.addEventListener('click', () => {
    changeSlides();
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
});