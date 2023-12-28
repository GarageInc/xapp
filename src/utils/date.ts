import { Duration, format } from 'date-fns'

function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date as unknown as number)
}

export const fullDate = (date: number, formatString = `dd.LL.yyyy HH:mm:ss`) => {
  let jsDate = new Date(date)

  if (!isValidDate(jsDate)) jsDate = new Date()

  return format(jsDate, formatString)
}

export const formattedDuration = (duration: Duration) => {
  if (duration.months) {
    return `${duration.months}m ${duration.days}d`
  } else if (duration.days) {
    return `${duration.days}d ${duration.hours}h`
  } else if (duration.hours) {
    return `${duration.hours}h ${duration.minutes}min`
  } else if (duration.minutes) {
    return `${duration.minutes}min ${duration.seconds}s`
  } else {
    return `${duration.seconds}s`
  }
}
