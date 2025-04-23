document.addEventListener('DOMContentLoaded', function () {
    function handleCardSelection() {
        jQuery(".tier-card .btn").on("click", function (e) {
            e.preventDefault();
            jQuery(".tier-card").removeClass("selected");
            jQuery(this).closest(".tier-card").addClass("selected");
            calculateFees(); // Recalculate fees on tier selection
        });
    }

    function ranger() {
        jQuery(".slider-range").each(function () {
            const $this = jQuery(this);
            const $holder = $this.closest(".holder-range");
            const handle = $holder.find(".slider-value");

            const min = parseInt($this.data("min"), 10) || 0;
            const max = parseInt($this.data("max"), 10) || 100;
            const value = parseInt($this.data("value"), 10) || min;
            const step = parseInt($this.data("step"), 10) || 1;

            $this.slider({
                range: "min",
                min: min,
                max: max,
                value: value,
                step: step,
                create: function () {
                    handle.text(`$${jQuery(this).slider("value").toLocaleString()}`);
                },
                slide: function (event, ui) {
                    handle.text(`$${ui.value.toLocaleString()}`);
                    $this.data("value", ui.value); // Update slider data value
                    calculateFees(); // Recalculate fees on slider change
                }
            });
        });
    }

    function getSelectedTierFee() {
        const selectedCard = jQuery(".tier-card.selected");
        const feeText = selectedCard.find(".tier-fee").text();
        return parseFloat(feeText) || 0; // Extract the fee percentage
    }

    function getSliderValue() {
        const slider = jQuery(".slider-range");
        return parseInt(slider.data("value"), 10) || 0;
    }

    function calculateFees() {
        const earnings = getSliderValue();
        const traditionalFeePercentage = 30; // Traditional fee percentage
        const tierFeePercentage = getSelectedTierFee();

        const traditionalFees = (earnings * traditionalFeePercentage) / 100;
        const cryptaineFees = (earnings * tierFeePercentage) / 100;
        const savings = traditionalFees - cryptaineFees;

        // Update the result values in the DOM
        jQuery(".fees-block .red").text(`$${traditionalFees.toLocaleString()}`);
        jQuery(".fees-block .yellow").text(`$${cryptaineFees.toLocaleString()}`);
        jQuery(".fees-block .green").text(`$${savings.toLocaleString()}`);
    }

    handleCardSelection();
    ranger();
    calculateFees(); // Initial calculation
});