import React, {useState} from 'react';
import CountryDetails from './CountryDetails';

const CountriesListToggleElement = ({country}) => {

    const [show, setShow] = useState(false);

    const setVisible = () => setShow(!show);

    return (
        <div>
            <button onClick={setVisible} >Show</button>
            {show ? <CountryDetails country={country}/> : country.name}
        </div>
    )
}
export default CountriesListToggleElement;