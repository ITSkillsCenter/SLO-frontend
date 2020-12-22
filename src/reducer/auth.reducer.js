const initialState = {
   userData: {},
   isLoggedIn: false,
   role: 'staff',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        userData: action.payload.user, role: action.payload.role, isLoggedIn: true
      };
    case 'SIGN_UP_SUCCESS':
      return {
        userData: action.payload, isLoggedIn: true
      };
    case 'CURRENT_USER':
      return {
        userData: action.payload, isLoggedIn: true, role: action.payload.role
      };
    case 'GET_USER_DETAILS':
      return {
        userData: action.payload.user, privileges: action.payload.privileges, isLoggedIn: true, role: action.payload.user.role
      };
    case 'UPDATE_AVATAR':
      return {
        userData: action.payload, isLoggedIn: true
      };  
    case 'LOGOUT':
      return { userData: {}, isLoggedIn: false, role: 'staff' };
    default:
      return state;
  } 
};

export default user;
