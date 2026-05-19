const arrow_btn_left = document.querySelector('.team-section .left');
const arrow_btn_right = document.querySelector('.team-section .right');
const slides = document.querySelectorAll('.team-section .slide');
let currentSlide = 0;

function changeSlides() {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[currentSlide].classList.add('active');
}

arrow_btn_left.addEventListener('click', () => {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    changeSlides();
});

arrow_btn_right.addEventListener('click', () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    changeSlides();
});

changeSlides();
