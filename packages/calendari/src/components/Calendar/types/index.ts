import { ReactNode } from 'react'

export type SingleDayGrid = {
  date: Date
  isCurrentMonth: boolean
  events: EventList
}

export type DaysGrid = SingleDayGrid[]

export interface Event {
  id?: string
  startAt: Date
  endAt: Date
  title: string
}

export type EventList = Event[]

export type colors =
  | 'transparent'
  | 'black'
  | 'white'
  | 'gray'
  | 'slate'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

export interface CalendarProps {
  // Events
  eventClassName?: string
  eventContainerClassName?: string
  eventLimitClassName?: string
  events?: EventList
  eventLimit?: number

  // Timeline
  timeGridClassName?: string
  timeContainerClassName?: string

  // Body
  todayClassName?: string
  todayContainerClassName?: string
  dayContainerClassName?: string
  dayContainerClickable?: boolean
  bodyClassName?: string

  // Header
  header?: boolean
  headerClassName?: string
  customHeader?: ReactNode

  // Calendar
  borderColor?: colors
  className?: string
}

export interface CalendarDaysProps extends Partial<CalendarProps> {}

export interface CalendarBodyProps extends Partial<CalendarProps> {}

export interface HeaderProps extends Partial<CalendarProps> {}

export interface MonthSwitcherProps {
  className?: string
  todayClassName?: string
  arrowsClassName?: string
}
