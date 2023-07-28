import React from 'react'
import { Event as EventType } from '../types'
import Element from '../utils/Element'
import { twMerge } from 'tailwind-merge'

const Event: React.FC<{
  event: EventType
  startColumn: number
  endColumn: number
  eventClassName?: string
  eventContainerClassName?: string
}> = ({ event, startColumn, endColumn, eventClassName, eventContainerClassName }) => {
  return (
    <li
      className={twMerge('px-2 py-0.5 event', eventContainerClassName)}
      style={{
        gridColumnStart: startColumn,
        gridColumnEnd: endColumn,
      }}
    >
      <Element
        as='button'
        className={twMerge('rounded-full bg-neutral-200 w-full pointer-events-auto hover:bg-blue-100', eventClassName)}
      >
        {event.title}
      </Element>
    </li>
  )
}

export default Event
