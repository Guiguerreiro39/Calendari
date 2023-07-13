import { getMonth, getYear } from 'date-fns'
import { atom } from 'jotai'
import { EventList, SingleDayGrid } from '../types'

export const CalendarAtoms = {
  month: atom<number>(getMonth(new Date())),
  year: atom<number>(getYear(new Date())),
  currentDayGrid: atom<SingleDayGrid | undefined>(undefined),
  events: atom<EventList>([]),
}
