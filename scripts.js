jQuery(document).ready(function () {
    const header = document.querySelector('header');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNavMobile = document.querySelector('.main-nav-mobile');
    const fixedClass = 'fixed';
    const openClass = 'open';
    const body = document.body;

    if (!body.classList.contains('page-template-sale-template')) {
        header.classList.add(fixedClass);
    }

    function getHeaderHeight() {
        return header ? header.offsetHeight : 0;
    }

    function handleScroll() {
        if (window.scrollY > 0) {
            header.classList.add(fixedClass);
        } else {
            header.classList.remove(fixedClass);
        }
    }

    jQuery('a[href^="#"], a[href^="/#"]').on('click', function (event) {
        let targetId = jQuery(this).attr('href');
        if (targetId.startsWith('/#')) {
            targetId = targetId.substring(1);
        }

        const targetElement = jQuery(targetId);

        if (targetElement.length) {
            event.preventDefault();

            const headerHeight = getHeaderHeight() + 30;

            jQuery('html, body').scrollTo(targetElement, 200, {
                offset: -headerHeight,
                axis: 'y'
            });
        }
    });
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation();
            header.classList.toggle(openClass);
            mainNavMobile.classList.toggle(openClass);
        });
    }
    document.addEventListener('click', function (event) {
        if (!header.contains(event.target) && header.classList.contains(openClass)) {
            header.classList.remove(openClass);
            mainNavMobile.classList.remove(openClass);
        }
    });

    //window.addEventListener('scroll', handleScroll);
});