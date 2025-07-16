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

document.getElementById("menu_toggle").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("open");
});

// Adicionar evento drag para mover a imagem do slider no desktop
carouselImages.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.pageX;
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const deltaX = event.pageX - startX;

    // Apenas move se delta for significativo
    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // Mover para esquerda
            moveSlide(-1);
        } else {
            // Mover para direita
            moveSlide(1);
        }
        isDragging = false; // trava até soltar o mouse
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});


// Adicionar evento drag para mover a imagem do slider no desktop
carouselImages.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    isDragging = true;
});

carouselImages.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    const deltaX = event.touches[0].clientX - startX;

    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0){
            moveSlide(-1)
        }

        else{ 
            moveSlide(1)
        }
        isDragging = false;
    }
});

carouselImages.addEventListener('touchend', () => {
    isDragging = false;
});