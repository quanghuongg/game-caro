// import { combineReducers } from 'redux';
// import game from './game';
//
// const myReducer = combineReducers({
//   game
// });
// export default myReducer;
import { combineReducers } from 'redux';
import { types } from '../constants/ActionTypes';

const tmpArr = Array(20);
for (let i = 0; i < 20; i++) {
  tmpArr[i] = Array(20).fill(null);
}
let initialState = {
  history: [
    {
      squares: tmpArr,
      location: null
    }
  ],
  stepNumber: 0,
  xIsNext: true,
  isDescending: true
};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NUMBER_CELL: {
      return { ...state, number_cell: parseInt(action.number_cell) };
    }
    case types.INIT_ARRAY: {
      return { ...state, array_board: action.array_board };
    }
    case types.SWITCH_PIECE: {
      return { ...state, piece_current: action.data };
    }
    case types.TICK: {
      return { ...state, array_board: action.array_new };
    }
    default:
      return state;
  }
};
export default combineReducers({ myReducer });
