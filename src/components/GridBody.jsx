import React, { useState } from 'react'
import Weekly from './Weekly.jsx'
import HabitTodo from './HabitTodo.jsx'
function GridBody() {
    const color = ['#faedcb', '#c9e4de', '#c6def1', '#dbcdf0', '#f2c6de', '#f7d9c4'];
    const [counter_Col, setcounter] = useState(0);
  return (
    <div className=' grid grid-cols-3 h-screen'>
        <div className='col-span-2  '>
            <div className='flex items-center justify-around m-3'>
                <h1 className='text-3xl font-bold'>Hey, Maniya</h1>
                <form className='hidden'>
                    
                    <input type="text" className='bg-gray-300 px-10 rounded-md py-2 mr-2 ' placeholder='Habit'/>
                    <button type='submit' className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Add</button>
                </form>
                <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Add New Habit</button>
            </div>
            <div className='flex items-center justify-center'>
                <button className='font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 bg-gray-300 hover:bg-gray-400'>Monthly</button>
                <button className='font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 bg-gray-300 hover:bg-gray-400'>Weekly</button>
            </div>
            <div  className='bg-gray-400 '>
                <Weekly/>
            </div>
            
                       
        </div>
        <div className='col-span-1 h-screen '>
        <h2 className='text-2xl font-bold text-center m-3'>Daily Habits</h2>
        <div className=' bg-blue-400 '>
            {habits.map(habits=>{
                <div className='bg-red' key={habits.id}>
                    <HabitTodo habit={habits} color={color[counter_Col%6]}/>
                    
                </div>
            })}
        
        </div>
        
        </div>
    </div>
  )
}


export default GridBody