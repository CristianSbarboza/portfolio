document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       HAMBURGER MENU (Tablet)
    ========================================= */
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('header ul');
    const navLinks = document.querySelectorAll('header ul li a');

    if (menuIcon && navMenu) {
        // Toggle Menu
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                menuIcon.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =========================================
       BOTTOM NAVIGATION (Mobile)
    ========================================= */
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

    if (bottomNavItems.length > 0) {
        bottomNavItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all
                bottomNavItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked
                this.classList.add('active');
            });
        });

        // Optional: Update active state on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').includes(current)) {
                    item.classList.add('active');
                }
            });
        });
    }


    /* =========================================
       RESPONSIVE TITLE APPEARANCE
    ========================================= */
    const h1s = document.querySelectorAll('h1');
    
    if (h1s.length > 0) {
        window.addEventListener('scroll', () => {
            const valueScroll = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            // Calculate opacity based on viewport height
            // Fully visible when scrolled 80% of viewport height (adjust 0.8 as needed)
            const fadePoint = viewportHeight * 0.8;
            
            h1s.forEach(h1 => {
                // You might want to adjust this formula. 
                // Previous logic was valueScroll / 1000.
                // New logic: valueScroll / fadePoint.
                let opacity = valueScroll / fadePoint;
                
                if (opacity > 1) opacity = 1;
                if (opacity < 0) opacity = 0;
                
                h1.style.opacity = opacity;
            });
        });
        
        // Trigger once on load to set initial state
        window.dispatchEvent(new Event('scroll'));
    }
});
