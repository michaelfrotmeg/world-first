window.addEventListener('load', function () {
    jQuery(document).ready(function ($) {
        let swiperFeatured = null;

        const initFeaturedSwiper = () => {
            const isSmallScreen = document.documentElement.clientWidth <= 900;
            const featuredSwiperElement = document.querySelector('.featured-swiper');

            if (isSmallScreen && featuredSwiperElement && !swiperFeatured) {
                swiperFeatured = new Swiper(featuredSwiperElement, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    autoHeight: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-featured-next',
                        prevEl: '.swiper-featured-prev',
                    },
                    autoplay: {
                        delay: 1000000,
                        disableOnInteraction: false,
                    },
                });
            } else if (!isSmallScreen && swiperFeatured) {
                swiperFeatured.destroy(true, true);
                swiperFeatured = null;
            }
        };

        initFeaturedSwiper();

        window.addEventListener('resize', initFeaturedSwiper);
    });
});