let stars = document.getElementById('stars')
let moon = document.getElementById('moon')
let mountains_behind = document.getElementById('mountains_behind')
let text = document.getElementById('text')
let mainBtn = document.getElementById('mainBtn')
let mountains_front = document.getElementById('mountains_front')
let header = document.querySelector('header')
let h1s = document.querySelectorAll('h1')


const navBtns = document.querySelectorAll(".nav-btn");

navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        
        navBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
    });
});


window.addEventListener('scroll', function(){
    let valueScroll = window.scrollY;
    
    // Define multipliers based on screen width
    // Desktop: 1.0, Mobile/Tablet: 0.5 (or adjusted per element)
    let isMobile = window.innerWidth <= 768;
    let multiplier = isMobile ? 0.5 : 1.0;
    
    // Parallax Effects
    stars.style.left = valueScroll * 0.25 * multiplier + 'px';
    moon.style.top = valueScroll * 1.05 * multiplier + 'px';
    mountains_behind.style.top = valueScroll * 0.5 * multiplier + 'px';
    mountains_front.style.top = valueScroll * 0 + 'px'; // Front stays fixed relative to scroll usually, or moves 0
    
    // Text moves to the right. On mobile, we reduce this significantly to keep it visible longer/prevent overflow
    // Desktop: valueScroll * 4
    // Mobile: valueScroll * 1.5 (slower movement)
    let textSpeed = isMobile ? 1.5 : 4;
    text.style.marginRight = valueScroll * textSpeed + 'px';
    
    text.style.marginTop = valueScroll * 1.5 * multiplier + 'px';
    mainBtn.style.marginTop = valueScroll * 1.5 * multiplier + 'px';
    
    // Header parallax only on desktop
    if (!isMobile) {
        header.style.left = valueScroll * 0.5 + 'px';
    }


})



document.addEventListener('DOMContentLoaded', () =>{
    gsap.registerPlugin(ScrollTrigger)

    const stickySection = document.querySelector("#projects")
    const stickyHeight = window.innerHeight * 5
    const cards = document.querySelectorAll('.card')
    const totalCards = cards.length
    
    

    ScrollTrigger.create({
        trigger: stickySection,
        start: 'top top',
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => positionCards(self.progress)
    })

    const getRadius = () => {
        return window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;
    };

    const arcAngle = Math.PI * 0.5;
    const startAngle = Math.PI / 2 - arcAngle / 1.8;

    function positionCards(progress = 0){
        const radius = getRadius();
        const totalTravel = 1 + totalCards / 7.5;
        const adjustedProgress = (progress * totalTravel - 1) * 0.48;

        cards.forEach((card, i)=>{
            const normalizedProgress = (totalCards - 1 - i) / totalCards;

            const cardProgress = normalizedProgress + adjustedProgress;

            const angle = startAngle + arcAngle * cardProgress;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

            gsap.set(card,{
                x: x,
                y: -y + radius,
                rotation: -rotation,
                transformOrigin: "center center",
            })
        })
    }

    positionCards(0)


    let currentCardIndex = 0

    const options = {
        root: null,
        rootMargin: "0px 0px",
        threshold: 0.1,
    };

    const countContainer = document.querySelector('.count-container')


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                lastScrollY = window.scrollY

                let cardIndex = Array.from(cards).indexOf(entry.target)

                currentCardIndex = cardIndex

                const stepHeight = document.querySelector('.project-title').offsetHeight;
                const targetY = -currentCardIndex * stepHeight;
                
                gsap.to(countContainer, {
                    y: targetY,
                    duration: 0.3,
                    ease: "power1.out",
                    overwrite: true,
                })
            }
        })
    }, options)

    cards.forEach((card) => {
        observer.observe(card)
    })

    window.addEventListener("resize", ()=>{
        positionCards(0)
    })
})


document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".perfil-container, .resun, .imgs-tecs-container, .container-text-resume, .rainbow-text, #contact .appear, #footer .appear"
    );

    elements.forEach(el => el.classList.add("appear"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));

});
