document.addEventListener("DOMContentLoaded", () => {
    const home_section_animations = () => {
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
    }
    const about_section_animations = () => {
        const card_holders_array = document.querySelectorAll('.card-holder')
        card_holders_array.forEach(card_holder => {
            const title = card_holder.querySelector('.title')
            const description = card_holder.querySelector('.description')

            if (title && description) {
                const title_texts = title.textContent
                const description_texts = description.textContent
                const wrapped_description_texts = description_texts.replace(/(\S+)(\s*)/g, '<span class="description-word">$1</span>$2')
                const tl1 = gsap.timeline({ paused: true })
                const tl2 = gsap.timeline({ paused: true })

                const wrapped_title_texts = title_texts.split('').map(letter => {
                    if (letter === ' ') {
                        return `<span class="title-letter" id="blank">${letter}</span>`
                    }
                    return `<span class="title-letter">${letter}</span>`
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
                    tl1.play()
                    tl2.play()
                })

                card_holder.addEventListener('mouseout', () => {
                    tl1.reverse()
                    tl2.reverse()
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
        const home_sections = document.querySelectorAll('.home-section')
        const menu_sections = document.querySelectorAll('.menu-section')

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
    }
    const cursor = () => {
        const coords = { x: 0, y: 0 }
        const circle = document.querySelector(".mouse-pointer")

        circle.x = 0
        circle.y = 0

        window.addEventListener("mousemove", e => {
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
    //         entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
    //     })
    // })

    home_section_animations()
    about_section_animations()
    cards_animations()
    scrollTo_section_animations()
    cursor()
})
// gsap.to(".scroll-box", {
//     scrollTrigger: {            trigger: ".scroll-box",
//         scroller: "body",  // The trigger element
//         start: "top bottom",     // When the top of the box reaches the bottom of the viewport
//         end: "bottom top",       // When the bottom of the box reaches the top of the viewport
//         scrub: 3,             // Makes the animation linked to the scroll position
//         markers: true            // Optional: Show markers for debugging (you can remove this)
//     },
//     // Use matrix3d to transform the element
//     transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1)",
//     onUpdate: (self) => {
//         // Calculate a smoother translateY with decimals
//         let translateY = self * 1000;  // Adjust the multiplier as needed for desired effect
//         // Round the translateY value to a few decimal places for smoother effect
//         let smoothTranslateY = translateY.toFixed(2);  // Adjust the decimal precision for smoother movement
//         // Update the matrix3d to reflect the current translateY value
//         gsap.set(".scroll-box", {
//             transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${smoothTranslateY}, 0, 1)`
//         });
//     }
// });