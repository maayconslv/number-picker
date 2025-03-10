const totalNumbers = document.querySelector('#numbers');
const minRange = document.querySelector('#of');
const maxRange = document.querySelector('#until');
const repeatNumber = document.querySelector('#no-repeat');
const errorMessage = document.querySelector('.form-error__message');
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

  try {
    const result = generateRandomNumbers({
      minRange: Number(minRange.value),
      maxRange: Number(maxRange.value),
      repeatNumber: repeatNumber.checked,
      numbersToPick: totalNumbers.value
    });
    console.log('result', result);
  } catch (error) {
    printErrorMessage(error.message);
  }
}

function generateRandomNumbers({ minRange, maxRange, repeatNumber, numbersToPick }) {
  if(!minRange || !maxRange || !numbersToPick) {
    throw new Error('Você precisa preencher todos os campos.');
  }

  if(minRange > maxRange) {
    throw new Error('O valor mínimo não pode ser maior que o valor máximo.');
  }

  const numbersToPickLength = (maxRange - minRange) + 1;
  let numbersToPickArray = Array.from({ length: numbersToPickLength }, (_, i) => i + Number(minRange));
  let result = [];

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

  errorMessage.classList.add('hide__error-message');
  return result;
}

function printErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hide__error-message');
}
