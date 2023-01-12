import './css/styles.css';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');

const BASE_URL = "https://restcountries.com/v2/name";
const FILTER = "fields=name,capital,population,flags,languages"

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const inform = document.querySelector('.country-info');
let onInputDebounce = debounce(onInput, DEBOUNCE_DELAY);

input.addEventListener("input", onInputDebounce);



function onInput() {
    
    inform.innerHTML='';
    const NAME =input.value.trim();
    if (!NAME) {
        inform.innerHTML='';
        return
    }
    // console.log(NAME)
    fetchCountries(NAME).then(data => {
        console.log(data)        
        try {
            if (data.length > 10) {
                Notiflix.Notify.success('Too many matches found. Please enter a more specific name.')
            } else if (data.length > 1) {
                createMarkupPeace(data) 
            } else if (data.length === 1){
                createMarkup(data)
            }            
          
        } catch (error) {
            console.log(error.name)
        }
                       
    });

    if (!input) {
        inform.innerHTML='';  
    }    
}

function fetchCountries(NAME) {
    
    const resp = fetch(`${BASE_URL}/${NAME}?${FILTER}`).then(resp => {
        console.log(resp);
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json();

    })
    .catch(err => Notiflix.Notify.failure('Oops, there is no country with that name'))
    return resp;
};

function createMarkup (arr) {
    const markup = arr.map(item => `
      
      <h2 class="title"><img class = "flag" src="${item.flags.svg}" alt="Country name" width = 50px>${item.name}</h2>
      <ul>
      <li class = "item">Capital:<span class = "item_title">${item.capital}</span></li>
      <li class = "item">Population:<span class = "item_title">${item.population}</span></li>
      <li class = "item">Languages:<span class = "item_title">${item.languages.map(language => language.name)}</span></li>
      </ul>`).join('');
    inform.insertAdjacentHTML('beforeend', markup)
};


function createMarkupPeace (arr) {
    const markup = arr.map(item => `<h2><img src="${item.flags.svg}" alt="Country name" width = 50px>${item.name}</h2>`).join('');
    inform.insertAdjacentHTML('beforeend', markup)
};