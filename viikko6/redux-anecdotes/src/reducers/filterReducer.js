const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = word => {
  return {
    type: 'SET_FILTER',
    payload: word,
  }
}

export default filterReducer