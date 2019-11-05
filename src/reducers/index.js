const initialState = {
  isLogged: false
};
function myReducer(state = initialState, action) {
  if(action.type === "XWin"){
    return {
      isLogged : true,
      person: "X"
    }
  }
  if(action.type === "YWin"){
    return {
      isLogged : true,
      person : "Y"
    }
  }
  if(action.type === "Logged"){
    return {
      isLogged : true
    }
  }
  if(action.type === "Logout"){
    return {
      isLogged : false
    }
  }
  return state;
};
export default myReducer;