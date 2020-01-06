import React from 'react';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {

  const filterHandler = (event) => {
    props.store.dispatch(
      setFilter(event.target.value)
    )
  }

  return(
    <div>
      <h3>Filter</h3>
      <input 
        name="filter"
        onChange={filterHandler}  
      />
    </div>
  )
}

export default Filter;