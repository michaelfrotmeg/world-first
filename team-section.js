jQuery(document).ready(function ($) {

    let swiperTeam = null;

    const initSwiper = () => {
        const isSmallScreen = document.documentElement.clientWidth <= 900;
        const swiperSelector = '.swiper-team';
        const navigationNextSelector = '.swiper-team-next';
        const navigationPrevSelector = '.swiper-team-prev';


        if (isSmallScreen && !swiperTeam) {
            swiperTeam = new Swiper(swiperSelector, {
                slidesPerView: 1,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 1000000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: navigationNextSelector,
                    prevEl: navigationPrevSelector,
                },
                spaceBetween: 20,
            });
        } else if (!isSmallScreen && swiperTeam) {
            swiperTeam.destroy(true, true);
            swiperTeam = null;
        }
    };

    initSwiper();

    window.addEventListener('load', initSwiper);
    window.addEventListener('resize', initSwiper);
});