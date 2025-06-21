import { use, useEffect, useState } from 'react'
import './App.css'
import { HabitProvider } from './contextHabit/habitContext'
import Monthly from './components/Monthly.jsx'
import Weekly from './components/Weekly.jsx'
import HabitTodo from './components/HabitTodo.jsx'

function App() {
  function dateKey(date = new Date()) {
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }
  const [view, setView] = useState("Weekly");
  const [habits, setHabit]  = useState([]);
  const addHabit = (habit) =>{
    setHabit((prev)=>[{id:Date.now(),...habit}, ...prev])
  }
  const deleteHabit = (id)=>{
    setHabit((prevHabit)=>prevHabit.filter( (prev) =>(prev.id!==id)));
  }
  const toggleHabit = (id,date = new Date()) => {
    const today_Date = dateKey(date);
    setHabit(prevHabit =>
      prevHabit.map(habit =>
        habit.id === id
          ? { ...habit, 
            logs:{
              ...habit.logs,
              [today_Date]: !habit.logs[today_Date]
            }}
          : habit
      )
    );
  };
  

  function changeButtonBg(id){
    const button_element = document.getElementById(id);
    if(id==="Weekly"){
      button_element.classList.add("bg-emerald-300")
      document.getElementById("Monthly").classList.remove("bg-emerald-300")
    }else{
      button_element.classList.add("bg-emerald-300")
      document.getElementById("Weekly").classList.remove("bg-emerald-300")
    }
  }
  useEffect(()=>{
    const habits = JSON.parse(localStorage.getItem("habits"))
    if(habits && habits.length>0){
      setHabit(habits)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])



  function changeFormState(){
    const getForm = document.getElementById("formHabit");
    if(getForm.classList.contains("hidden")){
      getForm.classList.remove("hidden");
    }else{
      getForm.classList.add("hidden");
    }
  }
  return (
    <HabitProvider value={{habits, addHabit, deleteHabit, toggleHabit}}>
    <div className=' grid grid-cols-3 h-screen'>
        <div className='col-span-2  '>
            <div className='flex items-center justify-around m-3'>
                <h1 className='text-3xl font-bold'>Hey, Maniya</h1>
                <form className='hidden' id='formHabit'>
               
                    <input type="text" className='bg-gray-300 px-10 rounded-md py-2 mr-2 ' placeholder='Keep it simple' id='input-habit' maxLength={20} min={1}/>
                    <button type='submit' className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={
                      (e)=>{
                        e.preventDefault();
                        const habit = document.getElementById("input-habit").value.trim();
                        
                        if(habit)  addHabit({habit, logs:{}});
                        changeFormState();
                      }
                    }>Add</button>
                </form>
                <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                onClick={()=>{
                  changeFormState();
                }}
                >Add New Habit</button>
            </div>
            <div className='flex items-center justify-center'>
                <button 
                id='Weekly'
                onClick={()=>{setView("Weekly")
                changeButtonBg("Weekly")
              }}
               
                className='font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 bg-emerald-200 hover:bg-emerald-400 bg-emerald-300'>Weekly</button>
                <button
                id='Monthly'
                 onClick={()=>{
                  setView("Monthly")
                  changeButtonBg("Monthly")
                  
                }
                
                }
                className='font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 bg-emerald-200 hover:bg-emerald-400'>Monthly</button>
            </div>
            <div >
                {view==="Weekly" &&<Weekly habittodo={habits}/>}
                {view==="Monthly" && <Monthly habittodo={habits}/>}

            </div>
            
                       
        </div>
        <div className='col-span-1 h-screen '>
        <h2 className='text-2xl font-bold text-center m-3'>Daily Habits</h2>
        <div className='m-3  '>
            {habits.map(habits=>(
                <div className='bg-red' key={habits.id}>
                    <HabitTodo habit={habits}/>
                    
                </div>
            ))}
        
        </div>
        
        </div>
    </div>
    </HabitProvider>
  )
}

export default App
