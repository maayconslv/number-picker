const totalNumbers = document.querySelector('#numbers');
const minRange = document.querySelector('#of');
const maxRange = document.querySelector('#until');
const repeatNumber = document.querySelector('#no-repeat');
const form = document.querySelector('form');

totalNumbers.oninput = () => {
  let value = totalNumbers.value.replace(/\D/g, '');
  totalNumbers.value = value;
}

minRange.oninput = () => {
  let value = minRange.value.replace(/\D/g, '');
  minRange.value = value;
}

maxRange.oninput = () => {
  let value = maxRange.value.replace(/\D/g, '');
  maxRange.value = value;
}

form.onsubmit = (event) => {
  event.preventDefault();

  const result = generateRandomNumbers({
    minRange: minRange.value,
    maxRange: maxRange.value,
    repeatNumber: repeatNumber.checked,
    numbersToPick: totalNumbers.value
  });

  console.log('result', result);
}

function generateRandomNumbers({ minRange, maxRange, repeatNumber, numbersToPick }) {
  if(!minRange || !maxRange || !numbersToPick) {
    alert('Please fill all the fields');
  }

  if(minRange > maxRange) {
    alert('The minimum range must be less than the maximum range');
  }

  const numbersToPickLength = (maxRange - minRange) + 1;
  let numbersToPickArray = Array.from({ length: numbersToPickLength }, (_, i) => i + Number(minRange));
  const result = [];

  if (repeatNumber) {
    for (let i = 0; i < numbersToPick; i++) {
      const randomNumber = numbersToPickArray[Math.floor(Math.random() * numbersToPickLength)];
      numbersToPickArray = numbersToPickArray.filter((number) => number !== randomNumber);
      result.push(randomNumber);
    }
  
    return result;
  }

  for (let i = 0; i < numbersToPick; i++) {
    result.push(numbersToPickArray[Math.floor(Math.random() * numbersToPickLength)]);
  }

  return result;
}
