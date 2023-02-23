import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar, TimePicker } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import Timetable from 'react-timetable-events'
import { GetTimeTableAPI } from "../connectors/TimetableConnector"

export const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'Timed event',
    start: '2022-12-09T10:30:00.000+07:00',
    end: '2022-12-09T17:30:00.000+07:00'
  },
  {
    id: '2',
    title: 'All-day event',
    start: '2022-12-08T11:15:00'
  },

]
const TimeTable = () => {
  const [timeTable, setTimeTable] = useState()
  const getTimeTable = async () => {
    const res = await GetTimeTableAPI("27/08/2022", "02/09/2022")
    const resTimeTable = await Promise.all(res.data.map(async(e)=> ({
      title: `${e.subjectName} ${e.roomName}`,
      start: e.startDate,
      end: e.endDate
    })))
    console.log(resTimeTable)
    setTimeTable(resTimeTable)
  }
  useEffect(() => {
    getTimeTable()
  }, [])
  const handleEventChange=(e)=>{
    console.log(e)
  }
  return (
    <div>
      
      {
        timeTable?<FullCalendar
        plugins={[timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek'
        }}
        initialView='timeGridWeek'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        initialEvents={timeTable}
        //eventChange={handleEventChange}
       //select={handleEventChange}
        //eventContent={handleEventChange} 
      // eventClick={this.handleEventClick}
      // eventsSet={this.handleEvents} 
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
      />:null
      }
    </div>)
}
export default TimeTable