import React from 'react';
import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';


//manage print
const ContentManager = ({filtered}) => {
    console.log(filtered.length);

    if(filtered.length>10){
        return (
            <p>Too many matches, give more specific search term</p>
        )
    } else if((filtered.length<=10 && filtered.length>1)){
        return(
            <CountriesList selected={filtered} />
        )
    } else if(filtered.length===1){
        return(
            <CountryDetails country={filtered[0]} />
        )
    } else {
        return (
            <p>No match!</p>
        )
    }
}

//main
const CountryBrowser = ({filtered}) => {
    return (
        <div>
            <ContentManager filtered={filtered}/>
        </div>
    )
}
export default CountryBrowser;