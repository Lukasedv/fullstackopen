import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationToShow = () => {
    if ( notification === '' ) {
      return null
    }
    return <div style={style}>{notification}</div>
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

export default Notification