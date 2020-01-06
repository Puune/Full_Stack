const initState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state=initState, action) => {
  console.log(action);
  let dummyState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  switch (action.type){
  case 'GOOD':
    return state = Object.assign(dummyState ,state, {good: state.good+1})
  case 'OK':
    return state = Object.assign(dummyState ,state, {ok: state.ok+1})
  case 'BAD':
    return state = Object.assign(dummyState ,state, {bad: state.bad+1})
  case 'ZERO':
    return state = initState;
  }
  return state;
}

export default counterReducer;