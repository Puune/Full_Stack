const reducer = (state = '', action) => {
  switch(action.type){
    case 'SET FILTER':
      return action.data;
  }
  return state;
}

export const setFilter = (data) => {
  return{
    type: 'SET FILTER',
    data: data
  }
}

export default reducer;