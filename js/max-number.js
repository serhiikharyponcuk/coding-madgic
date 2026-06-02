const maxNumber1 = document.getElementById('max-num1');
const maxNumber2 = document.getElementById('max-num2');
const maxNumber3 = document.getElementById('max-num3');
const maxNumberResult = document.getElementById('max-number');
const ctx = document.getElementById('myChart');
let myChart = null;

maxNumber1.addEventListener('input', findMax);
maxNumber2.addEventListener('input', findMax);
maxNumber3.addEventListener('input', findMax);


function findMax() {
    const num1 = parseFloat(maxNumber1.value);
    const num2 = parseFloat(maxNumber2.value);
    const num3 = parseFloat(maxNumber3.value);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        console.log('Please enter valid numbers in all fields.');
        return;
    }

    const maxNum = Math.max(num1, num2, num3);
    maxNumberResult.textContent = maxNum;

    if (myChart) {
        myChart.destroy();
    }

myChart =
      new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1', '2', '3'],
      datasets: [{
        label: 'Графік введених чисел',
        data: [num1, num2, num3],
        backgroundColor: [
          'rgba(88, 184, 178, 0.72)',
          'rgba(255, 143, 122, 0.72)',
          'rgba(255, 199, 95, 0.78)',
        ],
        borderColor: [
          'rgb(62, 153, 148)',
          'rgb(232, 113, 94)',
          'rgb(226, 165, 54)',
        ],
        borderWidth: 3,
        borderRadius: 14,
        borderSkipped: false,
        barPercentage: 0.72,
        categoryPercentage: 0.72
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(55, 55, 55, 0.94)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          displayColors: false,
          cornerRadius: 10,
          padding: 10
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#5f6666'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(55, 55, 55, 0.1)'
          },
          ticks: {
            color: '#5f6666'
          }
        }
      }
    }
  })
  if (ctx.parentElement.hidden) {
    ctx.parentElement.hidden = false;
  }
}
