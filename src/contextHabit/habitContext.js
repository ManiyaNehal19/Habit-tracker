import { createContext, useContext } from "react";
export const HabitContext = createContext({
    habits: [],
    addHabit: (habit)=>{},
    deleteHabit:(id)=>{},
    toggleHabit:(id)=>{}

})
export const useHabit = ()=>{
    return useContext(HabitContext)
}
export const HabitProvider = HabitContext.Provider;