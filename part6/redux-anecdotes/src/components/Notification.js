import React from 'react'
import { connect } from 'react-redux'



const Notification = (props) => {
  const notificationToShow = () => {
    if ( props.notification === null ) {
      return null
    }
    return <div style={style}>{props.notification}</div> 
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
      notificationToShow()
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification