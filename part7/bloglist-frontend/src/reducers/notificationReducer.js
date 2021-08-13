let timer1

const notificationReducer = (state = '', action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return ''
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
    clearTimeout(timer1)
    timer1 = setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION'
    }), timer)
  }
}

export default notificationReducer