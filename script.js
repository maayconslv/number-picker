const totalNumbers = document.querySelector('#numbers');
const minRange = document.querySelector('#of');
const maxRange = document.querySelector('#until');
const repeatNumber = document.querySelector('#no-repeat');
const errorMessage = document.querySelector('.form-error__message');
const form = document.querySelector('.form');
const formResult = document.querySelector('.form-result');
const formResultNumberWrapper = document.querySelector('.form-result__number-wrapper');
const formResultQuantity = document.querySelector('.form-result__quantity');
let resultQuantity = 0;


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

    resultQuantity++;
    renderResult(result);
  } catch (error) {
    printErrorMessage(error.message);
  }
}

function drawAgain() {
  formResultNumberWrapper.innerHTML = ''

  try {
    const result = generateRandomNumbers({
      minRange: Number(minRange.value),
      maxRange: Number(maxRange.value),
      repeatNumber: repeatNumber.checked,
      numbersToPick: totalNumbers.value
    });

    resultQuantity++;
    renderResult(result);
  } catch (error) {
    printErrorMessage(error.message);
  }
}

function generateRandomNumbers({ minRange, maxRange, repeatNumber, numbersToPick }) {
  if (!minRange || !maxRange || !numbersToPick) {
    throw new Error('Você precisa preencher todos os campos.');
  }

  if (minRange > maxRange) {
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

function renderResult(result) {
  form.classList.add('hide');
  formResult.classList.remove('hide');


  result.forEach((number, index) => {
    const numberResult = document.createElement('strong');
    numberResult.classList.add('form-result__number');
    numberResult.textContent = String(number);

    formResultNumberWrapper.appendChild(numberResult);

    setTimeout(() => {
      numberResult.classList.add('show');
    }, index * 500);
  });
  formResultQuantity.textContent = `${resultQuantity}º RESULTADO`
}
