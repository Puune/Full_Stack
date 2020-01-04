import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {

  const [visible, setVisible] = useState(false);

  const visibility = (vis) => {return {display: vis ? '' : 'none'}}

  const nonVisContent = props.nonVisContent === undefined ? <div/> : <div>{props.nonVisContent}</div>

  const toggleVis = () => setVisible(!visible);

  Togglable.propTypes = {
    button: PropTypes.object.isRequired,
  }

  return(
    <div>
      <div style={visibility(!visible)}>
        {nonVisContent}
      </div>
      <div style={visibility(visible)} className='togglable'>
        { props.children }
      </div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? props.button.toggled : props.button.untoggled}
        </button>
    </div>
  )
}

export default Togglable;