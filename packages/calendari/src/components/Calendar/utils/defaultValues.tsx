import { CalendarProps, RequiredCalendarProps } from '../types'

const defaultValues = (props: CalendarProps): RequiredCalendarProps => {
  return {
    borderColor: props.borderColor ?? 'neutral',
    header: typeof props.header === 'undefined' ?? true,
    events: props.events ?? [],
    eventLimit: props.eventLimit ?? 2,
    ...props,
  }
}

export default defaultValues
