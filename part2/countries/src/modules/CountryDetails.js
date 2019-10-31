import React from 'react';
import LanguagesList from './CountriesList';
import Weather from './Weather';

const CountryDetails = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2><br />
            <p>Capital: {country.capital} </p>
            <p>Pop: {country.population}</p>
            <h3>Languages</h3>
            <LanguagesList country={country} />
            <img src={country.flag} style={{width: 200}}/>
        </div>
    )
}
export default CountryDetails;