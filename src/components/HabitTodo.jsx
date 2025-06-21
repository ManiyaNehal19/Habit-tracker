import React from 'react'
import { useHabit } from '../contextHabit/habitContext.js';

function dateKey(date = new Date()) {
    return date.toISOString().slice(0, 10);
  }
  
function HabitTodo({habit}) {
    const {toggleHabit, deleteHabit} = useHabit();
    const today = dateKey();
  return (
    <div className='bg-blue-100 rounded-lg grid grid-cols-4 py-3 mb-3'>
        <div className='flex col-span-3 '>
            <input type="checkbox"  
            checked={habit.logs?.[today] ?? false}
            onChange={()=>{
                toggleHabit(habit.id);
            }}
            className='mr-3 ml-3'
            
            />
            <h3 id={`h3${habit.id}`}>{habit.habit}</h3>
        </div>
        
        <button 
        onClick={
            ()=>{
                deleteHabit(habit.id)
            }
        }
        className='col-span-1 '>❌</button>
    </div>
  )
}

export default HabitTodo