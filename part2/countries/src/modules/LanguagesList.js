import React from 'react';

const Language = (lang) => <li key={lang.iso639_2}>{lang.name}</li>

const LanguagesList = ({country}) => {

    return(
        <ul>
            {country.languages.map(lang => Language(lang))}
        </ul>
    )
}
export default LanguagesList;