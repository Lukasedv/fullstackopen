  
  
  const notificationReducer = (state = null, action) => {
    switch(action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'REMOVE_NOTIFICATION':
        return null
      default:
        return state
    }
  }
  
  export const timedNotification = (notification, timer) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          notification: null
        })
      }, timer)
    }
  }
  
  export default notificationReducer