document.addEventListener('DOMContentLoaded', () => {
    const home_section_animations = () => {
        const tl = gsap.timeline()
        const tl2 = gsap.timeline({ paused: true })
        const nav = document.querySelector('.nav')
        const nav_bar = document.querySelector('.nav-bar')
        const discover_button = document.querySelector('#discover-button')
        const nav_buttons_container = document.querySelector('.nav-buttons-container')
        nav_bar.addEventListener('mouseenter', () => {
            gsap.to(nav_bar, {
                width: '100%',
                duration: 0.3
            })
            gsap.to(nav_buttons_container, {
                opacity: 1,
                duration: 0.2
            })
        })
        nav.addEventListener('mouseleave', () => {
            gsap.to(nav_bar, {
                width: '20%',
                duration: 0.3,
            })
            gsap.to(nav_buttons_container, {
                opacity: 0,
                duration: 0.2
            })
        })
        tl.from('.company-logo', {
            y: -100,
            delay: .25,
            duration: .5
        })
        tl.from('.nav', {
            y: -100,
            duration: .5
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
    }
    const about_section_animations = () => {
        const card_holders_array = document.querySelectorAll('.card-holder')
        card_holders_array.forEach(card_holder => {
            const title = card_holder.querySelector('.title')
            const description = card_holder.querySelector('.description')

            if (title && description) {
                const title_texts = title.textContent
                const description_texts = description.textContent
                const wrapped_description_texts = description_texts.replace(/(\S+)(\s*)/g, `<span class='description-word'>$1</span>$2`)
                const tl1 = gsap.timeline({ paused: true })
                const tl2 = gsap.timeline({ paused: true })

                const wrapped_title_texts = title_texts.split('').map(letter => {
                    if (letter === ' ') {
                        return `<span class='title-letter' id='blank'>${letter}</span>`
                    }
                    return `<span class='title-letter'>${letter}</span>`
                }).join('')

                title.innerHTML = wrapped_title_texts
                description.innerHTML = wrapped_description_texts

                tl1.to(card_holder.querySelectorAll('.title-letter'), {
                    duration: .5,
                    stagger: .05,
                    translateZ: 32,
                    textShadow: '0 0 15px hsla(0, 0%, 75%)'
                })

                tl2.to(card_holder.querySelectorAll('.description-word'), {
                    duration: .5,
                    stagger: .1,
                    translateZ: 32
                })

                card_holder.addEventListener('mouseover', () => {
                    card_holder.style.setProperty('--translateZ', '24px')
                    tl1.play()
                    tl2.play()
                })

                card_holder.addEventListener('mouseout', () => {
                    card_holder.style.setProperty('--translateZ', '0')
                    tl1.reverse()
                    tl2.reverse()
                })
            }
        })
        gsap.from('.about-info-1 p:nth-child(1)', {
            transform: 'scale(.5)',
            opacity: 0,
            scrollTrigger: {
                trigger: '.about-info-1 p:nth-child(1)',
                scroller: 'body',
                start: 'top 80%',
                end: 'top 30%',
                scrub: 3
            }
        })
        gsap.from('.about-info-1 p:nth-child(2)', {
            transform: 'scale(.5)',
            opacity: 0,
            scrollTrigger: {
                trigger: '.about-info-1 p:nth-child(2)',
                scroller: 'body',
                start: 'top 80%',
                end: 'top 30%',
                scrub: 3
            }
        })
        gsap.from('.about-info-1 p:nth-child(3)', {
            transform: 'scale(.5)',
            opacity: 0,
            scrollTrigger: {
                trigger: '.about-info-1 p:nth-child(3)',
                scroller: 'body',
                start: 'top 80%',
                end: 'top 30%',
                scrub: 3
            }
        })
        gsap.to('.line', {
            height: '110%',
            scrollTrigger: {
                trigger: '.about-info-1',
                scroller: 'body',
                start: '10% 90%',
                end: '100% 10%',
                scrub: 3
            }
        })
    }
    const cards_tilt_animation = () => {
        const card_holders = document.querySelectorAll('.card-holder')

        card_holders.forEach(card_holder => {
            const card = card_holder.querySelector('.card')
            const card_holder_size = card_holder.getBoundingClientRect()
            const width = card_holder_size.width
            const height = card_holder_size.height

            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--rotateY', '0deg');

            card_holder.addEventListener('mousemove', (e) => {
                rotateElement(e, card, card_holder, width, height)
            })

            card_holder.addEventListener('mouseleave', () => {
                resetRotation(card)
            })
        })

        function rotateElement(event, element, card_holder, width, height) {
            const card_holder_size = card_holder.getBoundingClientRect()
            const card_holder_x = card_holder_size.left
            const card_holder_y = card_holder_size.top

            const x = event.clientX - card_holder_x
            const y = event.clientY - card_holder_y

            const middleX = width / 2
            const middleY = height / 2

            const offsetX = ((x - middleX) / middleX) * 30
            const offsetY = ((y - middleY) / middleY) * 30

            element.style.setProperty('--rotateX', -offsetY + 'deg')
            element.style.setProperty('--rotateY', offsetX + 'deg')
        }

        function resetRotation(element) {
            element.style.setProperty('--rotateX', '0deg')
            element.style.setProperty('--rotateY', '0deg')
        }
        window.addEventListener('resize', () => {
            const card_holders = document.querySelectorAll('.card-holder')

            card_holders.forEach(card_holder => {
                const card = card_holder.querySelector('.card')
                const card_holder_size = card_holder.getBoundingClientRect()
                const card_holder_x = card_holder_size.left
                const card_holder_y = card_holder_size.top
                const width = card_holder_size.width
                const height = card_holder_size.height

                card_holder.addEventListener('mousemove', (e) => {
                    rotateElement(e, card, card_holder_x, card_holder_y, width, height)
                })

                card_holder.addEventListener('mouseleave', () => {
                    resetRotation(card)
                })
            })

            function rotateElement(event, element, card_holder_x, card_holder_y, width, height) {
                const x = event.clientX - card_holder_x
                const y = event.clientY - card_holder_y

                const middleX = width / 2
                const middleY = height / 2

                const offsetX = ((x - middleX) / middleX) * 30
                const offsetY = ((y - middleY) / middleY) * 30

                element.style.setProperty('--rotateX', -offsetY + 'deg')
                element.style.setProperty('--rotateY', offsetX + 'deg')
            }

            function resetRotation(element) {
                element.style.setProperty('--rotateX', '0deg')
                element.style.setProperty('--rotateY', '0deg')
            }
        })
    }
    const scrollTo_section_animations = () => {
        const buttons = document.querySelectorAll('.button')
        const logo = document.querySelector('.logo')

        logo.onclick = () => {
            gsap.to(window, {
                duration: 2,
                scrollTo: { y: `#section-1`, autoKill: true },
                ease: 'power2.inOut'
            })
        }
        buttons.forEach((button, index) => {
            button.onclick = () => {
                gsap.to(window, {
                    duration: 2,
                    scrollTo: { y: `#section-${index + 1}`, autoKill: true },
                    ease: 'power2.inOut'
                })
            }
        })
    }
    const cursor = () => {
        const coords = { x: 0, y: 0 }
        const circle = document.querySelector('.mouse-pointer')

        circle.x = 0
        circle.y = 0

        window.addEventListener('mousemove', e => {
            coords.x = e.clientX
            coords.y = e.clientY
        })

        function animate_circles() {

            let x = coords.x
            let y = coords.y

            circle.style.left = `${x - 7.5}px`
            circle.style.top = `${y - 7.5}px`

            circle.x = x
            circle.y = y

            requestAnimationFrame(animate_circles)
        }

        animate_circles()
    }

    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //         const intersecting = entry.isIntersecting
    //         entry.target.style.backgroundColor = intersecting ? 'blue' : 'orange'
    //     })
    // })

    home_section_animations()
    about_section_animations()
    cards_tilt_animation()
    scrollTo_section_animations()
    cursor()

})

const smoother = ScrollSmoother.create({
    wrapper: '.smooth-wrapper',
    content: '.smooth-content',
    smooth: 3,
    effects: true
})

const website_progress_bar = document.querySelector('.website-progress-bar')

gsap.to(website_progress_bar, {
    height: '100%',
    scrollTrigger: {
        trigger: 'body',
        scroller: 'body',
        scrub: 3,
        start:'.1% 0%',
        end: '100% 100%',
    }
})