const initState = {
  data: 'Init message',
  style: 'display: none'
}

const reducer = (state = initState, action) => {
  //console.log('action_noti', action);
  
  switch(action.type){
    case 'SET NOTIFICATION':
      state.data = action.data;
      state.style = action.style;
      return state;
    case 'UNSET NOTIFICATION':
      state.data = action.data;
      state.style = action.style;
      return state;
  }
  return state;
}

export const setNotification = (data) => {
  return {
    type: 'SET NOTIFICATION',
    data: data,
    style: {display: ''}
  }
}

export const unsetNotification = () => {
  return {
    type: 'UNSET NOTIFICATION',
    data: '',
    style: {display: 'none'}
  }
}

export default reducer;