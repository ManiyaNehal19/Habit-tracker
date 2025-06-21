import React from 'react';

function Weekly({ habittodo }) {
  function getCurrentWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;

    const weekDates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (adjustedDay - i));
      weekDates.push(date.toISOString().slice(0, 10));
    }

    return weekDates;
  }

  const weekDates = getCurrentWeekDates();
  const weekColor = ['bg-cyan-200', 'bg-sky-200', 'bg-blue-200','bg-indigo-200', 'bg-violet-200', 'bg-purple-200', 'bg-fuchsia-200']
  const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  function renderDayColumn(date, dayName, index) {
    return (
      <div id={date} key={date}>
        <h2 className={`text-md font-semibold ${weekColor[index]} rounded-lg p-2`}>{dayName}</h2>
        {
          habittodo.map((habit) => {
            const logValue = habit.logs?.[date];
            return (
              <div
              className='mb-1 p-0.5 rounded-lg '
                key={`${habit.id}-${date}`}
                
              >
                {logValue ? "✔️" : "✖️"}
              </div>
            );
          })
        }
      </div>
    );
  }

  return (
    <div className="grid grid-cols-8  text-center p-2 gap-1.5">
      <div >
        <h3 className=' text-md font-semibold bg-teal-200 rounded-lg p-2 mb-1'>Habits</h3>
        {habittodo.map((habit, index) => (
          <div 
          className={`${weekColor[index%7]} mb-1 p-0.5 rounded-lg`}
          key={habit.id}>{habit.habit}</div>
        ))}
      </div>

      {weekDay.map((weekday, index) =>
        renderDayColumn(weekDates[index], weekday, index)
      )}
    </div>
  );
}

export default Weekly;
