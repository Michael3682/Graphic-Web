const homePageAnimations = () => {
    const homeSections = document.querySelectorAll('.home-section')
    const menuSections = document.querySelectorAll('.menu-section')
    const discoverButton = document.querySelector('#discover-button')
    const tl = gsap.timeline()
    const tl2 = gsap.timeline( { paused: true } )

    tl.from('nav', {
        y: -100,
        delay: .25,
        duration: .5
    })
    tl.from('.menu-section', {
        y: -50,
        opacity: 0,
        delay: .1,
        duration: .5,
        stagger: .1
    })

    gsap.from('#discover-button', {
        opacity: 0,
        y: 20,
        delay: 2.5,
        duration: .5,
    })

    tl2.to('#discover-button', {
        border: '1px solid hsla(0, 0%, 50%, 0.5)',
        duration: .25
    })

    discoverButton.onmouseover = () => {
        tl2.play()
    }
    discoverButton.onmouseout = () => {
        tl2.reverse()
    }

    discoverButton.onclick = () => {
        gsap.to(window, {
            duration: 2,
            scrollTo: { y:`#section-2`, autoKill: true },
            ease: 'power2.inOut'
        })
    }

    homeSections.forEach(homeSection => {
        homeSection.onclick = () => {
            gsap.to(window, {
                duration: 2,
                scrollTo: { y:`#section-1`, autoKill: true },
                ease: 'power2.inOut'
            })
        }
    })

    menuSections.forEach((menuSection, index) => {
        menuSection.onclick = () => {
            gsap.to(window, {
                duration: 2,
                scrollTo: { y: `#section-${index + 1}`, autoKill: true },
                ease: 'power2.inOut'
            })
        }
    })

    gsap.to('.line', {
        height: '100%',
        scrollTrigger: {
            trigger: '.about-info-1',
            scroller: 'body',
            scrub: 1,
            start: '10% 90%',
            end: '100% 10%'
        }
    })
}

const aboutPageAnimations = () => {
    const tl = gsap.timeline()

    gsap.to('.about-info-2 p', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.about-info-2',
            scroller: 'body',
            scrub: 1,
            markers: true,
            start: '150% 100%',
            end: '-50% -50%'
        }
    })
}

const cursorAnimation = () => {
    const coords = { x: 0, y: 0 };
    const circle = document.querySelector(".mouse-pointer");

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

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const intersecting = entry.isIntersecting
//         entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
//     })
// })

homePageAnimations()
aboutPageAnimations()
cursorAnimation()