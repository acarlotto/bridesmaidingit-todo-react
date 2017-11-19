import React from 'react';

const Event = (props) => {

  const eventStyle = {
    background: 'transparent',
    outline: '0'
  }

  const selectedEventStyle = {
    border: '1px solid black',
    ...eventStyle
  }

  const unselectedEventStyle = {
    border: '0',
    ...eventStyle
  }

  return (
    <li>
      <input
        id={props.eventId}
        onDoubleClick={props.setSelectedEvent}
        onChange={props.setEventTitle}
        readOnly={!props.selected}
        style={props.selected 
            ? selectedEventStyle
            : unselectedEventStyle}
        value={props.title}/>
    </li>
  )
}

export default Event