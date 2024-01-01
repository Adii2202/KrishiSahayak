import './Calendar1';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import enINLocale from 'date-fns/locale/en-IN';
import 'react-datepicker/dist/react-datepicker.css';

const eventTypes = [
  "Sowing",
  "Picking",
  "Growing and Harvesting Crops",
  "Cattle Hospitality",
  "Soil Testing",
  "Equipment Buying",
  "Equipment Servicing",
  "Feeding Livestock",
  "Other"
];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-IN': enINLocale,
  },
});

const initialEvents = [
  {
    title: 'Sowing',
    allDay: true,
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
  },
  // ... (other events)
];

function Calendar1() {
  const [newEvent, setNewEvent] = useState({ title: "", type: "Sowing", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(initialEvents);

  function handleAddEvent() {
    // Set title to the selected type if it's not "Other"
    const title = newEvent.type === "Other" ? newEvent.title : newEvent.type;

    // Create a new event object
    const newEventObj = {
      title,
      start: newEvent.start,
      end: newEvent.end,
    };

    // Update the events state
    setAllEvents([...allEvents, newEventObj]);

    // Clear the form
    setNewEvent({ title: "", type: "Sowing", start: "", end: "" });
  }

  function handleDeleteEvent(event) {
    const updatedEvents = allEvents.filter((e) => e !== event);
    setAllEvents(updatedEvents);
  }

  return (
    <div className='app'>
      <h1>Event Calendar</h1>
      <div className="form-container">
        <div className="form-section">
          <label htmlFor="eventType">Event Type:</label>
          <select
            id="eventType"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value, title: "" })}
          >
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>

        {newEvent.type === "Other" && (
          <div className="form-section">
            <label htmlFor="customTitle">Custom Title:</label>
            <input
              id="customTitle"
              type='text'
              placeholder='Add Title'
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </div>
        )}

        <div className="form-section">
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            id="startDate"
            placeholderText='Select Start Date'
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
        </div>

        <div className="form-section">
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            id="endDate"
            placeholderText='Select End Date'
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
        </div>

        <button className=" bg-black rounded-md w-32 " onClick={handleAddEvent}>Add Event</button>
      </div>

      <div className="event-list">
        <h2>Event List</h2>
        {allEvents.map((event, index) => (
          <div key={index} className="event-item">
            <span className="event-number">{index + 1}.</span>
            <span className="event-title">{event.title}</span>
            <button className=" bg-black rounded-md w-32 " onClick={() => handleDeleteEvent(event)}>Delete Event</button>
          </div>
        ))}
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
}

export default Calendar1;
