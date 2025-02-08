const homepage_animations = () => {
    const home_sections = document.querySelectorAll('.home-section')
    const menu_sections = document.querySelectorAll('.menu-section')
    const discover_button = document.querySelector('#discover-button')
    const tl = gsap.timeline()
    const tl2 = gsap.timeline({ paused: true })

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

    discover_button.onmouseover = () => {
        tl2.play()
    }
    discover_button.onmouseout = () => {
        tl2.reverse()
    }

    discover_button.onclick = () => {
        gsap.to(window, {
            duration: 2,
            scrollTo: { y: `#section-2`, autoKill: true },
            ease: 'power2.inOut'
        })
    }

    home_sections.forEach(home_section => {
        home_section.onclick = () => {
            gsap.to(window, {
                duration: 2,
                scrollTo: { y: `#section-1`, autoKill: true },
                ease: 'power2.inOut'
            })
        }
    })

    menu_sections.forEach((menu_section, index) => {
        menu_section.onclick = () => {
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
const cards_animations = () => {
    const card_holders = document.querySelectorAll('.card-holder');

    card_holders.forEach(card_holder => {
        const card = card_holder.querySelector('.card');
        const card_holder_size = card_holder.getBoundingClientRect();
        const card_holder_x = card_holder_size.left;
        const card_holder_y = card_holder_size.top;
        const width = card_holder_size.width;
        const height = card_holder_size.height;
        

        card_holder.addEventListener('mousemove', (e) => {
            rotateElement(e, card, card_holder_x, card_holder_y, width, height);
        });

        card_holder.addEventListener('mouseleave', () => {
            resetRotation(card);
        });
    });

    function rotateElement(event, element, card_holder_x, card_holder_y, width, height) {
        const x = event.clientX - card_holder_x;
        const y = event.clientY - card_holder_y;
        
        const middleX = width / 2;
        const middleY = height / 2;
        console.log(middleX, middleY)
        
        const offsetX = ((x - middleX) / middleX) * 30;
        const offsetY = ((y - middleY) / middleY) * 30;

        element.style.setProperty('--rotateX', -offsetY + 'deg');
        element.style.setProperty('--rotateY', offsetX + 'deg');
    }

    function resetRotation(element) {
        element.style.setProperty('--rotateX', '0deg');
        element.style.setProperty('--rotateY', '0deg');
    }
}   
const cursor = () => {
    const coords = { x: 0, y: 0 };
    const circle = document.querySelector(".mouse-pointer");

    circle.x = 0;
    circle.y = 0;

    window.addEventListener("mousemove", e => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animate_circles() {

        let x = coords.x;
        let y = coords.y;

        circle.style.left = `${x - 7.5}px`;
        circle.style.top = `${y - 7.5}px`;

        circle.x = x;
        circle.y = y;

        requestAnimationFrame(animate_circles);
    }

    animate_circles();
}

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const intersecting = entry.isIntersecting
//         entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
//     })
// })

homepage_animations()
cards_animations()
cursor()