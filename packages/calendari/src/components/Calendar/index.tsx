import React, { useEffect } from 'react'
import { Header } from './components/Header'
import CalendarDays from './components/CalendarDays'
import CalendarBody from './components/CalendarBody'
import MobileEvents from './components/MobileEvents'
import { CalendarProps } from './types'
import { useAtom } from 'jotai'
import { CalendarAtoms } from './store'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { v4 as uuid } from 'uuid'
import defaultValues from './utils/defaultValues'

export * from './components/Header'
export * from './api'

const containerClassName = cva('lg:flex lg:flex-auto lg:flex-col border shadow-md rounded-md overflow-hidden', {
  variants: {
    borderColor: {
      transparent: 'border-transparent',
      black: 'border-black',
      white: 'border-white',
      gray: 'border-gray-300',
      slate: 'border-slate-300',
      zinc: 'border-zinc-300',
      neutral: 'border-neutral-300',
      stone: 'border-stone-300',
      red: 'border-red-300',
      orange: 'border-orange-300',
      amber: 'border-amber-300',
      yellow: 'border-yellow-300',
      lime: 'border-lime-300',
      green: 'border-green-300',
      emerald: 'border-emerald-300',
      teal: 'border-teal-300',
      cyan: 'border-cyan-300',
      sky: 'border-sky-300',
      blue: 'border-blue-300',
      indigo: 'border-indigo-300',
      violet: 'border-violet-300',
      purple: 'border-purple-300',
      fuchsia: 'border-fuchsia-300',
      pink: 'border-pink-300',
      rose: 'border-rose-300',
    },
  },
})

export const Calendar: React.FC<CalendarProps> = (props) => {
  const [, setEvents] = useAtom(CalendarAtoms.events)

  const calendarProps = defaultValues(props)

  useEffect(() => {
    setEvents(calendarProps.events.map((event) => ({ ...event, id: uuid() })))
  }, [calendarProps.events, setEvents])

  return (
    <div className='lg:flex lg:h-full lg:flex-col'>
      {calendarProps.header && <Header {...calendarProps} />}
      <div className={twMerge(containerClassName({ borderColor: calendarProps.borderColor }), calendarProps.className)}>
        <CalendarDays {...calendarProps} />
        <CalendarBody {...calendarProps} />
      </div>
      <MobileEvents />
    </div>
  )
}
