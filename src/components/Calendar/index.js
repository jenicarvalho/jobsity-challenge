import React from "react";
import dateFns from "date-fns";
// import { connect } from 'react-redux'
import Reminder from '../Reminder/index'
import './style.scss'

import { connect } from 'react-redux'

class Calendar extends React.Component {
  
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const { reminder } = this.props
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {

        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
          className={`col cell ${
            !dateFns.isSameMonth(day, monthStart)
            ? "disabled"
            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
          }`}
          key={day}
          onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            {reminder && dateFns.isSameDay(day, reminder[i]?.date) && (
              
              <div className="list-reminder" style={{ backgroundColor: reminder[i]?.color}}>
                <div className="text">{reminder[i]?.reminderText}</div>
                <div className="time">{reminder[i]?.time}</div>
                <div className="city">{reminder[i]?.city}</div>
              </div>
            )}
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.reminder !== this.props.reminder) {
      this.renderCells()
    }
  }

  render() {
    return (
      <>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}

        </div>
        <Reminder />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminder: state.reminder
  }
}

export default connect(mapStateToProps)(Calendar)