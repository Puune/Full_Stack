import React from 'react';

const splitNumber = ({entry}) => {        
    let fonum = new String(entry.number);
    let formattedNumber = fonum.slice(0,3) + '-' + fonum.slice(3);
    
    return(
        formattedNumber
    )
}

const entries = ({entry}) => <li key={entry.name}>{entry.name}: {splitNumber({entry})}</li>

const phonebookList = ({list}) => {
    return(
        <ul>
            {list.map(entry => entries(entry={entry}))}
        </ul>
    )
}

export default phonebookList;