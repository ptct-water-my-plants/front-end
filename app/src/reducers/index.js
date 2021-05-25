export const initialState = {
  users: [],
  formValues: {
    username: '',
    email: '',
    password: ''
  },
  formErrors: {
    username: '',
    email: '',
    password: ''
  },
  disabled: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'SET_FORM_VALUES':
      return {
        ...state,
        formValues: action.payload
      };
    case 'SET_FORM_ERRORS':
      return {
        ...state,
        formErrors: action.payload
      };
    case 'SET_DISABLED':
      return {
        ...state,
        disabled: action.payload
      }
    default:
      return state;
  }
};

export default reducer;