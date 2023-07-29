import { useAtom } from 'jotai'
import { CalendarAtoms } from '../store'
import { useCalculateMonth, useSetToday } from '../utils/hooks'

export const useCalendarApi = () => {
  const [month, setMonth] = useAtom(CalendarAtoms.month)
  const [year, setYear] = useAtom(CalendarAtoms.year)
  const [currentDayGrid, setCurrentDayGrid] = useAtom(CalendarAtoms.currentDayContainer)
  const [events, setEvents] = useAtom(CalendarAtoms.events)

  const calculateMonth = useCalculateMonth()
  const setToday = useSetToday()

  return {
    month: {
      value: month,
      set: setMonth,
    },
    year: {
      value: year,
      set: setYear,
    },
    currentDayGrid: {
      value: currentDayGrid,
      set: setCurrentDayGrid,
    },
    events: {
      value: events,
      set: setEvents,
    },
    actions: {
      prevMonth: () => calculateMonth('prev'),
      nextMonth: () => calculateMonth('next'),
      today: () => setToday(),
    },
  }
}
