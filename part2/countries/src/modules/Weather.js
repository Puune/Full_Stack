import React, {useEffect, useState} from 'react';
import axios from 'axios';

//Didn't care to sign up for weather service
const Weather = ({country}) => {

    useEffect(()=> {
        axios
            .get(`api.openweathermap.org/data/2.5/weather?q=${country.capital.valueOf()}`)
            .then(response => {
                setWeather(response.data);
        })
    })

    const [weather, setWeather] = useState({});

    
    console.log(country.capital ,weather);
    
    return(
        <div>
            <h3>Weather in {country.capital}</h3>
            <h4>Temp: {weather.weather.description}</h4>
        </div>
    )
}
export default Weather;