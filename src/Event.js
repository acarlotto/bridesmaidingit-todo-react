import React from 'react';
import FontAwesome from 'react-fontawesome';
// import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const Event = (props) => {

  const eventStyle = {
    background: 'transparent',
    outline: '0',
    width: '200px'
  }

  const selectedEventStyle = {
    border: '1px solid black',
    ...eventStyle
  }

  const unselectedEventStyle = {
    border: '0',
    ...eventStyle
  }

  const eventButtonStyle = {
    border: '0px',
    marginLeft: '5px'
  }

  const deleteButtonStyle = {
    cursor: 'pointer'
  }

  const hiddenStyle = {
    visibility: 'hidden'
  }
    

  return (
    <div>
      <li>
        <input type='checkbox' 
        style={props.selected
              ? hiddenStyle
              : deleteButtonStyle
            }
        />
          <input
            autoFocus={props.selected
            ? true
            : false}
            id={`event-${props.eventId}`}
            onDoubleClick={props.setSelectedEvent}
            onChange={props.setEventTitle}
            readOnly={!props.selected}
            style={props.selected
            ? selectedEventStyle
            : unselectedEventStyle}
            value={props.title}/>
            {/* <input 
            readOnly={!props.selected}
            placeholder='assignee'
            style={props.selected
            ? selectedEventStyle
            : unselectedEventStyle}/> */}
          <FontAwesome
            name="trash-o"
            size="1x"
            style={props.selected
              ? hiddenStyle
              : deleteButtonStyle
            }
            onClick={props.deleteEvent}
            data-id={props.eventId}
            value={props.title}/>
       
        <button
          style={props.selected
          ? eventButtonStyle
          : hiddenStyle}
          data-id={props.eventId}
          onClick={props.submitEventEdit}>Submit</button>
      </li>
    </div>
  )
}

export default Event