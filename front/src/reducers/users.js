const initialState = [];


export default function users(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_USER':
      return [...state, ...action.user];

    case 'UPDATE_USERNAME':
      return [...state, ...action.user];

    default:
      return state;
  }
}
