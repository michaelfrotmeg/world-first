window.addEventListener('load', function () {
    jQuery(document).ready(function ($) {
        let swiperHowitwork = null;
        let firstItem = null;
        let firstItemParent = null;
        let firstItemNextSibling = null;

        const initHowitworkSwiper = () => {
            const isSmallScreen = document.documentElement.clientWidth <= 900;
            const howitworkSwiperElement = document.querySelector('.howitwork-swiper');

            if (!firstItem) {
                firstItem = document.querySelector('.first-item');
                if (firstItem) {
                    firstItemParent = firstItem.parentNode;
                    firstItemNextSibling = firstItem.nextSibling;
                }
            }

            if (isSmallScreen) {
                if (firstItem && firstItemParent.contains(firstItem)) {
                    firstItem.remove();
                }
            } else {
                if (firstItem && !firstItemParent.contains(firstItem)) {
                    if (firstItemNextSibling) {
                        firstItemParent.insertBefore(firstItem, firstItemNextSibling);
                    } else {
                        firstItemParent.appendChild(firstItem);
                    }
                }
            }

            if (isSmallScreen && howitworkSwiperElement && !swiperHowitwork) {
                swiperHowitwork = new Swiper(howitworkSwiperElement, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-howitwork-next',
                        prevEl: '.swiper-howitwork-prev',
                    },
                    autoplay: {
                        delay: 1000000,
                        disableOnInteraction: false,
                    },
                });

                swiperHowitwork.on('reachEnd', function () {
                    swiperHowitwork.slideTo(1, 300);
                });


            } else if (!isSmallScreen && swiperHowitwork) {
                swiperHowitwork.destroy(true, true);
                swiperHowitwork = null;
            }
        };

        initHowitworkSwiper();

        window.addEventListener('resize', initHowitworkSwiper);
    });
});