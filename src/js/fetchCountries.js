import { Notify } from 'notiflix/build/notiflix-notify-aio';
const url = 'https://restcountries.com/v3.1/name/';
const restAPI = '?fields=name,capital,population,flags,languages';
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Notify.failure(`it's not ok: ${res.status}`);
    }
    return res.json();
  });
}
