import React from "react";
import { Form } from "@unform/web";
import { connect } from "react-redux";

import Input from "../Input";
import './style.scss'

class Reminder extends React.Component {

  handleSubmit = (data, { reset }) => {
    this.props.dispatch({
      type: "POST_REMINDER",
      payload: data
    })
    reset();
  }

  render() {
    return (
      <div className="reminder-form">
        <h2>Add a reminder</h2>
        <Form onSubmit={this.handleSubmit}>
          <Input 
            type="text"  
            name="reminderText" 
            placeholder="Text here..." 
            maxLength="30"
          />
          <Input 
            type="date"
            name="date"
          />
          <Input 
            type="time" 
            name="time" 
          />
          <Input 
            type="color" 
            name="color" 
          />
          <button type="submit">Add Reminder</button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminder: state.reminder
  };
}

export default connect(mapStateToProps)(Reminder)