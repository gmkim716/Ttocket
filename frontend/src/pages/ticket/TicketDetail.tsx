import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TicketDetailCard from './TicketDetailCard'
import TicketDetailQR from './TicketDetailQR'

function TicketDetail() {
  const location = useLocation();
  return (
    <div className='absolute z-20 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40'>
        <div className='bg-white rounded-lg shadow-lg bg-opacity-90 TicketDetail'>
        <img src={location.state.performPoster} alt="poster" className='absolute rounded-lg TicketBackImg -z-10'/>
          <Routes>
            <Route path="/" element={<TicketDetailCard />}></Route>
            <Route path="/enter" element={<TicketDetailQR/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default TicketDetail