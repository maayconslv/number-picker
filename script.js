const totalNumbers = document.querySelector('#numbers');
const minRange = document.querySelector('#of');
const maxRange = document.querySelector('#until');
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

  const result = generateRandomNumber(minRange.value, maxRange.value);
  console.log('resultado: ',result);
}

function generateRandomNumber(minRange, maxRange) {
  const length = (maxRange - minRange) + 1;
  const array = Array.from({ length }, (_, i) => i + Number(minRange));

  return array[Math.floor(Math.random() * length)];
}
