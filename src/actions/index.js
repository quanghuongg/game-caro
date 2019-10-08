import { types, pieces } from "../constants/ActionTypes";

export const jumTo = step => ({
  type: types.JUMP_TO,
  step
})

export const init_array = array_board => ({
  type: types.INIT_ARRAY,
  array_board
})

export const tick =  (array_new) => ({
  type: types.TICK,
  array_new
})

export const switch_piece = (data) => ({
  type: types.SWITCH_PIECE,
  data
})




