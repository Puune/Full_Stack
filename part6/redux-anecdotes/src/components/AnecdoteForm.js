import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnectodeForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault();
    props.store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = '';
  }

  return(
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnectodeForm;