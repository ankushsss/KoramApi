const intialState = false

const login = (state = intialState,action) =>{
  switch (action.type) {
    case "login":
         state = action.data 
        return state  
    default:
        return state
        // break;
  }
}

export  default login