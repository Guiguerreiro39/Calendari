import React from 'react'
import { EventProps } from '../types'
import Element from '../utils/Element'
import { twMerge } from 'tailwind-merge'

const Event: React.FC<EventProps> = ({
  event,
  startColumn,
  endColumn,
  eventClassName,
  eventContainerClassName,
  eventOnClick,
}) => {
  return (
    <li
      className={twMerge('px-2 py-0.5 event', eventContainerClassName)}
      style={{
        gridColumnStart: startColumn,
        gridColumnEnd: endColumn,
      }}
    >
      <Element
        as={typeof eventOnClick === 'function' ? 'button' : 'div'}
        onClick={() => eventOnClick && eventOnClick(event)}
        className={twMerge(
          'rounded-full bg-neutral-200 w-full text-center px-1 pointer-events-auto hover:bg-blue-100',
          eventClassName,
          event.className,
        )}
      >
        {event.title}
      </Element>
    </li>
  )
}

export default Event
