import {
  addDays,
  differenceInDays,
  getTime,
  isMonday,
  isSameDay,
  isSameMonth,
  isSunday,
  isToday,
  nextSunday,
  previousMonday,
} from 'date-fns'
import { DaysGrid, EventList, SingleDayGrid } from '../types'

export const sortEvents = (events: EventList) => {
  return events.sort((a, b) => getTime(a.date) - getTime(b.date))
}

export const getDaysGrid = (
  firstDayOfMonth: Date,
  lastDayOfMonth: Date,
  events: EventList,
  setCurrentDayGrid: (day: SingleDayGrid) => void,
): DaysGrid => {
  const daysGrid: DaysGrid = []

  let firstMonday = firstDayOfMonth
  let lastSunday = lastDayOfMonth

  if (!isMonday(firstMonday)) {
    firstMonday = previousMonday(firstDayOfMonth)
  }

  if (!isSunday(lastSunday)) {
    lastSunday = nextSunday(lastDayOfMonth)
  }

  if (differenceInDays(lastSunday, firstMonday) < 41) {
    lastSunday = nextSunday(lastSunday)
  }

  let currentDay = firstMonday
  let eventIndex = 0
  let dayEvents: EventList = []

  while (currentDay <= lastSunday) {
    while (events.length > eventIndex && differenceInDays(currentDay, events[eventIndex].date) > 0) {
      eventIndex += 1
    }

    while (events.length > eventIndex && isSameDay(events[eventIndex].date, currentDay)) {
      dayEvents.push(events[eventIndex])
      eventIndex += 1
    }
    const day: SingleDayGrid = {
      date: currentDay,
      isCurrentMonth: isSameMonth(currentDay, firstDayOfMonth),
      events: dayEvents,
    }

    daysGrid.push(day)

    if (isToday(day.date)) {
      setCurrentDayGrid(day)
    }

    dayEvents = []
    currentDay = addDays(currentDay, 1)
  }

  return daysGrid
}
