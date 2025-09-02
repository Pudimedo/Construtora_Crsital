const carousel = document.querySelector('.carousel');
const carouselImages = document.querySelector('.carousel_images');
let images = document.querySelectorAll('.container_img');
const dotsContainer = document.querySelector('.dots');
const menuToggle = document.getElementById("menu_toggle");
const menu = document.getElementById("menu");

let currentIndex = 1; // Começamos no índice 1 (o primeiro slide real)
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let slideWidth = 0;
const numImagesOriginal = images.length;


function setupCarousel() {
    // 1. Clonar o primeiro e o último slide para o efeito infinito
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[numImagesOriginal - 1].cloneNode(true);
    
    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, images[0]);

    // Atualiza a lista de 'images' para incluir os clones
    images = document.querySelectorAll('.container_img');
    const numImagesTotal = images.length;

    // 2. Definir a largura do container e de cada imagem
    carouselImages.style.width = `${numImagesTotal * 100}%`;
    images.forEach(imgContainer => {
        imgContainer.style.width = `${100 / numImagesTotal}%`;
    });

    // 3. Posicionar no primeiro slide REAL sem animação
    slideWidth = images[0].clientWidth;
    currentTranslate = -slideWidth;
    carouselImages.style.transform = `translateX(${currentTranslate}px)`;
    
    updateDots();
}

function showSlide() {
    // A transição é controlada aqui
    carouselImages.style.transition = 'transform 0.6s ease-in-out';
    currentTranslate = -currentIndex * slideWidth;
    carouselImages.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
}

function updateDots() {
    if (dotsContainer.children.length === 0) return;
    
    // Calcula o dot ativo baseado no currentIndex, desconsiderando os clones
    let dotIndex;
    if (currentIndex === 0) { // No clone do último slide
        dotIndex = numImagesOriginal - 1;
    } else if (currentIndex === numImagesOriginal + 1) { // No clone do primeiro slide
        dotIndex = 0;
    } else {
        dotIndex = currentIndex - 1;
    }

    // Atualiza a classe 'active'
    for (let i = 0; i < dotsContainer.children.length; i++) {
        dotsContainer.children[i].classList.remove('active');
    }
    dotsContainer.children[dotIndex].classList.add('active');
}

// Lógica para o "salto" mágico do carrossel infinito
function handleTransitionEnd() {
    if (currentIndex === 0) { // Se chegamos no clone da esquerda
        carouselImages.style.transition = 'none'; // Remove a animação
        currentIndex = numImagesOriginal; // Pula para o último slide real
        currentTranslate = -currentIndex * slideWidth;
        carouselImages.style.transform = `translateX(${currentTranslate}px)`;
    }

    if (currentIndex === numImagesOriginal + 1) { // Se chegamos no clone da direita
        carouselImages.style.transition = 'none';
        currentIndex = 1; // Pula para o primeiro slide real
        currentTranslate = -currentIndex * slideWidth;
        carouselImages.style.transform = `translateX(${currentTranslate}px)`;
    }
}

function dragStart(event) {
    isDragging = true;
    startX = getPositionX(event);
    carouselImages.style.transition = 'none'; // Remove a animação para o arrastar ser fluido
    carousel.classList.add('grabbing');
    prevTranslate = currentTranslate;
}

function drag(event) {
    if (!isDragging) return;
    event.preventDefault(); // Previne comportamentos padrão que causam lentidão
    
    const currentPosition = getPositionX(event);
    const movedBy = currentPosition - startX;
    currentTranslate = prevTranslate + movedBy;
    carouselImages.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('grabbing');

    const movedBy = currentTranslate - prevTranslate;

    // Se o usuário arrastou mais de 20% do slide, muda de slide
    if (movedBy < -slideWidth * 0.2 && currentIndex < numImagesOriginal + 1) {
        currentIndex++;
    }
    if (movedBy > slideWidth * 0.2 && currentIndex > 0) {
        currentIndex--;
    }

    showSlide(); // Finaliza o movimento com a transição suave
}


function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Botões de Navegação
function moveSlide(direction) {
    currentIndex += direction;
    showSlide();
}

// Navegação pelos Dots
for (let i = 0; i < dotsContainer.children.length; i++) {
    dotsContainer.children[i].addEventListener('click', () => {
        currentIndex = i + 1; // +1 por causa do clone no início
        showSlide();
    });
}

// Recalcula a largura do slide se a janela mudar de tamanho
window.addEventListener('resize', () => {
    slideWidth = images[0].clientWidth;
    // Reposiciona o slide atual sem animação para evitar quebra de layout
    carouselImages.style.transition = 'none';
    currentTranslate = -currentIndex * slideWidth;
    carouselImages.style.transform = `translateX(${currentTranslate}px)`;
});

// Listener para o final da transição (a mágica do loop)
carouselImages.addEventListener('transitionend', handleTransitionEnd);

// Listeners de Arrastar
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);

// REMOVIDO o { passive: true } para garantir que o preventDefault funcione sem atrasos
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('touchend', dragEnd);

// Menu Toggle
menuToggle.addEventListener("click", () => menu.classList.toggle("open"));


setupCarousel();