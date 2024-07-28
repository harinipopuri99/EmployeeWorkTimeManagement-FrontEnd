const intialState ={
    list: [],
    //extra
    currentEmployee: null
}; // comma extra

const employee = (state=intialState,action)=>{
     /* if(action.type === 'GET_ALL_EMPLOYEE'){
        let temp = action.payload; 
        return {...state, list: temp}
      }

    return state; */

    switch (action.type) {
      case 'GET_ALL_EMPLOYEE':
          return {
              ...state,
              list: action.payload
          };

      case 'GET_CURRENT_EMPLOYEE':
          return {
              ...state,
              currentEmployee: action.payload
          };

      default:
          return state;
    }
};

export default employee;