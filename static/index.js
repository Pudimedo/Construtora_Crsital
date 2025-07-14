let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.dot');
const carouselImages = document.querySelector('.carousel-images');

function showSlide(index) {
    // Garantir que o índice esteja dentro do limite
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }

    // Atualiza a posição do carousel com base no índice atual
    const offset = -100/4 * currentIndex;  // Movemos a posição para a esquerda
    carouselImages.style.transform = `translateX(${offset}%)`;

    // Atualizar os pontos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentIndex + direction);
}


// Inicializa a exibição da primeira imagem
showSlide(currentIndex);

// Adiciona a transição automática
setInterval(() => {
    moveSlide(1);  // Mover para a próxima imagem a cada 10 segundos
}, 10000);
