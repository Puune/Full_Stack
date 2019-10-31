import React from 'react';
import CountriesListToggleElement from './CountriesListToggleElement';

//single member
//const ListMember = (member) => <li key={member.alpha2Code}>{member.name}</li>

const ListMember = (member) => <CountriesListToggleElement key={member.alpha2Code} country={member} />

const CountriesList = ({selected}) => {
    //For some reason this renders even when the if-clause on 'CountryBrowser' of the application
    //does not select this, but the 'CountryDetails'. This is the reason for this if-clause
    if(selected!==undefined) {
        return (
            <ul>
                {selected.map(member => ListMember(member))}
            </ul>
        )
    } else {
        return (
            <div>
                
            </div>
        )
    }
}
export default CountriesList;