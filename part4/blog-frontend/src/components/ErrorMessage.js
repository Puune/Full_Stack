import React from 'react';
import '../App.css'

const ErrorMessage = ({error}) => {
  var cName = null;
  if(error === null){
    cName = null;
  } else {
    cName = 'error';
  }

  return(
    <div>
      <h3 className={cName}>{error}</h3>
    </div>
  )
}

export default ErrorMessage;