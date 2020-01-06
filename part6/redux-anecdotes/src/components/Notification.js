import React from 'react'

const Notification = (props) => {
  const visible = props.store.getState().notification;

  console.log(visible);
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <div style={style, {visible}} >
      {props.store.getState().notification.data}
    </div>
  )
}

export default Notification