import React from 'react'
import { DayContainerProps } from '../types'
import { formatISO, getDate, isToday } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import Element from '../utils/Element'
import { useAtom } from 'jotai'
import { CalendarAtoms } from '../store'

const DayContainer: React.FC<DayContainerProps> = ({
  day,
  dayContainerMinHeight,
  todayContainerClassName,
  todayClassName,
  dayContainerClassName,
  dayClassName,
  dayContainerOnClick,
}) => {
  const [, setCurrentDayContainer] = useAtom(CalendarAtoms.currentDayContainer)

  const notCurrentMonthClassName = !day.isCurrentMonth && 'bg-neutral-50 text-neutral-500'
  const isTodayClassName = isToday(day.date) && twMerge('font-semibold text-white bg-neutral-600', todayClassName)
  const isTodayContainerClassName = isToday(day.date) && todayContainerClassName
  const formattedDate = formatISO(day.date, { representation: 'date' })

  return (
    <>
      <Element
        as={typeof dayContainerOnClick !== 'undefined' ? 'button' : 'div'}
        onClick={() => setCurrentDayContainer(day)}
        key={formattedDate}
        style={{ minHeight: dayContainerMinHeight }}
        className={twMerge(
          'flex flex-col justify-start bg-white px-3 py-2 text-neutral-700',
          notCurrentMonthClassName,
          dayContainerClassName,
          isTodayContainerClassName,
        )}
      >
        <time
          dateTime={formattedDate}
          className={twMerge('flex h-6 w-6 items-center justify-center rounded-full', dayClassName, isTodayClassName)}
        >
          {getDate(day.date)}
        </time>
      </Element>
    </>
  )
}

export default DayContainer
