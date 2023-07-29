import React from 'react'
import { twMerge } from 'tailwind-merge'
import { EventLimitProps } from '../types'
import { getDay } from 'date-fns'
import Element from '../utils/Element'

const EventLimit: React.FC<EventLimitProps> = ({
  eventContainerClassName,
  eventLimitClassName,
  eventLimit,
  eventLimitOnClick,
  day,
}) => {
  return (
    <li className={twMerge('px-2 py-0.5', eventContainerClassName)} style={{ gridColumnStart: getDay(day.date) }}>
      <Element
        as={typeof eventLimitOnClick === 'function' ? 'button' : 'div'}
        onClick={() => eventLimitOnClick && eventLimitOnClick(day.events.slice(eventLimit))}
        className={twMerge('font-semibold pointer-events-auto', eventLimitClassName)}
      >
        +{day.events.length - eventLimit} more
      </Element>
    </li>
  )
}

export default EventLimit
