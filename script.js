//dark mode
const modeBtn = document.querySelector('.dark-mode-container');

modeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
})

//API
const input = document.querySelector('#input');
const search = document.querySelector('.fa-search');
const cardsContainer = document.querySelector('.country-cards-container');
const select = document.querySelector('#input-regions');

//country list
let countries = [];
//TODO: load all countries data
async function getCountries() {
    // e.preventDefault();
    const response = await fetch(`https://restcountries.com/v2/all`)
    const data = await response.json()
    console.log(data)
    countries = data;
    showCountries(countries)
}
getCountries();

search.addEventListener('click', filterCountries);
input.addEventListener('keyup', filterCountries);
select.addEventListener('change', filterCountriesByRegion);

//TODO implement a filter function based on the input.value
function filterCountries() {
    const filter = input.value.toUpperCase()
    // const filtered = []
    // countries.forEach(country => {
    //     if (country.name.toUpperCase().startsWith(filter)) {
    //         filtered.push(country)
    //     }
    // })
    const filtered = countries.filter(country => country.name.toUpperCase().startsWith(filter))
    showCountries(filtered)
}

function filterCountriesByRegion() {
    const region = select.value;
    if(region === "") {
        showCountries(countries);
        return;
    }
    const filtered = countries.filter(country => {
        return country.region === region;
    })
    showCountries(filtered)
}


function showCountries(data) {
    cardsContainer.innerHTML = ""
    data.forEach(element => {
        const card = document.createElement('a');
        card.href = "./country.html";
        card.classList.add('card');
        card.innerHTML = `
        <img src="${element.flags.png}"
        alt="image">
        <div class="country-info">
            <h3>${element.name}</h3>
            <p>Population: ${element.population}</p>
            <p>Region: ${element.region}</p>
            <p>Capital: ${element.capital}</p>
            <p>Language: ${element.languages[0].name}</p>
        </div>
        `
        cardsContainer.appendChild(card);
    });
}
