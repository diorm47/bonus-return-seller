const LOGIN_USER = "LOGIN_USER";

const initialState = {
  username: "",
  password: "",
  is_logged: false,
  email: "",
  picture: "",
  email_verified: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const loginUserAction = (payload) => {
  return {
    type: LOGIN_USER,
    payload,
  };
};

export default userReducer;
