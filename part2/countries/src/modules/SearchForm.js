import React from 'react';

const SearchForm = ({value, state, filter}) => {    

    const handleOnChange = (e) => {
        state(e.target.value);
        filter(e.target.value);
    }

    const mySubmit = (event) => {
        event.preventDefault();
    }

    return(
        <form onSubmit={mySubmit}>
            <div>
                Find countries <input value={value} onChange={(e) => handleOnChange(e)} />
            </div>
        </form>
    )
}
export default SearchForm;