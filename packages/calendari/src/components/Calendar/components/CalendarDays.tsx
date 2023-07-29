import React from 'react'
import { CalendarDaysProps } from '../types'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const daysClassName = cva('grid grid-cols-7 gap-px border-b lg:flex-none', {
  variants: {
    borderColor: {
      transparent: 'border-transparent bg-transparent',
      black: 'border-black bg-black',
      white: 'border-white bg-white',
      gray: 'border-gray-300 bg-gray-200',
      slate: 'border-slate-300 bg-slate-200',
      zinc: 'border-zinc-300 bg-zinc-200',
      neutral: 'border-neutral-300 bg-neutral-200',
      stone: 'border-stone-300 bg-stone-200',
      red: 'border-red-300 bg-red-200',
      orange: 'border-orange-300 bg-orange-200',
      amber: 'border-amber-300 bg-amber-200',
      yellow: 'border-yellow-300 bg-yellow-200',
      lime: 'border-lime-300 bg-lime-200',
      green: 'border-green-300 bg-green-200',
      emerald: 'border-emerald-300 bg-emerald-200',
      teal: 'border-teal-300 bg-teal-200',
      cyan: 'border-cyan-300 bg-cyan-200',
      sky: 'border-sky-300 bg-sky-200',
      blue: 'border-blue-300 bg-blue-200',
      indigo: 'border-indigo-300 bg-indigo-200',
      violet: 'border-violet-300 bg-violet-200',
      purple: 'border-purple-300 bg-purple-200',
      fuchsia: 'border-fuchsia-300 bg-fuchsia-200',
      pink: 'border-pink-300 bg-pink-200',
      rose: 'border-rose-300 bg-rose-200',
    },
  },
})

const timeClassName = cva(
  'text-center text-xs font-semibold leading-6 text-neutral-700 flex justify-center bg-white py-2',
)

const CalendarDays: React.FC<CalendarDaysProps> = ({ borderColor, timeContainerClassName, timeGridClassName }) => {
  return (
    <div className={twMerge(daysClassName({ borderColor }), timeGridClassName)}>
      <div className={twMerge(timeClassName({}), timeContainerClassName)}>
        <span>M</span>
        <span className='sr-only sm:not-sr-only'>on</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>T</span>
        <span className='sr-only sm:not-sr-only'>ue</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>W</span>
        <span className='sr-only sm:not-sr-only'>ed</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>T</span>
        <span className='sr-only sm:not-sr-only'>hu</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>F</span>
        <span className='sr-only sm:not-sr-only'>ri</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>S</span>
        <span className='sr-only sm:not-sr-only'>at</span>
      </div>
      <div className={twMerge(timeClassName(), timeContainerClassName)}>
        <span>S</span>
        <span className='sr-only sm:not-sr-only'>un</span>
      </div>
    </div>
  )
}

export default CalendarDays
