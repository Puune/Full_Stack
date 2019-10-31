import React from 'react';

const members = ({member}) => <li key={member.name}>{member.name} : {member.number}</li>


const SearchPhonebook = ({list}) => {

    return(
        <ul>
            {list.map(member => members(member={member}))}
        </ul>
    )
}

export default SearchPhonebook;