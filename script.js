const pageAnimations = () => {
    const menuSections = document.querySelectorAll('.menu-section')
    const homeSections = document.querySelectorAll('.home-section')
    const tl = gsap.timeline()

    tl.from('nav', {
        y: -100,
        delay: .25,
        duration: .5
    })
    tl.from(".menu-section", {
        y: -50,
        opacity: 0,
        delay: .1,
        duration: .5,
        stagger: .1
    })

    homeSections.forEach(homeSection => {
        homeSection.onclick = () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: `#section-1`
            })
        }
    })

    menuSections.forEach((menuSection, index) => {
        menuSection.onclick = () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: `#section-${index + 1}` },
                ease: 'power2.out'
            })
        }
    })
}

const cursorAnimation = () => {
    const coords = { x: 0, y: 0 };
    const circle = document.querySelector(".circle");

    circle.x = 0;
    circle.y = 0;

    window.addEventListener("mousemove", e => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {

        let x = coords.x;
        let y = coords.y;

        circle.style.left = `${x - 7.5}px`;
        circle.style.top = `${y - 7.5}px`;

        circle.x = x;
        circle.y = y;

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

pageAnimations()
cursorAnimation()