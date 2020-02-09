const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    //destructure properties, nazwy musza byc takie same jak properties
    const {
        cityDetails,
        weather
    } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
    `;

    //update day and night icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    //unhide the app
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return {
        cityDetails, //: cityDetails,
        weather //: weather
        //jezeli nazwa atrybutu i wartosc jest taka sama w obiekcie to mozna tak napisac
    }; //returns a promise
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    //data to object z updateCity
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

// set local storage

localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
//string of any value is a truthy value