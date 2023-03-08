import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const url = 'https://restcountries.com/v3.1/name/';
const restAPI = '?fields=name,capital,population,flags,languages';
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

const inputEL = document.querySelector('input#search-box');

function fetchCountries(name) {
  return fetch(`${url}${name}${restAPI}`)
    .then(response => {
      response.json();
    })
    .catch(error => {
      console.log(Error);
    });
}

inputEL.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));
