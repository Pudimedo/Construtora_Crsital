let currentIndex = 0;
const images = document.querySelectorAll('.container_img img');
const dots = document.querySelectorAll('.dot');
const carouselImages = document.querySelector('.carousel_images');

carouselImages.style.width = String(images.length * 100) + '%' // Define a largura do slider conforme a quantidade de imagens

function showSlide(index) {
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }

    const offsetX = -100 / images.length * currentIndex;
    carouselImages.style.transform = `translateX(${offsetX}%)`;


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