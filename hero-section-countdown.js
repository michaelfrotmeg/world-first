document.addEventListener('DOMContentLoaded', function () {
    // Get the countdown element
    const container = document.getElementById('countdown');

    // Retrieve the date from the data attribute
    let countDownDate = new Date().getTime();
    if (container !== null) {
        let localDate = container.getAttribute('data-date');

        if (localDate) {
            let localDateObj = new Date(localDate);
            countDownDate = localDateObj.getTime() - (localDateObj.getTimezoneOffset() * 60000);
        }

        // Update the countdown every 1 second
        const x = setInterval(function () {
            // Get current date in UTC
            const nowUTC = new Date().getTime();

            // Find the distance between now and the countdown date
            const distance = countDownDate - nowUTC;

            let days = 0, hours = 0, minutes = 0, seconds = 0;
            // Time calculations for days, hours, minutes and seconds
            if (distance >= 0) { // Calculate only if distance is positive
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
            }

            // Show results
            const daysElement = container.querySelector("#days");
            const hoursElement = container.querySelector("#hours");
            const minutesElement = container.querySelector("#minutes");
            const secondsElement = container.querySelector("#seconds");

            if (daysElement) daysElement.innerHTML = days;
            if (hoursElement) hoursElement.innerHTML = ("0" + hours).slice(-2);
            if (minutesElement) minutesElement.innerHTML = ("0" + minutes).slice(-2);
            if (secondsElement) secondsElement.innerHTML = ("0" + seconds).slice(-2);

            // Show ending text when pre-sale ends
            if (distance < 0) {
                clearInterval(x);
                // container.innerHTML = "<span class='cy-hero--countdown-title'>Pre-sale Is Ended</span>";
            }
        }, 1000);
    }

    function toMoney(value) {
        return '$' + value.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true,
        });
    }


    // For caching
    // const softCapElement = document.getElementById('soft_cap');
    // const hardCapElement = document.getElementById('hard_cap');
    // const percentToHardCapElement = document.getElementById('percent_to_hard_cap');
    // const totalRaisedElement = document.getElementById('total_raised');

    // const updateSaleData = (data) => {
    //     const percentToHardCap = (data.totalSales / data.hardcap) * 100;
    //     softCapElement.textContent = toMoney(data.softcap);
    //     hardCapElement.textContent = toMoney(data.hardcap);
    //     percentToHardCapElement.style.width = Math.max(10, percentToHardCap) + '%'; // Form minimum 10
    //     totalRaisedElement.textContent = toMoney(data.totalSales);
    // };


    // setInterval(function () {
    //     const saleId = document.querySelector('.cy-hero--cap').dataset.saleid;
    //     const url = `/wp-json/crysales/v1/sale/${saleId}`;
    //     if (saleId) {
    //         fetch(url)
    //             .then(response => response.json())
    //             .then(res => updateSaleData(res.data || res[saleid]))
    //             .catch(error => {
    //                 console.error('Data fetching error', error);
    //             });
    //     }
    // }, 300000); //5 min

});

