  
  
  const notificationReducer = (state = 'default notification', action) => {
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return state(action.data)
      default:
        return state
    }
  }
  
  export const setNotification = (message) => {
    return {
      type: 'NEW_NOTIFICATION',
      data: {
        message
      }
    }
  }
  
  export default notificationReducer