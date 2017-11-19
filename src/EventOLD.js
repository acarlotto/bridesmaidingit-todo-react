import React, { Component } from 'react';
import axios from 'axios';

class Event extends Component {

    constructor(props) {
        super(props)
        this.state = {
          event: {},
        }
        this.getState = this
            .getState
            .bind(this)
        this.getEvents = this
          .getState
          .bind(this)
    }

    // getter method
  getState(event) {
    event.preventDefault()
    console.log(this.state)
  }

    getEvents(event) {
        event.preventDefault()
        console.log(this.state.event)
        axios
            .get('http://localhost:4741/events', {
            credentials: {
                events: this.state.event,
            }
        })
            .then(response => {
            const event = response.data.event.title
            this.setState({event: event})
            })
    }

    render() {
        return (
            <div>
                <h1>Event</h1>
               <span>{this.state.event}</span>
            </div>
        );
    }
}

export default Event;