import React, {useState} from 'react';

const Filter = ({searched, setSearched}) => {

    const handleFormFields = (e, state) => {
        state(e.target.value);
    }

    return(
        <form>
            <div>
                Search: <input value={searched} onChange={(e)=>handleFormFields(e, setSearched)}/>
            </div>
        </form>
    )
}
export default Filter;