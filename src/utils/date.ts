import { format } from 'date-fns'

function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date as unknown as number)
}

export const fullDate = (date: number, formatString = `dd.LL.yyyy HH:mm:ss`) => {
  let jsDate = new Date(date)

  if (!isValidDate(jsDate)) jsDate = new Date()

  return format(jsDate, formatString)
}
