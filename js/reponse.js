// Lógica do Menu Mobile
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.querySelector('.nav-menu');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuIcon.classList.toggle('active'); // Para animar o ícone
});

// Fechar o menu ao clicar em um link
document.querySelectorAll('.nav-btn').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuIcon.classList.remove('active');
}));