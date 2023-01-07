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
    const NAME =input.value;
    console.log(NAME)
    fetchCountries(NAME).then(data => {
        console.log(data)
        let i =0;
        try {
            for (let index = 0; index < data.length; index++) {
            
                let letter0 = data[index].name[0].toLowerCase();
                
                
                if (letter0 ===NAME[0].toLowerCase()) {
                    if (data.length === 1) {
                        inform.innerHTML='';
                        createMarkupAll(data[index])
                        i++
                    } else {
                        // createMarkupPart(data[index])
                        i++
                    }                  
                                                            
                    let letter0 = data[index].name[1].toLowerCase();
    
                    if (letter0 ===NAME[1]) {
                        // inform.innerHTML='';
                        if (data.length === 1) {
                            inform.innerHTML='';
                            createMarkupAll(data[index])
                        } else {
                            createMarkupPart(data[index])
                        }

                        // createMarkup2(data[index])
                        let letter0 = data[index].name[2].toLowerCase();
                        if (letter0 ===NAME[2]) {
                            
                            if (data.length === 1) {
                                inform.innerHTML='';
                                createMarkupAll(data[index])
                            } else {
                                createMarkupPart(data[index])
                            }
                            
                            
                        }
                    }
                    
                }
                
                
            }
        } catch (error) {
            console.log(error.name)
        }
        
        if (i > 10) {
            Notiflix.Notify.success('Too many matches found. Please enter a more specific name.')
        };
        
    });

    if (!input) {
        inform.innerHTML='';  
    }
    let i =0;
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
}

// function sss(){
//    resp.then(resp => console.log(resp))
// }



// function createMarkup (arr) {
//     const markup = arr.map(item => `
      
//       <h2><img src="${flags.svg}" alt="Country name" width = 50px>${name}</h2>
//       <ul>
//       <li>Capital:${capital}</li>
//       <li>Population:${population}</li>
//       <li>Languages:${languages[0].name}</li>
//       </ul>`).join('');
//     inform.insertAdjacentHTML('beforeend', markup)
// }

function createMarkupAll (arr) {
    const markup = `
      
      <h2><img src="${arr.flags.svg}" alt="Country name" width = 50px>${arr.name}</h2>
      <ul>
      <li>Capital:${arr.capital}</li>
      <li>Population:${arr.population}</li>
      <li>Languages:${arr.languages[0].name}</li>
      </ul>`;

    inform.insertAdjacentHTML('beforeend', markup)
}

function createMarkupPart (arr) {
    const markup1 = `<h2><img src="${arr.flags.svg}" alt="Country name" width = 50px>${arr.name}</h2>`
    inform.insertAdjacentHTML('beforeend', markup1)
}