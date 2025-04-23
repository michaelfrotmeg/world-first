document.addEventListener('DOMContentLoaded', function () {
    const breakpoint = 900; // Minimum width to enable the slider
    let swiper = null;

    const initializeSwiper = () => {
        if (window.innerWidth >= breakpoint && !swiper) {
            swiper = new Swiper('.cy-timeline-slider', {
                slidesPerView: 4, // Default number of visible items
                spaceBetween: 0, // Space between slides
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 4, // Show 4 items
                    },
                    1200: {
                        slidesPerView: 3, // Show 3 items if the screen width is less than 1300px
                    },
                    1000: {
                        slidesPerView: 2, // Show  2 items if the screen width is less than 1300px
                    },
                    [breakpoint]: {
                        slidesPerView: 2, // Show 1 item if the screen width is less than 900px
                    },
                },
            });
        } else if (window.innerWidth < breakpoint && swiper) {
            swiper.destroy(true, true); // Destroy the slider if the screen width is less than the breakpoint
            swiper = null;
        }
    };

    initializeSwiper();

    // Reinitialize the slider on window resize
    window.addEventListener('resize', initializeSwiper);
});