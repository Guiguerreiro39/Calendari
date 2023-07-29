import { useAtom } from 'jotai'
import React, { ElementRef, useCallback, useEffect, useRef, useState } from 'react'
import { CalendarAtoms } from '../store'
import { endOfMonth, format, getDate, isToday, startOfMonth } from 'date-fns'
import { getEventEndCol, getEventList, getEventStartingCol, getWeekDaysGrid } from '../utils'
import { DaysGrid, EventList, SingleDayGrid, CalendarBodyProps } from '../types'
import { twJoin, twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import DayContainer from './DayContainer'
import Event from './Event'
import defaultValues from '../utils/defaultValues'
import EventLimit from './EventLimit'

const cvaBodyClassName = cva('flex text-xs text-neutral-700 lg:flex-auto', {
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
  dayContainerClassName = '',
  className = '',
}) => {
  const [, setCurrentDayContainer] = useAtom(CalendarAtoms.currentDayContainer)

  return (
    <div className={twMerge('isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden', className)}>
      {daysGrid.map((day) => {
        const notCurrentMonthClassName = !day.isCurrentMonth ? 'bg-neutral-50 text-neutral-500' : ''
        const formattedDate = format(day.date, 'yyyy-MM-dd')

        return (
          <button
            type='button'
            onClick={() => setCurrentDayContainer(day)}
            key={formattedDate}
            className={twMerge(
              'flex h-14 flex-col bg-white px-3 py-2 text-gray-700 hover:bg-gray-100 focus:z-10 ',
              notCurrentMonthClassName,
              dayContainerClassName,
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

const CalendarBody: React.FC<CalendarBodyProps> = (props) => {
  const [month] = useAtom(CalendarAtoms.month)
  const [year] = useAtom(CalendarAtoms.year)
  const [events] = useAtom(CalendarAtoms.events)
  const [currentDayContainer, setCurrentDayContainer] = useAtom(CalendarAtoms.currentDayContainer)

  const [weekDaysGrid, setWeekDaysGrid] = useState<DaysGrid[]>([])
  const [weekEvents, setWeekEvents] = useState<EventList[]>([])
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(startOfMonth(new Date(year, month)))
  const [lastDayOfMonth, setLastDayOfMonth] = useState<Date>(endOfMonth(new Date(year, month)))
  const [eventsContainerHeight, setEventsContainerHeight] = useState<number>(0)

  const containerRef = useRef<ElementRef<'div'>>(null)

  const bodyProps = defaultValues(props)

  const handleCurrentDayContainer = useCallback(
    (day: SingleDayGrid) => {
      if (!currentDayContainer) {
        setCurrentDayContainer(day)
      }
    },
    [currentDayContainer, setCurrentDayContainer],
  )

  useEffect(() => {
    if (containerRef.current) {
      if (containerRef.current?.getElementsByClassName('event').length > 0) {
        console.log(containerRef.current?.getElementsByClassName('event')[0])
        setEventsContainerHeight(
          containerRef.current?.getElementsByClassName('event')[0]?.getBoundingClientRect().height *
            (bodyProps.eventLimit + 1),
        )
      }
    }
  }, [containerRef, weekEvents, setEventsContainerHeight, bodyProps.eventLimit])

  useEffect(() => {
    setFirstDayOfMonth(startOfMonth(new Date(year, month)))
    setLastDayOfMonth(endOfMonth(new Date(year, month)))
    setWeekEvents([])
  }, [month, year])

  useEffect(() => {
    setWeekDaysGrid(getWeekDaysGrid(firstDayOfMonth, lastDayOfMonth, events, handleCurrentDayContainer))
  }, [firstDayOfMonth, lastDayOfMonth, events, handleCurrentDayContainer])

  useEffect(() => {
    if (weekDaysGrid.length > 0) {
      setWeekEvents(getEventList(weekDaysGrid))
    }
  }, [weekDaysGrid])

  const dayContainerMinHeight = useCallback(() => `calc(2.3rem + ${eventsContainerHeight}px)`, [eventsContainerHeight])

  return (
    <div className={cvaBodyClassName({ borderColor: bodyProps.borderColor })}>
      <div
        ref={containerRef}
        className={twMerge('hidden w-full lg:grid lg:grid-rows-6 lg:gap-px', bodyProps.bodyClassName)}
      >
        {weekDaysGrid.map((week, weekIndex) => (
          <div key={weekIndex} className='relative hidden lg:grid lg:grid-cols-7 lg:gap-px'>
            {week.map((day, dayIndex) => (
              <DayContainer
                key={day.date.toString()}
                day={day}
                dayIndex={dayIndex}
                dayContainerMinHeight={dayContainerMinHeight()}
                {...bodyProps}
              />
            ))}
            <ol className='absolute pointer-events-none w-full lg:grid lg:grid-cols-7 mt-9'>
              {weekEvents[weekIndex] &&
                weekEvents[weekIndex].slice(0, bodyProps.eventLimit).map((event) => {
                  return (
                    <Event
                      key={event.id}
                      event={event}
                      startColumn={getEventStartingCol(event.startAt, week[0].date)}
                      endColumn={getEventEndCol(event.endAt, week[6].date)}
                      {...bodyProps}
                    />
                  )
                })}
              {week
                .filter((day) => day.events.length > bodyProps.eventLimit)
                .map((day) => (
                  <EventLimit key={day.date.toString()} day={day} {...bodyProps} />
                ))}
            </ol>
          </div>
        ))}
      </div>
      <MobileCalendarBody daysGrid={[]} {...bodyProps} />
    </div>
  )
}

export default CalendarBody
