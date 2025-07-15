let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.dot');
const carouselImages = document.querySelector('.carousel-images');

// Verifica se é modo mobile (menor que 830px)
function isMobile() {
    return window.innerWidth < 830;
}

function showSlide(index) {
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }

    if (isMobile()) {
        const offsetY = -100 / images.length * currentIndex;
        carouselImages.style.transform = `translateY(${offsetY}%)`;
    } else {
        const offsetX = -100 / images.length * currentIndex;
        carouselImages.style.transform = `translateX(${offsetX}%)`;
    }

    // Atualiza os pontinhos
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
}

function moveSlide(direction) {
    showSlide(currentIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-play
setInterval(() => {
    moveSlide(1);
}, 10000);

document.getElementById("menu-toggle").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("open");
});
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function isMobile() {
    return window.innerWidth < 830;
}

function updateArrowIcons() {
    if (isMobile()) {
        prevBtn.innerHTML = "&#9650;"; // seta pra cima
        nextBtn.innerHTML = "&#9660;"; // seta pra baixo
    } else {
        prevBtn.innerHTML = "&#10094;"; // seta pra esquerda
        nextBtn.innerHTML = "&#10095;"; // seta pra direita
    }
}

// Atualiza as setas ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    updateArrowIcons();
    showSlide(currentIndex); // garante o alinhamento correto
});

// Atualiza ao redimensionar
window.addEventListener("resize", () => {
    updateArrowIcons();
    showSlide(currentIndex); // aplica o translate correto
});