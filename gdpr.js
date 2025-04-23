document.addEventListener('DOMContentLoaded', function () {
    const hasConsent = localStorage.getItem('cry-gdpr-consent');
    const gdprPopup = document.getElementById('gdpr_popup');

    if (cry_gdpr_data.enable !== '1' || hasConsent === 'true') {
        loadGoogleAnalytics();
    }

    if (hasConsent === null && cry_gdpr_data.enable === '1') {
        gdprPopup.style.display = 'block';
        const acceptButton = document.getElementById('accept-ga');
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cry-gdpr-consent', 'true');
            loadGoogleAnalytics();
            gdprPopup.style.display = 'none';
        });

        const rejectButton = document.getElementById('reject-ga');
        rejectButton.addEventListener('click', () => {
            localStorage.setItem('cry-gdpr-consent', 'false');
            gdprPopup.style.display = 'none';
        });
    }

    function loadGoogleAnalytics() {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-CN2CZGQ9QZ');

        console.log('Google Analytics loaded');
    }

});