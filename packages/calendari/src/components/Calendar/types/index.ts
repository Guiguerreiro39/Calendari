export type SingleDayGrid = {
  date: Date
  isCurrentMonth: boolean
  events: EventList
}

export type DaysGrid = SingleDayGrid[]

export interface Event {
  date: Date
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
