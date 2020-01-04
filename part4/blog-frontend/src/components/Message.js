import React from 'react';
import '../App.css';

const Message = ({message}) => {
  var cName = null;
  if(message === null){
    cName=null;
  } else {
    cName = 'message';
  }

  return(
    <h3 className={cName}>{message}</h3>
  )
}

export default Message;