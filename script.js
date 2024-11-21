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
        delay: 2.85,
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
}

const aboutPageAnimations = () => {
    const wheel1 = document.querySelector('.wheel:nth-child(1)')
    const wheel2 = document.querySelector('.wheel:nth-child(2)')
    const wheel_1_Sides = document.querySelectorAll('.wheel-1-sides')
    const wheel_2_Sides = document.querySelectorAll('.wheel-2-sides')

    wheel_1_Sides.forEach(sides => {
        sides.onmouseover = () => {
            wheel1.style.animationPlayState = 'paused'
        }
        sides.onmouseout = () => {
            wheel1.style.animationPlayState = 'running'
        }
    })
    wheel_2_Sides.forEach(sides => {
        sides.onmouseover = () => {
            wheel2.style.animationPlayState = 'paused'
        }
        sides.onmouseout = () => {
            wheel2.style.animationPlayState = 'running'
        }
    })

    // wheelSides.forEach(sides => {
    //     sides.onmouseover = () => {
    //         wheels.forEach(wheel => {
    //             wheel.style.animationPlayState = 'paused'
    //         })
    //     }
    //     sides.onmouseout = () => {
    //         wheels.forEach(wheel => {
    //             wheel.style.animationPlayState = 'running'
    //         })
    //     }
    // })
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

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const intersecting = entry.isIntersecting
//         entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
//     })
// })

homePageAnimations()
aboutPageAnimations()
cursorAnimation()