import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryTpl from './templates/country.hbs';
import countriesListTpl from './templates/countries.hbs';
import fetchCountries from './fetchCountry';


const refs = {
    inputId: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.inputId.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));



function clearData() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}


function renderCountries(countries) {
    return countriesListTpl(countries);
}

function renderCountry(countries) {
    return countryTpl(countries);
}

function onInput(evt) {

    const inputValue = evt.target.value.trim();
    if (inputValue === '') {
        clearData();
        return;
    }
    fetchCountries(inputValue)
        .then(countries => {
            if (countries.length > 10) {
                clearData();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            }
            else if (countries.length === 1) {
                clearData();
                refs.countryList.insertAdjacentHTML('beforeend', renderCountry(countries));
                renderCountry(countries[0]);
                return;
            }
            refs.countryList.insertAdjacentHTML('beforeend', renderCountries(countries));
        })
        .catch(error => {
            clearData();
            console.log(error);
            return;
        });
}


