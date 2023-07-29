import { ReactNode } from 'react'

export type SingleDayGrid = {
  date: Date
  isCurrentMonth: boolean
  events: EventList
}

export type DaysGrid = SingleDayGrid[]

export interface Event {
  id?: string
  className?: string
  customProps?: any
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
  eventLimitOnClick?: (events?: EventList) => void
  events?: EventList
  eventLimit?: number
  eventOnClick?: (event?: Event) => void

  // Timeline
  timeGridClassName?: string
  timeContainerClassName?: string
  timeContainerOnClick?: (day?: Day) => void

  // Body
  todayClassName?: string
  todayContainerClassName?: string
  todayContainerOnClick?: (day?: Day) => void
  dayClassName?: string
  dayOnClick?: (date?: Date) => void
  dayContainerClassName?: string
  dayContainerOnClick?: (date?: Date) => void
  bodyClassName?: string

  // Header
  header?: boolean
  headerClassName?: string
  customHeader?: ReactNode

  // Calendar
  borderColor?: colors
  className?: string
}

export interface RequiredCalendarProps extends CalendarProps {
  borderColor: colors
  header: boolean
  events: EventList
  eventLimit: number
}

export interface CalendarDaysProps extends CalendarProps {}

export interface CalendarBodyProps extends CalendarProps {}

export interface DayContainerProps extends RequiredCalendarProps {
  day: SingleDayGrid
  dayContainerMinHeight: string
  dayIndex: number
}

export interface EventProps extends RequiredCalendarProps {
  event: Event
  startColumn: number
  endColumn: number
}

export interface EventLimitProps extends RequiredCalendarProps {
  day: SingleDayGrid
}

export interface HeaderProps extends Partial<CalendarProps> {}

export interface MonthSwitcherProps {
  className?: string
  todayClassName?: string
  arrowsClassName?: string
}
