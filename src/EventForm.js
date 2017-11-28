import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import FontAwesome from 'react-fontawesome';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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

    const bindMethods = ['setEventTitle', 'setSelectedEvent', 'deleteEvent', 'submitEventEdit', 'clearSelectedEvent', 'addNewEvent']
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
    return axios
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


  postEventRequest(data) {
    return axios.post(`${this.backend}/events`, {
      event: {
        title: data.title,
        user_id: data.user_id,
      }
    },
  {
    headers: {
      'Authorization': 'Token token=' + this.props.auth.token,
      'Content-Type': 'application/json'
    }
  })
    .then(this.clearSelectedEvent)
    .catch(error => {
      console.error('post event failed!', error.response)
      this.getEventsRequest()
    })
  }

  patchEventRequest(eventId, data) {
    return axios.patch(`${this.backend}/events/${eventId}`, {
      event: {
        title: data.title
      }
    }, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this.clearSelectedEvent)
    .catch(error => {
      console.error('patch event failed!', error.response)
      this.getEventsRequest()
    })
  }

  // EVENT HANDLERS
  addNewEvent(event) {
    event.preventDefault()
    this.getEventsRequest().then(() => {
      const newEvent = {
        title: '',
        id: "new event",
        user_id: this.props.auth.userId
      }
      this.setState(prevState => {
        const newState = Object.assign({}, prevState)
        newState.events.push(newEvent)
        newState.selectedEvent = "new event"
        return newState
      })
    })
    // step 1: add an empty event to state


   // step 2: set state.selected event to "new event"
   
  }

  setEventTitle(event) {
    const eventId = event.target.id.replace('event-', '')
    const newVal = event.target.value
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      const editedIdx = newState.events.findIndex(event => eventId === `${event.id}`)
      newState.events[editedIdx].title = newVal
      return newState
    })
  }

  setSelectedEvent(event) {
    const eventId = event.target.id.replace('event-', '')        
    this.getEventsRequest().then(() =>{
      this.setState({selectedEvent: eventId})
    })
  }

  deleteEvent(event) {
    const eventId = event.target.dataset.id 
    console.log('testing')
    console.log(eventId)
    this.deleteEventRequest(eventId)
  }

  submitEventEdit(event) {
    event.preventDefault()
    const eventId = event.target.dataset.id      
    //  step 3: if eventId = "new event" then do a post if eventId is a positive integer do a patch
    if (eventId === "new event") {
      const eIdx = this.state.events.findIndex(event => event.id === "new event")
      const eventData = this.state.events[eIdx]
      console.log(eventData)
      this.postEventRequest({
        user_id: eventData.user_id,
        title: eventData.title
      })
    }
    if (parseInt(eventId) > 0 ) {
      const titleVal = document.querySelector(`#event-${eventId}`).value      
      this.patchEventRequest(eventId, {title: titleVal})
    }
    // step 4: create data object for post request
        

  }

  clearSelectedEvent() {
    this.getEventsRequest()
    .then(() => {
      this.setState({selectedEvent: null})
    })
  }

  render() {

    const eventsList = this.state.events.map(event => {
        return (
          <Event
            selected={`${event.id}` == this.state.selectedEvent}
            setEventTitle={this.setEventTitle}
            setSelectedEvent={this.setSelectedEvent}
            deleteEvent={this.deleteEvent}
            submitEventEdit={this.submitEventEdit}
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
        <button 
            disabled={this.state.selectedEvent === "new event"
              ? true
              : false
            }
            onClick={this.addNewEvent}>add a to-do</button>
      </div>
    )
  }
}

export default EventForm;
