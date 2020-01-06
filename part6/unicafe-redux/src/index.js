import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const counterHandler = (type) => {
    store.dispatch({ type: type });
  }

  return (
    <div>
      <button onClick={() => counterHandler('GOOD')}>good</button>
      <button onClick={() => counterHandler('OK')}>neutral</button>
      <button onClick={() => counterHandler('BAD')}>bad</button>
      <button onClick={() => counterHandler('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)