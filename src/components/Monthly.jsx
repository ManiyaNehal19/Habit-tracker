import React from 'react'

function Monthly({habittodo}) {
  const Months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  const Month_Color = [ "bg-red-200",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400"]
  console.log(habittodo);
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
  }
  function calculateProgress(index){
    
    const total_days = daysInMonth(month,year);
    let counter = 0;
    let logs_todo = habittodo[index].logs;
    for(const key in logs_todo){
      const month_key = parseInt(key.slice(5,7));
      
      if(month_key===(month+1) && logs_todo[key]) counter++
  }
  console.log(counter);
  const progress_percent = ((counter/total_days)*100).toFixed(0);
  return progress_percent

  }
  return (
    <div className=''>
      <h1 className='text-3xl italic font-bold p-3 text-center'>{Months[month]} </h1>
    <div>
        {
          habittodo.map((habit, index)=>(
            
            <div className='p-3' key={habit.id}>

              <div className="flex justify-between mb-1">
              <span className="text-base   font-bold">{habit.habit}</span>
              <span className="text-sm font-medium ">{calculateProgress(index)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 ">
              <div className={`${Month_Color[index%12]} h-4 rounded-full`} style={{width: `${calculateProgress(index)}%`}}></div>
            </div>
            </div>
            
          ))
        }
      
    </div>
    </div>
  )
}

export default Monthly