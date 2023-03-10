import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const INFO_MESSAGE =
  'Too many matches found. Please enter a more specific name.';
const ERROR_MESSAGE = 'Oops, there is no country with that name';

const inputEL = document.querySelector('input#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

function emptyHtml() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}

inputEL.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));
function onInputName(ev) {
  const nameInput = ev.target.value.trim();
  if (!nameInput) {
    emptyHtml();
  } else {
    fetchCountries(nameInput).then(createListCountry).catch(errorList);
  }
}
function createListCountry(countries) {
  if (Number(countries.length) > 10) {
    Notify.info(INFO_MESSAGE);
    emptyHtml();
  } else if (Number(countries.length) !== 1) {
    restAllCountry(countries);
  } else {
    restOneCountry(countries);
  }
}

function restAllCountry(nameCountry) {
  const makeList = nameCountry
    .map(({ name, flags }) => {
      return `<li class="item"><img class="flag" src="${flags.svg}" alt="flag of ${name.official}" width="75" height="100%"><p class="title">${name.official}</p></li>`;
    })
    .join('');
  listCountry.innerHTML = makeList;
  infoCountry.innerHTML = '';
}
function restOneCountry(nameCountry) {
  const makeList = nameCountry
    .map(({ name, capital, population, flags, languages }) => {
      return `<div class="card"><div class="card-box"><img class="card-flag"  src="${
        flags.svg
      }"  alt="flag of ${
        name.official
      }" width="100" heiht="100%"><p class="card-title">${
        name.official
      }</p></div><div><p class="card-text">Capital:<span class="card-topic">${capital}</span></p><p class="card-text">Population:<span class="card-topic">${population}</span></p><p class="card-text">Languages:<span class="card-topic">${Object.values(
        languages
      )}</span></p></div></div>`;
    })
    .join('');
  infoCountry.innerHTML = makeList;
  listCountry.innerHTML = '';
}

function errorList() {
  Notify.warning(ERROR_MESSAGE);
  emptyHtml();
}
