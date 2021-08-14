import userService from '../services/users'


const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    console.log('getting all users')
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}

export default usersReducer

