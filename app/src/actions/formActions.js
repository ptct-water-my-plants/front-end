export const setUsers = (details) => {
  return {
    type: 'SET_USERS',
    payload: details,
  };
};
export const setFormvalues = (details) => {
  return {
    type: 'SET_FORM_VALUES',
    payload: details,
  };
};
export const setFormErrors = (details) => {
  return {
    type: 'SET_FORM_ERRORS',
    payload: details,
  };
};
.export const setDisabled = (details) => {
  return {
    type: 'SET_DISABLED',
    payload: details,
  };
};