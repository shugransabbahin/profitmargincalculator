// JavaScript for the Profit Margin Calculator

function calculateProfitMargin() {
    const cost = parseFloat(document.getElementById('cost').value);
    const revenue = parseFloat(document.getElementById('revenue').value);

    if (isNaN(cost) || isNaN(revenue)) {
        alert('Please enter valid cost and revenue values.');
        return;
    }

    const profit = revenue - cost;
    const profitMarginPercentage = (profit / revenue) * 100;

    document.getElementById('profit-margin-result').textContent = profitMarginPercentage.toFixed(2) + '%';
    document.getElementById('profit-result').textContent = 'Calculated Profit ($): ' + profit.toFixed(2);

    updateChart(profitMarginPercentage);
}

function updateChart(profitMargin) {
    const ctx = document.getElementById('chart').getContext('2d');
    const moneyMultiplesValues = [];
    const profitMarginValues = [];

    const numIncrements = 20;
    const increment = profitMargin / numIncrements;

    for (let margin = 0; margin <= profitMargin + increment / 2; margin += increment) {
        const moneyMultiples = (100 / (100 - margin)).toFixed(2);
        moneyMultiplesValues.push(moneyMultiples);
        profitMarginValues.push(margin.toFixed(2) + '%');
    }

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: profitMarginValues,
            datasets: [{
                label: 'Money Multiples',
                data: moneyMultiplesValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Money Multiples'
                    }
                },
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Profit Margin (%)'
                    }
                }
            }
        }
    });
}

// Initialize the slider and its value display
const profitMarginSlider = document.getElementById('profit-margin-slider');
const profitMarginValue = document.getElementById('profit-margin-value');

profitMarginSlider.addEventListener('input', function () {
    const selectedValue = profitMarginSlider.value;
    profitMarginValue.textContent = selectedValue + '%';

    // Adjust revenue based on the selected profit margin
    const cost = parseFloat(document.getElementById('cost').value);
    const profitMargin = selectedValue / 100;
    const revenue = cost / (1 - profitMargin);
    document.getElementById('revenue').value = revenue.toFixed(2);
});