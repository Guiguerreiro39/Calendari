import { useAtom } from 'jotai'
import { CalendarAtoms } from '../store'
import { getMonth, getYear } from 'date-fns'

export const useCalculateMonth = () => {
  const [month, setMonth] = useAtom(CalendarAtoms.month)
  const [year, setYear] = useAtom(CalendarAtoms.year)

  return (type: 'next' | 'prev') => {
    const threshold = type === 'next' ? 11 : 0
    const sum = type === 'next' ? 1 : -1

    if ((type === 'next' && month + sum <= threshold) || (type === 'prev' && month + sum >= threshold)) {
      setMonth(month + sum)
      return
    }

    setMonth(type === 'next' ? 0 : 11)
    setYear(year + sum)
  }
}

export const useSetToday = () => {
  const [, setMonth] = useAtom(CalendarAtoms.month)
  const [, setYear] = useAtom(CalendarAtoms.year)

  return () => {
    const today = new Date()

    setMonth(getMonth(today))
    setYear(getYear(today))
  }
}
