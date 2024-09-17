'use client'

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)


export default function Sample(props) {
  
  
  return (
    <div className='pt-[100px] p-12'>
      <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  )
}
