import http from './http';

const startGetUsers = () => {
  return {
    type: 'START_GET_USERS',
    ready: false
  }
}

const completeGetUsers = (data) => {
  return {
    type: 'COMPLETE_GET_USERS',
    data
  }
}

const errorGetUsers = (err) => {
  type: 'ERROR_GET_USERS',
  err
}

export const getUsers = () => {
  return (dispatch, getState) => {
    dispatch(startGetUsers());
    http.get('users/')
    .then((res) => {
      if(res.data) dispatch(completeGetUsers(res.data));
    })
    .catch((err) => {
      dispatch(errorGetUsers(err));
    })
  }
}