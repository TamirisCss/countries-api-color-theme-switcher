//dark mode
const modeBtn = document.querySelector('.dark-mode-container');

modeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
})

//API
const input = document.querySelector('#input');
const search = document.querySelector('.fa-search');
const cardsContainer = document.querySelector('.country-cards-container');

//country list
const countries = [];
//TODO: load all countries data

search.addEventListener('click', getCountry);
input.addEventListener('keydown', function(e) {
    if(e.key === "Enter") {
        getCountry();
    }
});

//TODO implement a filter function based on the input.value
function filterCountries(inputValue) {
    return "a new list with the countries that match the filter"
}

function filterCountriesByRegion(region) {
    return "a new list with the countries that match the filter"
}

function getCountry() {
    // e.preventDefault();
    const country = input.value;
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        showCountries(data)
    })
    input.value = "";
}



function showCountries(data) {
    data.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${data[0].flags.png}"
        alt="image">
        <div class="country-info">
            <h3>${data[0].name}</h3>
            <p>Population: ${data[0].population}</p>
            <p>Region: ${data[0].region}</p>
            <p>Capital: ${data[0].capital}</p>
            <p>Language: ${data[0].languages[0].name}</p>
        </div>
        `
        cardsContainer.appendChild(card);
    });
}