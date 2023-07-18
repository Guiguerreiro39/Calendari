import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { CalendarAtoms } from '../store'
import { endOfMonth, format, formatISO, getDate, isToday, startOfMonth } from 'date-fns'
import { getDaysGrid, sortEvents } from '../utils'
import { DaysGrid, EventList, SingleDayGrid, CalendarBodyProps } from '../types'
import { twJoin, twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import Element from '../utils/Element'

const bodyClassName = cva('flex text-xs leading-6 text-neutral-700 lg:flex-auto', {
  variants: {
    borderColor: {
      transparent: 'bg-transparent',
      black: 'bg-black',
      white: 'bg-white',
      gray: 'bg-gray-200',
      slate: 'bg-slate-200',
      zinc: 'bg-zinc-200',
      neutral: 'bg-neutral-200',
      stone: 'bg-stone-200',
      red: 'bg-red-200',
      orange: 'bg-orange-200',
      amber: 'bg-amber-200',
      yellow: 'bg-yellow-200',
      lime: 'bg-lime-200',
      green: 'bg-green-200',
      emerald: 'bg-emerald-200',
      teal: 'bg-teal-200',
      cyan: 'bg-cyan-200',
      sky: 'bg-sky-200',
      blue: 'bg-blue-200',
      indigo: 'bg-indigo-200',
      violet: 'bg-violet-200',
      purple: 'bg-purple-200',
      fuchsia: 'bg-fuchsia-200',
      pink: 'bg-pink-200',
      rose: 'bg-rose-200',
    },
  },
})

const MobileCalendarBody: React.FC<{ daysGrid: DaysGrid } & CalendarBodyProps> = ({
  daysGrid,
  dayGridClassName = '',
  className = '',
}) => {
  const [, setCurrentDayGrid] = useAtom(CalendarAtoms.currentDayGrid)

  return (
    <div className={twMerge('isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden', className)}>
      {daysGrid.map((day) => {
        const notCurrentMonthClassName = !day.isCurrentMonth ? 'bg-neutral-50 text-neutral-500' : ''
        const formattedDate = format(day.date, 'yyyy-MM-dd')

        return (
          <button
            type='button'
            onClick={() => setCurrentDayGrid(day)}
            key={formattedDate}
            className={twMerge(
              'flex h-14 flex-col bg-white px-3 py-2 text-gray-700 hover:bg-gray-100 focus:z-10 ',
              notCurrentMonthClassName,
              dayGridClassName,
            )}
          >
            <time
              dateTime={formattedDate}
              className={twJoin(
                'ml-auto',
                isToday(day.date) && 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white',
              )}
            >
              {getDate(day.date)}
            </time>
            <span className='sr-only'>{day.events.length} events</span>
            <span className='-mx-0.5 mt-auto flex flex-wrap-reverse'>
              {day.events.map((_, index) => (
                <span key={index} className='mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-indigo-300'></span>
              ))}
            </span>
          </button>
        )
      })}
    </div>
  )
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  borderColor = 'neutral',
  eventLimit = 2,
  dayGridClassName,
  eventClassName,
  className,
  dayGridClickable = false,
  todayClassName,
  todayGridClassName,
}) => {
  const [month] = useAtom(CalendarAtoms.month)
  const [year] = useAtom(CalendarAtoms.year)
  const [events] = useAtom(CalendarAtoms.events)
  const [currentDayGrid, setCurrentDayGrid] = useAtom(CalendarAtoms.currentDayGrid)

  const [daysGrid, setDaysGrid] = useState<DaysGrid>([])
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(startOfMonth(new Date(year, month)))
  const [lastDayOfMonth, setLastDayOfMonth] = useState<Date>(endOfMonth(new Date(year, month)))
  const [sortedEvents, setSortedEvents] = useState<EventList>(sortEvents(events))

  const handleCurrentDayGrid = useCallback(
    (day: SingleDayGrid) => {
      if (!currentDayGrid) {
        setCurrentDayGrid(day)
      }
    },
    [currentDayGrid, setCurrentDayGrid],
  )

  useEffect(() => {
    setSortedEvents(sortEvents(events))
  }, [events])

  useEffect(() => {
    setFirstDayOfMonth(startOfMonth(new Date(year, month)))
    setLastDayOfMonth(endOfMonth(new Date(year, month)))
  }, [month, year])

  useEffect(() => {
    setDaysGrid(getDaysGrid(firstDayOfMonth, lastDayOfMonth, sortedEvents, handleCurrentDayGrid))
  }, [firstDayOfMonth, lastDayOfMonth, sortedEvents, handleCurrentDayGrid])

  return (
    <div className={bodyClassName({ borderColor })}>
      <div className={twMerge('hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px', className)}>
        {daysGrid.map((day) => {
          const notCurrentMonthClassName = !day.isCurrentMonth && 'bg-neutral-50 text-neutral-500'
          const isTodayClassName =
            isToday(day.date) && twMerge('font-semibold text-white bg-neutral-600', todayClassName)
          const isTodayGridClassName = isToday(day.date) && todayGridClassName
          const formattedDate = formatISO(day.date, { representation: 'date' })

          return (
            <Element
              as={dayGridClickable ? 'button' : 'div'}
              onClick={() => setCurrentDayGrid(day)}
              key={formattedDate}
              className={twMerge(
                'relative text-start flex flex-col justify-start bg-white px-3 py-2 text-neutral-700 min-h-[6rem]',
                notCurrentMonthClassName,
                dayGridClassName,
                isTodayGridClassName,
              )}
            >
              <time
                dateTime={formattedDate}
                className={twJoin('flex h-6 w-6 items-center justify-center rounded-full', isTodayClassName)}
              >
                {getDate(day.date)}
              </time>
              <ol className='mt-2 w-full'>
                {day.events.slice(0, eventLimit).map((event, index) => (
                  <li
                    key={index}
                    className={twMerge('flex font-medium hover:text-indigo-600 text-neutral-900', eventClassName)}
                  >
                    <p className='flex-auto truncate'>{event.title}</p>
                    <time
                      dateTime={formatISO(event.date)}
                      className='ml-3 hidden flex-none opacity-70 xl:block uppercase'
                    >
                      {format(event.date, 'haa')}
                    </time>
                  </li>
                ))}
                {day.events.length > eventLimit && (
                  <li className={twMerge('flex hover:text-indigo-600 text-neutral-900', eventClassName)}>
                    <p className='truncate opacity-50'>+ {day.events.length - eventLimit} more</p>
                  </li>
                )}
              </ol>
            </Element>
          )
        })}
      </div>
      <MobileCalendarBody
        borderColor={borderColor}
        daysGrid={daysGrid}
        dayGridClassName={dayGridClassName}
        className={className}
      />
    </div>
  )
}

export default CalendarBody
