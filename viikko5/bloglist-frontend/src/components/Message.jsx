const Message = ({ message, setMessage }) => {
  if (!message) {
    return null
  }
  const messageStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    fontSize: '30px',
    border: message.type === 'error' ? '3px solid red' : '3px solid green'
  }
  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div>
      <p style={messageStyle} >{ message.text }</p>
    </div>
  )
}

export default Message