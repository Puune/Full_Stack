import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, unsetNotification } from '../reducers/notificationReducer';


const AnecdoteList = (props) => {

  const { anecdote, filter } = props.store.getState();

  const getAnecdotes = () => {
    let adotes = anecdote;
    //console.log(adotes);

    if(filter !== ''){
      adotes = adotes.filter((anec) => {
        return anec.content.includes(filter)
      })
    }
    
    adotes.sort(function(a,b){ return b.votes - a.votes })
    return adotes;
  }

  const vote = (anecdote) => {
    props.store.dispatch(
      voteAnecdote(anecdote.id)    
    )
    props.store.dispatch(
      setNotification(anecdote.content)
    )
    setTimeout(() => {
      props.store.dispatch(
        unsetNotification()
      )
    }, 3000)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {getAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;