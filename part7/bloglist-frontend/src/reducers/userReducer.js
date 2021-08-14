import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'


const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    console.log('setting token', action.data.token)
    blogService.setToken(action.data.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(action.data)
    )
    return state = action.data
  case 'LOGOUT':
    console.log('logging out user')
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    return state = null
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('logging in existing user')
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } else {
      console.log('logging in new user')
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const getLoggedUser = () => {
  return async dispatch => {
    dispatch({
      type: 'GET_USER',
    })
  }
}




export default userReducer