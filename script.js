document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries-container');
    const restCountriesAPI = 'https://restcountries.com/v3.1/all';
    const weatherAPIKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';

    // Fetch Rest Countries Data
    fetch(restCountriesAPI)
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.classList.add('col-lg-4', 'col-sm-12');

                const card = document.createElement('div');
                card.classList.add('card', 'h-100');

                const cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header');
                cardHeader.textContent = country.name.common;

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const flagImage = document.createElement('img');
                flagImage.src = country.flags.png;
                flagImage.classList.add('card-img-top');

                const countryDetails = document.createElement('p');
                countryDetails.innerHTML = `
                    <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}<br>
                    <strong>Region:</strong> ${country.region}<br>
                    <strong>Lat/Lng:</strong> ${country.latlng.join(', ')}
                `;

                const weatherButton = document.createElement('button');
                weatherButton.textContent = 'Click for Weather';
                weatherButton.classList.add('btn', 'btn-primary');
                weatherButton.addEventListener('click', () => {
                    fetch(`${weatherAPI}?q=${country.capital ? country.capital[0] : country.name.common}&appid=${weatherAPIKey}`)
                        .then(response => response.json())
                        .then(weather => {
                            alert(`Weather in ${country.capital ? country.capital[0] : country.name.common}: ${weather.weather[0].description}, ${weather.main.temp}K`);
                        })
                        .catch(error => {
                            alert('Error fetching weather data');
                            console.error(error);
                        });
                });

                cardBody.appendChild(flagImage);
                cardBody.appendChild(countryDetails);
                cardBody.appendChild(weatherButton);

                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                countryCard.appendChild(card);
                countriesContainer.appendChild(countryCard);
            });
        })
        .catch(error => {
            console.error('Error fetching countries data:', error);
        });
});
