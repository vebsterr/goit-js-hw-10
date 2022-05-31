export default function fetchCountries(countries) {
    return fetch(`https://restcountries.com/v3.1/name/${countries}?fields=name,capital,population,flags,languages`).then(response => {
        if (response.ok) {
           return response.json(); 
        } 
        Notiflix.Notify.failure('Oops, there is no country with that name');
    });  
};

