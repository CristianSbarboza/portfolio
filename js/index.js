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
    let valueScroll = window.scrollY

    stars.style.left = valueScroll * 0.25 + 'px'
    moon.style.top = valueScroll * 1.05 + 'px'
    mountains_behind.style.top = valueScroll * 0.5 + 'px'
    mountains_front.style.top = valueScroll * 0 + 'px'
    text.style.marginRight = valueScroll * 4 + 'px'
    text.style.marginTop = valueScroll * 1.5 + 'px'
    mainBtn.style.marginTop = valueScroll * 1.5 + 'px'
    header.style.left = valueScroll * 0.5 + 'px'

    h1s.forEach((h1)=>{
        h1.style.opacity = valueScroll / 1000
        if(h1.style.opacity > 1) h1.style.opacity = 1
    })

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
        threshold: 0.5,
    };

    const countContainer = document.querySelector('.count-container')


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                lastScrollY = window.scrollY

                let cardIndex = Array.from(cards).indexOf(entry.target)

                currentCardIndex = cardIndex

                const targetY = 150 - currentCardIndex * 150
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
