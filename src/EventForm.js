import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import {Component} from 'react';
import Event from './Event';

class EventForm extends Component {
  constructor(props) {
    super(props)

    this.backend = this.props.backend

    this.state = {
      events: [],
      selectedEvent: null
    }

    const bindMethods = ['setEventTitle', 'setSelectedEvent', 'deleteEvent']
    bindMethods.forEach(method => {
      this[method] = this[method].bind(this)
    })

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerGetEvents !== this.props.triggerGetEvents) {
      this.getEventsRequest()
    }
  }

  // GET HTTP REQUEST
  getEventsRequest() {
    axios
      .get(`${this.backend}/events`, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token
      }
    })
      .then(response => {
        const events = response.data.events
        this.setState({events: events})
      })
      .catch(error => {
        console.error('get events failed!', error.response)
      })
  }

//DELETE
  deleteEventRequest(eventId) {
    axios.delete(`${this.backend}/events/${eventId}`, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token
      }
    })
      .then(response => {
      console.log('event handle')
      const events = update(this.state.events, { $splice:[[eventId, 1]]})
      this.setState({events: events})
      this.getEventsRequest()
    })
    .catch(error => console.log('this is hard', error))
  }

//PATCH
  patchEventRequest(eventId, data) {
    axios.patch(`${this.backend}/events/${eventId}`, {
      event: {
        title: data.title
      }
    }, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token,
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.setState(prevState => {
        const newState = Object.assign({}, prevState)
        for(let n=0; n<newState.events.length; n++) {
          if(`${newState.events[n].id}` === eventId) {
            newState.events[n].title = data.title 
          }
        }
        return newState
      })
    }).catch(error => {
      console.error('patch event failed!', error.response)
    })
  }

  // EVENT HANDLERS
  setEventTitle(event) {
    console.log(event.target.id)
    this.patchEventRequest(event.target.id, {title: event.target.value})
  }

  setSelectedEvent(event) {
    this.setState({selectedEvent: event.target.id})
  }

  deleteEvent(event) {
    const eventId = event.target.dataset.id 
    console.log('testing')
    console.log(eventId)
    this.deleteEventRequest(eventId)
  }

  render() {

    const eventsList = this.state.events.map(event => {
        return (
          <Event
            selected={`${event.id}` == this.state.selectedEvent}
            setEventTitle={this.setEventTitle}
            setSelectedEvent={this.setSelectedEvent}
            deleteEvent={this.deleteEvent}
            key={event.id}
            eventId={event.id}
            title={event.title}/>
        )
      })

    return (
      <div>
        <ul>
          {eventsList}
        </ul>
        <a href="#">add a to-do</a>
      </div>
    )
  }
}

export default EventForm;
