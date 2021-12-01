const countryConteinerInfos = document.querySelector('.country-container');
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('country')

async function countryInfos() {
    const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    const data = await response.json();


    countryConteinerInfos.innerHTML = `
    <div class="img-container">
        <img src="${data.flags.svg}" alt="${data.name} flag">
    </div>
    <div class="country-container-info">
        <div class="country-all-info">
            <div class="country-name">
                    <h3>${data.name}</h3>
                <div class="country-name-info">
                    <div>
                        <p><span>Native name:</span> ${data.nativeName}</p>
                        <p><span>Population:</span> ${data.population}</p>
                        <p><span>Region:</span> ${data.region}</p>
                        <p><span>Sub Region:</span> ${data.subregion}</p>
                        <p><span>Capital:</span> ${data.capital}</p>
                    </div>
                <div>
                        <p><span>Top Level Domain:</span> ${data.topLevelDomain[0]}</p>
                        <p><span>Currencies:</span> ${data.currencies[0].name}</p>
                        <p><span>Languages:</span> ${data.languages[0].name}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-countries-container">
            <h4>Border Countries:</h4>
            <div class="borders">
                
            </div>
        </div>
    </div> `
    addBorderLinks(data.borders);
}

function addBorderLinks(borders){
    const borderDiv = document.querySelector(".borders")
    if (borders === undefined) {
        return
    }
    borders.forEach(border => {
        const link = document.createElement("a");
        link.classList.add("link-button")
        link.innerText = border
        link.href = `./country.html?country=${border}`
        borderDiv.appendChild(link)
    });
}

//load country infos
countryInfos();