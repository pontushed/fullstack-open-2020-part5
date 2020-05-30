import React from 'react'

const Notification = ({ message }) => {
  if (message === null || message.text === null || message.text === '') {
    return null
  }

  return <p className={message.type}>{message.text}</p>
}

export default Notification
