import {format, formatDistanceToNow, getISOWeek, getMonth, getYear, isBefore, isValid, parseISO} from "date-fns";
import {string} from "yup";

export const dateFormat = 'dd.MM.yyyy'
export const dateTimeFormat = 'dd.MM.yyyy HH:mm'
export const standardDateTimeFormat = 'dd-MM-yyyy HH:mm'
export const standardDateFormat = 'dd-MM-yyyy'
const longDateFormat = 'EEEE, MMMM do, yyyy'

export const printDateTime = (value: any): string => {
    if (typeof value === 'string') {
        return printDateTime(strToDate(value))
    }
    if (isValid(value))
        return format(value, dateTimeFormat)
    else
        return ''
}

export const isoDateString = (value: any): string => {
    if (typeof value === 'string') {
        return strToDate(value)?.toISOString() || ""
    }
    if (isValid(value))
        return value?.toISOString()
    else
        return ''
}

export const printBirthday = (value: any): string => {
    if (typeof value === 'string') {
        return printBirthday(strToDate(value))
    }
    if (isValid(value))
        return format(value, 'dd MMM')
    else
        return ''
}

export const printMonth = (value: any): string => {
    if (typeof value === 'string') {
        return printMonth(strToDate(value))
    }
    if (isValid(value))
        return format(value, 'MMM')
    else
        return ''
}

export const printDay = (value: any): string => {
    if (typeof value === 'string') {
        return printDay(strToDate(value))
    }
    if (isValid(value))
        return format(value, 'dd')
    else
        return ''
}

export const printShortDate = (value: any): string => {
    if (typeof value === 'string') {
        return printShortDate(strToDate(value))
    }
    if (isValid(value))
        return format(value, 'dd MMM')
    else
        return ''
}

export const printDayOfMonth = (value: any): string => {
    if (typeof value === 'string') {
        return printDayOfMonth(strToDate(value))
    }
    if (isValid(value))
        return format(value, 'dd')
    else
        return ''
}


export const printDate = (value: any): string => {
    if (typeof value === 'string') {
        return printDate(strToDate(value))
    }
    if (isValid(value))
        return format(value, dateFormat)
    else
        return ''
}

export const printStdDate = (value: any): string => {
    if (typeof value === 'string') {
        return printDate(strToDate(value))
    }
    if (isValid(value))
        return format(value, standardDateFormat)
    else
        return ''
}

export const printStdDatetime = (value: any): string => {
    if (typeof value === 'string') {
        return printDate(strToDate(value))
    }
    if (isValid(value))
        return format(value, standardDateTimeFormat)
    else
        return ''
}

export const strToDate = (str: string): Date | null => {
    try {
        return parseISO(str)
    } catch (e) {
        return null
    }
}

export const isPast = (date: string): boolean => {
    return isBefore(Date.parse(date), Date.now())
}

export const isToday = (str: string): boolean => {
    const today = new Date()
    const date = new Date(str)

    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

export const isThisWeek = (str: string): boolean => {
    const today = new Date()
    const date = new Date(str)
    return getISOWeek(today) === getISOWeek(date)
}

export const isThisMonth = (str: string): boolean => {
    const today = new Date()
    const date = new Date(str)
    return getMonth(today) === getMonth(date)
}

export const isThisYear = (str: string): boolean => {
    const today = new Date()
    const date = new Date(str)
    return getYear(today) === getYear(date)
}

export const longDate = (date: any): string => {
    try{
        console.log(date, parseISO(date))

        return format(parseISO(date), longDateFormat)
    }catch (e){
        return ""
    }
}

export const timeFormat = (date: any): string => {
    try{
        return format(parseISO(date), "h:mma z")
    }catch (e){
        return ""
    }
}

export const timeAgo = (date: any): string => {
    const parsedDate = parseISO(date)
    return formatDistanceToNow(parsedDate, { includeSeconds: true, addSuffix: true })
}