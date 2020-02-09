const key = 'q9B7o7tHUlpl6bSAmloZNC4b7o3P3v0D';

//get weather info

const getWeather = async (locationKey) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${locationKey}?apikey=${key}`;
    const response = await fetch(base + query);

    const data = await response.json();
    return data[0];
};


//get city info
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`; //dodajemy zapytanie przez '?'
    const response = await fetch(base + query);
    const data = await response.json();
    return (data[0]);
};





// getCity('Siedlce').then(data => { //ta data przekazywane jest z getcity
//     return getWeather(data.Key);
//     }).then(data => {
//     console.log(data); //to data to z getweather
//     })
//     //dostajemy klucz i przekazujemy go do getWeather
//     //returnujemy promise
//     .catch(err => console.log(err));