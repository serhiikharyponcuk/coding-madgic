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
        borderWidth: 1,
          backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(54, 162, 235 , 0.6)',
    ],
    borderColor: [
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(255, 205, 86)',
    ],
    borderWidth: 5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
  if (ctx.parentElement.hidden) {
    ctx.parentElement.hidden = false;
  }
}


