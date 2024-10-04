'use client'

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set the localizer for the calendar
const localizer = momentLocalizer(moment);

export default function Sample() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH); // Add state for the current view

  // Handle adding new events
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter Event Title');
    if (title) {
      const newEvent = { title, start, end };
      setEvents([...events, newEvent]);
    }
  };

  // Handle editing an existing event
  const handleSelectEvent = (event) => {
    const newTitle = window.prompt('Edit Event Title', event.title);
    if (newTitle) {
      const updatedEvents = events.map((ev) => 
        ev === event ? { ...ev, title: newTitle } : ev
      );
      setEvents(updatedEvents);
    }
  };

  // Handle view change
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className='pt-[40px] p-8 bg-[#CDC1FF]'>
      <Calendar
        className="bg-[#F5EFFF] border p-4 rounded-lg shadow-md"
        localizer={localizer}
        events={events}  // Bind events state to the calendar
        selectable={true}  // Make calendar selectable
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={currentView} // Bind the calendar view to the state
        onView={handleViewChange} // Handle view change
        onSelectSlot={handleSelectSlot}  // Trigger event adding on slot selection
        onSelectEvent={handleSelectEvent} // Trigger event editing on event click
        
        // Enable multiple views
        views={['month', 'week', 'day', 'agenda']}  
        step={60}  // Set time slot duration (in minutes)
        showMultiDayTimes  // Display time slots for multi-day events
        toolbar={true}  // Show toolbar with navigation buttons
        popup={true}  // Enable popup for more events in a day
      />
    </div>
  );
}
